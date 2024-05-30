import 'package:flutter/material.dart';
import 'login_screen.dart';

void main() {
  runApp(VisitorManagementApp());
}

class VisitorManagementApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Visitor Management',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: LoginScreen(),
    );
  }
}
