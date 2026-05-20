interface SummaryBarProps {
  selectedSeats: string[];
}

export default function SummaryBar({ selectedSeats }: SummaryBarProps) {
  return (
    <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-400">Selected Seats ({selectedSeats.length}):</p>
        <p className="font-bold text-blue-400 tracking-wide">{selectedSeats.join(", ")}</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors">
        Proceed to Checkout
      </button>
    </div>
  );
}
