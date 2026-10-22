import firebase_admin
from firebase_admin import auth as firebase_auth
from django.contrib.auth.models import User
from rest_framework import authentication, exceptions

class FirebaseAuthentication(authentication.BaseAuthentication):
    """
    Authenticates requests using Firebase ID tokens sent in the Authorization header:
    Authorization: Bearer <Firebase_ID_Token>
    """
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return None

        parts = auth_header.split(' ')
        if len(parts) != 2 or parts[0].lower() != 'bearer':
            return None

        id_token = parts[1]

        try:
            # Verify Firebase ID token cryptographically
            decoded_token = firebase_auth.verify_id_token(id_token)
            uid = decoded_token.get('uid')
            email = decoded_token.get('email', f"{uid}@firebase.user")
            name = decoded_token.get('name', 'NexTripia Traveller')

            # Map or provision Django user bound to the verified Firebase UID
            user, _ = User.objects.get_or_create(
                username=uid,
                defaults={'email': email, 'first_name': name}
            )
            return (user, decoded_token)
        except Exception as e:
            raise exceptions.AuthenticationFailed(f"Invalid Firebase ID token: {str(e)}")
