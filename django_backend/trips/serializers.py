from rest_framework import serializers
from .models import Trip, TripMember, IndividualPreference, ItineraryProposal, AccommodationRecommendation

class TripMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripMember
        fields = ['id', 'user_id', 'user_name', 'user_email', 'role', 'has_submitted_preferences', 'has_approved_itinerary', 'joined_at']

class IndividualPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualPreference
        fields = '__all__'

class ItineraryProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItineraryProposal
        fields = '__all__'

class AccommodationRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccommodationRecommendation
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    members = TripMemberSerializer(many=True, read_only=True)
    itineraries = ItineraryProposalSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'title', 'invitation_code', 'created_by_user_id', 'created_by_name',
            'start_date', 'end_date', 'estimated_group_size', 'primary_destinations',
            'vibe', 'is_finalized', 'members', 'itineraries', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'invitation_code', 'created_at', 'updated_at']
