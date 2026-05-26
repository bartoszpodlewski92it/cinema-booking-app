"use client";

import { use, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { moviesData } from "../../../../data/movies";
import { formatShowtime } from "../../../../utils/format";
import { LoadingSpinner } from "../../../../../components/LoadingSpinner";
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

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleBookingSubmit = (formData: { name: string; email: string }) => {

    alert("Booking successful! Check your email for tickets. 🍿");
    router.push("/");
  };

  if (!isClient || !movie || selectedSeats.length === 0) {
    return <LoadingSpinner />;
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

        <CheckoutForm onSubmit={handleBookingSubmit} />

      </main>
    </div>
  );
}