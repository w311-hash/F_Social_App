import 'package:flutter/material.dart';
import '../../api/feed_api.dart';
import '../../models/feed_post.dart';
import '../../widgets/feed_post_card.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  bool loading = true;
  List<FeedPost> posts = [];

  @override
  void initState() {
    super.initState();
    loadFeed();
  }

  Future<void> loadFeed() async {
    final data = await FeedApi.getFeed();
    setState(() {
      posts = data;
      loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Feed")),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : posts.isEmpty
              ? const Center(child: Text("No posts yet"))
              : RefreshIndicator(
                  onRefresh: loadFeed,
                  child: ListView.builder(
                    itemCount: posts.length,
                    itemBuilder: (context, i) {
                      return FeedPostCard(post: posts[i]);
                    },
                  ),
                ),
    );
  }
}
