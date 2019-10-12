''' Admin Model Views '''

from flask import abort
from flask_security import current_user
from flask_admin.contrib.sqla import ModelView
from src import admin, db
from src.users.models import User, Role, UserRole
from src.housing.models import Housing

class MyAdminModel(ModelView):

    column_exclude_list = ('password')

    page_size = 100
    can_set_page_size = True
    can_view_details = True

    def is_accessible(self):
        if not current_user.is_authenticated or not current_user.has_role('admin'):
        	# permission denied
        	abort(403)
        if current_user.has_role('admin'):
            return True
        return False

    def _handle_view(self, name, **kwargs):
        """
        Override builtin _handle_view in order to redirect users when a view is
        not accessible.
        """
        if not self.is_accessible():
            if current_user.is_authenticated:
                # permission denied
                abort(403)


admin.add_view(MyAdminModel(User, session=db.session))
admin.add_view(MyAdminModel(Role, session=db.session))
admin.add_view(MyAdminModel(UserRole, session=db.session))
admin.add_view(MyAdminModel(Housing, session=db.session))
