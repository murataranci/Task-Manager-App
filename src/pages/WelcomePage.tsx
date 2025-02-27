import { memo, type FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiClock, FiLayout, FiList, FiTag, FiCheckSquare, FiGlobe } from 'react-icons/fi';
import { useAuthStore } from '@/store/useAuthStore';
import { useLanguageStore } from '@/store/useLanguageStore';
import { t } from '@/utils/i18n';
import type { Language } from '@/utils/i18n';

export const WelcomePage: FC = memo(() => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const openLoginModal = useAuthStore((state) => state.openLoginModal);
  const { currentLang, setLanguage } = useLanguageStore();

  const features = [
    {
      icon: FiLayout,
      title: t('features.modernInterface.title', currentLang as Language),
      description: t('features.modernInterface.description', currentLang as Language),
    },
    {
      icon: FiClock,
      title: t('features.realTimeUpdates.title', currentLang as Language),
      description: t('features.realTimeUpdates.description', currentLang as Language),
    },
    {
      icon: FiCheckCircle,
      title: t('features.taskOrganization.title', currentLang as Language),
      description: t('features.taskOrganization.description', currentLang as Language),
    },
  ];

  const kanbanColumns = [
    {
      title: t('kanban.todo', currentLang as Language),
      icon: FiList,
      color: 'yellow',
      count: 3,
      tasks: [
        { title: t('tasks.designUpdates', currentLang as Language), tag: t('tags.design', currentLang as Language) },
        { title: t('tasks.apiIntegration', currentLang as Language), tag: t('tags.development', currentLang as Language) },
        { title: t('tasks.userTesting', currentLang as Language), tag: t('tags.testing', currentLang as Language) },
      ],
    },
    {
      title: t('kanban.inProgress', currentLang as Language),
      icon: FiClock,
      color: 'blue',
      count: 2,
      tasks: [
        { title: t('tasks.frontendDev', currentLang as Language), tag: t('tags.development', currentLang as Language) },
        { title: t('tasks.dbSetup', currentLang as Language), tag: t('tags.backend', currentLang as Language) },
      ],
    },
    {
      title: t('kanban.done', currentLang as Language),
      icon: FiCheckSquare,
      color: 'green',
      count: 2,
      tasks: [
        { title: t('tasks.projectSetup', currentLang as Language), tag: t('tags.setup', currentLang as Language) },
        { title: t('tasks.wireframes', currentLang as Language), tag: t('tags.design', currentLang as Language) },
      ],
    },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'EN', label: 'English' },
    { code: 'TR', label: 'Türkçe' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="flex items-center justify-center space-x-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-colors"
          >
            <FiGlobe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium hidden sm:inline">{currentLang}</span>
          </button>

          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full right-0 mt-2 w-32 rounded-lg border bg-background/95 backdrop-blur-sm shadow-lg"
                onClick={() => setIsLangMenuOpen(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-secondary/50 transition-colors ${
                      currentLang === lang.code ? 'text-primary bg-secondary/30' : 'text-foreground'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-4 py-8 sm:py-16">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text px-4"
            >
              {t('title', currentLang as Language)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground px-4"
            >
              {t('subtitle', currentLang as Language)}
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 px-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group p-6 bg-secondary/30 backdrop-blur-sm border-gradient rounded-xl hover:bg-secondary/40 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-gradient">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Preview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16"
            >
              <div className="relative rounded-xl overflow-hidden border-gradient p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm" />
                <div className="relative rounded-lg bg-secondary/30 p-4 md:p-8">
                  {/* Mock Task Manager Interface */}
                  <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {kanbanColumns.map((column) => (
                      <div key={column.title} className="bg-background/40 rounded-lg p-4 flex-shrink-0 w-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <column.icon className={`text-${column.color}-500`} />
                            <h3 className="font-medium text-sm sm:text-base">{column.title}</h3>
                          </div>
                          <span className={`text-xs bg-${column.color}-500/20 text-${column.color}-500 px-2 py-1 rounded-full`}>
                            {column.count}
                          </span>
                        </div>
                        <div className="space-y-2 sm:space-y-3">
                          {column.tasks.map((task) => (
                            <TaskCard key={task.title} title={task.title} tag={task.tag} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-12 sm:mt-16 px-4"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-gradient mb-4">
                {t('cta.title', currentLang as Language)}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                {t('cta.description', currentLang as Language)}
              </p>
              <button
                onClick={openLoginModal}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 text-blue-400 rounded-lg transition-all duration-300"
              >
                {t('cta.button', currentLang as Language)}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Mock Task Card Component
const TaskCard: FC<{ title: string; tag: string }> = ({ title, tag }) => (
  <div className="bg-background/60 p-2.5 sm:p-3 rounded-lg hover:bg-background/70 transition-colors">
    <div className="flex items-start justify-between gap-3">
      <h4 className="text-xs sm:text-sm font-medium line-clamp-2 flex-1">{title}</h4>
      <div className="flex items-center space-x-1 shrink-0 bg-secondary/30 px-2 py-1 rounded-full">
        <FiTag className="w-3 h-3 text-muted-foreground" />
        <span className="text-xs text-muted-foreground truncate max-w-[80px] sm:max-w-[100px]">{tag}</span>
      </div>
    </div>
  </div>
);

WelcomePage.displayName = 'WelcomePage'; 