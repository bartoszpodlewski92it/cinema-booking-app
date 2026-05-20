interface SeatButtonProps {
  seatId: string;
  col: number;
  isReserved: boolean;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export default function SeatButton({ seatId, col, isReserved, isSelected, onClick }: SeatButtonProps) {
  return (
    <button
      disabled={isReserved}
      onClick={() => onClick(seatId)}
      className={`
        w-8 h-8 rounded-t-lg text-xs font-semibold flex items-center justify-center transition-all
        ${isReserved 
          ? "bg-red-950/40 text-red-500 border border-red-900/50 cursor-not-allowed" 
          : isSelected
            ? "bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] scale-105"
            : "bg-slate-800 hover:bg-slate-700 text-gray-400 border border-slate-700"
        }
      `}
      title={`Seat ${seatId}`}
    >
      {col}
    </button>
  );
}
