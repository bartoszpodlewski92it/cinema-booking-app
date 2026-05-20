import SeatButton from "./SeatButton";

interface SeatGridProps {
  rows: string[];
  cols: number[];
  reservedSeats: string[];
  selectedSeats: string[];
  onSeatClick: (id: string) => void;
}

export default function SeatGrid({ rows, cols, reservedSeats, selectedSeats, onSeatClick }: SeatGridProps) {
  return (
    <div className="flex flex-col gap-3 bg-slate-900/50 p-6 rounded-2xl border border-slate-800/60 mb-8">
      {rows.map((row) => (
        <div key={row} className="flex items-center gap-3">
          <span className="w-5 text-sm font-bold text-gray-500 text-center">{row}</span>
          <div className="flex gap-2">
            {cols.map((col) => {
              const seatId = `${row}-${col}`;
              return (
                <SeatButton
                  key={seatId}
                  seatId={seatId}
                  col={col}
                  isReserved={reservedSeats.includes(seatId)}
                  isSelected={selectedSeats.includes(seatId)}
                  onClick={onSeatClick}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
