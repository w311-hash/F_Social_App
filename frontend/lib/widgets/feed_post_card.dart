import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../models/feed_post.dart';

class FeedPostCard extends StatelessWidget {
  final FeedPost post;

  const FeedPostCard({super.key, required this.post});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ListTile(
            leading: CircleAvatar(
              radius: 24,
              backgroundImage: post.userPhoto != null
                  ? CachedNetworkImageProvider(post.userPhoto!)
                  : null,
              child: post.userPhoto == null
                  ? const Icon(Icons.person)
                  : null,
            ),
            title: Text(post.userName),
            subtitle: Text(
              "${post.createdAt.toLocal()}".split(".")[0],
              style: const TextStyle(fontSize: 12),
            ),
          ),

          if (post.species != null || post.weight != null || post.location != null)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Wrap(
                spacing: 10,
                runSpacing: 8,
                children: [
                  if (post.species != null)
                    Chip(label: Text(post.species!)),
                  if (post.weight != null)
                    Chip(label: Text('${post.weight} lbs')),
                  if (post.location != null && post.location!.isNotEmpty)
                    Chip(label: Text(post.location!)),
                ],
              ),
            ),

          if (post.photo != null && post.photo!.isNotEmpty)
            CachedNetworkImage(
              imageUrl: post.photo!,
              placeholder: (context, url) =>
                  const SizedBox(height: 200, child: Center(child: CircularProgressIndicator())),
              errorWidget: (context, url, error) =>
                  const SizedBox(height: 200, child: Icon(Icons.broken_image, size: 48)),
              fit: BoxFit.cover,
              width: double.infinity,
            ),

          if (post.caption != null && post.caption!.isNotEmpty)
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(
                post.caption!,
                style: const TextStyle(fontSize: 16),
              ),
            ),
        ],
      ),
    );
  }
}
