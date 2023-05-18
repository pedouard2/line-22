import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
def create_app():
    app = Flask(__name__, static_folder ='../../build', instance_relative_config=True)
    
    # Load the default configuration
    app.config.from_object('config')
    # Load the configuration from the instance folder
    app.config.from_pyfile('config.py')

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    db.init_app(app)

    from . import views
    app.register_blueprint(views.v1)

    return app

