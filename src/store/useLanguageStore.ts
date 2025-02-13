import { create } from 'zustand';
import { persist, type PersistOptions } from 'zustand/middleware';
import type { Language } from '@/utils/i18n';

interface LanguageState {
  currentLang: Language;
  setLanguage: (lang: Language) => void;
}

type LanguageStore = LanguageState;

const persistConfig: PersistOptions<LanguageState> = {
  name: 'language-storage',
  version: 1,
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLang: 'EN',
      setLanguage: (lang) => set({ currentLang: lang }),
    }),
    persistConfig
  )
); 