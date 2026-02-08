import axiosInstance from "@/api/api";
import { ShieldCheck, ShieldX, User, Hash } from "lucide-react";

const GetTicketInfo = async ({ params }) => {
  const { id } = params;

  const getData = async () => {
    try {
      return await axiosInstance.get("/booking/book/");
    } catch (error) {
      return null;
    }
  };

  const data = await getData();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md w-full rounded-2xl border border-red-200 bg-white p-6 text-center shadow-lg">
          <ShieldX className="mx-auto mb-4 h-14 w-14 text-red-600" />
          <h1 className="text-xl font-semibold text-red-700">Invalid Ticket</h1>
          <p className="mt-2 text-sm text-gray-600">This ID does not have a valid booking.</p>

          <div className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700">Ticket ID: {id}</div>
        </div>
      </div>
    );
  }

  const { isBooked, name, year, moodleID } = data;

  // ✅ BOOKED / VALID UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="max-w-md w-full rounded-2xl border border-green-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-3">
          <ShieldCheck className="h-10 w-10 text-green-600" />
          <div>
            <h1 className="text-xl font-semibold text-green-700">Ticket Verified</h1>
            <p className="text-sm text-gray-500">Access granted</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Name:</span>
            <span className="ml-auto">{name}</span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
            <Hash className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Year:</span>
            <span className="ml-auto">{year}</span>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
            <Hash className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Moodle ID:</span>
            <span className="ml-auto">{moodleID}</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-green-100 px-4 py-2 text-center text-sm font-medium text-green-700">
          Ticket ID: {id}
        </div>
      </div>
    </div>
  );
};

export default GetTicketInfo;
