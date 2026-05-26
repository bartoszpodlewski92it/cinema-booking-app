import Link from "next/link";

interface OrderSummaryProps {
  movieId: string;
  showTime: string;
  movieTitle: string;
  decodedTime: string;
  selectedSeats: string[];
  totalPrice: number;
}

export function OrderSummary({
  movieId,
  showTime,
  movieTitle,
  decodedTime,
  selectedSeats,
  totalPrice,
}: OrderSummaryProps) {
  return (
    <div className="mb-6">
      <div className="mb-6">
        <Link href={`/booking/${movieId}/${showTime}`} className="text-sm text-blue-400 hover:underline">
          ← Change seats
        </Link>
        <h1 className="text-3xl font-bold mt-2 text-blue-500 tracking-tight">Order Summary</h1>
      </div>

      <div className="space-y-3 border-b border-slate-800 pb-5 mb-5 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Movie:</span>
          <span className="font-semibold text-slate-200">{movieTitle}</span>
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
    </div>
  );
}