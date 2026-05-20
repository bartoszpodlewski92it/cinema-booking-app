export default function Legend() {
  return (
    <div className="flex gap-6 mb-8 text-sm bg-slate-900 px-6 py-3 rounded-xl border border-slate-800">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-slate-800 border border-slate-700 rounded"></div>
        <span className="text-gray-400">Available</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-blue-500 rounded"></div>
        <span className="text-gray-400">Selected</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-red-950/40 border border-red-900/50 rounded cursor-not-allowed"></div>
        <span className="text-gray-400">Occupied</span>
      </div>
    </div>
  );
}
