import Link from "next/link";

interface BookingHeaderProps {
  title: string;
  time: string;
  totalPrice: number;
}

export default function BookingHeader({ title, time, totalPrice }: BookingHeaderProps) {
  return (
    <header className="w-full max-w-4xl flex justify-between items-center mb-10 border-b border-slate-800 pb-4">
      <div>
        <Link href="/" className="text-sm text-blue-400 hover:underline">← Back to movies</Link>
        <h1 className="text-3xl font-bold mt-2">{title}</h1>
        <p className="text-gray-400 text-sm">
          Showtime: <span className="text-blue-400 font-semibold">{time}</span>
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500 uppercase">Total Price</p>
        <p className="text-2xl font-extrabold text-green-400">${totalPrice}</p>
      </div>
    </header>
  );
}
