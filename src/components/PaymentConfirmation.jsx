import { useState } from 'react';
import { FiUpload, FiCheck, FiLoader, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PaymentConfirmation = ({ isOpen, onClose, plan }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        plan_name: plan?.name || 'Custom',
        plan_price: plan?.price || 'Custom',
        note: formData.note || '-',
        message: `KONFIRMASI PEMBAYARAN\n\nNama: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nPaket: ${plan?.name}\nHarga: ${plan?.price}\nCatatan: ${formData.note || '-'}`,
        reply_to: formData.email,
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', note: '' });
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
        >
          <FiX className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-heading font-bold">Pembayaran Dikonfirmasi!</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Terima kasih! Saya akan segera memproses pesanan kamu.
            </p>
            <p className="mt-2 text-gray-500 text-sm">
              Saya akan menghubungi kamu dalam 1x24 jam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h3 className="text-2xl font-heading font-bold">Konfirmasi Pembayaran</h3>
            <p className="mt-2 text-gray-600 text-sm">
              Isi form di bawah ini setelah kamu melakukan pembayaran.
            </p>

            {plan && (
              <div className="mt-4 bg-gray-50 rounded-lg p-4">
                <p className="text-xs text-gray-500">Paket</p>
                <p className="font-semibold">{plan.name}</p>
                <p className="text-lg font-heading font-bold">{plan.price}</p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Nama kamu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="email@kamu.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor HP / WhatsApp *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="08xxxxxxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catatan (opsional)</label>
                <textarea
                  name="note"
                  rows="3"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  placeholder="Contoh: Sudah transfer via DANA jam 14:30"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  Gagal mengirim konfirmasi. Coba lagi atau hubungi via WhatsApp.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    Mengirim... <FiLoader className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  'Kirim Konfirmasi'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Atau konfirmasi langsung via{' '}
                <a 
                  href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo, saya sudah bayar untuk paket ${plan?.name} (${plan?.price})`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-black"
                >
                  WhatsApp
                </a>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;