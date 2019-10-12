from flask import request, jsonify, make_response
from flask_restful import Resource
from flask_jwt_extended import jwt_required, get_jwt_identity
from src import db, api
from src.users.models import User
from .models import Housing
from .schemas import HousingSchema

import numpy as np
import pickle
import pandas as pd


def getListing(expected_salary):
    Data_Frame = pd.read_csv("USA_Housing.csv")
    Data_Frame.head()
    Bool = (Data_Frame["Avg. Area Income"] <= expected_salary)
    Filtered_Data_Frame = Data_Frame[Bool]
    return Filtered_Data_Frame


def getPrediction(features, fileName):

    model = pickle.load(open(fileName, 'rb'))
    final_features = [np.array(features)]
    prediction = model.predict(final_features)
    return round(prediction[0], 2)


class HousingListing_api(Resource):

    @jwt_required
    def get(self):
        try:
            current_user_id = get_jwt_identity()
            user=User.query.get(current_user_id)
            listing = getListing(user.expected_salary)
            # print(listing.to_dict('records'))
            return listing.to_dict('records')[:4]
            # return jsonify(self.schema(many=False).dump(housing).data)
        except Exception as e:
            return make_response(jsonify({'meta': {'code': 404, 'error': str(e)}}), 404)

class Housing_api(Resource):
    model=Housing
    schema=HousingSchema

    @jwt_required
    def get(self):
        try:
            current_user_id=get_jwt_identity()
            housing=self.model.query.join(User).filter(
                self.model.user_id == current_user_id).first()
            return jsonify(self.schema(many=False).dump(housing).data)
        except Exception as e:
            return make_response(jsonify({'meta': {'code': 404, 'error': str(e)}}), 404)

    @jwt_required
    def post(self):
        try:
            current_user_id=get_jwt_identity()
            data=request.json
            housing=self.model.query.join(User).filter(
                self.model.user_id == current_user_id).first()
            if housing:
                return make_response(jsonify({}), 400)
            housing, errors=self.schema().load(data)
            if errors:
                return make_response(jsonify(errors), 400)

            db.session.add(housing)
            db.session.commit()

            user=User.query.get(current_user_id)

            features1=[user.expected_salary,
                housing.no_of_rooms, housing.no_of_bedrooms]
            housing.prediction1=getPrediction(features1, "Housing_Model.pkl")

            features2=[housing.no_of_bedrooms,
                housing.no_of_bathrooms, housing.sqft_living]
            housing.prediction2=getPrediction(features2, "Housing_Model2.pkl")

            db.session.commit()

            return jsonify(self.schema().dump(housing).data)

        except Exception as e:
            return make_response(jsonify({'meta': {'code': 404, 'error': str(e)}}), 405)


    @jwt_required
    def put(self):
        try:
            current_user_id=get_jwt_identity()

            data=request.json

            housing=self.model.query.filter_by(user_id=current_user_id).first()

            if not housing:
                return make_response(jsonify({}), 400)

            # housing, errors=self.schema().load(data)

            # if errors:
            #     return make_response(jsonify(errors), 400)

            housing.no_of_rooms = data['no_of_rooms']
            housing.no_of_bedrooms = data['no_of_bedrooms']
            housing.no_of_bathrooms = data['no_of_bathrooms']
            housing.sqft_living = data['sqft_living']

            db.session.commit()

            user = User.query.get(current_user_id)

            features1=[user.expected_salary,
                housing.no_of_rooms, housing.no_of_bedrooms]
            housing.prediction1=getPrediction(features1, "Housing_Model.pkl")

            features2=[housing.no_of_bedrooms,
                housing.no_of_bathrooms, housing.sqft_living]
            housing.prediction2=getPrediction(features2, "Housing_Model2.pkl")

            print(housing)

            db.session.commit()

            return jsonify(self.schema().dump(housing).data)

        except Exception as e:
            return make_response(jsonify({'meta': {'code': 405, 'error': str(e)}}), 405)


api.add_resource(Housing_api, '/housing')
api.add_resource(HousingListing_api, '/housing_list')
