import 'dart:convert';
import 'package:http/http.dart' as http;
import '../api/api_config.dart';
import '../services/storage_service.dart';
import '../models/user.dart';

class ProfileApi {
  static final String baseUrl = "${ApiConfig.apiBaseUrl}/users";

  static Future<UserModel?> getProfile() async {
    final token = await StorageService.getToken();

    final res = await http.get(
      Uri.parse("$baseUrl/me"),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $token",
      },
    );

    if (res.statusCode == 200) {
      final data = jsonDecode(res.body);
      return UserModel.fromJson(data);
    }

    return null;
  }
}
