import { moviesData } from "./data/movies";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 text-white p-8">
      <header className="text-center my-10">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2 tracking-tight">
          Kino "DevCinema"
        </h1>
        <p className="text-gray-400 text-lg">
          Wybierz film i godzinę seansu, aby rozpocząć rezerwację miejsca
        </p>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {moviesData.map((movie) => (
          <div 
            key={movie.id} 
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between hover:border-blue-500 transition-colors"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full">
                {movie.genre}
              </span>
              <h2 className="text-2xl font-bold mt-3 mb-1 text-slate-100">{movie.title}</h2>
              <p className="text-xs text-gray-500 mb-3">Czas trwania: {movie.duration}</p>
              <p className="text-sm text-gray-400 leading-relaxed mb-6">{movie.description}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Dostępne seanse:</p>
              <div className="flex flex-wrap gap-2">
                {movie.shows.map((show) => (
                  <button 
                    key={show}
                    className="bg-slate-800 hover:bg-blue-600 text-sm font-semibold py-2 px-4 rounded-lg transition-colors border border-slate-700"
                  >
                    {show}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
