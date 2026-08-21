import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiCommand, FiArrowRight } from 'react-icons/fi';
import { useTranslation } from '../hooks/useTranslation';

const AIChatbot = ({ isOpen, onClose }) => {
  const { t, lang } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 500);
    }
    setMessages([]);
    setHasInteracted(false);
    setInput('');
  }, [isOpen]);

  const extractText = (response) => {
    if (typeof response === 'string') return response;
    if (response?.text) return response.text;
    if (typeof response?.content === 'string') return response.content;
    if (Array.isArray(response?.content)) {
      return response.content.map(part => part?.text || part?.content || '').join('');
    }
    if (typeof response?.message === 'string') return response.message;
    if (response?.message?.content) return response.message.content;
    if (typeof response?.response === 'string') return response.response;
    if (response?.choices?.[0]?.message?.content) return response.choices[0].message.content;
    if (response?.choices?.[0]?.text) return response.choices[0].text;
    return lang === 'id' ? 'Maaf, saya tidak bisa menjawab sekarang.' : 'Sorry, I cannot answer right now.';
  };

  const sendMessage = async (messageText) => {
    if (!messageText?.trim() || isLoading) return;

    setHasInteracted(true);
    setMessages((prev) => [...prev, { role: 'user', content: messageText, time: getCurrentTime() }]);
    setInput('');
    setIsLoading(true);

    try {
      const prompt = lang === 'id'
        ? `Kamu adalah GWD AI, asisten digital dari GWD Studio, jasa pembuatan website oleh Galvin Alfito.

Info GWD Studio:
- Didirikan tahun 2026
- Lokasi: Nganjuk, Indonesia
- Fokus: Website premium, responsive, SEO-friendly

Layanan:
- Landing Page (1-2 minggu)
- Company Profile (2-4 minggu)
- E-Commerce (4-8 minggu)
- Web Application (custom)
- Maintenance & Upgrade

Kontak:
- WhatsApp: +6285801003353
- Email: akunmasukanweb@gmail.com

Harga custom. Arahkan user ke WhatsApp untuk konsultasi.

PENTING: Jangan mengarang informasi yang tidak ada di atas. Kalau user tanya hal yang kamu tidak tahu, arahkan ke WhatsApp.

Pertanyaan user: ${messageText}

Jawab profesional dan singkat dalam Bahasa Indonesia:`
        : `You are GWD AI, digital assistant from GWD Studio, web development service by Galvin Alfito.

GWD Studio info:
- Founded in 2026
- Location: Nganjuk, Indonesia
- Focus: Premium, responsive, SEO-friendly websites

Services:
- Landing Page (1-2 weeks)
- Company Profile (2-4 weeks)
- E-Commerce (4-8 weeks)
- Web Application (custom)
- Maintenance & Upgrade

Contact:
- WhatsApp: +6285801003353
- Email: akunmasukanweb@gmail.com

Custom pricing. Direct users to WhatsApp.

IMPORTANT: Do not make up information not listed above. If user asks something you don't know, direct them to WhatsApp.

User question: ${messageText}

Answer professionally and briefly in English:`;

      const response = await window.puter.ai.chat(prompt, { model: 'gpt-4o-mini' });
      const aiReply = extractText(response);

      setMessages((prev) => [...prev, { role: 'assistant', content: aiReply, time: getCurrentTime() }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: lang === 'id'
            ? 'Terjadi kesalahan. Silakan hubungi WhatsApp +6285801003353.'
            : 'An error occurred. Please contact WhatsApp +6285801003353.',
          time: getCurrentTime()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const quickReplies = [
    { label: t('ai_quick_price'), message: lang === 'id' ? 'Berapa harga website?' : 'How much does a website cost?' },
    { label: t('ai_quick_services'), message: lang === 'id' ? 'Apa saja layanan GWD?' : 'What services does GWD offer?' },
    { label: t('ai_quick_timeline'), message: lang === 'id' ? 'Berapa lama pengerjaan?' : 'How long does it take?' },
  ];

  const ease = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed z-[70] flex items-end md:items-center justify-center md:justify-end p-3 md:p-6"
          style={{ inset: 0, pointerEvents: 'none' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
        >
          <motion.div
            className="absolute inset-0 bg-black/40 md:hidden"
            style={{ pointerEvents: 'auto' }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="relative bg-white border border-gray-900 shadow-2xl overflow-hidden flex flex-col w-full md:w-[440px] max-h-[calc(100vh-40px)] md:max-h-[680px] rounded-xl"
            style={{ pointerEvents: 'auto' }}
            initial={{ opacity: 0, y: 30, scale: 0.97, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: 20, scale: 0.97, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease }}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 shrink-0">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <div>
                  <p className="text-sm font-bold tracking-tight leading-none">{t('ai_title')}</p>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-500 mt-1">
                    {t('ai_digital_assistant')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 hidden md:block">
                  GWD.AI / 01
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              {!hasInteracted && messages.length === 0 && (
                <div className="px-5 py-8">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: 0.2 }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-4">
                      GWD / Studio
                    </p>
                    <h2 className="text-3xl font-heading font-bold leading-[1.1] tracking-tight">
                      {t('ai_how_can_we_help')}
                    </h2>
                    <div className="mt-4 h-px w-16 bg-black"></div>
                  </motion.div>

                  <div className="mt-8">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-3">
                      {t('ai_popular_questions')}
                    </p>
                    <div className="space-y-1">
                      {quickReplies.map((quick, index) => (
                        <motion.button
                          key={quick.label}
                          onClick={() => sendMessage(quick.message)}
                          className="group flex items-center gap-3 w-full text-left py-2.5 px-2 hover:bg-gray-50 rounded-md transition-colors"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, ease, delay: 0.3 + index * 0.1 }}
                        >
                          <FiArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-black transition-colors">
                            {quick.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {hasInteracted && (
                <div className="px-5 py-6 space-y-6">
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease }}
                    >
                      {msg.role === 'user' ? (
                        <div className="flex flex-col items-end">
                          <div className="bg-black text-white px-4 py-3 rounded-md max-w-[85%]">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                          </div>
                          <span className="text-[9px] text-gray-400 mt-1 mr-1">{msg.time}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start">
                          <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1 ml-1">
                            GWD AI
                          </p>
                          <div className="bg-white border border-gray-200 border-l-2 border-l-black px-4 py-3 rounded-md max-w-[90%]">
                            <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-800">{msg.content}</p>
                          </div>
                          <span className="text-[9px] text-gray-400 mt-1 ml-1">{msg.time}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      className="flex flex-col items-start"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-1 ml-1">
                        GWD AI
                      </p>
                      <div className="flex gap-1.5 px-4 py-3 border border-gray-200 border-l-2 border-l-black rounded-md">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="shrink-0 border-t border-gray-200 p-4">
              <div className="flex gap-0 border border-gray-900 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-black">
                <div className="flex items-center pl-3 text-gray-400">
                  <FiCommand className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('ai_placeholder')}
                  className="flex-1 px-3 py-3.5 text-sm outline-none bg-transparent"
                  disabled={isLoading}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  className="px-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-30"
                  aria-label="Send"
                >
                  <FiSend className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-center text-[8px] uppercase tracking-[0.3em] text-gray-400 mt-2">
                {t('ai_powered_by')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChatbot;
