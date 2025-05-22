# BharatGPT

---

<div align="center">

![BharatGPT Banner](./assets/banner.png)  
*An AI chatbot designed for Indian languages and cultural contexts*

**An AI chatbot powered by the Gemini API, designed to deliver natural and contextual conversations with support for Indian languages and use cases.**

</div>

---

## 🚀 Features

- **Text Generation**: Powered by Google's Gemini API for high-quality responses
- **Context-Aware**: Maintains conversation context for natural interactions
- **Multi-Language Support**: Supports multiple Indian languages (Hindi, Tamil, Telugu, Bengali, and more)
- **Cultural Context**: Understands Indian cultural nuances and references
- **Easy Integration**: Simple backend API for frontend applications
- **Open Source**: Fully extensible and customizable

---

## 🛠 Tech Stack

- **Backend**: Python (Flask/FastAPI)
- **AI Service**: Google Gemini API
- **Database**: Optional (MongoDB/PostgreSQL for chat history)
- **Environment Management**: python-dotenv
- **API Documentation**: Swagger/OpenAPI (optional)

---

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Frontend      │◄──►│   BharatGPT     │◄──►│   Gemini API    │
│   Application   │    │   Backend       │    │                 │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │                 │
                       │   Database      │
                       │   (Optional)    │
                       │                 │
                       └─────────────────┘
```

---

## 📋 Prerequisites

- Python 3.8 or higher
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))
- Git

---

## ⚡ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rajvishwakarma1/BharatGPT.git
cd BharatGPT
```

### 2. Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
Create a `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
DEBUG=True
```

### 5. Run the Application
```bash
python app.py
```

The server will start at `http://localhost:5000`

---

## 🎥 Demo Video

<div align="center">

### Watch BharatGPT in Action

[![BharatGPT Demo Video](./assets/video-thumbnail.png)](https://youtu.be/your-video-id)

*Click the image above to watch a full demonstration of BharatGPT's capabilities*

**🎬 What's covered in the demo:**
- Setting up BharatGPT locally
- Multi-language conversation examples
- API integration walkthrough
- Real-time chat demonstrations in Hindi, English, and other Indian languages
- Cultural context understanding showcase

**📺 Alternative Demo Links:**
- [YouTube Demo](https://youtu.be/your-video-id) - Full feature walkthrough
- [Loom Quick Demo](https://loom.com/your-demo-link) - 3-minute overview
- [Live Demo Site](https://bharatgpt-demo.vercel.app) - Try it yourself!

</div>

---

## 🎯 API Usage

### Basic Chat Endpoint
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "नमस्ते! आप कैसे हैं?",
    "language": "hi"
  }'
```

### Python Example
```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

# BharatGPT API endpoint
API_URL = "http://localhost:5000/api/chat"

def chat_with_bharatgpt(message, language="en"):
    payload = {
        "message": message,
        "language": language
    }
    
    response = requests.post(API_URL, json=payload)
    
    if response.status_code == 200:
        return response.json()["response"]
    else:
        return "Error: " + response.text

# Example usage
response = chat_with_bharatgpt("भारत की राजधानी क्या है?", "hi")
print(response)
```

---

## 🌐 Supported Languages

- **Hindi** (hi)
- **English** (en)
- **Tamil** (ta)
- **Telugu** (te)
- **Bengali** (bn)
- **Marathi** (mr)
- **Gujarati** (gu)
- **Kannada** (kn)
- **Malayalam** (ml)
- **Punjabi** (pa)

---

## 📁 Project Structure

```
BharatGPT/
├── app.py                 # Main application file
├── requirements.txt       # Python dependencies
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
├── README.md            # Project documentation
├── assets/              # Images and media files
│   ├── banner.png
│   └── architecture.png
├── src/                 # Source code
│   ├── __init__.py
│   ├── chat_handler.py  # Chat logic
│   ├── gemini_client.py # Gemini API integration
│   └── utils.py         # Utility functions
└── tests/               # Test files
    ├── test_chat.py
    └── test_api.py
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Contribution Guidelines
- Follow PEP 8 style guidelines
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **GitHub Repository**: [https://github.com/rajvishwakarma1/BharatGPT](https://github.com/rajvishwakarma1/BharatGPT)
- **Issues**: [Report a bug or request a feature](https://github.com/rajvishwakarma1/BharatGPT/issues)
- **Discussions**: [Join the community discussion](https://github.com/rajvishwakarma1/BharatGPT/discussions)

---

## 👨‍💻 Author

**Raj Vishwakarma**
- GitHub: [@rajvishwakarma1](https://github.com/rajvishwakarma1)
- LinkedIn: [Raj Vishwakarma](https://linkedin.com/in/rajvishwakarma1)
- Email: raj.vishwakarma@example.com

---

## 🙏 Acknowledgments

- Thanks to Google for providing the Gemini API
- Inspired by the need for AI that understands Indian cultural context
- Built with ❤️ for the Indian developer community

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/rajvishwakarma1/BharatGPT?style=social)
![GitHub forks](https://img.shields.io/github/forks/rajvishwakarma1/BharatGPT?style=social)
![GitHub issues](https://img.shields.io/github/issues/rajvishwakarma1/BharatGPT)
![GitHub license](https://img.shields.io/github/license/rajvishwakarma1/BharatGPT)

---

**Powered by Google Gemini API and open-source contributions 🚀**