interface ActivityData {
  name: string;
  caloriesPerMinute: {
    low: number;
    medium: number;
    high: number;
  };
}

const activities: ActivityData[] = [
  { name: "Running", caloriesPerMinute: { low: 8, medium: 11.5, high: 16 } },
  { name: "Cycling", caloriesPerMinute: { low: 4, medium: 8, high: 12 } },
  { name: "Swimming", caloriesPerMinute: { low: 6, medium: 8.3, high: 10 } },
  { name: "Walking", caloriesPerMinute: { low: 3, medium: 4, high: 5 } },
  { name: "Weight Training", caloriesPerMinute: { low: 3, medium: 5, high: 7 } },
  { name: "Yoga", caloriesPerMinute: { low: 2, medium: 3.5, high: 5 } },
  { name: "Dancing", caloriesPerMinute: { low: 3, medium: 5, high: 7 } },
  { name: "Basketball", caloriesPerMinute: { low: 5, medium: 7, high: 9 } },
  { name: "Tennis", caloriesPerMinute: { low: 5, medium: 7, high: 9 } },
  { name: "Rowing", caloriesPerMinute: { low: 6, medium: 8.5, high: 12 } },
];

export function calculateCaloriesBurned(activity: string, duration: number, intensity: string): number {
  const activityData = activities.find(a => a.name === activity);
  if (!activityData) return 0;

  const caloriesPerMinute = activityData.caloriesPerMinute[intensity as keyof typeof activityData.caloriesPerMinute] || activityData.caloriesPerMinute.medium;
  return Math.round(duration * caloriesPerMinute);
}

export function getActivities(): string[] {
  return activities.map(a => a.name);
}

