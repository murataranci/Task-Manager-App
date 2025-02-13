import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { DndProvider } from './components/dnd/DndProvider';
import { AuthModal } from './components/auth/AuthModal';
import { useAuthStore } from './store/useAuthStore';
import { WelcomePage } from './pages/WelcomePage';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <DndProvider>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<WelcomePage />} />
        ) : (
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        )}
      </Routes>
      <AuthModal />
    </DndProvider>
  );
}

export default App; 