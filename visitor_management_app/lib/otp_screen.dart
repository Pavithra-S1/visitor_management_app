import 'package:flutter/material.dart';

class OtpScreen extends StatelessWidget {
  final String phoneNumber;

  OtpScreen({required this.phoneNumber});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Enter OTP'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Enter the 6-digit OTP sent to $phoneNumber',
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 16.0),
            TextField(
              keyboardType: TextInputType.number,
              maxLength: 6, // Limiting to 6 digits
              decoration: InputDecoration(labelText: 'Enter OTP'),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Add logic to verify OTP
              },
              child: Text('Verify OTP'),
            ),
          ],
        ),
      ),
    );
  }
}
