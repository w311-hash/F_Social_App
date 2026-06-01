import 'dart:convert';
import 'package:http/http.dart' as http;
import '../api/api_config.dart';
import '../services/storage_service.dart';
import '../models/user.dart';

class AuthApi {
  static final String baseUrl = "${ApiConfig.apiBaseUrl}/auth";

  static Future<UserModel?> login(String email, String password) async {
    final res = await http.post(
      Uri.parse("$baseUrl/login"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({"email": email, "password": password}),
    );

    if (res.statusCode == 200) {
      final data = jsonDecode(res.body);
      await StorageService.saveToken(data['token']);
      return UserModel.fromJson(data['user']);
    }

    return null;
  }

  static Future<UserModel?> register(String name, String email, String password) async {
    final res = await http.post(
      Uri.parse("$baseUrl/register"),
      headers: {"Content-Type": "application/json"},
      body: jsonEncode({
        "username": name,
        "email": email,
        "password": password,
      }),
    );

    if (res.statusCode == 201 || res.statusCode == 200) {
      final data = jsonDecode(res.body);
      await StorageService.saveToken(data['token']);
      return UserModel.fromJson(data['user']);
    }

    return null;
  }
}
