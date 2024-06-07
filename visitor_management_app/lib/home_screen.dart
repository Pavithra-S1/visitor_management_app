import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'returning_visitor_screen.dart';
import 'phone_number_screen.dart';
import 'visitor_info_screen.dart';
import 'otp_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Phone Number Verification',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.grey,
        title: Row(
          children: [
            Container(
              width: 50,
              height: 50,
              child: Transform.scale(
                scale: 0.9,
                child: Image.asset('assets/LOGO_Refex.png'),
              ),
            ),
            SizedBox(width: 10),
            Text('Welcome to Refex'),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: TextField(
                decoration: InputDecoration(
                  hintText: 'I have an appointment',
                  suffixIcon: IconButton(
                    icon: Icon(Icons.arrow_forward),
                    onPressed: () {
                      // Define your appointment logic here
                    },
                  ),
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        // Navigate to ReturningVisitorScreen when button is pressed
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ReturningVisitorScreen(),
                          ),
                        );
                      },
                      icon: Icon(Icons.person),
                      label: Text('I am a returning\nvisitor here'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey,
                        textStyle: TextStyle(fontSize: 14),
                        minimumSize: Size(double.infinity, 60),
                      ),
                    ),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: () {
                        // Navigate to PhoneNumberScreen when button is pressed
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => PhoneNumberScreen(),
                          ),
                        );
                      },
                      icon: Icon(Icons.person_add),
                      label: Text('I am a new visitor\nwithout an appointment'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.grey,
                        textStyle: TextStyle(fontSize: 14),
                        minimumSize: Size(double.infinity, 60),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: ElevatedButton.icon(
                onPressed: () {
                  // Define checkout logic here
                },
                icon: Icon(Icons.exit_to_app),
                label: Text('I wish to checkout'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.orange,
                  textStyle: TextStyle(fontSize: 18),
                  minimumSize: Size(double.infinity, 60),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

