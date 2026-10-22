import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../services/itinerary_service.dart';
import '../../widgets/custom_button.dart';

class MainItineraryScreen extends StatefulWidget {
  const MainItineraryScreen({super.key});

  @override
  State<MainItineraryScreen> createState() => _MainItineraryScreenState();
}

class _MainItineraryScreenState extends State<MainItineraryScreen> {
  int _selectedDay = 1;
  bool _isRecalculating = false;
  String? _adaptiveNotice;

  final Map<int, List<Map<String, dynamic>>> _daySchedules = {
    1: [
      {
        'time': '07:30 AM',
        'title': 'Scenic Drive from Bengaluru',
        'desc': 'Highway drive through Hassan with misty Western Ghats views.',
        'badge': 'Travel',
        'badgeColor': AppTheme.sunsetGold,
        'badgeIcon': Icons.directions_car_rounded,
        'who': 'All Members',
        'cost': '₹900/person',
        'image': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      },
      {
        'time': '01:00 PM',
        'title': 'Authentic Malnad Thali Lunch',
        'desc': 'Local jackfruit curry, akki rotti & appe midi at Heritage Mess.',
        'badge': 'Plan Together',
        'badgeColor': AppTheme.vibrantTeal,
        'badgeIcon': Icons.restaurant_rounded,
        'who': 'Rohan (Foodie pick)',
        'cost': '₹320/person',
        'image': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      },
      {
        'time': '04:30 PM',
        'title': 'Agumbe Sunset Point Horizon',
        'desc': 'Misty vantage point overlooking the Arabian Sea coastline.',
        'badge': 'Explore',
        'badgeColor': AppTheme.skyCyan,
        'badgeIcon': Icons.explore_rounded,
        'who': 'Aria (Photography pick)',
        'cost': 'Free',
        'image': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80',
      },
      {
        'time': '08:00 PM',
        'title': 'Misty Cloud Plantation Homestay',
        'desc': 'Eco cottage surrounded by arecanut palms and campfire.',
        'badge': 'Stay',
        'badgeColor': AppTheme.vibrantTeal,
        'badgeIcon': Icons.hotel_rounded,
        'who': 'Sneha (Eco Stay pick)',
        'cost': '₹3,200/room',
        'image': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      },
    ],
    2: [
      {
        'time': '06:30 AM',
        'title': 'Barkana Falls Rainforest Trek',
        'desc': 'Guided trek to one of India’s highest falls with canopy flora.',
        'badge': 'Explore',
        'badgeColor': AppTheme.vibrantTeal,
        'badgeIcon': Icons.hiking_rounded,
        'who': 'Sneha (Biology pick)',
        'cost': '₹150 Permit',
        'image': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
      },
      {
        'time': '02:00 PM',
        'title': 'Canopy Research Station Tour',
        'desc': 'King Cobra ecology museum & herbal biodiversity greenhouse.',
        'badge': 'Explore',
        'badgeColor': AppTheme.skyCyan,
        'badgeIcon': Icons.science_rounded,
        'who': 'All Members',
        'cost': '₹200',
        'image': 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=400&q=80',
      },
    ],
    3: [
      {
        'time': '08:00 AM',
        'title': 'Kavaledurga Fort Monolith Summit',
        'desc': '9th century stone ruins rising through morning mountain clouds.',
        'badge': 'Explore',
        'badgeColor': AppTheme.vibrantTeal,
        'badgeIcon': Icons.castle_rounded,
        'who': 'Rohan & Aria',
        'cost': 'Free',
        'image': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=400&q=80',
      },
      {
        'time': '03:30 PM',
        'title': 'Return Journey via Hassan Highway',
        'desc': 'Coffee estate stop for fresh beans & roast sampling.',
        'badge': 'Travel',
        'badgeColor': AppTheme.sunsetGold,
        'badgeIcon': Icons.coffee_rounded,
        'who': 'All Members',
        'cost': '₹500',
        'image': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      },
    ],
  };

