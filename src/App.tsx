import React, { useState, FormEvent } from 'react';
import { Send, Sparkles, Info, Users, Gift, FileText, Calendar, MinusCircle, PlusCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

function App() {
  const [input, setInput] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', content: string }>>([
    { 
      type: 'bot', 
      content: 'नमस्ते! मैं BharatGPT हूँ। मुझसे भारत सरकार की किसी भी योजना के बारे में पूछें। आप हिंदी या अंग्रेजी में पूछ सकते हैं।\n\nHello! I am BharatGPT. Ask me about any Indian government scheme. You can ask in Hindi or English.' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const adjustFontSize = (increment: boolean) => {
    setFontSize(prev => {
      const newSize = increment ? prev + 2 : prev - 2;
      return Math.min(Math.max(newSize, 12), 24);
    });
  };

  const generatePrompt = (query: string) => {
    return `You are BharatGPT, an AI assistant designed to explain Indian government schemes in simple and friendly language.

Answer the following question about Indian government schemes in the same language as the query (Hindi or English).

If the query mentions multiple schemes or requires comparison, present the information in a clear tabular format using markdown tables.

When listing groups or categories, always use a proper list format with bullet points or numbers.

Structure your answer as follows:
1. ✅ What is the scheme?
2. 👥 Who is eligible?
3. 🎁 What are the main benefits?
4. 📝 How to apply?
5. 📅 Important dates (if applicable)

Keep your tone friendly and avoid complex jargon. If exact information isn't available, suggest checking official government websites.

User question: ${query}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    setInput('');

    setMessages(prev => [...prev, { type: 'user', content: userInput }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = generatePrompt(userInput);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { type: 'bot', content: text }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'I apologize, but I encountered an error. Please try again or check your internet connection.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    if (content.includes('|')) {
      const lines = content.split('\n');
      const tableStart = lines.findIndex(line => line.includes('|'));
      if (tableStart !== -1) {
        const tableEnd = lines.slice(tableStart).findIndex(line => !line.includes('|')) + tableStart;
        const tableLines = lines.slice(tableStart, tableEnd === tableStart - 1 ? undefined : tableEnd);
        
        if (tableLines.length > 0) {
          const table = (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden" style={{ fontSize: `${fontSize}px` }}>
                {tableLines.map((line, i) => {
                  const cells = line.split('|').filter(cell => cell.trim());
                  return (
                    <tr key={i} className={i === 0 ? 'bg-ashoka-blue text-white' : 'hover:bg-gray-50 transition-colors'}>
                      {cells.map((cell, j) => (
                        i === 0 ? 
                          <th key={j} className="border border-gray-300 px-6 py-4">{cell.trim()}</th> :
                          <td key={j} className="border border-gray-300 px-6 py-4">{cell.trim()}</td>
                      ))}
                    </tr>
                  );
                })}
              </table>
            </div>
          );
          return table;
        }
      }
    }

    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('##')) {
        return <h2 key={index} className="text-xl font-bold mt-8 mb-6 text-navy" style={{ fontSize: `${fontSize + 4}px` }}>{section.replace('##', '').trim()}</h2>;
      } else if (section.startsWith('✅')) {
        return (
          <div key={index} className="flex items-start mt-8 mb-6 bg-gradient-to-r from-saffron/10 to-white p-6 rounded-lg border-l-4 border-saffron">
            <Info className="mr-4 text-saffron flex-shrink-0 mt-1" size={24} />
            <div className="flex-1" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ 
              __html: section
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                .replace('✅', '')
            }} />
          </div>
        );
      } else if (section.startsWith('👥')) {
        return (
          <div key={index} className="flex items-start mt-8 mb-6 bg-gradient-to-r from-green-india/10 to-white p-6 rounded-lg border-l-4 border-green-india">
            <Users className="mr-4 text-green-india flex-shrink-0 mt-1" size={24} />
            <div className="flex-1" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ 
              __html: section
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-green-india">$1</strong>')
                .replace('👥', '')
            }} />
          </div>
        );
      } else if (section.startsWith('🎁')) {
        return (
          <div key={index} className="flex items-start mt-8 mb-6 bg-gradient-to-r from-navy/10 to-white p-6 rounded-lg border-l-4 border-navy">
            <Gift className="mr-4 text-navy flex-shrink-0 mt-1" size={24} />
            <div className="flex-1" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ 
              __html: section
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                .replace('🎁', '')
            }} />
          </div>
        );
      } else if (section.startsWith('📝')) {
        return (
          <div key={index} className="flex items-start mt-8 mb-6 bg-gradient-to-r from-ashoka-blue/10 to-white p-6 rounded-lg border-l-4 border-ashoka-blue">
            <FileText className="mr-4 text-ashoka-blue flex-shrink-0 mt-1" size={24} />
            <div className="flex-1" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ 
              __html: section
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-ashoka-blue">$1</strong>')
                .replace('📝', '')
            }} />
          </div>
        );
      } else if (section.startsWith('📅')) {
        return (
          <div key={index} className="flex items-start mt-8 mb-6 bg-gradient-to-r from-saffron/10 to-white p-6 rounded-lg border-l-4 border-saffron">
            <Calendar className="mr-4 text-saffron flex-shrink-0 mt-1" size={24} />
            <div className="flex-1" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ 
              __html: section
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-saffron">$1</strong>')
                .replace('📅', '')
            }} />
          </div>
        );
      } else if (section.includes('- ')) {
        const items = section.split('\n');
        return (
          <ul key={index} className="list-none pl-8 my-6 space-y-6" style={{ fontSize: `${fontSize}px` }}>
            {items.map((item, i) => (
              <li key={i} className="flex items-start text-gray-700 leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-ashoka-blue mt-2 mr-4 flex-shrink-0"></span>
                <span dangerouslySetInnerHTML={{ 
                  __html: item
                    .replace('- ', '')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                }} />
              </li>
            ))}
          </ul>
        );
      } else if (section.match(/^\d+\./)) {
        const items = section.split('\n');
        return (
          <ol key={index} className="list-none pl-8 my-6 space-y-6 counter-reset-item" style={{ fontSize: `${fontSize}px` }}>
            {items.map((item, i) => {
              const match = item.match(/^\d+\.\s(.*)/);
              return match ? (
                <li key={i} className="flex items-start text-gray-700 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-ashoka-blue text-white flex items-center justify-center mr-4 flex-shrink-0 text-sm">{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ 
                    __html: match[1].replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
                  }} />
                </li>
              ) : null;
            })}
          </ol>
        );
      } else {
        return (
          <p key={index} className="my-6 text-gray-700 leading-relaxed" style={{ fontSize: `${fontSize}px` }} dangerouslySetInnerHTML={{ 
            __html: section.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-navy">$1</strong>')
          }} />
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-saffron/5 via-white to-green-india/5 flex flex-col">
      <header className="bg-gradient-to-r from-navy to-ashoka-blue text-white p-4 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/ashoka-wheel.png')] opacity-5"></div>
        <div className="container mx-auto flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="bg-white/10 p-2 rounded-lg mr-3">
              <Sparkles className="text-saffron" size={24} />
            </div>
            <h1 className="text-2xl font-bold">BharatGPT</h1>
            <p className="ml-4 text-blue-100 hidden sm:block">सरकारी योजनाओं के बारे में जानकारी पाएँ | Get information about government schemes</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => adjustFontSize(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Decrease font size"
            >
              <MinusCircle size={20} />
            </button>
            <span className="text-sm bg-white/10 px-3 py-1 rounded">{fontSize}px</span>
            <button
              onClick={() => adjustFontSize(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              aria-label="Increase font size"
            >
              <PlusCircle size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6 flex flex-col max-w-4xl">
        <div className="flex-1 overflow-y-auto mb-6 rounded-lg space-y-8">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`${
                message.type === 'user' 
                  ? 'flex justify-end' 
                  : 'flex justify-start'
              }`}
            >
              <div className={`rounded-2xl p-6 max-w-[85%] shadow-lg ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-navy to-ashoka-blue text-white'
                  : 'bg-white border border-gray-100'
              }`}>
                {message.type === 'bot' ? (
                  <div className="prose max-w-none">{formatMessage(message.content)}</div>
                ) : (
                  <p style={{ fontSize: `${fontSize}px` }}>{message.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-navy animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-3 h-3 rounded-full bg-green-india animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-2xl shadow-lg p-2 border border-gray-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="सरकारी योजना के बारे में पूछें... | Ask about a government scheme..."
            className="flex-1 p-4 text-lg rounded-l-xl focus:outline-none"
            style={{ fontSize: `${fontSize}px` }}
          />
          <button 
            type="submit" 
            className="bg-gradient-to-r from-navy to-ashoka-blue text-white p-4 rounded-xl hover:from-ashoka-blue hover:to-navy transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy disabled:opacity-50 ml-2"
            disabled={isLoading}
          >
            <Send size={24} />
          </button>
        </form>
      </main>

      <footer className="bg-gradient-to-r from-navy to-ashoka-blue text-white text-center p-6 text-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/ashoka-wheel.png')] opacity-5"></div>
        <div className="relative z-10">
          <p>BharatGPT - सरकारी योजनाओं के बारे में जानकारी प्राप्त करें | Get information about government schemes</p>
          <p className="mt-2">© 2025 BharatGPT</p>
        </div>
      </footer>
    </div>
  );
}

export default App;