import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onUpdate }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, editTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  return (
    <Card className={`shadow-card hover:shadow-primary/20 transition-smooth border-l-4 ${
      task.completed 
        ? 'border-l-success bg-gradient-to-r from-success/5 to-transparent' 
        : 'border-l-primary bg-gradient-to-r from-primary/5 to-transparent'
    }`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className="data-[state=checked]:bg-success data-[state=checked]:border-success"
          />
          
          {isEditing ? (
            <div className="flex-1 flex items-center gap-2">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape') handleCancel();
                }}
                autoFocus
              />
              <Button variant="success" size="sm" onClick={handleSave}>
                <Check className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-between">
              <span 
                className={`text-sm font-medium transition-smooth ${
                  task.completed 
                    ? 'line-through text-muted-foreground' 
                    : 'text-foreground'
                }`}
              >
                {task.title}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8 p-0"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-2 text-xs text-muted-foreground">
          Created: {task.createdAt.toLocaleDateString()}
          {task.completedAt && (
            <span className="ml-2">
              • Completed: {task.completedAt.toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};