import 'package:flutter/material.dart';
import '../../config/theme.dart';
import '../../models/preference.dart';
import '../../services/auth_service.dart';
import '../../widgets/custom_button.dart';
import '../itinerary/main_itinerary_screen.dart';

class DreamTripPreferencesScreen extends StatefulWidget {
  const DreamTripPreferencesScreen({super.key});

  @override
  State<DreamTripPreferencesScreen> createState() =>
      _DreamTripPreferencesScreenState();
}

class _DreamTripPreferencesScreenState extends State<DreamTripPreferencesScreen> {
  final List<String> _selectedActivities = [
    'Nature Trekking',
    'Sunset Viewpoints',
    'Campfire & Stargazing',
  ];

  final List<String> _allActivities = [
    'Nature Trekking',
    'Sunset Viewpoints',
    'Café Hopping',
    'Campfire & Stargazing',
    'Rainforest Ecology',
    'Waterfalls Trail',
    'Photography Walk',
    'Local Malnad Food',
  ];

  RangeValues _budgetRange = const RangeValues(6000, 14000);
  String _selectedPace = 'Balanced';
  String _selectedStay = 'Eco Resort';
  bool _isSaving = false;

  final List<String> _paceOptions = [
    'Relaxed & Scenic',
    'Balanced',
    'Action Packed',
  ];

  final List<String> _stayOptions = [
    'Eco Resort',
    'Plantation Homestay',
    'Boutique Villa',
    'Hostel / Camp',
  ];

