import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskStats } from "@/components/TaskStats";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Task, TaskStats as TaskStatsType } from "@/types/task";
import { useToast } from "@/hooks/use-toast";
import { 
  ListChecks, 
  Filter, 
  Trash2, 
  CheckCircle, 
  Circle, 
  Clock 
} from "lucide-react";

type FilterType = 'all' | 'pending' | 'completed';

const Index = () => {
  const { toast } = useToast();
  const [tasks, setTasks] = useLocalStorage<Task[]>('do-list-tasks', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task added!",
      description: `"${title}" has been added to your list.`,
    });
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            completedAt: !task.completed ? new Date() : undefined
          }
        : task
    ));
    
    const task = tasks.find(t => t.id === id);
    if (task) {
      toast({
        title: task.completed ? "Task reopened!" : "Task completed!",
        description: `"${task.title}" marked as ${task.completed ? 'pending' : 'completed'}.`,
      });
    }
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(task => task.id !== id));
    
    if (task) {
      toast({
        title: "Task deleted!",
        description: `"${task.title}" has been removed from your list.`,
        variant: "destructive",
      });
    }
  };

  const updateTask = (id: string, title: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, title } : task
    ));
    toast({
      title: "Task updated!",
      description: "Your task has been successfully updated.",
    });
  };

  const clearCompleted = () => {
    const completedCount = tasks.filter(task => task.completed).length;
    setTasks(prev => prev.filter(task => !task.completed));
    toast({
      title: "Completed tasks cleared!",
      description: `${completedCount} completed task${completedCount !== 1 ? 's' : ''} removed.`,
    });
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const stats: TaskStatsType = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return {
      total: tasks.length,
      completed: tasks.filter(task => task.completed).length,
      pending: tasks.filter(task => !task.completed).length,
      completedToday: tasks.filter(task => 
        task.completedAt && 
        task.completedAt >= today
      ).length,
    };
  }, [tasks]);

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-primary">
              <ListChecks className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Do List Module
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize your tasks with style. Add, edit, and track your productivity with our beautiful task management system.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TaskStats stats={stats} />
        </div>

        {/* Add Task Form */}
        <div className="mb-6">
          <AddTaskForm onAdd={addTask} />
        </div>

        {/* Filter and Actions */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Tasks
              </div>
              {stats.completed > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearCompleted}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Completed
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
                className="flex items-center gap-2"
              >
                <ListChecks className="h-4 w-4" />
                All
                <Badge variant="secondary">{stats.total}</Badge>
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
                className="flex items-center gap-2"
              >
                <Circle className="h-4 w-4" />
                Pending
                <Badge variant="secondary">{stats.pending}</Badge>
              </Button>
              <Button
                variant={filter === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('completed')}
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Completed
                <Badge variant="secondary">{stats.completed}</Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-muted rounded-full">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {filter === 'all' && 'No tasks yet'}
                      {filter === 'pending' && 'No pending tasks'}
                      {filter === 'completed' && 'No completed tasks'}
                    </h3>
                    <p className="text-muted-foreground">
                      {filter === 'all' && 'Add your first task to get started!'}
                      {filter === 'pending' && 'All your tasks are completed. Great job!'}
                      {filter === 'completed' && 'Complete some tasks to see them here.'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
