import 'package:socket_io_client/socket_io_client.dart' as io;
import '../api/api_config.dart';

class SocketService {
  static final SocketService _instance = SocketService._internal();
  factory SocketService() => _instance;
  SocketService._internal();

  io.Socket? socket;
  bool get isConnected => socket?.connected ?? false;

  void connect(String userId) {
    if (socket?.connected == true) return;

    socket = io.io(
      ApiConfig.socketUrl,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .enableForceNew()
          .disableAutoConnect()
          .build(),
    );

    final currentSocket = socket!;
    currentSocket.onConnect((_) {
      currentSocket.emit('register', userId);
      // ignore: avoid_print
      print('Socket connected for user $userId');
    });

    currentSocket.connect();
  }

  void disconnect() {
    if (socket?.connected == true) {
      socket?.disconnect();
    }
  }
}
