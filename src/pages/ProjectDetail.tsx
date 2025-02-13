import { memo, type FC } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProjectStore } from '@/store/useProjectStore';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

export const ProjectDetail: FC = memo(() => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, getProjectTasks, getProjectStats } = useProjectStore();
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/projects')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-destructive">Project not found</h1>
        </div>
      </div>
    );
  }

  const tasks = getProjectTasks(project.id);
  const stats = getProjectStats(project.id);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/projects')}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gradient">{project.name}</h1>
            <p className="text-muted-foreground mt-1">{project.description}</p>
          </div>
        </div>
        <button 
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6">
          <h3 className="font-medium mb-2">Tasks Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-2xl font-bold text-yellow-500">{stats.todo}</p>
              <p className="text-sm text-muted-foreground">Todo</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-500">{stats.done}</p>
              <p className="text-sm text-muted-foreground">Done</p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-6">
          <h3 className="font-medium mb-2">Progress</h3>
          <div className="flex items-end justify-between">
            <div className="w-full bg-background rounded-full h-2.5">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                style={{ width: `${stats.progress}%` }}
              />
            </div>
            <span className="text-sm font-medium ml-4">{Math.round(stats.progress)}%</span>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Tasks</h2>
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tasks found in this project</p>
            <button className="mt-4 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Create your first task
            </button>
          </div>
        ) : (
          tasks.map(task => (
            <div 
              key={task.id}
              className="bg-secondary/30 backdrop-blur-sm rounded-lg p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            >
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  task.status === 'todo' ? 'bg-yellow-500/20 text-yellow-500' :
                  task.status === 'inProgress' ? 'bg-blue-500/20 text-blue-500' :
                  'bg-green-500/20 text-green-500'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

ProjectDetail.displayName = 'ProjectDetail'; 