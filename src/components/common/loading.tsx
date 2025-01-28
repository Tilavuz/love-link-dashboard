import { Heart } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="relative">
        <Heart className="text-pink-400" size={86} />
        <div className="absolute inset-0 bg-white opacity-50 rounded-full animate-ping"></div>
      </div>
      <p className="mt-8 text-2xl font-semibold text-white">Loading...</p>
    </div>
  );
}
