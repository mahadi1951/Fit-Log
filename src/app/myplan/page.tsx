"use client";

import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import TodaysPlanCard from "@/components/shared/TodaysPlanCard";
import SavedWorkoutCard from "@/components/shared/SaveWorkoutCard";

type SortBy = "duration" | "caloriesBurned" | "rating";
type ActiveTab = "today" | "saved";

const MyPlanPage = () => {
  const { todaysPlan, savedWorkouts, removeFromPlan, removeSavedWorkout } =
    usePlan();

  const [sortBy, setSortBy] = useState<SortBy>("duration");
  const [activeTab, setActiveTab] = useState<ActiveTab>("today");

  // Current tab er workout
  const currentWorkouts = activeTab === "today" ? todaysPlan : savedWorkouts;

  // Current tab er workout sort
  const sortedWorkouts = useMemo(() => {
    return [...currentWorkouts].sort((a, b) => {
      return Number(b[sortBy]) - Number(a[sortBy]);
    });
  }, [currentWorkouts, sortBy]);

  // Remove workout
  const handleRemove = (id: number) => {
    if (activeTab === "today") {
      removeFromPlan(id);
      toast.info("Workout removed from today's plan.");
    } else {
      removeSavedWorkout(id);
      toast.info("Workout removed from saved.");
    }
  };

  // Today's Plan statistics
  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );

  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned
 || 0),
    0,
  );

  return (
    <main className="min-h-screen bg-[#080A0F] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold tracking-[0.2em] text-[#ccff00]">
            MY WORKOUTS
          </p>

          <h1 className="text-3xl font-black uppercase sm:text-4xl">MY PLAN</h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your workouts and saved exercises.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalExercises}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Minutes
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalMinutes}
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Calories
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalCalories}
            </h2>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex w-full rounded-xl border border-gray-800 bg-[#10131A] p-1 sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`flex-1 rounded-lg px-5 py-2.5 text-sm font-bold uppercase transition sm:flex-none ${
                activeTab === "today"
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Todays Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`flex-1 rounded-lg px-5 py-2.5 text-sm font-bold uppercase transition sm:flex-none ${
                activeTab === "saved"
                  ? "bg-[#ccff00] text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="rounded-xl border border-gray-800 bg-[#10131A] px-4 py-3 text-sm font-semibold text-white outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Sort by Duration</option>
            <option value="caloriesBurned">Sort by Calories</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        {/* Workout List */}
        {sortedWorkouts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-800 bg-[#10131A] py-20 text-center">
            <h2 className="text-xl font-black uppercase text-white">
              NOTHING HERE YET
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              {activeTab === "today"
                ? "Add some workouts to your today's plan."
                : "Save some workouts to see them here."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedWorkouts.map((workout) =>
              activeTab === "today" ? (
                <TodaysPlanCard
                  key={workout.id}
                  workout={workout}
                  onRemove={handleRemove}
                />
              ) : (
                <SavedWorkoutCard
                  key={workout.id}
                  workout={workout}
                  onRemove={handleRemove}
                />
              ),
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;
