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
      toast.info(" Removed from today's plan.");
    } else {
      removeSavedWorkout(id);
      toast.info(" Removed from saved.");
    }
  };

  // Statistics
  const totalExercises = currentWorkouts.length;

  const totalMinutes = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0,
  );
  const handleMarkAsDone = (id: number) => {
    removeFromPlan(id);
    toast.success(" Marked as done!");
  };
  const totalCalories = currentWorkouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
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
          {/* Exercises */}
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Exercises
            </p>

            <h2 className="mt-2 text-3xl font-black text-[#ccff00]">
              {totalExercises}
            </h2>
          </div>

          {/* Minutes */}
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Minutes
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              {totalMinutes}
            </h2>
          </div>

          {/* Calories */}
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Calories
            </p>

            <h2 className="mt-2 text-3xl font-black text-white">
              {totalCalories}
            </h2>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Tabs */}
          <div className="flex w-full rounded-xl border border-gray-800 bg-[#10131A] p-1 sm:w-auto">
            {/* Today's Plan */}
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`flex-1 rounded-4xl px-5 py-2.5 text-sm font-bold uppercase transition sm:flex-none  ${
                activeTab === "today"
                  ? "  bg-gray-100 text-black"
                  : "text-gray-100 hover:text-gray-400 "
              }`}
            >
              Todays Plan
            </button>

            {/* Saved */}
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`flex-1 rounded-4xl px-5 py-2.5 text-sm font-bold uppercase transition sm:flex-none ${
                activeTab === "saved"
                  ? "  bg-gray-100 text-black"
                  : "text-gray-100 hover:text-gray-400"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Right: Sort By */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-400">Sort By</span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                className="cursor-pointer appearance-none rounded-xl border border-gray-800 bg-[#13161c] px-4 py-2 pr-8 text-sm font-medium text-white transition-colors focus:border-gray-600 focus:outline-none"
              >
                <option value="duration">Duration</option>

                <option value="caloriesBurned">Calories</option>

                <option value="rating">Rating</option>
              </select>

              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
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
                  onMarkAsDone={handleMarkAsDone}
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
