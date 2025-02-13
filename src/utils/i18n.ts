export type Language = 'EN' | 'TR';

type TranslationKeys = {
  title: string;
  subtitle: string;
  features: {
    modernInterface: {
      title: string;
      description: string;
    };
    realTimeUpdates: {
      title: string;
      description: string;
    };
    taskOrganization: {
      title: string;
      description: string;
    };
  };
  nav: {
    dashboard: string;
    projects: string;
    profile: string;
  };
  kanban: {
    todo: string;
    inProgress: string;
    done: string;
  };
  tasks: {
    designUpdates: string;
    apiIntegration: string;
    userTesting: string;
    frontendDev: string;
    dbSetup: string;
    projectSetup: string;
    wireframes: string;
  };
  tags: {
    design: string;
    development: string;
    testing: string;
    backend: string;
    setup: string;
  };
  modal: {
    createTask: string;
    editTask: string;
    deleteTask: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    cancel: string;
    save: string;
    create: string;
  };
  priorities: {
    high: string;
    medium: string;
    low: string;
  };
  languages: {
    select: string;
    english: string;
    turkish: string;
  };
  newTask: string;
  cta: {
    title: string;
    description: string;
    button: string;
  };
};

type Translations = {
  [K in Language]: {
    [P in keyof TranslationKeys]: TranslationKeys[P] extends string
      ? string
      : {
          [SubKey in keyof TranslationKeys[P]]: TranslationKeys[P][SubKey] extends string
            ? string
            : {
                [DeepKey in keyof TranslationKeys[P][SubKey]]: string;
              };
        };
  };
};

const translations: Translations = {
  EN: {
    title: 'Manage Your Tasks with Ease',
    subtitle: 'Stay organized, focused, and in control of all your tasks',
    features: {
      modernInterface: {
        title: 'Modern Interface',
        description: 'Clean and intuitive design for better task management',
      },
      realTimeUpdates: {
        title: 'Real-time Updates',
        description: 'Track your progress with instant status updates',
      },
      taskOrganization: {
        title: 'Task Organization',
        description: 'Efficiently organize and prioritize your tasks',
      },
    },
    nav: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      profile: 'Profile',
    },
    kanban: {
      todo: 'Todo',
      inProgress: 'In Progress',
      done: 'Done',
    },
    tasks: {
      designUpdates: 'Design Updates',
      apiIntegration: 'API Integration',
      userTesting: 'User Testing',
      frontendDev: 'Frontend Development',
      dbSetup: 'Database Setup',
      projectSetup: 'Project Setup',
      wireframes: 'Wireframes',
    },
    tags: {
      design: 'Design',
      development: 'Development',
      testing: 'Testing',
      backend: 'Backend',
      setup: 'Setup',
    },
    modal: {
      createTask: 'Create New Task',
      editTask: 'Edit Task',
      deleteTask: 'Delete Task',
      title: 'Title',
      description: 'Description',
      priority: 'Priority',
      dueDate: 'Due Date',
      cancel: 'Cancel',
      save: 'Save Changes',
      create: 'Create Task',
    },
    priorities: {
      high: 'High',
      medium: 'Medium',
      low: 'Low',
    },
    languages: {
      select: 'Select Language',
      english: 'English',
      turkish: 'Turkish',
    },
    newTask: 'New Task',
    cta: {
      title: 'Ready to Get Started?',
      description: 'Join thousands of users who are already managing their tasks efficiently',
      button: 'Create Your Account',
    },
  },
  TR: {
    title: 'Görevlerinizi Kolayca Yönetin',
    subtitle: 'Organize olun, odaklanın ve tüm görevlerinizi kontrol altında tutun',
    features: {
      modernInterface: {
        title: 'Modern Arayüz',
        description: 'Daha iyi görev yönetimi için temiz ve sezgisel tasarım',
      },
      realTimeUpdates: {
        title: 'Gerçek Zamanlı Güncellemeler',
        description: 'İlerlemenizi anlık durum güncellemeleriyle takip edin',
      },
      taskOrganization: {
        title: 'Görev Organizasyonu',
        description: 'Görevlerinizi verimli bir şekilde düzenleyin ve önceliklendirin',
      },
    },
    nav: {
      dashboard: 'Panel',
      projects: 'Projeler',
      profile: 'Profil',
    },
    kanban: {
      todo: 'Yapılacak',
      inProgress: 'Devam Ediyor',
      done: 'Tamamlandı',
    },
    tasks: {
      designUpdates: 'Tasarım Güncellemeleri',
      apiIntegration: 'API Entegrasyonu',
      userTesting: 'Kullanıcı Testi',
      frontendDev: 'Önyüz Geliştirme',
      dbSetup: 'Veritabanı Kurulumu',
      projectSetup: 'Proje Kurulumu',
      wireframes: 'Tel Çerçeveler',
    },
    tags: {
      design: 'Tasarım',
      development: 'Geliştirme',
      testing: 'Test',
      backend: 'Arka Uç',
      setup: 'Kurulum',
    },
    modal: {
      createTask: 'Yeni Görev Oluştur',
      editTask: 'Görevi Düzenle',
      deleteTask: 'Görevi Sil',
      title: 'Başlık',
      description: 'Açıklama',
      priority: 'Öncelik',
      dueDate: 'Bitiş Tarihi',
      cancel: 'İptal',
      save: 'Değişiklikleri Kaydet',
      create: 'Görev Oluştur',
    },
    priorities: {
      high: 'Yüksek',
      medium: 'Orta',
      low: 'Düşük',
    },
    languages: {
      select: 'Dil Seçin',
      english: 'İngilizce',
      turkish: 'Türkçe',
    },
    newTask: 'Yeni Görev',
    cta: {
      title: 'Başlamaya Hazır mısınız?',
      description: 'Görevlerini verimli bir şekilde yöneten binlerce kullanıcıya katılın',
      button: 'Hesap Oluştur',
    },
  },
};

export const t = (path: string, lang: Language): string => {
  const keys = path.split('.');
  let value: any = translations[lang];

  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) {
      console.warn(`Translation missing for key: ${path} in language: ${lang}`);
      return path;
    }
  }

  return value;
}; 