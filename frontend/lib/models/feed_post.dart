class FeedPost {
  final String id;
  final String userName;
  final String? userPhoto;
  final String? photo;
  final String? caption;
  final String? species;
  final double? weight;
  final String? location;
  final DateTime createdAt;

  FeedPost({
    required this.id,
    required this.userName,
    this.userPhoto,
    this.photo,
    this.caption,
    this.species,
    this.weight,
    this.location,
    required this.createdAt,
  });

  factory FeedPost.fromJson(Map<String, dynamic> json) {
    final user = json['user'] as Map<String, dynamic>? ?? {};
    final createdAt = json['createdAt'] != null
        ? DateTime.parse(json['createdAt'])
        : DateTime.now();

    return FeedPost(
      id: json['_id'],
      userName: user['name'] ?? user['username'] ?? 'Angler',
      userPhoto: user['photo'] ?? user['profilePic'],
      photo: json['photo'],
      caption: json['caption'] ?? json['notes'] ?? '',
      species: json['species'],
      weight: (json['weight'] != null) ? (json['weight'] as num).toDouble() : null,
      location: json['location'],
      createdAt: createdAt,
    );
  }
}
