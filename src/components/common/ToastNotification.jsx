import React, { useState, useEffect } from "react";

export function useToast() {
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
  };

  const copyEmail = (e) => {
    if (e) e.preventDefault();
    const email = "varunsharma2949@gmail.com";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(() => {
        showToast(`📋 Gmail copied to clipboard: ${email}`);
      }).catch(() => {
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }
  };

  const fallbackCopy = (email) => {
    const textArea = document.createElement("textarea");
    textArea.value = email;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showToast(`📋 Gmail copied to clipboard: ${email}`);
    } catch (err) {
      showToast(`Email: ${email}`);
    }
    document.body.removeChild(textArea);
  };

  return { toastMessage, setToastMessage, showToast, copyEmail };
}

export default function ToastNotification({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="v-toast-notification" role="status" aria-live="polite">
      <span className="v-toast-icon">✨</span>
      <span className="v-toast-text">{message}</span>
    </div>
  );
}
