"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Dumbbell, Clock, Flame } from "lucide-react";
import { toast } from "react-toastify";

import { usePlan } from "@/context/PlanContext";
import TodaysPlanCard from "@/components/shared/TodaysPlanCard";
import SavedWorkoutCard from "@/components/shared/SaveWorkoutCard";

type SortBy = "duration" | "calories" | "rating";

const MyPlanPage = () => {
  const { todaysPlan, savedWorkouts, removeFromPlan, removeSavedWorkout } =
    usePlan();

  const [sortBy, setSortBy] = useState<SortBy>("duration");
  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const currentWorkouts = activeTab === "today" ? todaysPlan : savedWorkouts;

  // Total exercises
  const totalExercises = todaysPlan.length;

  // Total minutes
  const totalMinutes = todaysPlan.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  // Total calories
  const totalCalories = todaysPlan.reduce(
    (total, workout) => total + Number(workout.calories || 0),
    0,
  );

  // Sort workouts
  const sortedWorkouts = useMemo(() => {
    return [...todaysPlan].sort((a, b) => {
      return b[sortBy] - a[sortBy];
    });
  }, [todaysPlan, sortBy]);

  // Remove workout
  const handleRemove = (id: number) => {
    removeFromPlan(id);

    toast.info("Workout removed from today's plan.");
  };

  return (
    <main className="min-h-screen bg-[#0B0D10] px-3 py-10 text-white sm:px-5 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black uppercase sm:text-5xl">MY PLAN</h1>

          <p className="mt-3 max-w-xl text-sm text-gray-500 sm:text-base">
            Build your workout plan and keep track of your daily training.
          </p>
        </div>

        {/* Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Exercises */}
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm uppercase text-gray-500">Exercises</span>

              <Dumbbell className="h-5 w-5 text-[#ccff00]" />
            </div>

            <h2 className="text-3xl font-black">{totalExercises}</h2>
          </div>

          {/* Minutes */}
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm uppercase text-gray-500">Minutes</span>

              <Clock className="h-5 w-5 text-[#ccff00]" />
            </div>

            <h2 className="text-3xl font-black">{totalMinutes}</h2>
          </div>

          {/* Calories */}
          <div className="rounded-2xl border border-gray-800 bg-[#10131A] p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm uppercase text-gray-500">Calories</span>

              <Flame className="h-5 w-5 text-[#ccff00]" />
            </div>

            <h2 className="text-3xl font-black">{totalCalories}</h2>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-800 pb-4 sm:flex-row sm:items-center">
          {/* Tabs */}
          <div className="flex gap-6">
            {/* Today's Plan */}{" "}
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`border-b-2 pb-2 text-sm font-bold uppercase transition ${activeTab === "today" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-500 hover:text-white"}`}
            >
              {" "}
              Todays Plan{" "}
            </button>{" "}
            {/* Saved */}{" "}
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`border-b-2 pb-2 text-sm font-bold uppercase transition ${activeTab === "saved" ? "border-[#ccff00] text-[#ccff00]" : "border-transparent text-gray-500 hover:text-white"}`}
            >
              {" "}
              Saved{" "}
            </button>
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortBy)}
              className="appearance-none rounded-lg border border-gray-700 bg-[#10131A] px-4 py-2 pr-10 text-sm text-white outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>

              <option value="calories">Calories</option>

              <option value="rating">Rating</option>
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Workout List */}
        {sortedWorkouts.length > 0 ? (
          <div className="space-y-4">
            {sortedWorkouts.map((workout) => (
              <TodaysPlanCard
                key={workout.id}
                workout={workout}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-gray-700 bg-[#10131A] px-5 py-16 text-center">
            <h2 className="text-2xl font-black uppercase">
              Your plan is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-flex rounded-xl bg-[#ccff00] px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-[#b8eb00]"
            >
              Go to workouts
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyPlanPage;
