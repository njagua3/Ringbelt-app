from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from config import Config
from extensions import db  # Import db from extensions
from routes import register_routes  # Import the function to register routes

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)  # Enable CORS for all routes

# Register routes
register_routes(app)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
