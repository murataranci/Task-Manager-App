import { memo, type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiGrid, FiFolder, FiUser } from 'react-icons/fi';
import { useTaskStore } from '@/store/useTaskStore';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useLanguageStore } from '@/store/useLanguageStore';
import { t } from '@/utils/i18n';
import { motion } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcon';

export const Navbar: FC = memo(() => {
  const location = useLocation();
  const openCreateModal = useTaskStore((state) => state.openCreateModal);
  const currentLang = useLanguageStore((state) => state.currentLang);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: FiGrid, label: t('nav.dashboard', currentLang) },
    { path: '/projects', icon: FiFolder, label: t('nav.projects', currentLang) },
    { path: '/profile', icon: FiUser, label: t('nav.profile', currentLang) },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <AppIcon size={32} />
            </motion.div>
            <span className="font-semibold text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hidden sm:block">
              Task Manager
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center mr-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 mx-1 rounded-lg flex items-center space-x-2 transition-colors ${
                    isActive(item.path)
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 border-2 border-primary/50 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <button
              onClick={openCreateModal}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FiPlus className="w-4 h-4" />
              <span className="font-medium">{t('newTask', currentLang)}</span>
            </button>

            <div className="h-6 w-px bg-border mx-2" />
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={openCreateModal}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <FiPlus className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-background/95 backdrop-blur-lg border border-border rounded-2xl shadow-lg">
        <div className="flex items-center justify-around p-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`p-3 rounded-xl flex flex-col items-center ${
                isActive(item.path)
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = 'Navbar'; 