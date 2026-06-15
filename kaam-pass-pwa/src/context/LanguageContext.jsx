/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  return useContext(LanguageContext);
}

const translations = {
  en: {
    "dashboard.title": "AI Trust Score",
    "dashboard.attendance": "✅ Mark Attendance (Secure)",
    "dashboard.docs": "📄 My Documents",
    "dashboard.loan": "🎙️ Voice Micro-Loan",
    "dashboard.network": "🤝 Trust Network",
    "dashboard.safety": "🛡️ Safety QR",
    "dashboard.earned": "Earned this Month",
    "dashboard.days": "Days Logged",
    "dashboard.verify_now": "Verify Now",
    "dashboard.unverified": "Unverified",
    "dashboard.verified": "✓ Verified Worker"
  },
  hi: {
    "dashboard.title": "एआई ट्रस्ट स्कोर",
    "dashboard.attendance": "✅ हाजिरी लगाएँ",
    "dashboard.docs": "📄 मेरे दस्तावेज़",
    "dashboard.loan": "🎙️ वॉइस लोन",
    "dashboard.network": "🤝 ट्रस्ट नेटवर्क",
    "dashboard.safety": "🛡️ सुरक्षा QR",
    "dashboard.earned": "इस महीने की कमाई",
    "dashboard.days": "दर्ज किए गए दिन",
    "dashboard.verify_now": "अभी वेरिफाई करें",
    "dashboard.unverified": "असत्यापित",
    "dashboard.verified": "✓ सत्यापित वर्कर"
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const t = (key) => {
    return translations[lang]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
