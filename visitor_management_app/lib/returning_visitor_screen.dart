import 'package:flutter/material.dart';
import 'phone_number_screen.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'visitor_info_screen.dart';


class ReturningVisitorScreen extends StatefulWidget {
  @override
  _ReturningVisitorScreenState createState() => _ReturningVisitorScreenState();
}

class _ReturningVisitorScreenState extends State<ReturningVisitorScreen> {
  TextEditingController _mobileController = TextEditingController();
  bool _isLoading = false;
  late Map<String, dynamic> _visitorData; // Mark as late

  @override
  void initState() {
    super.initState();
    _visitorData = {}; // Initialize _visitorData here
  }

  Future<void> _fetchVisitorData(String phone) async {
    setState(() {
      _isLoading = true;
    });
    try {
      final response = await http.get(
        Uri.parse('http://10.5.4.105:3001/api/visitors_master/phone/$phone'),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        setState(() {
          _visitorData = data['results'][0];
          _isLoading = false;
        });
        // Navigate to new page or display data
        if (_visitorData.isNotEmpty) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => VisitorInfoScreen(visitorData: _visitorData),
            ),
          );
        }
      } else {
        // Handle error
        setState(() {
          _isLoading = false;
        });
        print('Failed to fetch visitor data');
      }
    } catch (error) {
      // Handle error
      setState(() {
        _isLoading = false;
      });
      print('Error: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Returning Visitor'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: _isLoading
              ? CircularProgressIndicator()
              : Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    TextField(
                      controller: _mobileController,
                      decoration: InputDecoration(
                        hintText: 'Enter Registered Mobile Number',
                        border: OutlineInputBorder(),
                      ),
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () {
                        String phone = _mobileController.text;
                        _fetchVisitorData(phone);
                      },
                      child: Text('Proceed'),
                    ),
                  ],
                ),
        ),
      ),
    );
  }
}

