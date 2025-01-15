'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CalorieBurnTracker;
var react_1 = require("react");
var useCalorieTracker_1 = require("./hooks/useCalorieTracker");
var calorieCalculations_1 = require("./utils/calorieCalculations");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var ActivityList_1 = require("./components/ActivityList");
var lucide_react_1 = require("lucide-react");
function CalorieBurnTracker() {
    var _a = (0, useCalorieTracker_1.useCalorieTracker)(), activities = _a.activities, addActivity = _a.addActivity, removeActivity = _a.removeActivity, totalCaloriesBurned = _a.totalCaloriesBurned;
    var _b = (0, react_1.useState)(''), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(''), duration = _c[0], setDuration = _c[1];
    var _d = (0, react_1.useState)('medium'), intensity = _d[0], setIntensity = _d[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        if (name && duration) {
            addActivity(name, parseInt(duration), intensity);
            setDuration('');
        }
    };
    return (<div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <card_1.Card className="w-full max-w-2xl mx-auto">
        <card_1.CardHeader className="space-y-1">
          <card_1.CardTitle className="text-3xl font-bold">Calorie Burn Tracker</card_1.CardTitle>
          <card_1.CardDescription>Track your activities and calories burned with precision</card_1.CardDescription>
        </card_1.CardHeader>
        <card_1.CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label_1.Label htmlFor="activity-name">Activity</label_1.Label>
                <select_1.Select value={name} onValueChange={setName}>
                  <select_1.SelectTrigger id="activity-name">
                    <select_1.SelectValue placeholder="Select activity"/>
                  </select_1.SelectTrigger>
                  <select_1.SelectContent>
                    {(0, calorieCalculations_1.getActivities)().map(function (activity) { return (<select_1.SelectItem key={activity} value={activity}>
                        {activity}
                      </select_1.SelectItem>); })}
                  </select_1.SelectContent>
                </select_1.Select>
              </div>
              <div className="space-y-2">
                <label_1.Label htmlFor="duration">Duration (minutes)</label_1.Label>
                <input_1.Input id="duration" type="number" placeholder="30" value={duration} onChange={function (e) { return setDuration(e.target.value); }} required/>
              </div>
            </div>
            <div className="space-y-2">
              <label_1.Label htmlFor="intensity">Intensity</label_1.Label>
              <select_1.Select value={intensity} onValueChange={setIntensity}>
                <select_1.SelectTrigger id="intensity">
                  <select_1.SelectValue placeholder="Select intensity"/>
                </select_1.SelectTrigger>
                <select_1.SelectContent>
                  <select_1.SelectItem value="low">Low</select_1.SelectItem>
                  <select_1.SelectItem value="medium">Medium</select_1.SelectItem>
                  <select_1.SelectItem value="high">High</select_1.SelectItem>
                </select_1.SelectContent>
              </select_1.Select>
            </div>
            <button_1.Button type="submit" className="w-full">Add Activity</button_1.Button>
          </form>

          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Your Activities</h3>
            <ActivityList_1.ActivityList activities={activities} onRemove={removeActivity}/>
          </div>
        </card_1.CardContent>
        <card_1.CardFooter>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <lucide_react_1.Flame className="h-5 w-5 text-orange-500"/>
                <span className="text-lg font-semibold">Total Calories Burned</span>
              </div>
              <span className="text-2xl font-bold">{totalCaloriesBurned}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <card_1.Card>
                <card_1.CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <lucide_react_1.TrendingUp className="h-5 w-5 text-green-500"/>
                    <span className="font-medium">Activities</span>
                  </div>
                  <span className="text-2xl font-semibold">{activities.length}</span>
                </card_1.CardContent>
              </card_1.Card>
              <card_1.Card>
                <card_1.CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-2">
                    <lucide_react_1.Zap className="h-5 w-5 text-yellow-500"/>
                    <span className="font-medium">Avg. Intensity</span>
                  </div>
                  <span className="text-2xl font-semibold">
                    {activities.length > 0
            ? (activities.reduce(function (sum, activity) {
                var intensityValues = { low: 1, medium: 2, high: 3 };
                return sum + intensityValues[activity.intensity];
            }, 0) / activities.length).toFixed(1)
            : '-'}
                  </span>
                </card_1.CardContent>
              </card_1.Card>
            </div>
          </div>
        </card_1.CardFooter>
      </card_1.Card>
    </div>);
}
