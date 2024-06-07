import 'package:flutter/material.dart';
import 'otp_screen.dart';

class PhoneNumberScreen extends StatefulWidget {
  @override
  _PhoneNumberScreenState createState() => _PhoneNumberScreenState();
}

class _PhoneNumberScreenState extends State<PhoneNumberScreen> {
  TextEditingController _phoneNumberController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Enter Phone Number'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              keyboardType: TextInputType.phone,
              maxLength: 10, // Limiting to 10 digits
              controller: _phoneNumberController,
              decoration: InputDecoration(labelText: 'Enter Phone Number'),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                String phoneNumber = _phoneNumberController.text;
                if (phoneNumber.length == 10) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => OtpScreen(phoneNumber: phoneNumber),
                    ),
                  );
                } else {
                  // Show error message if phone number is not 10 digits
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Please enter a valid 10-digit phone number'),
                    ),
                  );
                }
              },
              child: Text('Generate OTP'),
            ),
          ],
        ),
      ),
    );
  }
}

