'use client'

import { useState } from 'react'
import { useCalorieTracker } from './hooks/useCalorieTracker'
import { getActivities } from './utils/calorieCalculations'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivityList } from './components/ActivityList'
import { Flame, TrendingUp, Zap } from 'lucide-react'

export default function CalorieBurnTracker() {
  const { activities, addActivity, removeActivity, totalCaloriesBurned } = useCalorieTracker()
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [intensity, setIntensity] = useState('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && duration) {
      addActivity(name, parseInt(duration), intensity)
      setDuration('')
    }
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Calorie Burn Tracker</CardTitle>
          <CardDescription>Track your activities and calories burned with precision</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="activity-name">Activity</Label>
                <Select value={name} onValueChange={setName}>
                  <SelectTrigger id="activity-name">
                    <SelectValue placeholder="Select activity" />
                  </SelectTrigger>
                  <SelectContent>
                    {getActivities().map((activity) => (
                      <SelectItem key={activity} value={activity}>
                        {activity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="intensity">Intensity</Label>
              <Select value={intensity} onValueChange={setIntensity}>
                <SelectTrigger id="intensity">
                  <SelectValue placeholder="Select intensity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">Add Activity</Button>
          </form>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Your Activities</h3>
            <ActivityList activities={activities} onRemove={removeActivity} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <span className="text-lg font-semibold">Total Calories Burned</span>
              </div>
              <span className="text-2xl font-bold">{totalCaloriesBurned}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span className="font-medium">Activities</span>
                  </div>
                  <span className="text-2xl font-semibold">{activities.length}</span>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Avg. Intensity</span>
                  </div>
                  <span className="text-2xl font-semibold">
                    {activities.length > 0
                      ? (activities.reduce((sum, activity) => {
                          const intensityValues = { low: 1, medium: 2, high: 3 };
                          return sum + intensityValues[activity.intensity as keyof typeof intensityValues];
                        }, 0) / activities.length).toFixed(1)
                      : '-'}
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

