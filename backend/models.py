from flask_sqlalchemy import SQLAlchemy
from passlib.hash import pbkdf2_sha256 as sha256

db = SQLAlchemy()

class UserModel(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100))
    password_hash = db.Column(db.String(128), nullable=False)
    
    playlists = db.relationship('PlaylistModel', back_populates='owner', lazy="dynamic", cascade="all, delete-orphan")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def hash_password(password):
        return sha256.hash(password)

    @staticmethod
    def verify_password(password, hash):
        return sha256.verify(password, hash)

class PlaylistModel(db.Model):
    __tablename__ = 'playlists'

    id = db.Column(db.Integer, primary_key=True)
    play_name = db.Column(db.String(100), nullable=False)
    play_url = db.Column(db.String(200))
    play_thumbnail = db.Column(db.String(200))
    play_genre = db.Column(db.String(50), nullable=False)
    play_description = db.Column(db.Text)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    owner = db.relationship("UserModel", back_populates="playlists")

    def to_dict(self):
        return {
            'id': self.id,
            'play_name': self.play_name,
            'play_url': self.play_url,
            'play_thumbnail': self.play_thumbnail,
            'play_genre': self.play_genre,
            'play_description': self.play_description
        }