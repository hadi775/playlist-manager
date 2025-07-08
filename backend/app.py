import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from models import db
from routes import register_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

# Konfigurasi dari file .env
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inisialisasi
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Daftarkan semua rute/endpoint dari routes.py
register_routes(app)

if __name__ == '__main__':
    app.run()