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
    genre: "Sportowy / Dramat",
    duration: "136 min",
    description: "Trener koszykówki walczy z systemem edukacyjnym.",
    shows: ["14:30", "17:15", "20:00"]
  },
  {
    id: "2",
    title: "Enemy at the Gates",
    genre: "Wojenny/Akcja",
    duration: "131 min",
    description: "Epicki pojedynek dwóch wybitnych snajperów podczas drugiej wojny światowej.",
    shows: ["15:00", "18:00", "21:00"]
  },
  {
    id: "3",
    title: "Gladiator",
    genre: "Akcja/Przygodowy",
    duration: "155 min",
    description: "Gladiator Maximus walczy o wolność, honor i sławę w imperium rzymskim.",
    shows: ["16:00", "19:30"]
  }
];
