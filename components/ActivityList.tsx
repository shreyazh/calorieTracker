import { Activity } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ActivityListProps {
  activities: Array<{
    id: string;
    name: string;
    duration: number;
    intensity: string;
    caloriesBurned: number;
  }>;
  onRemove: (id: string) => void;
}

export function ActivityList({ activities, onRemove }: ActivityListProps) {
  if (activities.length === 0) {
    return (
      <Card className="bg-muted">
        <CardContent className="flex items-center justify-center py-6">
          <p className="text-muted-foreground text-center">No activities added yet. Start by adding an activity above!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="bg-card hover:bg-accent transition-colors">
          <CardContent className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-primary rounded-full p-2">
                <Activity className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <p className="font-medium">{activity.name}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.duration} minutes, {activity.intensity} intensity
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <p className="font-semibold">{activity.caloriesBurned} cal</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove(activity.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <span className="sr-only">Remove activity</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

