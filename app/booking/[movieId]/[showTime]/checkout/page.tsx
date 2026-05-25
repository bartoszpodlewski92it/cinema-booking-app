"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { moviesData } from "../../../../data/movies";
import { formatShowtime } from "../../../../utils/format";
import Link from "next/link";

interface PageProps {
  params: Promise<{ movieId: string; showTime: string }>;
}

const TICKET_PRICE = 12;

export default function CheckoutPage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);

  const movieId = resolvedParams?.movieId;
  const showTime = resolvedParams?.showTime;
  const decodedTime = formatShowtime(showTime);

  const movie = moviesData.find((m) => m.id === movieId);
  const seatsParam = searchParams.get("seats");
  const selectedSeats = seatsParam ? seatsParam.split(",") : [];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking successful! Check your email for tickets. 🍿");
    router.push("/");
  };

  if (!isClient || !movie || selectedSeats.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-gray-400 animate-pulse">Loading checkout data...</p>
      </div>
    );
  }

  const totalPrice = selectedSeats.length * TICKET_PRICE;

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 text-white p-8">
      <main className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mt-10">
        <div className="mb-6">
          <Link href={`/booking/${movieId}/${showTime}`} className="text-sm text-blue-400 hover:underline">
            ← Change seats
          </Link>
          <h1 className="text-3xl font-bold mt-2 text-blue-500 tracking-tight">Order Summary</h1>
        </div>

        <div className="space-y-3 border-b border-slate-800 pb-5 mb-5 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Movie:</span>
            <span className="font-semibold text-slate-200">{movie.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Showtime:</span>
            <span className="font-semibold text-slate-200">{decodedTime}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-500">Selected Seats:</span>
            <span className="font-bold text-blue-400 tracking-wide text-right max-w-[200px] break-words">
              {selectedSeats.join(", ")}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800/50">
            <span className="text-gray-400 text-base">Total Amount:</span>
            <span className="text-green-400 font-extrabold text-xl">${totalPrice}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-lg transition-colors mt-2 text-sm"
          >
            Confirm & Pay
          </button>
        </form>
      </main>
    </div>
  );
}
