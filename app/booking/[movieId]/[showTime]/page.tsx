"use client";

import { useState, useEffect, use, useMemo } from "react";
import { moviesData } from "../../../data/movies";
import LoadingState from "../../../../components/LoadingState";
import BookingHeader from "../../../../components/BookingHeader";
import Legend from "../../../../components/Legend";
import Screen from "../../../../components/Screen";
import SeatGrid from "../../../../components/SeatGrid";
import SummaryBar from "../../../../components/SummaryBar";

interface PageProps {
  params: Promise<{ movieId: string; showTime: string }>;
}

const TICKET_PRICE = 12;
const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function BookingPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const movieId = resolvedParams?.movieId;
  const showTime = resolvedParams?.showTime;
  const decodedTime = showTime ? decodeURIComponent(showTime) : "";

  const movie = moviesData.find((m) => m.id === movieId);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reservedSeats = useMemo(() => {
    if (!movieId || !showTime) return [];
    
    const seed = movieId + showTime;
    const mockSeats: string[] = [];
    ROWS.forEach((row) => {
      COLS.forEach((col) => {
        const seatId = `${row}-${col}`;
        const charCodeSum = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
        if ((seatId.charCodeAt(0) + col + charCodeSum) % 5 === 0) {
          mockSeats.push(seatId);
        }
      });
    });
    return mockSeats;
  }, [movieId, showTime]);

  const handleSeatClick = (seatId: string) => {
    if (reservedSeats.includes(seatId)) return;

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  if (!isClient || !movie) {
    return <LoadingState />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 text-white p-8">
      <BookingHeader 
        title={movie.title} 
        time={decodedTime} 
        totalPrice={selectedSeats.length * TICKET_PRICE} 
      />

      <Legend />
      <Screen />

      <SeatGrid 
        rows={ROWS} 
        cols={COLS} 
        reservedSeats={reservedSeats} 
        selectedSeats={selectedSeats} 
        onSeatClick={handleSeatClick} 
      />

      {selectedSeats.length > 0 && (
        <SummaryBar selectedSeats={selectedSeats} />
      )}
    </div>
  );
}
