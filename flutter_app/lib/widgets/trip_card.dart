import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../config/theme.dart';
import '../models/trip.dart';
import 'cached_image_placeholder.dart';

class TripCard extends StatelessWidget {
  final TripModel trip;
  final VoidCallback onTap;

  const TripCard({
    super.key,
    required this.trip,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM d');
    final dateRange = '${dateFormat.format(trip.startDate)} – ${dateFormat.format(trip.endDate)}';

    return Container(
      decoration: AppTheme.journeyCardDecoration(
        backgroundColor: AppTheme.pureWhite,
        radius: AppTheme.cardRadius,
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          borderRadius: BorderRadius.circular(AppTheme.cardRadius),
          onTap: onTap,
          child: Padding(
            padding: const EdgeInsets.all(AppTheme.cardPadding),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Top Cover Image & Harmony Badge
                Stack(
                  children: [
                    SageCachedImage(
                      imageUrl: trip.coverImageUrl,
                      height: 145,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    // Harmony Score Pill (Vibrant Teal & Cyan)
                    Positioned(
                      top: 10,
                      right: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: AppTheme.pureWhite.withOpacity(0.95),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(color: AppTheme.pureWhite, width: 1.2),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.skyCyan.withOpacity(0.2),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(
                              Icons.auto_awesome_rounded,
                              size: 13,
                              color: AppTheme.vibrantTeal,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              '${trip.groupHarmonyScore.toInt()}% Harmony',
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.darkPine,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Invitation Code Badge (Sunset Gold Highlight)
                    Positioned(
                      bottom: 10,
                      left: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          gradient: AppTheme.sunsetGradient,
                          borderRadius: BorderRadius.circular(20),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.sunsetGold.withOpacity(0.4),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Text(
                          trip.invitationCode,
                          style: const TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.pureWhite,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Trip Title & Destination
                Text(
                  trip.title,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 17,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.darkPine,
                  ),
                ),
                const SizedBox(height: 4),
                Row(
                  children: [
                    const Icon(
                      Icons.location_on_rounded,
                      size: 15,
                      color: AppTheme.vibrantTeal,
                    ),
                    const SizedBox(width: 4),
                    Expanded(
                      child: Text(
                        trip.destination,
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppTheme.mutedSlate,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Footer: Dates & Members in Light Sand container
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
                  decoration: BoxDecoration(
                    color: AppTheme.lightSand,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: AppTheme.pureWhite, width: 1),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          const Icon(
                            Icons.calendar_today_rounded,
                            size: 13,
                            color: AppTheme.vibrantTeal,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            dateRange,
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              color: AppTheme.darkPine,
                            ),
                          ),
                        ],
                      ),
                      Row(
                        children: [
                          const Icon(
                            Icons.group_rounded,
                            size: 15,
                            color: AppTheme.vibrantTeal,
                          ),
                          const SizedBox(width: 4),
                          Text(
                            '${trip.memberCount} members',
                            style: const TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
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
          ),
        ),
      ),
    );
  }
}
