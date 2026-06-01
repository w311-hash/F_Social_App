import 'dart:convert';
import 'package:http/http.dart' as http;
import '../api/api_config.dart';
import '../services/storage_service.dart';
import '../models/feed_post.dart';

class FeedApi {
  static final String baseUrl = "${ApiConfig.apiBaseUrl}/feed";

  static Future<List<FeedPost>> getFeed() async {
    final token = await StorageService.getToken();

    final res = await http.get(
      Uri.parse(baseUrl),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
    );

    if (res.statusCode == 200) {
      final List data = jsonDecode(res.body);
      return data.map((e) => FeedPost.fromJson(e)).toList();
    }

    return [];
  }
}
