import 'package:flutter/material.dart';

class VisitorInfoScreen extends StatelessWidget {
  final Map<String, dynamic> visitorData;

  VisitorInfoScreen({required this.visitorData});

  @override
  Widget build(BuildContext context) {
    // Build UI to display visitor information
    return Scaffold(
      appBar: AppBar(
        title: Text('Visitor Information'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Name: ${visitorData['name']}'),
            Text('Phone: ${visitorData['phone']}'),
            // Display other visitor information as needed
          ],
        ),
      ),
    );
  }
}
