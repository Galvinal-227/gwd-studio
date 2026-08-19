import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy, FiCheck, FiMessageCircle } from 'react-icons/fi';
import { contactInfo } from '../data/contact';
import PaymentConfirmation from './PaymentConfirmation';

const QRISModal = ({ isOpen, onClose, plan }) => {
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCopy = () => {
    if (plan?.price) {
      navigator.clipboard.writeText(plan.price);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappNumber = contactInfo.whatsapp || contactInfo.phone || '+6285801003353';

  return (
    <>
      <AnimatePresence>
        {isOpen && !showConfirmation && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
            <motion.div
              className="relative bg-white rounded-xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="text-center">
                <h3 className="text-2xl font-heading font-bold">Pembayaran QRIS</h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Scan QR code di bawah ini untuk melakukan pembayaran
                </p>

                {plan && (
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500">Paket</p>
                    <p className="text-lg font-semibold">{plan.name}</p>
                    <p className="text-2xl font-heading font-bold mt-1">{plan.price}</p>
                  </div>
                )}

                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 inline-block">
                  {contactInfo.qrisImage ? (
                    <img 
                      src="/qris-dana.jpeg" 
                      alt="QRIS Payment" 
                      className="w-48 h-48 object-contain"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-400 text-sm">QR Code</p>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-gray-500">DANA • GoPay • OVO • ShopeePay</p>
                </div>

                {plan?.price && (
                  <button
                    onClick={handleCopy}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200 transition-colors"
                  >
                    {copied ? <FiCheck className="w-4 h-4 text-green-500" /> : <FiCopy className="w-4 h-4" />}
                    {copied ? 'Tersalin!' : `Copy nominal: ${plan.price}`}
                  </button>
                )}

                <div className="mt-6 text-left text-sm text-gray-600 space-y-2">
                  <p className="font-semibold">Cara pembayaran:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Scan QR code di atas</li>
                    <li>Masukkan nominal sesuai paket</li>
                    <li>Simpan bukti pembayaran</li>
                    <li>Konfirmasi setelah bayar</li>
                  </ol>
                </div>

                <button
                  onClick={() => setShowConfirmation(true)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  <FiCheck className="w-4 h-4" />
                  Saya Sudah Bayar
                </button>

                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                    `Halo, saya sudah melakukan pembayaran untuk paket ${plan?.name || ''} (${plan?.price || ''}). Berikut bukti pembayarannya.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <FiMessageCircle className="w-4 h-4" />
                  Konfirmasi via WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentConfirmation 
        isOpen={showConfirmation} 
        onClose={() => setShowConfirmation(false)} 
        plan={plan}
      />
    </>
  );
};

export default QRISModal;