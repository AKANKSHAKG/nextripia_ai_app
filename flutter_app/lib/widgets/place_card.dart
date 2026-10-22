import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/place.dart';
import 'cached_image_placeholder.dart';

class PlaceCard extends StatelessWidget {
  final PlaceModel place;
  final VoidCallback onTap;
  final VoidCallback? onAddDestination;
  final bool isSelected;

  const PlaceCard({
    super.key,
    required this.place,
    required this.onTap,
    this.onAddDestination,
    this.isSelected = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.pureWhite,
        borderRadius: BorderRadius.circular(AppTheme.cardRadius),
        border: Border.all(
          color: isSelected ? AppTheme.vibrantTeal : AppTheme.pureWhite,
          width: isSelected ? 2.5 : 1.5,
        ),
        boxShadow: [
          BoxShadow(
            color: isSelected
                ? AppTheme.vibrantTeal.withOpacity(0.2)
                : AppTheme.darkPine.withOpacity(0.07),
            blurRadius: isSelected ? 16 : 12,
            offset: const Offset(0, 4),
          ),
        ],
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
                // Top Image with Rating and Tag
                Stack(
                  children: [
                    SageCachedImage(
                      imageUrl: place.imageUrl,
                      height: 145,
                      width: double.infinity,
                      fit: BoxFit.cover,
                      borderRadius: BorderRadius.circular(14),
                    ),
                    // Rating Pill (Sunset Gold)
                    Positioned(
                      top: 10,
                      left: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.pureWhite.withOpacity(0.95),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: AppTheme.pureWhite, width: 1),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.darkPine.withOpacity(0.1),
                              blurRadius: 6,
                            ),
                          ],
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(
                              Icons.star_rounded,
                              size: 14,
                              color: AppTheme.sunsetGold,
                            ),
                            const SizedBox(width: 3),
                            Text(
                              place.rating.toStringAsFixed(1),
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
                    // Category Pill (Vibrant Teal)
                    Positioned(
                      top: 10,
                      right: 10,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppTheme.vibrantTeal,
                          borderRadius: BorderRadius.circular(16),
                          boxShadow: [
                            BoxShadow(
                              color: AppTheme.vibrantTeal.withOpacity(0.35),
                              blurRadius: 6,
                            ),
                          ],
                        ),
                        child: Text(
                          place.category,
                          style: const TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.pureWhite,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),

                // Title and Location
                Text(
                  place.name,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontFamily: 'Outfit',
                    fontSize: 16,
                    fontWeight: FontWeight.w800,
                    color: AppTheme.darkPine,
                  ),
                ),
                const SizedBox(height: 3),
                Text(
                  place.region,
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppTheme.mutedSlate,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                const SizedBox(height: 8),

                // Description
                Text(
                  place.description,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppTheme.darkPine,
                    height: 1.35,
                  ),
                ),
                const SizedBox(height: 12),

                // Bottom: Price & Add Button
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Estimated Cost',
                          style: TextStyle(
                            fontSize: 10,
                            color: AppTheme.mutedSlate,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        Text(
                          place.estimatedCost,
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.vibrantTeal,
                          ),
                        ),
                      ],
                    ),
                    if (onAddDestination != null)
                      Container(
                        height: 36,
                        decoration: BoxDecoration(
                          gradient: isSelected ? null : AppTheme.primaryGradient,
                          color: isSelected ? AppTheme.darkPine : null,
                          borderRadius: BorderRadius.circular(18),
                          boxShadow: [
                            BoxShadow(
                              color: (isSelected ? AppTheme.darkPine : AppTheme.skyCyan)
                                  .withOpacity(0.3),
                              blurRadius: 8,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Material(
                          color: Colors.transparent,
                          child: InkWell(
                            borderRadius: BorderRadius.circular(18),
                            onTap: onAddDestination,
                            child: Padding(
                              padding: const EdgeInsets.symmetric(horizontal: 14),
                              child: Center(
                                child: Text(
                                  isSelected ? '✓ Added' : '+ Add',
                                  style: const TextStyle(
                                    fontSize: 12,
                                    fontWeight: FontWeight.w800,
                                    color: AppTheme.pureWhite,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
