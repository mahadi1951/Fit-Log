import WorkoutDetails from "@/components/shared/WorkoutDetails";

const WorkoutDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`
  );

  if (!res.ok) {
    throw new Error('Workout not found');
  }

  const workout = await res.json();

  return <WorkoutDetails workout={workout} />;
};

export default WorkoutDetailsPage;