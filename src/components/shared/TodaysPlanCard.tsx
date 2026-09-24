"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, X } from "lucide-react";

import { Workout } from "@/types/apps.typs";

interface TodaysPlanCardProps {
  workout: Workout;
  onRemove: (id: number) => void;
}

const TodaysPlanCard = ({ workout, onRemove }: TodaysPlanCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-800 bg-[#10131A] p-4 sm:flex-row">
      {/* Image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl sm:h-32 sm:w-44">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-black uppercase">{workout.name}</h3>

              <p className="mt-1 text-sm text-gray-500">{workout.equipment}</p>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => onRemove(workout.id)}
              className="rounded-full p-2 text-gray-500 transition hover:bg-red-500/10 hover:text-red-400"
              aria-label="Remove workout"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1">
              <Flame className="h-4 w-4" />
              {workout.calories || 0 } kcal
            </span>

            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {workout.rating}
            </span>
          </div>
        </div>

        {/* View Details */}
        <div className="mt-4">
          <Link
            href={`/workout/${workout.id}`}
            className="inline-flex rounded-lg border border-gray-700 px-4 py-2 text-xs font-bold uppercase transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TodaysPlanCard;
