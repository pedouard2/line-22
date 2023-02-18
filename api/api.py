import pronouncing
import time
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)

# Load the default configuration
app.config.from_object('config')

# Load the configuration from the instance folder
app.config.from_pyfile('config.py')

db = SQLAlchemy(app)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}