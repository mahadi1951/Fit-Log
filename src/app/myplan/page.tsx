'use client';

import React, { useState } from 'react';

import { WorkoutCard } from '@/components/shared/WorkCard';
import { Workout } from '@/types/apps.typs';
import { ChevronDown } from 'lucide-react';

interface MyPlanSectionProps {
  workouts?: Workout[];
}

export const MyPlanPage: React.FC<MyPlanSectionProps> = ({ workouts = [] }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>('saved');

  // Calculations based on workouts array
  const totalExercises = workouts.length;
  const totalMinutes = workouts.reduce((sum, item) => sum + item.duration, 0);

  return (
    <div className="w-full max-w-4xl bg-[#0b0d12] text-white p-6 rounded-xl min-h-screen container mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black uppercase tracking-wider">MY PLAN</h1>
        <p className="text-gray-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-[#12141c] rounded-2xl p-6 border border-gray-800 flex justify-between items-center mb-6">
        <div className="flex-1">
          <p className="text-gray-400 text-xs font-semibold mb-1">Exercises</p>
          <p className="text-4xl font-extrabold text-[#ccff00]">{totalExercises}</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-xs font-semibold mb-1">Minutes</p>
          <p className="text-4xl font-extrabold text-white">{totalMinutes}</p>
        </div>
        <div className="flex-1">
          <p className="text-gray-400 text-xs font-semibold mb-1">Calories</p>
          <p className="text-4xl font-extrabold text-white">190</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Toggle Buttons */}
        <div className="bg-[#12141c] p-1 rounded-xl border border-gray-800 flex items-center">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'today'
                ? 'bg-[#1c202d] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Today,s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === 'saved'
                ? 'bg-[#1c202d] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Sort By</span>
          <button className="bg-[#12141c] border border-gray-800 px-3 py-1.5 rounded-lg flex items-center gap-2 text-white font-medium">
            Duration <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      ) : (
        /* Empty State Box */
        <div className="border border-dashed border-gray-800 rounded-2xl py-20 px-4 text-center bg-[#0d0f17]">
          <h2 className="text-xl font-black uppercase tracking-wide mb-2">
            NOTHING HERE YET
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Browse the library and add a lift to get today moving.
          </p>
          <button className="bg-[#ccff00] text-black font-bold px-6 py-2.5 rounded-full hover:bg-[#b3e600] transition-colors">
            Go to workouts
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPlanPage;