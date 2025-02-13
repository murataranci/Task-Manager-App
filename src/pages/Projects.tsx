import { memo, type FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFolder, FiClock, FiCheckCircle, FiAlertCircle, FiMoreVertical } from 'react-icons/fi';
import { useProjectStore } from '@/store/useProjectStore';
import { useAuthStore } from '@/store/useAuthStore';
import { CreateProjectModal } from '@/components/projects/CreateProjectModal';
import { useNavigate } from 'react-router-dom';

export const Projects: FC = memo(() => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { projects, addProject, getProjectStats } = useProjectStore();

  // Sadece mevcut kullanıcının projelerini filtrele
  const userProjects = projects.filter(project => project.userId === user?.id);

  const handleCreateProject = (data: { name: string; description: string; color: string }) => {
    addProject(data);
    setIsCreateModalOpen(false);
  };

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gradient">Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and organize your projects</p>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FiPlus />
            <span>New Project</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => {
            const stats = getProjectStats(project.id);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-secondary/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              >
                {/* Project Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${project.color}/20 rounded-lg flex items-center justify-center`}>
                        <FiFolder className={`w-5 h-5 ${project.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-background rounded-lg transition-colors">
                      <FiMoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <FiClock className="w-4 h-4" />
                        <span className="font-medium">{stats.todo}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">Pending</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-1 text-blue-500">
                        <FiAlertCircle className="w-4 h-4" />
                        <span className="font-medium">{stats.inProgress}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">In Progress</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-background/50 rounded-lg">
                      <div className="flex items-center space-x-1 text-green-500">
                        <FiCheckCircle className="w-4 h-4" />
                        <span className="font-medium">{stats.done}</span>
                      </div>
                      <span className="text-xs text-muted-foreground mt-1">Completed</span>
                    </div>
                  </div>
                </div>

                {/* Project Progress */}
                <div className="px-6 pb-6">
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${stats.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{Math.round(stats.progress)}%</span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <button 
                      onClick={() => handleViewProject(project.id)}
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      View Project
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </>
  );
});

Projects.displayName = 'Projects'; 