"""
Web3Forms Setup Instructions

Web3Forms is a free email service that's perfect for contact forms.
It's completely free with no monthly limits for basic usage.

SETUP STEPS:
1. Go to https://web3forms.com/
2. Click "Create Access Key"
3. Enter your email: muhammadaadilusmani@gmail.com
4. Click "Create Access Key"
5. Copy the access key you receive
6. Replace the demo key in the API route with your real key

FEATURES:
- ✅ Free forever
- ✅ No monthly limits
- ✅ Spam protection
- ✅ Email notifications
- ✅ Auto-responder support
- ✅ No signup required

Your access key will look like: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6"
"""

import requests
import json

def test_web3forms_integration():
    """Test the Web3Forms integration"""
    
    # Test data
    test_data = {
        "access_key": "YOUR_ACCESS_KEY_HERE",  # Replace with your actual key
        "name": "Test User",
        "email": "test@example.com", 
        "subject": "Portfolio Contact: Test Message",
        "message": "From: Test User (test@example.com)\n\nSubject: Test Message\n\nMessage:\nThis is a test message from your portfolio contact form.",
        "to": "muhammadaadilusmani@gmail.com",
        "from_name": "Portfolio Contact Form",
        "replyto": "test@example.com"
    }
    
    print("🚀 Testing Web3Forms integration...")
    print("📧 Test email will be sent to: muhammadaadilusmani@gmail.com")
    print("\n📝 Test data:")
    print(json.dumps(test_data, indent=2))
    
    try:
        response = requests.post(
            "https://api.web3forms.com/submit",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            json=test_data
        )
        
        result = response.json()
        
        if response.status_code == 200 and result.get("success"):
            print("\n✅ SUCCESS: Test email sent successfully!")
            print(f"📨 Message: {result.get('message', 'Email delivered')}")
        else:
            print(f"\n❌ ERROR: {result.get('message', 'Unknown error')}")
            
    except Exception as e:
        print(f"\n💥 EXCEPTION: {str(e)}")
        print("Make sure you have requests installed: pip install requests")

if __name__ == "__main__":
    print("=" * 60)
    print("WEB3FORMS SETUP FOR PORTFOLIO CONTACT FORM")
    print("=" * 60)
    print("\n1. Go to: https://web3forms.com/")
    print("2. Click 'Create Access Key'")
    print("3. Enter email: muhammadaadilusmani@gmail.com")
    print("4. Copy your access key")
    print("5. Replace the demo key in /app/api/contact/route.ts")
    print("\n" + "=" * 60)
    
    # Uncomment the line below to test after you get your access key
    # test_web3forms_integration()
