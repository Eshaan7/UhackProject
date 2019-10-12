''' User views '''

from random import randint
from datetime import timedelta
from flask import request, jsonify, make_response, redirect, json
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)
from flask_restful import Resource
from flask_security.utils import verify_and_update_password, login_user
from flask_security import current_user
from sqlalchemy.exc import IntegrityError, InvalidRequestError

from src import db, api, sms

from src import redis_store

from .models import User
from .schemas import UserSchema


class UserViewResource(Resource):
    model = User
    schema = UserSchema

    @jwt_required
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user = self.model.query.get(current_user_id)
            user = self.schema().dump(user).data
            return jsonify(user)
        except Exception as e:
            return make_response(jsonify({"error": {"code": 400, "msg": str(e)}}, 400))

    @jwt_required
    def put(self):

        try:
            data = request.json
            user = self.model.query.filter_by(email=data['email']).first()
            user.previous_salary = data['previous_salary']
            user.expected_salary = data['expected_salary']
            db.session.commit()
            return jsonify(self.schema().dump(user).data)
        except Exception as e:
            return make_response(jsonify({"error": {"code": 400, "msg": str(e)}}, 400))


class UserLoginResource(Resource):
    model = User

    def post(self):

        if request.json:
            data = request.json
            user = self.model.query.filter(
                self.model.email == data['email']).first()
            if user and verify_and_update_password(data['password'], user) and login_user(user):
                expires = timedelta(days=365)
                user = UserSchema(
                    only=('id', 'email', 'username', 'mobile_number', 'roles')).dump(user).data
                return make_response(
                    jsonify({'id': user,
                             'authentication_token': create_access_token(identity=user['id'], expires_delta=expires)}), 200)
            else:
                return make_response(jsonify({"error": {"code": 400, "msg": "Activate user first"}}), 400)

        else:
            data = request.form
            user = self.model.query.filter(
                self.model.email == data['email']).first()
            if user and verify_and_update_password(data['password'], user) and login_user(user):
                return make_response(redirect('/admin/', 302))
            else:
                return make_response(redirect('/api/v1/login', 403))


class UserRegisterResource(Resource):
    model = User
    schema = UserSchema

    def post(self):
        data = request.json
        user = User.query.filter(User.mobile_number ==
                                 data['mobile_number']).first()
        if user:
            return make_response(jsonify({}), 400)
        user, errors = self.schema().load(data)
        if errors:
            return make_response(jsonify(errors), 400)

        redis_store.setex(
            'user:' + data['mobile_number'], 10 * 600, json.dumps(data))
        send_otp(user.mobile_number,
                 'Your otp to sign up at notifyyy is {0}. Valid for 10 minutes.')
        return make_response(jsonify({"success": "An OTP has been sent to your mobile number. Please verify."}), 200)


# def send_otp(phone: str, content) -> bool:
#     otp = randint(100000, 999999)
#     redis_store.setex(phone, 10 * 600, otp)

#     content = [dict(message=content.format(otp), to=[phone])]
#     sms.send_sms(content=content)
#     return True


class UserVerifyResource(Resource):
    model = User
    schema = UserSchema

    def post(self):
        data = request.json
        if redis_store.get('user:' + data['mobile_number']) and redis_store.get(data['mobile_number']).decode('utf-8') == str(data['otp']):
            user, errors = self.schema().load(json.loads(
                redis_store.get('user:' + data['mobile_number']).decode('utf-8')))
            if errors:
                return make_response(jsonify(errors), 400)
            try:
                user.active = True
                db.session.add(user)
                db.session.commit()
            except (IntegrityError, InvalidRequestError) as e:
                print(e)
                db.session.rollback()
                return make_response(jsonify(error={'code': 400}), 400)
            expires = timedelta(days=365)
            return make_response(
                jsonify(created_user={'id': user.id,
                                      'user': self.schema(only=('id', 'email', 'username', 'mobile_number', 'roles')).dump(user).data,
                                      'authentication_token': create_access_token(identity=user.id,
                                                                                  expires_delta=expires)}), 200)
        else:
            return make_response(jsonify({'meta': {'code': 403}}), 403)


api.add_resource(UserLoginResource, '/login/', endpoint='login')
api.add_resource(UserRegisterResource, '/register/', endpoint='register')
api.add_resource(UserVerifyResource, '/verify/', endpoint='verify')

api.add_resource(UserViewResource, '/user', endpoint='user')
