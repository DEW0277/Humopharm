import type { ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div className='bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative'>
        {/* Yopish tugma */}
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-red-600 hover:text-red-800'
        >
          <img src='/close.svg' alt='' />
        </button>

        {/* Title */}
        {title && <h2 className='text-2xl font-bold mb-4'>{title}</h2>}

        {/* Content */}
        <div className='text-gray-700 text-sm leading-relaxed'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
