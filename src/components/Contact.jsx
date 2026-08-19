import { useState, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader';
import { contactInfo } from '../data/contact';

gsap.registerPlugin(ScrollTrigger);

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  useLayoutEffect(() => {
    const formEl = formRef.current;
    if (!formEl) return;
    const items = formEl.querySelectorAll('[data-animate]');
    gsap.fromTo(items,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: formEl, start: 'top 75%' }
      }
    );
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: contactInfo.email,
        reply_to :formData.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: Contact info */}
          <div data-animate>
            <SectionHeader
              eyebrow="contact_eyebrow"
              title="contact_title"
              description="contact_description"
            />
            <div className="mt-10 space-y-6">
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-4 group">
                <span className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-sm text-gray-500">Email</span>
                  <span className="text-lg font-medium group-hover:underline">{contactInfo.email}</span>
                </span>
              </a>
              <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                <span className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-sm text-gray-500">Phone</span>
                  <span className="text-lg font-medium group-hover:underline">{contactInfo.phone}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-full">
                  <MapPin className="w-5 h-5" />
                </span>
                <span>
                  <span className="block text-sm text-gray-500">Location</span>
                  <span className="text-lg font-medium">{contactInfo.location}</span>
                </span>
              </div>
            </div>
            <div className="mt-10 flex gap-4">
              {contactInfo.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm uppercase tracking-wider text-gray-500 hover:text-black transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div ref={formRef} className="bg-gray-50 p-8 md:p-10 rounded-lg border border-gray-200">
            {submitStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-black text-white flex items-center justify-center rounded-full mb-6">
                  <Send className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-heading font-semibold">Message sent!</h3>
                <p className="mt-2 text-gray-600">Thank you for reaching out. I'll get back to you shortly.</p>
                <button
                  onClick={() => setSubmitStatus(null)}
                  className="mt-6 text-sm underline text-gray-500 hover:text-black"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-heading font-semibold">Tell us about your project</h3>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                    Failed to send message. Please try again or email me directly.
                  </div>
                )}

                <div data-animate>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition disabled:opacity-50"
                    placeholder="Your name"
                  />
                </div>
                <div data-animate>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition disabled:opacity-50"
                    placeholder="your@email.com"
                  />
                </div>
                <div data-animate>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition resize-none disabled:opacity-50"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <button
                  type="submit"
                  data-animate
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 uppercase tracking-wider text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      Sending... <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;