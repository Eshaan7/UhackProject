from .models import User, Role, UserRole
from src import ma, BaseSchema

# User Schema
class UserSchema(BaseSchema):
    class Meta:
        model = User
        exclude = ('updated_on', 'confirmed_at')
        #fields = ('id', 'email', 'username')

    id = ma.Integer(dump_only=True)
    email = ma.Email(required=False)
    mobile_number = ma.String(required=True)
    username = ma.String(required=True)
    where_from = ma.String()
    where_to = ma.String()
    roles = ma.Nested('RoleSchema', many=True, dump_only=True, only=('id', 'name'))

class RoleSchema(BaseSchema):
    class Meta:
        model = Role
        exclude = ('updated_on', 'created_on', 'users')

    # id = ma.UUID()
    id = ma.Integer(dump_only=True)
    name = ma.String()
    permissions = ma.Nested('PermissionSchema', many=True, dump_only=True, only=('id', 'name'))


class UserRoleSchema(BaseSchema):
    class Meta:
        model = UserRole
        exclude = ('created_on', 'updated_on')

    id = ma.Integer(dump_only=True)
    user_id = ma.Integer(load=True)
    role_id = ma.Integer(load=True)
    user = ma.Nested('UserSchema', many=False)
    role = ma.Nested('RoleSchema', many=False)