  @override
  Widget build(BuildContext context) {
    final user = AuthService.instance.currentUser;

    return Scaffold(
      backgroundColor: AppTheme.canvasBg,
      appBar: AppBar(
        backgroundColor: AppTheme.canvasBg,
        title: const Text(
          'Individual Preferences',
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
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 36),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Privacy Info Card
              Container(
                padding: const EdgeInsets.all(16),
                decoration: AppTheme.journeyCardDecoration(
                  backgroundColor: AppTheme.pureWhite,
                ),
                child: Row(
                  children: [
                    Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        gradient: AppTheme.primaryGradient,
                        borderRadius: BorderRadius.circular(14),
                      ),
                      child: const Icon(
                        Icons.lock_person_rounded,
                        color: AppTheme.pureWhite,
                        size: 22,
                      ),
                    ),
                    const SizedBox(width: 14),
                    const Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Zero Peer Pressure Wishlist',
                            style: TextStyle(
                              fontFamily: 'Outfit',
                              fontSize: 14,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.darkPine,
                            ),
                          ),
                          SizedBox(height: 2),
                          Text(
                            'Your choices stay confidential until Gemini finds the fairest group overlap.',
                            style: TextStyle(
                              fontSize: 12,
                              color: AppTheme.mutedSlate,
                              height: 1.3,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 22),

              // Activity Selection Chips
              const Text(
                'Must-Have Experiences',
                style: TextStyle(
                  fontFamily: 'Outfit',
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.darkPine,
                ),
              ),
              const SizedBox(height: 10),

              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: _allActivities.map((act) {
                  final isChosen = _selectedActivities.contains(act);
                  return GestureDetector(
                    onTap: () {
                      setState(() {
                        if (isChosen) {
                          _selectedActivities.remove(act);
                        } else {
                          _selectedActivities.add(act);
                        }
                      });
                    },
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 180),
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
                      decoration: BoxDecoration(
                        color: isChosen ? AppTheme.vibrantTeal : AppTheme.pureWhite,
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: isChosen ? AppTheme.vibrantTeal : AppTheme.softBorder,
                          width: 1.5,
                        ),
                        boxShadow: [
                          BoxShadow(
                            color: (isChosen ? AppTheme.vibrantTeal : AppTheme.darkPine)
                                .withOpacity(isChosen ? 0.25 : 0.04),
                            blurRadius: 8,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          if (isChosen) ...[
                            const Icon(
                              Icons.check_rounded,
                              size: 14,
                              color: AppTheme.pureWhite,
                            ),
                            const SizedBox(width: 6),
                          ],
                          Text(
                            act,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: isChosen ? FontWeight.w800 : FontWeight.w600,
                              color: isChosen ? AppTheme.pureWhite : AppTheme.darkPine,
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 26),

              // Budget Range Slider (Sunset Gold / Orange Gradient track)
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Budget Flexibility (₹)',
                    style: TextStyle(
                      fontFamily: 'Outfit',
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.darkPine,
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      gradient: AppTheme.sunsetGradient,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      '₹${_budgetRange.start.toInt()} – ₹${_budgetRange.end.toInt()}',
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w800,
                        color: AppTheme.pureWhite,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),

              Container(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: AppTheme.journeyCardDecoration(backgroundColor: AppTheme.pureWhite),
                child: Column(
                  children: [
                    SliderTheme(
                      data: SliderTheme.of(context).copyWith(
                        activeTrackColor: AppTheme.sunsetGold,
                        inactiveTrackColor: AppTheme.lightSand,
                        thumbColor: AppTheme.sunsetOrange,
                        overlayColor: AppTheme.sunsetGold.withOpacity(0.2),
                        rangeThumbShape: const RoundRangeSliderThumbShape(enabledThumbRadius: 9),
                      ),
                      child: RangeSlider(
                        values: _budgetRange,
                        min: 3000,
                        max: 25000,
                        divisions: 22,
                        onChanged: (vals) => setState(() => _budgetRange = vals),
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text('₹3,000 (Budget)', style: TextStyle(fontSize: 11, color: AppTheme.mutedSlate)),
                        Text('₹25,000 (Luxury)', style: TextStyle(fontSize: 11, color: AppTheme.mutedSlate)),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 26),

              // Travel Pace
              const Text(
                'Preferred Travel Pace',
                style: TextStyle(
                  fontFamily: 'Outfit',
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.darkPine,
                ),
              ),
              const SizedBox(height: 10),

              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: AppTheme.lightSand,
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Row(
                  children: _paceOptions.map((pace) {
                    final isSel = _selectedPace == pace;
                    return Expanded(
                      child: GestureDetector(
                        onTap: () => setState(() => _selectedPace = pace),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 180),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          decoration: BoxDecoration(
                            color: isSel ? AppTheme.pureWhite : Colors.transparent,
                            borderRadius: BorderRadius.circular(16),
                            boxShadow: isSel
                                ? [
                                    BoxShadow(
                                      color: AppTheme.darkPine.withOpacity(0.08),
                                      blurRadius: 8,
                                      offset: const Offset(0, 2),
                                    ),
                                  ]
                                : null,
                          ),
                          child: Text(
                            pace,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: isSel ? FontWeight.w800 : FontWeight.w600,
                              color: isSel ? AppTheme.darkPine : AppTheme.mutedSlate,
                            ),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ),
              const SizedBox(height: 26),

              // Stay Preference
              const Text(
                'Accommodation Vibe',
                style: TextStyle(
                  fontFamily: 'Outfit',
                  fontSize: 16,
                  fontWeight: FontWeight.w800,
                  color: AppTheme.darkPine,
                ),
              ),
              const SizedBox(height: 10),

              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                childAspectRatio: 2.6,
                crossAxisSpacing: 10,
                mainAxisSpacing: 10,
                children: _stayOptions.map((stay) {
                  final isSel = _selectedStay == stay;
                  return GestureDetector(
                    onTap: () => setState(() => _selectedStay = stay),
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 14),
                      decoration: BoxDecoration(
                        color: isSel ? AppTheme.pureWhite : AppTheme.lightSand,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSel ? AppTheme.vibrantTeal : AppTheme.pureWhite,
                          width: 1.8,
                        ),
                        boxShadow: isSel
                            ? [
                                BoxShadow(
                                  color: AppTheme.vibrantTeal.withOpacity(0.2),
                                  blurRadius: 10,
                                  offset: const Offset(0, 3),
                                ),
                              ]
                            : null,
                      ),
                      child: Row(
                        children: [
                          Icon(
                            isSel ? Icons.radio_button_checked_rounded : Icons.radio_button_off_rounded,
                            size: 16,
                            color: isSel ? AppTheme.vibrantTeal : AppTheme.mutedSlate,
                          ),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              stay,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: isSel ? FontWeight.w800 : FontWeight.w600,
                                color: isSel ? AppTheme.darkPine : AppTheme.mutedSlate,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 32),

              // Save & Lock-In Preferences Button
              CustomButton(
                label: _isSaving ? 'Submitting to AI Engine...' : 'Lock In My Preferences',
                icon: Icons.auto_awesome_rounded,
                variant: ButtonVariant.primary,
                isLoading: _isSaving,
                isPill: true,
                onPressed: () async {
                  setState(() => _isSaving = true);
                  await Future.delayed(const Duration(milliseconds: 700));
                  if (mounted) {
                    setState(() => _isSaving = false);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Preferences locked in! Harmonizing with group...'),
                        backgroundColor: AppTheme.vibrantTeal,
                      ),
                    );
                    Navigator.of(context).pushReplacement(
                      MaterialPageRoute(
                        builder: (_) => const MainItineraryScreen(),
                      ),
                    );
                  }
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
