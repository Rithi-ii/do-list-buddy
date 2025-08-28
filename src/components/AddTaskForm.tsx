import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

export const AddTaskForm = ({ onAdd }: AddTaskFormProps) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <Card className="shadow-card border-2 border-dashed border-primary/30 hover:border-primary/50 transition-smooth bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 border-primary/20 focus:border-primary/50"
          />
          <Button type="submit" variant="default" className="px-6">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};