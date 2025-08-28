import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskStats as TaskStatsType } from "@/types/task";
import { CheckCircle, Circle, Calendar, Target } from "lucide-react";

interface TaskStatsProps {
  stats: TaskStatsType;
}

export const TaskStats = ({ stats }: TaskStatsProps) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="shadow-card border-l-4 border-l-primary bg-gradient-to-r from-primary/5 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            Total Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{stats.total}</div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-l-4 border-l-success bg-gradient-to-r from-success/5 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{stats.completed}</div>
          <p className="text-xs text-muted-foreground">{completionRate}% completion rate</p>
        </CardContent>
      </Card>

      <Card className="shadow-card border-l-4 border-l-warning bg-gradient-to-r from-warning/5 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Circle className="h-4 w-4 text-warning" />
            Pending
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{stats.pending}</div>
        </CardContent>
      </Card>

      <Card className="shadow-card border-l-4 border-l-accent bg-gradient-to-r from-accent/5 to-transparent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4 text-accent" />
            Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{stats.completedToday}</div>
          <p className="text-xs text-muted-foreground">completed today</p>
        </CardContent>
      </Card>
    </div>
  );
};