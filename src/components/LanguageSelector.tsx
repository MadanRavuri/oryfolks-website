import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <select
      value={currentLang}
      onChange={(e) => changeLanguage(e.target.value)}
      className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="en-SG">English (Singapore)</option>
      <option value="ja">日本語</option>
    </select>
  );
};

export default LanguageSelector; 