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
    <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-gray-800/80 bg-[#0d0f14] p-3 text-white shadow-lg">
      {/* Left side: Image & Workout Info */}
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="relative h-30 w-32 shrink-0 overflow-hidden rounded-xl border border-gray-800">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-white">
            {workout.name}
          </h3>

          <p className="text-xs font-medium text-gray-400">
            {workout.equipment}
          </p>

          {/* Stats */}
          <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-[#ccff00]">
            <span className="flex items-center gap-1 text-gray-300">
              <Clock className="h-3.5 w-3.5 text-[#ccff00]" />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1 text-gray-300">
              <Flame className="h-3.5 w-3.5 text-[#ccff00]" />
              {workout.caloriesBurned || 0} kcal
            </span>

            <span className="flex items-center gap-1 text-gray-300">
              <Star className="h-3.5 w-3.5 text-[#ccff00]" />
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center gap-3">
        {/* View Details Button */}
        <Link
          href={`/Workouts/${workout.id}`}
          className="rounded-full border border-gray-700 bg-[#141822] px-4 py-2 text-xs font-medium text-gray-200 transition hover:border-gray-500 hover:text-white"
        >
          View Details
        </Link>

        {/* Mark as Done Button */}
        <button
          type="button"
          onClick={() => onMarkAsDone && onMarkAsDone(workout.id)}
          className="flex items-center gap-1.5 rounded-full bg-[#ccff00] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#b8e600]"
        >
          <Check className="h-4 w-4 stroke-[3]" />
          Mark as Done
        </button>

        {/* Remove Button */}
        <button
          type="button"
          onClick={() => onRemove(workout.id)}
          className="ml-1 text-gray-500 transition hover:text-gray-300"
          aria-label="Remove workout"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default TodaysPlanCard;
