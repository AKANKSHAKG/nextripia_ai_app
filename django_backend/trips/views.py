import random
import string
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Trip, TripMember, IndividualPreference, ItineraryProposal
from .serializers import TripSerializer, IndividualPreferenceSerializer, ItineraryProposalSerializer

def generate_invitation_code():
    chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    code = ''.join(random.choices(chars, k=6))
    return f"NEXT-{code}"

class TripViewSet(viewsets.ModelViewSet):
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return trips where request user is a member
        user_id = self.request.user.username  # Or Firebase UID mapped
        return Trip.objects.filter(members__user_id=user_id).distinct()

    def perform_create(self, serializer):
        code = generate_invitation_code()
        while Trip.objects.filter(invitation_code=code).exists():
            code = generate_invitation_code()

        user_id = self.request.user.username
        user_name = self.request.user.get_full_name() or "Organizer"
        trip = serializer.save(
            invitation_code=code,
            created_by_user_id=user_id,
            created_by_name=user_name,
        )
        # Automatically make creator the host member
        TripMember.objects.create(
            trip=trip,
            user_id=user_id,
            user_name=user_name,
            user_email=self.request.user.email or "host@nextripia.app",
            role='host',
            has_submitted_preferences=False,
        )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_trip_by_code(request):
    code = request.data.get('invitation_code', '').strip().upper()
    if not code:
        return Response({'error': 'Invitation code is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        trip = Trip.objects.get(invitation_code=code)
    except Trip.DoesNotExist:
        return Response({'error': f'No trip found matching invitation code "{code}".'}, status=status.HTTP_404_NOT_FOUND)

    user_id = request.user.username
    user_name = request.user.get_full_name() or "Travel Member"
    user_email = request.user.email or ""

    member, created = TripMember.objects.get_or_create(
        trip=trip,
        user_id=user_id,
        defaults={
            'user_name': user_name,
            'user_email': user_email,
            'role': 'member',
            'has_submitted_preferences': False,
        }
    )

    return Response({
        'message': 'Successfully joined trip.',
        'trip': TripSerializer(trip).data,
        'is_new_member': created,
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_invitation_code(request):
    code = request.query_params.get('code', '').strip().upper()
    if not code:
        return Response({'error': 'Code parameter required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        trip = Trip.objects.get(invitation_code=code)
        return Response({
            'valid': True,
            'trip_id': str(trip.id),
            'title': trip.title,
            'created_by': trip.created_by_name,
            'start_date': str(trip.start_date),
            'end_date': str(trip.end_date),
            'members_count': trip.members.count(),
            'destinations': trip.primary_destinations,
        })
    except Trip.DoesNotExist:
        return Response({
            'valid': False,
            'error': f'Invalid invitation code "{code}". Please confirm with your organizer.'
        }, status=status.HTTP_404_NOT_FOUND)
