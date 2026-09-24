"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { Workout } from "@/types/apps.typs";

interface PlanContextType {
  todaysPlan: Workout[];
  savedWorkouts: Workout[];

  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  isInPlan: (id: number) => boolean;

  saveWorkout: (workout: Workout) => boolean;
  removeSavedWorkout: (id: number) => void;
  isSaved: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<Workout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedPlan = localStorage.getItem("todaysPlan");

      return savedPlan ? JSON.parse(savedPlan) : [];
    } catch (error) {
      console.error("Failed to load today's plan:", error);
      return [];
    }
  });

  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const savedItems = localStorage.getItem("savedWorkouts");

      return savedItems ? JSON.parse(savedItems) : [];
    } catch (error) {
      console.error("Failed to load saved workouts:", error);
      return [];
    }
  });

  // Save Today's Plan
  useEffect(() => {
    localStorage.setItem(
      "todaysPlan",
      JSON.stringify(todaysPlan)
    );
  }, [todaysPlan]);

  // Save Saved Workouts
  useEffect(() => {
    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(savedWorkouts)
    );
  }, [savedWorkouts]);

  // Add workout to Today's Plan
  const addToPlan = (workout: Workout) => {
    if (todaysPlan.some((item) => item.id === workout.id)) {
      return false;
    }

    if (todaysPlan.length >= 5) {
      return false;
    }

    setTodaysPlan((previous) => [...previous, workout]);

    return true;
  };

  // Remove workout from Today's Plan
  const removeFromPlan = (id: number) => {
    setTodaysPlan((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Check Today's Plan
  const isInPlan = (id: number) => {
    return todaysPlan.some((item) => item.id === id);
  };

  // Save workout
  const saveWorkout = (workout: Workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      return false;
    }

    setSavedWorkouts((previous) => [...previous, workout]);

    return true;
  };

  // Remove saved workout
  const removeSavedWorkout = (id: number) => {
    setSavedWorkouts((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Check saved workout
  const isSaved = (id: number) => {
    return savedWorkouts.some((item) => item.id === id);
  };

  return (
    <PlanContext.Provider
      value={{
        todaysPlan,
        savedWorkouts,

        addToPlan,
        removeFromPlan,
        isInPlan,

        saveWorkout,
        removeSavedWorkout,
        isSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
};