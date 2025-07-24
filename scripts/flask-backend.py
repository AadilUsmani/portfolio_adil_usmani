from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Email configuration
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_ADDRESS = "muhammadaadilusmani@gmail.com"
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD')  # Set this in your environment

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        
        # Extract form data
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')
        
        # Validate required fields
        if not all([name, email, subject, message]):
            return jsonify({'error': 'All fields are required'}), 400
        
        # Create email message
        msg = MIMEMultipart()
        msg['From'] = EMAIL_ADDRESS
        msg['To'] = EMAIL_ADDRESS
        msg['Subject'] = f"Portfolio Contact: {subject}"
        
        # Email body
        body = f"""
        New contact form submission from portfolio website:
        
        Name: {name}
        Email: {email}
        Subject: {subject}
        
        Message:
        {message}
        
        Sent at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Send email
        if EMAIL_PASSWORD:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            text = msg.as_string()
            server.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, text)
            server.quit()
            
            return jsonify({'message': 'Email sent successfully'}), 200
        else:
            # For development - just log the message
            print(f"Contact form submission: {body}")
            return jsonify({'message': 'Message received (development mode)'}), 200
            
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'error': 'Failed to send message'}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """API endpoint to get project data"""
    projects = [
        {
            "id": 1,
            "title": "Article Summarization",
            "description": "Built an NLP model using transformer architecture to automatically generate concise summaries of long-form articles with 85% accuracy using T5 small.",
            "tags": ["NLP", "Transformers", "Python", "T5"],
            "github": "https://github.com/AadilUsmani/article-summarization",
            "demo": "https://v0-news-article-summarizer-gamma.vercel.app/",
            "technologies": ["Python", "Transformers", "Flask", "React"]
        },
        {
            "id": 2,
            "title": "Customer Churn Predictor",
            "description": "Developed a machine learning model to predict customer churn with 92% accuracy using ensemble methods and feature engineering.",
            "tags": ["Supervised Learning", "Random Forest", "Feature Engineering", "Python"],
            "github": "https://github.com/AadilUsmani/churn-predictor",
            "demo": "https://churn-predictor-aadil.vercel.app",
            "technologies": ["Python", "scikit-learn", "Pandas", "Flask"]
        },
        {
            "id": 3,
            "title": "Stock Price Prediction",
            "description": "Implemented LSTM neural networks to predict stock prices using historical data and technical indicators with time series analysis.",
            "tags": ["Deep Learning", "LSTM", "Time Series", "TensorFlow"],
            "github": "https://github.com/AadilUsmani/stock-prediction",
            "demo": "https://v0-nvidia-stock-dashboard.vercel.app/",
            "technologies": ["Python", "TensorFlow", "LSTM", "Flask"]
        }
    ]
    
    return jsonify(projects)

@app.route('/api/skills', methods=['GET'])
def get_skills():
    """API endpoint to get skills data"""
    skills = {
        "Programming Languages": ["Python", "JavaScript", "SQL"],
        "ML/AI Tools": ["scikit-learn", "TensorFlow", "Pandas", "NumPy", "sklearn"],
        "Data Visualization": ["Matplotlib", "Plotly"],
        "Web Development": ["Flask", "React", "HTML/CSS", "REST APIs"]
    }
    
    return jsonify(skills)

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    # Set environment variables for development
    os.environ.setdefault('FLASK_ENV', 'development')
    
    print("Starting Flask backend server...")
    print("Available endpoints:")
    print("- POST /api/contact - Contact form submission")
    print("- GET /api/projects - Get projects data")
    print("- GET /api/skills - Get skills data")
    print("- GET /health - Health check")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
