"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, Star, X } from "lucide-react";

import { Workout } from "@/types/apps.typs";

interface TodaysPlanCardProps {
  workout: Workout;
  onRemove: (id: number) => void;
  onMarkAsDone?: (id: number) => void;
}

const TodaysPlanCard = ({
  workout,
  onRemove,
  onMarkAsDone,
}: TodaysPlanCardProps) => {
  return (
    <div
      className="
        flex w-full flex-col gap-4
        rounded-2xl border border-gray-800/80
        bg-[#0d0f14] p-3 text-white shadow-lg
        sm:p-4
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* Left Side: Image + Workout Info */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        {/* Image */}
        <div
          className="
            relative h-24 w-24 shrink-0
            overflow-hidden rounded-xl border border-gray-800
            sm:h-28 sm:w-32
            md:h-28 md:w-32
            lg:h-30 lg:w-32
          "
        >
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="
              (max-width: 640px) 96px,
              (max-width: 768px) 128px,
              128px
            "
            className="object-cover"
          />
        </div>

        {/* Workout Info */}
        <div className="min-w-0 flex-1">
          <h3
            className="
              truncate text-sm font-extrabold uppercase
              tracking-wide text-white
              sm:text-base
            "
          >
            {workout.name}
          </h3>

          <p className="mt-1 truncate text-xs font-medium text-gray-400">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div
            className="
              mt-2 flex flex-wrap items-center
              gap-x-3 gap-y-1 text-xs font-semibold
            "
          >
            {/* Duration */}
            <span className="flex items-center gap-1 text-gray-300">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#ccff00]" />
              {workout.duration} min
            </span>

            {/* Calories */}
            <span className="flex items-center gap-1 text-gray-300">
              <Flame className="h-3.5 w-3.5 shrink-0 text-[#ccff00]" />
              {workout.caloriesBurned || 0} kcal
            </span>

            {/* Rating */}
            <span className="flex items-center gap-1 text-gray-300">
              <Star className="h-3.5 w-3.5 shrink-0 text-[#ccff00]" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: Actions */}
      <div
        className="
          flex w-full items-center gap-2
          md:w-auto md:shrink-0
        "
      >
        {/* View Details */}
        <Link
          href={`/Workouts/${workout.id}`}
          className="
            flex flex-1 items-center justify-center
            rounded-full border border-gray-700
            bg-[#141822] px-3 py-2.5
            text-xs font-medium text-gray-200
            transition
            hover:border-gray-500 hover:text-white
            sm:px-4
            sm:flex-none
          "
        >
          View Details
        </Link>

        {/* Mark as Done */}
        <button
          type="button"
          onClick={() => onMarkAsDone?.(workout.id)}
          className="
            flex flex-1 items-center justify-center gap-1.5
            rounded-full bg-[#ccff00]
            px-3 py-2.5
            text-xs font-bold text-black
            transition
            hover:bg-[#b8e600]
            sm:flex-none sm:px-4
          "
        >
          <Check className="h-4 w-4 shrink-0 stroke-[3]" />
          <span className="whitespace-nowrap">Mark as Done</span>
        </button>

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="
            flex h-10 w-10 shrink-0
            items-center justify-center
            rounded-full text-gray-500
            transition
            hover:bg-[#171A20] hover:text-white
          "
          aria-label="Remove workout"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TodaysPlanCard;
