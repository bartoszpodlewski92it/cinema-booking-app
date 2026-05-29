"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { moviesData } from "../../../../data/movies";
import { formatShowtime } from "../../../../utils/format";
import { OrderSummary } from "../../../../../components/OrderSummary";
import { CheckoutForm } from "../../../../../components/CheckoutForm";

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
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormSubmit = (formData: { name: string; email: string }) => {
    setUserData(formData);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white p-8">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 bg-blue-950 border border-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            🍿
          </div>
          <h1 className="text-3xl font-extrabold text-blue-500 mb-3 tracking-tight">Booking Successful!</h1>
          <p className="text-slate-200 font-semibold mb-2 text-lg">Thank you, {userData.name}!</p>
          <p className="text-gray-400 text-sm mb-4 leading-relaxed">
            Your booking for <span className="text-white font-medium">{movie?.title}</span> has been confirmed.
          </p>
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-6 text-sm">
            <span className="text-gray-500 block text-xs uppercase font-semibold tracking-wider mb-1">Tickets sent to:</span>
            <span className="text-blue-400 font-bold break-all text-base">{userData.email}</span>
          </div>
          <button
            onClick={() => router.push("/")}
            className="w-full bg-slate-800 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg border border-slate-700 hover:border-blue-500 transition-colors text-sm"
          >
            Go Back to Movies
          </button>
        </div>
      </div>
    );
  }

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
        <OrderSummary
          movieId={movieId}
          showTime={showTime}
          movieTitle={movie.title}
          decodedTime={decodedTime}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
        />
        <CheckoutForm onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
}
