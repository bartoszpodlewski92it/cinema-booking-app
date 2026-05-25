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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (name === "") {
      setNameError("");
      return;
    }
    if (name.trim().length < 3) {
      setNameError("Full name must be at least 3 characters long.");
    } else if (!/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+\s[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/.test(name.trim())) {
      setNameError("Please enter both your first and last name (letters only).");
    } else {
      setNameError("");
    }
  }, [name]);

  useEffect(() => {
    if (email === "") {
      setEmailError("");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address (e.g., name@example.com).");
    } else {
      setEmailError("");
    }
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameError || emailError || !name || !email) return;

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
  const isFormInvalid = !!nameError || !!emailError || !name || !email;

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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jan Kowalski"
              className={`w-full bg-slate-950 border rounded-lg py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none transition-colors text-sm ${
                nameError ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-blue-500"
              }`}
            />
            {nameError && <p className="text-red-500 text-xs mt-1 animate-fade-in">{nameError}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jan@kowalski.com"
              className={`w-full bg-slate-950 border rounded-lg py-2.5 px-4 text-white placeholder-gray-600 focus:outline-none transition-colors text-sm ${
                emailError ? "border-red-500 focus:border-red-500" : "border-slate-800 focus:border-blue-500"
              }`}
            />
            {emailError && <p className="text-red-500 text-xs mt-1 animate-fade-in">{emailError}</p>}
          </div>

          <button
            type="submit"
            disabled={isFormInvalid}
            className={`w-full font-bold py-3 rounded-lg shadow-lg transition-all mt-2 text-sm ${
              isFormInvalid
                ? "bg-slate-800 text-gray-500 cursor-not-allowed shadow-none"
                : "bg-blue-600 hover:bg-blue-500 text-white"
            }`}
          >
            Confirm & Pay
          </button>
        </form>
      </main>
    </div>
  );
}
