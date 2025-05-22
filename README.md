# BharatGPT

---

<div align="center">

![BharatGPT Banner](./assets/banner.png)  
*Simplifying Indian Government Schemes for Every Citizen*

**BharatGPT helps Indian citizens easily understand government schemes, policies, and benefits in their native language. Get clear, simplified explanations of complex government documents and eligibility criteria.**

</div>

---

## 🚀 Features

- **Government Scheme Explanations**: Get simplified explanations of complex government schemes like PM-KISAN, Ayushman Bharat, MGNREGA, and more
- **Multi-Language Support**: Available in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, and other Indian languages
- **Eligibility Checker**: Understand if you qualify for specific government benefits and schemes
- **Document Requirements**: Get clear lists of required documents for applications
- **Application Process**: Step-by-step guidance on how to apply for government schemes
- **Local Context**: Information tailored to specific states and regions
- **Real-time Updates**: Access to latest scheme announcements and policy changes
- **Simplified Language**: Complex government jargon translated into easy-to-understand terms

---

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **AI Service**: Google Gemini API (@google/generative-ai)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **Linting**: ESLint

---

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   Citizen       │◄──►│   BharatGPT     │◄──►│   Gemini API    │
│   (User)        │    │   (Scheme Info) │    │   (AI Engine)   │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│  Native Lang.   │    │  Govt. Schemes  │    │  Smart Responses│
│  Questions      │    │  Database       │    │  Processing     │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))
- Git

---

## ⚡ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/rajvishwakarma1/BharatGPT.git
cd BharatGPT
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root and add your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 🎥 Demo Video

### Watch BharatGPT in Action

[![BharatGPT Demo Video](https://img.youtube.com/vi/6YDia3aXHXo/maxresdefault.jpg)](https://youtu.be/6YDia3aXHXo)

*Click the image above to watch a full demonstration of BharatGPT's capabilities*

**🎬 What's covered in the demo:**
- How to ask about government schemes in your native language
- Live examples of scheme explanations (PM-KISAN, Ayushman Bharat, etc.)
- Eligibility checking for various government programs
- Document requirement lists for applications
- Step-by-step application processes
- Multi-language support demonstration

**📺 Alternative Demo Links:**
- [YouTube Demo](https://youtu.be/6YDia3aXHXo) - Full feature walkthrough
- [Live Demo Site](https://rajvishwakarma1.github.io/BharatGPT) - Try it yourself!

---

## 🎯 Usage

### Live Demo
Try BharatGPT live at: [https://rajvishwakarma1.github.io/BharatGPT](https://rajvishwakarma1.github.io/BharatGPT)

### Example Queries You Can Ask:

**In Hindi:**
- "PM-KISAN योजना के लिए कौन पात्र है?"
- "आयुष्मान भारत में क्या कवर होता है?"
- "MGNREGA के तहत कितना मजदूरी मिलता है?"

**In English:**
- "What documents do I need for Pradhan Mantri Awas Yojana?"
- "How to apply for Sukanya Samriddhi Yojana?"
- "What are the benefits of Jan Dhan Yojana?"

**In Tamil:**
- "முख்यமந்திரி காப்பீட்டு திட்டத்தின் நன்மைகள் என்ன?"
- "கல்வி கடன் திட்டத்திற்கு எப்படி விண்ணப்பிப்பது?"

### Integration Example
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY!);

async function getSchemeInfo(query: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `As BharatGPT, explain this Indian government scheme query in simple terms: ${query}. 
  Include eligibility, benefits, required documents, and application process.`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

// Example usage
const info = await getSchemeInfo("PM-KISAN योजना क्या है?");
console.log(info);
```

---

## 🌐 Supported Languages & Government Schemes

### Languages Supported:
- **Hindi** (हिंदी) - Primary language for most schemes
- **English** - Official documentation language
- **Tamil** (தமிழ்) - Tamil Nadu specific schemes
- **Telugu** (తెలుగు) - Andhra Pradesh & Telangana schemes
- **Bengali** (বাংলা) - West Bengal specific programs
- **Marathi** (मराठी) - Maharashtra state schemes
- **Gujarati** (ગુજરાતી) - Gujarat government programs
- **Kannada** (ಕನ್ನಡ) - Karnataka state benefits
- **Malayalam** (മലയാളം) - Kerala government schemes
- **Punjabi** (ਪੰਜਾਬੀ) - Punjab state programs

### Popular Government Schemes Covered:
- **PM-KISAN** - Direct cash transfer for farmers
- **Ayushman Bharat** - Healthcare insurance scheme
- **MGNREGA** - Rural employment guarantee
- **PM Awas Yojana** - Housing for all mission
- **Jan Dhan Yojana** - Financial inclusion program
- **Sukanya Samriddhi** - Girl child savings scheme
- **Pradhan Mantri Mudra Yojana** - Micro finance scheme
- **Atal Pension Yojana** - Pension scheme for workers
- **PM Fasal Bima Yojana** - Crop insurance scheme
- **Swachh Bharat Mission** - Clean India initiative

---

## 📁 Project Structure

```
BharatGPT/
├── public/              # Static assets
├── src/                 # Source code
│   ├── components/      # React components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main App component
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── .env                # Environment variables
├── package.json        # Node.js dependencies
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── vite.config.ts      # Vite configuration
└── README.md           # Project documentation
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
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
5. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**

### Contribution Guidelines
- Follow React and TypeScript best practices
- Use Tailwind CSS for styling
- Add proper TypeScript types
- Test your changes locally before submitting
- Ensure all linting passes: `npm run lint`

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
- Inspired by the need to bridge the information gap between government schemes and citizens
- Dedicated to making government benefits accessible to every Indian citizen
- Built with ❤️ to empower rural and urban communities with knowledge

---

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/rajvishwakarma1/BharatGPT?style=social)
![GitHub forks](https://img.shields.io/github/forks/rajvishwakarma1/BharatGPT?style=social)
![GitHub issues](https://img.shields.io/github/issues/rajvishwakarma1/BharatGPT)
![GitHub license](https://img.shields.io/github/license/rajvishwakarma1/BharatGPT)

---

**Powered by Google Gemini API and open-source contributions 🚀**