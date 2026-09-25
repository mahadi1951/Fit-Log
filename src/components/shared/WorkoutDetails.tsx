"use client";

import React from "react";
import Image from "next/image";
import { Calendar, Bookmark, Clock, Flame, Star } from "lucide-react";
import { toast } from "react-toastify";
import { Workout } from "@/types/apps.typs";
import { usePlan } from "@/context/PlanContext";

interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  const { addToPlan, isInPlan, todaysPlan, saveWorkout, isSaved } = usePlan();
  const alreadySaved = isSaved(workout.id);
  const alreadyAdded = isInPlan(workout.id);
  const planIsFull = todaysPlan.length >= 5;

  const handleSaveWorkout = () => {
    if (alreadySaved) {
      toast.info(" Already saved!");
      return;
    }

    const saved = saveWorkout(workout);

    if (saved) {
      toast.success(" Saved for later!");
    }
  };

  const handleAddToPlan = () => {
    if (alreadyAdded) {
      toast.info(" Already in today's plan!");
      return;
    }

    if (planIsFull) {
      toast.info("Today's plan can contain maximum 5 workouts!");
      return;
    }

    const added = addToPlan(workout);

    if (added) {
      toast.success(" Added to today's plan!");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0d12] px-3 py-3 text-white sm:px-5 lg:px-3">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 rounded-3xl border border-gray-800 bg-[#0d0f17] p-4 sm:p-6 lg:grid-cols-2">
        {/* Image */}
        <div className="relative h-[350px] w-full overflow-hidden rounded-2xl sm:h-[450px] lg:h-[600px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-between lg:h-[600px]">
          <div>
            {/* Title */}
            <h1 className="mb-2 text-3xl font-black uppercase tracking-wide sm:text-4xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mb-3 text-sm leading-relaxed text-gray-400">
              {workout.description}
            </p>

            {/* Muscle Groups */}
            <div className="mb-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="mb-4 space-y-2 rounded-2xl border border-gray-800/80 bg-[#12141c] p-4">
              {/* Equipment */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-sm text-gray-500">Equipment</span>

                <span className="text-right text-sm font-semibold">
                  {workout.equipment}
                </span>
              </div>

              {/* Difficulty */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-sm text-gray-500">Difficulty</span>

                <span className="text-sm font-semibold capitalize">
                  {workout.difficulty}
                </span>
              </div>

              {/* Sets */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-sm text-gray-500">Sets</span>

                <span className="text-sm font-semibold">{workout.sets}</span>
              </div>

              {/* Reps */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="text-sm text-gray-500">Reps</span>

                <span className="text-sm font-semibold">{workout.reps}</span>
              </div>

              {/* Duration */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  Duration
                </span>

                <span className="text-sm font-semibold">
                  {workout.duration} min
                </span>
              </div>

              {/* Calories */}
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Flame className="h-4 w-4" />
                  Calories
                </span>

                <span className="text-sm font-semibold">
                  {workout.caloriesBurned || 0} kcal
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Star className="h-4 w-4" />
                  Rating
                </span>

                <span className="text-sm font-semibold">{workout.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            {workout.instructions?.length > 0 && (
              <div>
                <h3 className="mb-2 text-lg font-black uppercase">
                  Instructions
                </h3>

                <ol className="list-inside list-decimal space-y-1 text-xs leading-relaxed text-gray-400">
                  {workout.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2 pt-4 sm:flex-row">
            {/* Add To Plan */}
            <button
              type="button"
              onClick={handleAddToPlan}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold  transition bg-[#ccff00b0] text-white`}
            >
              <Calendar className="h-5 w-5" /> Add to {`today's`} plan
            </button>

            {/* Save */}
            <button
              type="button"
              onClick={handleSaveWorkout}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold  transition hover:bg-[#ccff0056]
              `}
            >
              <Bookmark className="h-5 w-5" />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetails;
