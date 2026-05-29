export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  description: string;
  shows: string[];
}

export const moviesData: Movie[] = [
  {
    id: "1",
    title: "Coach Carter",
    genre: "Sports / Drama",
    duration: "136 min",
    description: "Basketball coach fights the education system.",
    shows: ["14:30", "17:15", "20:00"]
  },
  {
    id: "2",
    title: "Enemy at the Gates",
    genre: "War / Action",
    duration: "131 min",
    description: "Epic battle between two renowned snipers during World War II.",
    shows: ["15:00", "18:00", "21:00"]
  },
  {
    id: "3",
    title: "Gladiator",
    genre: "Action / Adventure",
    duration: "155 min",
    description: "Gladiator Maximus fights for freedom, honor, and glory in the Roman Empire.",
    shows: ["16:00", "19:30"]
  }
];
