import { memo, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiX } from 'react-icons/fi';

const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  color: z.string(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

const colors = [
  { name: 'Blue', value: 'bg-blue-500' },
  { name: 'Purple', value: 'bg-purple-500' },
  { name: 'Green', value: 'bg-green-500' },
  { name: 'Red', value: 'bg-red-500' },
  { name: 'Yellow', value: 'bg-yellow-500' },
  { name: 'Pink', value: 'bg-pink-500' },
];

export const CreateProjectModal: FC<CreateProjectModalProps> = memo(({ isOpen, onClose, onSubmit }) => {
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      color: colors[0].value,
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] p-6 border bg-background rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Create New Project</h2>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="text-sm font-medium">Project Name</label>
            <input
              {...form.register('name')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
              placeholder="Enter project name"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive mt-1.5">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              {...form.register('description')}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1.5"
              rows={3}
              placeholder="Enter project description"
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1.5">{form.formState.errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Project Color</label>
            <div className="grid grid-cols-6 gap-2 mt-1.5">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => form.setValue('color', color.value)}
                  className={`w-8 h-8 rounded-full ${color.value} ${
                    form.watch('color') === color.value ? 'ring-2 ring-offset-2 ring-primary' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-input rounded-lg hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

CreateProjectModal.displayName = 'CreateProjectModal'; 