  Future<void> _handleRecalculate() async {
    setState(() => _isRecalculating = true);
    final result = await ItineraryService.instance.recalculateAdaptiveRoute(
      reason: 'Rain detected near Barkana Falls trail',
      currentLocation: 'Agumbe Rainforest',
    );
    if (mounted) {
      setState(() {
        _isRecalculating = false;
        _adaptiveNotice = result['adaptation'];
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final schedule = _daySchedules[_selectedDay] ?? [];

    return Scaffold(
      backgroundColor: AppTheme.canvasBg,
      appBar: AppBar(
        backgroundColor: AppTheme.canvasBg,
        title: const Text(
          'Master Itinerary',
          style: TextStyle(
            fontFamily: 'Outfit',
            fontSize: 18,
            fontWeight: FontWeight.w800,
            color: AppTheme.darkPine,
          ),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 18),
          onPressed: () => Navigator.of(context).pop(),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.sync_rounded, color: AppTheme.vibrantTeal),
            onPressed: _handleRecalculate,
          ),
        ],
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(20, 10, 20, 36),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Day Tabs (Pill shaped with Sky Cyan to Vibrant Teal gradient)
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: AppTheme.lightSand,
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Row(
                  children: [1, 2, 3].map((day) {
                    final isSel = _selectedDay == day;
                    return Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _selectedDay = day),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 200),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            gradient: isSel ? AppTheme.primaryGradient : null,
                            color: isSel ? null : Colors.transparent,
                            borderRadius: BorderRadius.circular(20),
                            boxShadow: isSel
                                ? [
                                    BoxShadow(
                                      color: AppTheme.skyCyan.withOpacity(0.35),
                                      blurRadius: 10,
                                      offset: const Offset(0, 3),
                                    ),
                                  ]
                                : null,
                          ),
                          child: Text(
                            'Day $day',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w800,
                              color: isSel ? AppTheme.pureWhite : AppTheme.darkPine,
                            ),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 18),

              // Adaptive Reroute Alert (Sunset Gold / Orange)
              if (_adaptiveNotice != null)
                Container(
                  padding: const EdgeInsets.all(14),
                  margin: const EdgeInsets.only(bottom: 16),
                  decoration: BoxDecoration(
                    color: AppTheme.sunsetGold.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(
                      color: AppTheme.sunsetGold.withOpacity(0.4),
                    ),
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Icon(
                        Icons.auto_awesome_rounded,
                        size: 18,
                        color: AppTheme.sunsetOrange,
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Text(
                          _adaptiveNotice!,
                          style: const TextStyle(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: AppTheme.darkPine,
                            height: 1.35,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

              // Harmony Overview Pill Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: AppTheme.journeyCardDecoration(
                  backgroundColor: AppTheme.pureWhite,
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Western Ghats Mist Route',
                          style: TextStyle(
                            fontFamily: 'Outfit',
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.darkPine,
                          ),
                        ),
                        SizedBox(height: 2),
                        Text(
                          'Estimated Day Budget: ~₹2,400',
                          style: TextStyle(
                            fontSize: 12,
                            color: AppTheme.mutedSlate,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ],
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        gradient: AppTheme.primaryGradient,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Text(
                        '97% Harmony',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w800,
                          color: AppTheme.pureWhite,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Waypoint Timeline Cards (Mirroring Floating Journey Thumbnails)
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: schedule.length,
                separatorBuilder: (_, __) => Padding(
                  padding: const EdgeInsets.only(left: 28),
                  child: Container(
                    height: 20,
                    width: 2,
                    decoration: BoxDecoration(
                      color: AppTheme.vibrantTeal.withOpacity(0.3),
                      borderRadius: BorderRadius.circular(1),
                    ),
                  ),
                ),
                itemBuilder: (context, index) {
                  final stop = schedule[index];
                  final Color badgeColor = stop['badgeColor'] as Color;

                  return Container(
                    padding: const EdgeInsets.all(14),
                    decoration: AppTheme.journeyCardDecoration(
                      backgroundColor: AppTheme.pureWhite,
                      radius: AppTheme.cardRadius,
                    ),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        // Left Thumbnail Image
                        ClipRRect(
                          borderRadius: BorderRadius.circular(14),
                          child: Image.network(
                            stop['image'] as String,
                            width: 74,
                            height: 74,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => Container(
                              width: 74,
                              height: 74,
                              color: AppTheme.lightSand,
                              child: Icon(stop['badgeIcon'] as IconData, color: badgeColor),
                            ),
                          ),
                        ),
                        const SizedBox(width: 14),

                        // Stop details
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  // Waypoint Badge (Explore / Stay / Plan / Travel)
                                  Container(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 8,
                                      vertical: 3,
                                    ),
                                    decoration: BoxDecoration(
                                      color: badgeColor,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    child: Row(
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(
                                          stop['badgeIcon'] as IconData,
                                          size: 11,
                                          color: AppTheme.pureWhite,
                                        ),
                                        const SizedBox(width: 4),
                                        Text(
                                          stop['badge'] as String,
                                          style: const TextStyle(
                                            fontSize: 9,
                                            fontWeight: FontWeight.w800,
                                            color: AppTheme.pureWhite,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),

                                  Text(
                                    stop['time'] as String,
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      color: AppTheme.darkPine,
                                    ),
                                  ),
                                ],
                              ),
                              const SizedBox(height: 6),

                              Text(
                                stop['title'] as String,
                                style: const TextStyle(
                                  fontFamily: 'Outfit',
                                  fontSize: 14,
                                  fontWeight: FontWeight.w800,
                                  color: AppTheme.darkPine,
                                ),
                              ),
                              const SizedBox(height: 3),
                              Text(
                                stop['desc'] as String,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 11,
                                  color: AppTheme.mutedSlate,
                                  height: 1.3,
                                ),
                              ),
                              const SizedBox(height: 8),

                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    stop['who'] as String,
                                    style: const TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.w600,
                                      color: AppTheme.vibrantTeal,
                                    ),
                                  ),
                                  Text(
                                    stop['cost'] as String,
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w800,
                                      color: AppTheme.darkPine,
                                    ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
              const SizedBox(height: 24),

              // Bottom Action: Recalculate or Approve (Pill Button)
              CustomButton(
                label: _isRecalculating ? 'AI Recalculating Route...' : 'Adapt Itinerary With AI',
                icon: Icons.auto_awesome_rounded,
                variant: ButtonVariant.primary,
                isLoading: _isRecalculating,
                isPill: true,
                onPressed: _handleRecalculate,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
