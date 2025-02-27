import { memo, type FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiGrid, FiFolder, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useTaskStore } from '@/store/useTaskStore';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useLanguageStore } from '@/store/useLanguageStore';
import { t } from '@/utils/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { AppIcon } from '@/components/icons/AppIcon';

export const Navbar: FC = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const openCreateModal = useTaskStore((state) => state.openCreateModal);
  const currentLang = useLanguageStore((state) => state.currentLang);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', icon: FiGrid, label: 'Görev Tahtası' },
    { path: '/projects', icon: FiFolder, label: 'Projeler' },
    { path: '/profile', icon: FiUser, label: 'Profil' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

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
              <AppIcon size={28} />
            </motion.div>
            <span className="font-semibold text-base sm:text-lg bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Görev Yöneticisi
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
              <span className="font-medium">Yeni Görev</span>
            </button>

            <div className="h-6 w-px bg-border mx-2" />
            
            <LanguageSwitcher />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={openCreateModal}
              className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              aria-label="Yeni Görev Ekle"
            >
              <FiPlus className="w-5 h-5" />
            </button>
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Menüyü Aç/Kapat"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`relative p-3 rounded-lg flex items-center space-x-3 ${
                      isActive(item.path)
                        ? 'text-primary bg-primary/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                    {isActive(item.path) && (
                      <motion.div
                        layoutId="mobile-menu-active"
                        className="absolute inset-0 border-2 border-primary/50 rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
});

Navbar.displayName = 'Navbar'; 