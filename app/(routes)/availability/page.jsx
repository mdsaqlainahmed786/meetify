import { getAvailability } from "../../../actions/availability";
import { defaultAvailability } from "./data";
import AvailabilityForm from "./_components/AvailabilityForm";
export default async function Availability() {
  const availability = await getAvailability();
  return (
    <div className="w-full space-y-5 lg:w-[80%] lg:p-5">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-400 text-center pt-5 lg:text-6xl lg:text-left">
        Availability
      </h1>
      <AvailabilityForm initialData={availability || defaultAvailability} />
    </div>
  );
}
