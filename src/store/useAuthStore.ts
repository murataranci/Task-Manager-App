import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface User {
  id: string;
  username: string;
  email: string;
  provider?: 'email' | 'google';
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  users: User[]; // Kayıtlı kullanıcıları tutacak
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  updateProfile: (data: { username?: string; email?: string }) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isAuthenticated: false,
      isLoginModalOpen: false,

      login: async (email: string, password: string) => {
        const users = get().users;
        const user = users.find(u => u.email === email);
        
        if (!user) {
          throw new Error('User not found');
        }

        // Normalde şifre kontrolü backend'de yapılır
        set({ user, isAuthenticated: true, isLoginModalOpen: false });
      },

      register: async (username: string, email: string, password: string) => {
        const users = get().users;
        
        // Email kontrolü
        if (users.some(u => u.email === email)) {
          throw new Error('Email already exists');
        }

        const newUser: User = {
          id: crypto.randomUUID(),
          username,
          email,
          provider: 'email'
        };

        set(state => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
          isLoginModalOpen: false
        }));
      },

      loginWithGoogle: async () => {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const { user: googleUser } = result;

          if (!googleUser?.email) {
            throw new Error('No email found from Google account');
          }

          const user = {
            id: googleUser.uid,
            username: googleUser.displayName || googleUser.email.split('@')[0],
            email: googleUser.email,
            provider: 'google' as const,
            avatar: googleUser.photoURL || undefined
          };

          set({
            user,
            isAuthenticated: true,
            isLoginModalOpen: false
          });
        } catch (error) {
          console.error('Google login error:', error);
          
          // Daha detaylı hata mesajları
          if (error instanceof Error) {
            if (error.message.includes('auth/unauthorized-domain')) {
              throw new Error('This domain is not authorized. Please contact support.');
            }
            if (error.message.includes('popup_closed_by_user')) {
              throw new Error('Login cancelled by user.');
            }
            throw error;
          }
          throw new Error('Failed to login with Google');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      openLoginModal: () => set({ isLoginModalOpen: true }),
      closeLoginModal: () => set({ isLoginModalOpen: false }),

      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
          users: state.users.map(u => 
            u.id === state.user?.id ? { ...u, ...data } : u
          )
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 