import { memo, type FC, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useTaskStore } from '@/store/useTaskStore';
import { FiUser, FiMail, FiLogOut, FiEdit2, FiActivity, FiSettings, FiBell, FiCheck, FiX } from 'react-icons/fi';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import 'react-circular-progressbar/dist/styles.css';

const profileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const Profile: FC = memo(() => {
  const { user, logout, updateProfile } = useAuthStore();
  const statistics = useTaskStore((state) => state.getStatistics());
  const [activeTab, setActiveTab] = useState<'overview' | 'settings'>('overview');
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  if (!user) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiActivity },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ] as const;

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
    setIsEditing(false);
  };

  const renderProfileInfo = () => {
    if (isEditing) {
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FiUser />
              <span className="text-sm font-medium">Username</span>
            </div>
            <input
              {...register('username')}
              className="w-full p-2 bg-background/50 border border-blue-500/20 rounded-md text-blue-400 focus:outline-none focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-sm text-destructive">{errors.username.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FiMail />
              <span className="text-sm font-medium">Email</span>
            </div>
            <input
              {...register('email')}
              className="w-full p-2 bg-background/50 border border-blue-500/20 rounded-md text-blue-400 focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-destructive/10 text-destructive rounded-full transition-colors"
            >
              <FiX size={18} />
            </button>
            <button
              type="submit"
              className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-full transition-colors"
            >
              <FiCheck size={18} />
            </button>
          </div>
        </form>
      );
    }

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <FiUser />
            <span className="text-sm font-medium">Username</span>
          </div>
          <p className="text-lg text-blue-400">{user.username}</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <FiMail />
            <span className="text-sm font-medium">Email</span>
          </div>
          <p className="text-lg text-blue-400">{user.email}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient tracking-tight">Profile</h2>
          <p className="text-muted-foreground mt-1">Manage your account and preferences</p>
        </div>
        <button
          onClick={logout}
          className="flex items-center space-x-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors mt-4 md:mt-0"
        >
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gradient">
        <div className="flex space-x-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`
                flex items-center space-x-2 py-4 border-b-2 transition-colors
                ${activeTab === id 
                  ? 'border-blue-400 text-blue-400' 
                  : 'border-transparent text-muted-foreground hover:text-blue-400'
                }
              `}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info */}
          <div className="bg-secondary/50 border-gradient rounded-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gradient">Profile Information</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-2 hover:bg-background/50 rounded-full transition-colors"
              >
                <FiEdit2 className="text-blue-400" />
              </button>
            </div>
            {renderProfileInfo()}
          </div>

          {/* Statistics */}
          <div className="bg-secondary/50 border-gradient rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gradient mb-6">Task Statistics</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <StatCard
                    label="Total Tasks"
                    value={statistics.total}
                    className="bg-blue-500/10 text-blue-400"
                  />
                  <StatCard
                    label="In Progress"
                    value={statistics.inProgress}
                    className="bg-yellow-500/10 text-yellow-400"
                  />
                  <StatCard
                    label="Completed"
                    value={statistics.completed}
                    className="bg-green-500/10 text-green-400"
                  />
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32">
                  <CircularProgressbar
                    value={statistics.completion}
                    text={`${statistics.completion}%`}
                    styles={buildStyles({
                      pathColor: '#60A5FA',
                      textColor: '#60A5FA',
                      trailColor: 'rgba(96, 165, 250, 0.1)',
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-secondary/50 border-gradient rounded-lg p-6 space-y-4 md:col-span-2">
            <h3 className="text-xl font-semibold text-gradient">Account Settings</h3>
            <div className="space-y-4">
              <SettingCard
                icon={FiBell}
                title="Notifications"
                description="Manage your notification preferences"
              />
              <SettingCard
                icon={FiSettings}
                title="Preferences"
                description="Customize your task management experience"
              />
              <button className="w-full px-4 py-3 text-left text-destructive hover:bg-destructive/10 rounded-md transition-colors border border-destructive/20">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

interface StatCardProps {
  label: string;
  value: number;
  className?: string;
}

const StatCard: FC<StatCardProps> = ({ label, value, className = '' }) => (
  <div className={`p-4 rounded-lg ${className}`}>
    <p className="text-sm font-medium">{label}</p>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

interface SettingCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const SettingCard: FC<SettingCardProps> = ({ icon: Icon, title, description }) => (
  <button className="w-full p-4 text-left hover:bg-background/50 rounded-lg transition-colors border border-blue-500/20 group">
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-medium text-blue-400">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  </button>
);

Profile.displayName = 'Profile'; 