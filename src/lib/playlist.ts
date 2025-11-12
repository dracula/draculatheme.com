export interface Character {
  id: string;
  displayName: string;
  imageUrl: string;
}

export interface Track {
  trackNumber: number;
  originalTitle: string;
  artist: string;
  thematicTitle: string;
  character: Character;
  songUrl: string;
}

const characters: Record<string, Character> = {
  blade: {
    id: "blade",
    displayName: "Blade",
    imageUrl: "/images/radio/blade.png"
  },
  buffy: {
    id: "buffy",
    displayName: "Buffy",
    imageUrl: "/images/radio/buffy.png"
  },
  lincoln: {
    id: "lincoln",
    displayName: "Abraham Lincoln",
    imageUrl: "/images/radio/lincoln.png"
  },
  morbius: {
    id: "morbius",
    displayName: "Morbius",
    imageUrl: "/images/radio/morbius.png"
  },
  vanHelsing: {
    id: "van-helsing",
    displayName: "Van Helsing",
    imageUrl: "/images/radio/van-helsing.png"
  },
  alucard: {
    id: "alucard",
    displayName: "Alucard",
    imageUrl: "/images/radio/alucard.png"
  }
};

export const playlist: Track[] = [
  {
    trackNumber: 1,
    originalTitle: "And So I Float on Cloud Become Water",
    artist: "Kyle Preston",
    thematicTitle: "Mist Over Transylvania",
    character: characters.morbius,
    songUrl: "/musics/kyle-preston-and-so-i-float-on-cloud-become-water.mp3"
  },
  {
    trackNumber: 2,
    originalTitle: "Many Years Ago",
    artist: "idokay",
    thematicTitle: "The Blood Oath of 1865",
    character: characters.lincoln,
    songUrl: "/musics/idokay-many-years-ago.mp3"
  },
  {
    trackNumber: 3,
    originalTitle: "Story Unfolds",
    artist: "FableForte",
    thematicTitle: "Van Helsing's Dossier",
    character: characters.vanHelsing,
    songUrl: "/musics/fable-forte-story-unfolds.mp3"
  },
  {
    trackNumber: 4,
    originalTitle: "A Stranger in a Strange Land",
    artist: "idokay",
    thematicTitle: "Alucard Awakens",
    character: characters.alucard,
    songUrl: "/musics/idokay-a-stranger-in-a-strange-land.mp3"
  },
  {
    trackNumber: 5,
    originalTitle: "The Charming Thief by Ocean Fifteen",
    artist: "Anthony Vega",
    thematicTitle: "Buffy's Quiet Stakeout",
    character: characters.buffy,
    songUrl: "/musics/anthony-vega-the-charming-thief.mp3"
  },
  {
    trackNumber: 6,
    originalTitle: "Floor Plan",
    artist: "Ziggy",
    thematicTitle: "Blade's City Chase",
    character: characters.blade,
    songUrl: "/musics/ziggy-floor-plan.mp3"
  },
  {
    trackNumber: 7,
    originalTitle: "Keep Your Head Down",
    artist: "The Magnetic Buzz",
    thematicTitle: "Daywalker Rampage",
    character: characters.blade,
    songUrl: "/musics/the-magnetic-buzz-keep-your-head-down.mp3"
  },
  {
    trackNumber: 8,
    originalTitle: "Hero Is Born",
    artist: "idokay",
    thematicTitle: "The Slayer Rises",
    character: characters.buffy,
    songUrl: "/musics/idokay-hero-is-born.mp3"
  },
  {
    trackNumber: 9,
    originalTitle: "Nothing Can Stop Us",
    artist: "Nobou",
    thematicTitle: "Crimson Dominion",
    character: characters.alucard,
    songUrl: "/musics/nobou-nothing-can-stop-us.mp3"
  },
  {
    trackNumber: 10,
    originalTitle: "The Play",
    artist: "Eli Benacot",
    thematicTitle: "After the Hunt",
    character: characters.vanHelsing,
    songUrl: "/musics/eli-benacot-the-play-instrumental-version.mp3"
  }
];
