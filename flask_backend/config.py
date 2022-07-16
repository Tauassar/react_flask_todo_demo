import os


class BaseConfig:
    DEBUG = True
    SECRET_KEY = '\xb2\xae\x00\x87\x00\xde\x16L\xa1PD\\\xe7\xcf\x8b\x11'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'sqlite://'


class DevelopmentConfig(BaseConfig):
    basedir = os.path.abspath(os.path.dirname(__file__))
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'dev.db')
    SECRET_KEY = "secret_sauce",


class ProductionConfig(BaseConfig):
    basedir = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(
        basedir, 'flask-react-todo.db')
    SECRET_KEY = "secret_sauce",


config = {
    'dev': 'config.DevelopmentConfig',
    'prod': 'config.ProductionConfig'
}
