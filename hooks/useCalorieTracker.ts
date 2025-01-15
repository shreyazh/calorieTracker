import { useState } from 'react';
import { calculateCaloriesBurned } from '../utils/calorieCalculations';

interface Activity {
  id: string;
  name: string;
  duration: number;
  intensity: string;
  caloriesBurned: number;
}

export function useCalorieTracker() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (name: string, duration: number, intensity: string) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      name,
      duration,
      intensity,
      caloriesBurned: calculateCaloriesBurned(name, duration, intensity)
    };
    setActivities([...activities, newActivity]);
  };

  const removeActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const totalCaloriesBurned = activities.reduce((total, activity) => total + activity.caloriesBurned, 0);

  return { activities, addActivity, removeActivity, totalCaloriesBurned };
}

