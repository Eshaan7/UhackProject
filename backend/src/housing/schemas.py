from src import ma, BaseSchema
from .models import Housing
from src.users.schemas import UserSchema

# Housing Schema
class HousingSchema(BaseSchema):
	class Meta:
		model = Housing
		exclude = ('updated_on',)
		# fields = ('no_of_rooms', 'no_of_bedrooms', 'no_of_bathrooms', '')

	id = ma.Integer(dump_only=True)
	prediction1 = ma.Number(dump_only=True)
	prediction2 = ma.Number(dump_only=True)
	user_id = ma.Integer(dump_only=True)
	user = ma.Nested(UserSchema, many=False, only=('id',))