
import { Workout } from "@/types/apps.typs";
import { WorkoutCard } from "../shared/WorkCard";


const LibraryApp = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");

  if (!res.ok) {
    throw new Error("Failed to fetch workout data");
  }

  const workouts: Workout[] = await res.json();

  return (
    <div className="container mx-auto px-3 py-10 sm:px-5 lg:px-0">
      {/* Library Header */}
      <div className=" text-center lg:text-left md:text-left">
        <h2 className="max-w-[430px] text-3xl sm:text-4xl lg:text-[32px] leading-[0.9] font-black  text-white">
          THE LIBRARY
        </h2>

        <p className="mt-4  text-gray-400 text-sm mb-4 line-clamp-1">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Workout Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default LibraryApp;
