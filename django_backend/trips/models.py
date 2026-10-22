from django.db import models
import uuid

class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    invitation_code = models.CharField(max_length=32, unique=True, db_index=True)
    created_by_user_id = models.CharField(max_length=128)
    created_by_name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    estimated_group_size = models.PositiveIntegerField(default=4)
    primary_destinations = models.JSONField(default=list)
    vibe = models.CharField(max_length=64, default='Balanced')
    is_finalized = models.BooleanField(default=false)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.invitation_code})"

class TripMember(models.Model):
    ROLE_CHOICES = (
        ('host', 'Host / Organizer'),
        ('member', 'Travel Member'),
    )
    trip = models.ForeignKey(Trip, related_name='members', on_delete=models.CASCADE)
    user_id = models.CharField(max_length=128, db_index=True)
    user_name = models.CharField(max_length=255)
    user_email = models.EmailField()
    role = models.CharField(max_length=32, choices=ROLE_CHOICES, default='member')
    has_submitted_preferences = models.BooleanField(default=False)
    has_approved_itinerary = models.BooleanField(default=False)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('trip', 'user_id')

class IndividualPreference(models.Model):
    trip = models.ForeignKey(Trip, related_name='preferences', on_delete=models.CASCADE)
    member = models.OneToOneField(TripMember, related_name='preference_detail', on_delete=models.CASCADE)
    destinations = models.JSONField(default=list, help_text="List of candidate destinations")
    custom_places = models.JSONField(default=list, help_text="Free text custom places")
    must_visit_places = models.JSONField(default=list)
    excluded_places = models.JSONField(default=list)
    budget_min = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    food_preferences = models.JSONField(default=list, help_text="e.g. Vegetarian, Local street food, Vegan")
    travel_pace = models.CharField(max_length=64, default='Moderate')
    interests = models.JSONField(default=list, help_text="Nature, adventure, culture, relaxation")
    accessibility_requirements = models.TextField(blank=True, default='')
    raw_notes = models.TextField(blank=True, default='')
    updated_at = models.DateTimeField(auto_now=True)

class ItineraryProposal(models.Model):
    trip = models.ForeignKey(Trip, related_name='itineraries', on_delete=models.CASCADE)
    version = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    fairness_score = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    fairness_breakdown = models.JSONField(default=dict, help_text="Per-member preference satisfaction metrics")
    days_data = models.JSONField(default=list, help_text="Structured day-by-day plan with stops and routes")
    ai_rationale = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class AccommodationRecommendation(models.Model):
    trip = models.ForeignKey(Trip, related_name='accommodations', on_delete=models.CASCADE)
    provider_name = models.CharField(max_length=64, default='Booking.com Demand API')
    property_id = models.CharField(max_length=128)
    name = models.CharField(max_length=255)
    location_summary = models.CharField(max_length=255)
    rating = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True)
    review_count = models.PositiveIntegerField(default=0)
    total_price_estimate = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=8, default='USD')
    image_url = models.URLField(max_length=500, blank=True)
    external_booking_url = models.URLField(max_length=1000)
    amenities = models.JSONField(default=list)
    is_selected_by_group = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
