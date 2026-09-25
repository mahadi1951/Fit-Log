"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

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

// Server Snapshot

const EMPTY_WORKOUTS: Workout[] = [];

// Storage Store

type StoreListener = () => void;

const createStorageStore = (key: string) => {
  let value: Workout[] = [];
  const listeners = new Set<StoreListener>();

  const getSnapshot = () => {
    return value;
  };

  const getServerSnapshot = () => {
    return EMPTY_WORKOUTS;
  };

  const subscribe = (listener: StoreListener) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const load = () => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const storedData = localStorage.getItem(key);

      if (storedData) {
        value = JSON.parse(storedData) as Workout[];
      } else {
        value = [];
      }

      listeners.forEach((listener) => listener());
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);

      value = [];

      listeners.forEach((listener) => listener());
    }
  };

  const update = (newValue: Workout[]) => {
    value = newValue;

    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(newValue));
    }

    listeners.forEach((listener) => listener());
  };

  return {
    getSnapshot,
    getServerSnapshot,
    subscribe,
    load,
    update,
  };
};

// Create Stores

const todaysPlanStore = createStorageStore("todaysPlan");

const savedWorkoutsStore = createStorageStore("savedWorkouts");

// Plan Provider

export const PlanProvider = ({ children }: { children: React.ReactNode }) => {
  const todaysPlan = useSyncExternalStore(
    todaysPlanStore.subscribe,
    todaysPlanStore.getSnapshot,
    todaysPlanStore.getServerSnapshot,
  );

  const savedWorkouts = useSyncExternalStore(
    savedWorkoutsStore.subscribe,
    savedWorkoutsStore.getSnapshot,
    savedWorkoutsStore.getServerSnapshot,
  );

  // Load localStorage after browser starts

  React.useEffect(() => {
    todaysPlanStore.load();
    savedWorkoutsStore.load();
  }, []);

  // Add to Today's Plan

  const addToPlan = (workout: Workout): boolean => {
    if (todaysPlan.some((item) => item.id === workout.id)) {
      return false;
    }

    if (todaysPlan.length >= 5) {
      return false;
    }

    todaysPlanStore.update([...todaysPlan, workout]);

    return true;
  };

  // Remove from Today's Plan

  const removeFromPlan = (id: number) => {
    const updatedPlan = todaysPlan.filter((item) => item.id !== id);

    todaysPlanStore.update(updatedPlan);
  };

  // Check Today's Plan

  const isInPlan = (id: number) => {
    return todaysPlan.some((item) => item.id === id);
  };

  // Save Workout

  const saveWorkout = (workout: Workout): boolean => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      return false;
    }

    savedWorkoutsStore.update([...savedWorkouts, workout]);

    return true;
  };

  // Remove Saved Workout

  const removeSavedWorkout = (id: number) => {
    const updatedSavedWorkouts = savedWorkouts.filter((item) => item.id !== id);

    savedWorkoutsStore.update(updatedSavedWorkouts);
  };

  // Check Saved Workout

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

// usePlan Hook

export const usePlan = () => {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
};
