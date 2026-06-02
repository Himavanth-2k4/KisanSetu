const translations = require('../i18n/translations');

describe('KisanSetu i18n Translations', () => {
  const supportedLanguages = ['en', 'hi', 'ta', 'te'];

  test('should support all required Indian regional languages', () => {
    supportedLanguages.forEach((lang) => {
      expect(translations[lang]).toBeDefined();
    });
  });

  test('should contain core app metadata for all supported languages', () => {
    supportedLanguages.forEach((lang) => {
      const dict = translations[lang];
      expect(dict.appName).toBeTruthy();
      expect(dict.home).toBeTruthy();
      expect(dict.weather).toBeTruthy();
      expect(dict.aiAdvisory || dict.advisory).toBeTruthy();
      expect(dict.market).toBeTruthy();
    });
  });

  test('should have common advisory questions defined', () => {
    ['en', 'hi'].forEach((lang) => {
      const dict = translations[lang];
      expect(dict.commonQuestions).toBeDefined();
    });
  });
});
