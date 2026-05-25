import { useRouter, useParams } from "next/navigation";

interface SummaryBarProps {
  selectedSeats: string[];
}

export default function SummaryBar({ selectedSeats }: SummaryBarProps) {
  const router = useRouter();
  const params = useParams();

  const handleCheckout = () => {
    const movieId = params.movieId;
    const showTime = params.showTime;
    
    const seatsQuery = selectedSeats.join(",");
    
    router.push(`/booking/${movieId}/${showTime}/checkout?seats=${seatsQuery}`);
  };

  return (
    <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center animate-fade-in">
      <div>
        <p className="text-sm text-gray-400">Selected Seats ({selectedSeats.length}):</p>
        <p className="font-bold text-blue-400 tracking-wide">{selectedSeats.join(", ")}</p>
      </div>
      <button 
        onClick={handleCheckout}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors text-sm"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
