import React from "react";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/apps.typs";
import Link from "next/link";

interface WorkoutCardProps {
  workout: Workout;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Link href={`/Workouts/${workout.id}`}>
      <div className="w-full bg-[#12141a] text-white rounded-2xl overflow-hidden border border-gray-800 p-3 shadow-lg">
        {/* Image */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Muscle Groups */}
          <div className="flex flex-wrap gap-2 mb-3">
            {workout.muscleGroups.map((group, index) => (
              <span
                key={index}
                className="bg-[#ccff00] text-black text-xs font-bold px-3 py-1 rounded-full uppercase"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3 className="text-xl font-black tracking-wide uppercase mb-1">
            {workout.name}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-1">
            {workout.description}
          </p>

          <hr className="border-gray-800 mb-3" />

          {/* Workout Info */}
          <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{workout.duration} min</span>
            </div>

            {/* Difficulty */}
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 fill-current" />
              <span className="capitalize">{workout.caloriesBurned} kcal </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
