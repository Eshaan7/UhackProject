import os

basedir = os.path.abspath(os.path.dirname(__file__))

''' Flask related Configurations. Note: DO NOT FORGET TO CHANGE SECRET_KEY ! '''

class BaseConfig:

    DOMAIN = 'http://127.0.0.1:5000/api/v1/'

    MARSHMALLOW_STRICT = True
    MARSHMALLOW_DATEFORMAT = 'rfc'

    SECRET_KEY = 'you-will-never-guess' # os.environ.get('SECRET_KEY')
    SECURITY_PASSWORD_SALT = 'test'

    WTF_CSRF_ENABLED = False
    SECURITY_LOGIN_URL = '/api/v1/login/'
    SECURITY_LOGOUT_URL = '/api/v1/logout/'
    SECURITY_REGISTER_URL = '/api/v1/register/'
    SECURITY_RESET_URL = '/api/v1/reset/'
    SECURITY_CONFIRM_URL = '/api/v1/confirm/'
    SECURITY_POST_LOGIN_VIEW = '/admin/'

    SECURITY_TRACKABLE = True
    SECURITY_REGISTERABLE = False
    SECURITY_CONFIRMABLE = True
    SECURITY_RECOVERABLE = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authorization'
    MAX_AGE = 86400

    RATELIMIT_DEFAULT = "24000/day;2400/hour;100/minute;6/second"
    RATELIMIT_HEADERS_ENABLED = True
    RATELIMIT_STRATEGY = 'fixed-window'

    JWT_SECRET_KEY = 'test'
    JWT_HEADER_NAME = 'authorization'

    # MSG91_KEY = os.environ.get('MSG91_KEY')
    # MSG91_URL = 'http://api.msg91.com/api/v2/sendsms'

    JSON_SORT_KEYS = False 


class Config(BaseConfig):
    
    SQLALCHEMY_DATABASE_URI = "postgres://zoai-eshaan:eshaan@localhost/uhackproject"
    SQLALCHEMY_TRACK_MODIFICATIONS = False 
    DEBUG = True # Turn DEBUG OFF before deployment