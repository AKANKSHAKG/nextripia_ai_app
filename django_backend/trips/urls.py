from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TripViewSet, join_trip_by_code, verify_invitation_code

router = DefaultRouter()
router.register(r'', TripViewSet, basename='trip')

urlpatterns = [
    path('verify-code/', verify_invitation_code, name='verify-invitation-code'),
    path('join/', join_trip_by_code, name='join-trip'),
    path('', include(router.urls)),
]
