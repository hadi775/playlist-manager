from flask import request, jsonify
from flask.views import MethodView
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from models import UserModel, PlaylistModel, db

def register_routes(app):

    # Endpoint untuk Registrasi Pengguna
    @app.route('/register', methods=['POST'])
    def register():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        name = data.get('name')

        if not all([username, password, email]): # Cek jika ada yang kosong
            return jsonify({"msg": "Username, email, dan password dibutuhkan"}), 400

        if UserModel.query.filter_by(username=username).first():
            return jsonify({"msg": "Username sudah ada"}), 400
        
        if UserModel.query.filter_by(email=email).first(): # Validasi email unik
            return jsonify({"msg": "Email sudah terdaftar"}), 400

        new_user = UserModel(
            username=username,
            email=email,
            name=name,
            password_hash=UserModel.hash_password(password)
        )
        new_user.save_to_db()

        return jsonify({"msg": "Pengguna berhasil dibuat"}), 201

    # Endpoint untuk Login Pengguna
    @app.route('/login', methods=['POST'])
    def login():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        user = UserModel.query.filter_by(username=username).first()

        if user and UserModel.verify_password(password, user.password_hash):
            access_token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            return jsonify(
                access_token=access_token,
                refresh_token=refresh_token
            )
        
        return jsonify({"msg": "Username atau password salah"}), 401
    
    # Endpoint baru untuk merefresh token
    @app.route('/refresh', methods=['POST'])
    @jwt_required(refresh=True) # <-- Hanya refresh token yang bisa mengakses ini
    def refresh():
        current_user_id = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user_id)
        return jsonify(access_token=new_access_token)

    # Endpoint untuk Playlist (CRUD)
    class PlaylistResource(MethodView):
        decorators = [jwt_required()] # Melindungi semua metode di class ini

        # Mendapatkan semua playlist milik pengguna yang login
        def get(self):
            current_user_id = get_jwt_identity()
            playlists = PlaylistModel.query.filter_by(user_id=current_user_id).all()
            return jsonify([playlist.to_dict() for playlist in playlists])

        # Membuat playlist baru
        def post(self):
            current_user_id = get_jwt_identity()
            data = request.get_json()
            
            new_playlist = PlaylistModel(
                play_name=data['play_name'],
                play_url=data.get('play_url'),
                play_thumbnail=data.get('play_thumbnail'),
                play_genre=data['play_genre'],
                play_description=data.get('play_description'),
                user_id=current_user_id
            )
            db.session.add(new_playlist)
            db.session.commit()
            return jsonify(new_playlist.to_dict()), 201

    class PlaylistDetailResource(MethodView):
        decorators = [jwt_required()]

        # Mendapatkan detail satu playlist
        def get(self, playlist_id):
            current_user_id = get_jwt_identity()
            playlist = PlaylistModel.query.filter_by(id=playlist_id, user_id=current_user_id).first()
            if playlist:
                return jsonify(playlist.to_dict())
            return jsonify({"msg": "Playlist tidak ditemukan"}), 404

        # Memperbarui playlist
        def put(self, playlist_id):
            current_user_id = get_jwt_identity()
            playlist = PlaylistModel.query.filter_by(id=playlist_id, user_id=current_user_id).first()
            if not playlist:
                return jsonify({"msg": "Playlist tidak ditemukan"}), 404

            data = request.get_json()
            playlist.play_name = data.get('play_name', playlist.play_name)
            playlist.play_url = data.get('play_url', playlist.play_url)
            playlist.play_thumbnail = data.get('play_thumbnail', playlist.play_thumbnail)
            playlist.play_genre = data.get('play_genre', playlist.play_genre)
            playlist.play_description = data.get('play_description', playlist.play_description)
            
            db.session.commit()
            return jsonify(playlist.to_dict())

        # Menghapus playlist
        def delete(self, playlist_id):
            current_user_id = get_jwt_identity()
            playlist = PlaylistModel.query.filter_by(id=playlist_id, user_id=current_user_id).first()
            if not playlist:
                return jsonify({"msg": "Playlist tidak ditemukan"}), 404
            
            db.session.delete(playlist)
            db.session.commit()
            return jsonify({"msg": "Playlist berhasil dihapus"})

    # Mendaftarkan resource ke URL
    app.add_url_rule("/playlists", view_func=PlaylistResource.as_view("playlist_resource"))
    app.add_url_rule("/playlists/<int:playlist_id>", view_func=PlaylistDetailResource.as_view("playlist_detail_resource"))