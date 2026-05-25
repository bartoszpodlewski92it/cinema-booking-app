export default function Legend() {
  const baseSeatClass = "w-5 h-5 rounded-t font-semibold flex items-center justify-center text-[10px]";

  return (
    <div className="flex gap-6 mb-8 text-sm bg-slate-900 px-6 py-3 rounded-xl border border-slate-800">
      <div className="flex items-center gap-2">
        <div className={`${baseSeatClass} bg-slate-800 border border-slate-700 text-gray-400`}>x</div>
        <span className="text-gray-400">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`${baseSeatClass} bg-blue-500 text-white shadow-[0_0_5px_rgba(59,130,246,0.5)]`}>x</div>
        <span className="text-gray-400">Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`${baseSeatClass} bg-red-950/40 border border-red-900/50 text-red-500 cursor-not-allowed`}>x</div>
        <span className="text-gray-400">Occupied</span>
      </div>
    </div>
  );
}
