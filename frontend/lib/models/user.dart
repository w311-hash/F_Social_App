class UserModel {
  final String id;
  final String name;
  final String email;
  final String? photo;
  final List<String> badges;
  final Map<String, int> speciesStats;

  UserModel({
    required this.id,
    required this.name,
    required this.email,
    this.photo,
    required this.badges,
    required this.speciesStats,
  });

  factory UserModel.fromJson(Map<String, dynamic> json) {
    final badgesData = json['badges'] as List<dynamic>?;
    final speciesData = json['speciesStats'];

    return UserModel(
      id: json['_id'],
      name: json['name'] ?? json['username'] ?? 'Angler',
      email: json['email'] ?? '',
      photo: json['photo'] ?? json['profilePic'] ?? json['avatar'],
      badges: badgesData != null
          ? badgesData.map((item) => item['name']?.toString() ?? item.toString()).toList()
          : [],
      speciesStats: speciesData != null
          ? Map<String, int>.from(Map<String, dynamic>.from(speciesData))
          : {},
    );
  }
}

