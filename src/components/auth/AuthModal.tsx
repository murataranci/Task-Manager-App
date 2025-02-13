import { memo, type FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiX, FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useAuthStore } from '@/store/useAuthStore';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export const AuthModal: FC = memo(() => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { isLoginModalOpen, closeLoginModal, login, register, loginWithGoogle } = useAuthStore();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setError(null);
      await login(data.email, data.password);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setError(null);
      await register(data.username, data.email, data.password);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError(null);
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Google login failed. Please try again.');
      }
    }
  };

  const PasswordInput = ({ 
    register, 
    name, 
    label, 
    error, 
    show, 
    onToggle 
  }: { 
    register: any;
    name: string;
    label: string;
    error?: string;
    show: boolean;
    onToggle: () => void;
  }) => (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          {...register}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm pr-10"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {show ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );

  if (!isLoginModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isRegister ? 'Create Account' : 'Login'}
          </h2>
          <button
            onClick={closeLoginModal}
            className="text-muted-foreground hover:text-foreground"
          >
            <FiX size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center space-x-2">
            <FiAlertCircle />
            <p>{error}</p>
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 p-3 border border-blue-500/20 rounded-md hover:bg-blue-500/10 transition-colors"
        >
          <FcGoogle size={20} />
          <span>Continue with Google</span>
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        {isRegister ? (
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Username</label>
              <input
                {...registerForm.register('username')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              {registerForm.formState.errors.username && (
                <p className="text-sm text-destructive">
                  {registerForm.formState.errors.username.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                {...registerForm.register('email')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              {registerForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {registerForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <PasswordInput
              register={registerForm.register('password')}
              name="password"
              label="Password"
              error={registerForm.formState.errors.password?.message}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
            <PasswordInput
              register={registerForm.register('confirmPassword')}
              name="confirmPassword"
              label="Confirm Password"
              error={registerForm.formState.errors.confirmPassword?.message}
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Register
            </button>
            <p className="text-sm text-center">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-primary hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                {...loginForm.register('email')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <PasswordInput
              register={loginForm.register('password')}
              name="password"
              label="Password"
              error={loginForm.formState.errors.password?.message}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Login
            </button>
            <p className="text-sm text-center">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-primary hover:underline"
              >
                Register
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
});

AuthModal.displayName = 'AuthModal'; 