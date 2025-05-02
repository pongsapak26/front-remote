// components/Modal.tsx
import { aosall } from '@/lib/aos';
import React from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div {...aosall} className="bg-white p-6 rounded-lg shadow-lg w-3/4 min-w-[300px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <div className='h-[80vh] overflow-scroll'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
