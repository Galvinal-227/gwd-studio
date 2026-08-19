import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiLoader, FiCpu } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const AIChatbot = ({ isOpen, onClose }) => {
  const { lang } = useTranslation();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: lang === 'id'
        ? 'Halo! 👋 Saya AI assistant GWD Studio. Silakan tanya tentang jasa pembuatan website.'
        : 'Hello! 👋 I\'m GWD Studio AI assistant. Feel free to ask about our web development services.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content: lang === 'id'
          ? 'Halo! 👋 Saya AI assistant GWD Studio. Silakan tanya tentang jasa pembuatan website.'
          : 'Hello! 👋 I\'m GWD Studio AI assistant. Feel free to ask about our web development services.',
      },
    ]);
  }, [lang]);

  const extractText = (response) => {
    if (typeof response === 'string') return response;
    if (response?.text) return response.text;
    if (typeof response?.content === 'string') return response.content;
    if (Array.isArray(response?.content)) {
      return response.content
        .map(part => part?.text || part?.content || '')
        .join('');
    }
    if (typeof response?.message === 'string') return response.message;
    if (response?.message?.content) return response.message.content;
    if (typeof response?.response === 'string') return response.response;
    if (response?.choices?.[0]?.message?.content) {
      return response.choices[0].message.content;
    }
    if (response?.choices?.[0]?.text) {
      return response.choices[0].text;
    }
    return lang === 'id'
      ? 'Maaf, saya tidak bisa menjawab sekarang.'
      : 'Sorry, I cannot answer right now.';
  };

  const sendMessage = async (messageText) => {
    if (!messageText?.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: messageText }]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = lang === 'id'
        ? `Kamu adalah AI assistant untuk GWD Studio, jasa pembuatan website oleh Galvin Alfito.

Layanan:
- Landing Page (1-2 minggu)
- Company Profile (2-4 minggu)
- E-Commerce (4-8 minggu)
- Web Application (custom)
- Maintenance

Kontak:
- WhatsApp: +6285801003353
- Email: akunmasukanweb@gmail.com
- Lokasi: Nganjuk, Indonesia

Harga custom tergantung kebutuhan. Arahkan user ke WhatsApp untuk konsultasi.

Pertanyaan user: ${messageText}

Jawab singkat dan ramah dalam Bahasa Indonesia:`
        : `You are AI assistant for GWD Studio, web development service by Galvin Alfito.

Services:
- Landing Page (1-2 weeks)
- Company Profile (2-4 weeks)
- E-Commerce (4-8 weeks)
- Web Application (custom)
- Maintenance

Contact:
- WhatsApp: +6285801003353
- Email: akunmasukanweb@gmail.com
- Location: Nganjuk, Indonesia

Custom pricing. Direct users to WhatsApp for consultation.

User question: ${messageText}

Answer briefly and friendly in English:`;

      const response = await window.puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
      const aiReply = extractText(response);
      
      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: lang === 'id'
            ? 'Maaf, terjadi kesalahan. Silakan hubungi WhatsApp +6285801003353.'
            : 'Sorry, an error occurred. Please contact WhatsApp +6285801003353.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const quickReplies = lang === 'id'
    ? ['Berapa harga?', 'Layanan apa saja?', 'Berapa lama?']
    : ['How much?', 'What services?', 'How long?'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 right-8 z-[60] w-[calc(100vw-2rem)] max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
              <FiCpu className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm">GWD Assistant</h3>
              <p className="text-xs text-gray-400">
                {lang === 'id' ? 'Online • Didukung AI' : 'Online • AI Powered'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close AI Chat"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-lg text-sm whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-black text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg rounded-bl-none">
                  <FiLoader className="w-4 h-4 animate-spin text-gray-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto">
            {quickReplies.map((quick) => (
              <button
                key={quick}
                onClick={() => sendMessage(quick)}
                className="whitespace-nowrap text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {quick}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={lang === 'id' ? 'Tanya tentang jasa website...' : 'Ask about web services...'}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 bg-black text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                <FiSend className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatbot;