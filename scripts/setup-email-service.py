"""
Setup instructions for free email services for your portfolio contact form.

Option 1: Formspree (Recommended)
1. Go to https://formspree.io/
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint URL
5. Replace 'YOUR_FORM_ID' in the API route with your actual form ID

Option 2: EmailJS
1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month)
3. Create an email service (Gmail, Outlook, etc.)
4. Create an email template
5. Get your service ID, template ID, and public key
6. Use the EmailJS SDK in your frontend

Option 3: Web3Forms
1. Go to https://web3forms.com/
2. Sign up for a free account
3. Create a new form
4. Get your access key
5. Replace 'YOUR_ACCESS_KEY_HERE' in the contact form

For immediate testing, I recommend Formspree as it's the easiest to set up.
"""

import requests
import json

def test_formspree_setup():
    """
    Test function to verify Formspree integration
    """
    # This is a test endpoint - replace with your actual Formspree endpoint
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "subject": "Test Subject",
        "message": "This is a test message from your portfolio contact form."
    }
    
    print("Testing email service setup...")
    print("Please set up your Formspree account and replace the form ID in the API route.")
    print("Test data that will be sent:")
    print(json.dumps(test_data, indent=2))

if __name__ == "__main__":
    test_formspree_setup()
