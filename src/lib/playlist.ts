export interface Track {
  trackNumber: number;
  originalTitle: string;
  artist: string;
  thematicTitle: string;
  character:
    | "Blade"
    | "Buffy"
    | "Abraham Lincoln"
    | "Morbius"
    | "Van Helsing"
    | "Alucard";
  songUrl: string;
}

export const playlist: Track[] = [
  {
    trackNumber: 1,
    originalTitle: "And So I Float on Cloud Become Water",
    artist: "Kyle Preston",
    thematicTitle: "Mist Over Transylvania",
    character: "Morbius",
    songUrl: "/musics/kyle-preston-and-so-i-float-on-cloud-become-water.mp3"
  },
  {
    trackNumber: 2,
    originalTitle: "Many Years Ago",
    artist: "idokay",
    thematicTitle: "The Blood Oath of 1865",
    character: "Abraham Lincoln",
    songUrl: "/musics/idokay-many-years-ago.mp3"
  },
  {
    trackNumber: 3,
    originalTitle: "Story Unfolds",
    artist: "FableForte",
    thematicTitle: "Van Helsing’s Dossier",
    character: "Van Helsing",
    songUrl: "/musics/fable-forte-story-unfolds.mp3"
  },
  {
    trackNumber: 4,
    originalTitle: "A Stranger in a Strange Land",
    artist: "idokay",
    thematicTitle: "Alucard Awakens",
    character: "Alucard",
    songUrl: "/musics/idokay-a-stranger-in-a-strange-land.mp3"
  },
  {
    trackNumber: 5,
    originalTitle: "The Charming Thief by Ocean Fifteen",
    artist: "Anthony Vega",
    thematicTitle: "Buffy’s Quiet Stakeout",
    character: "Buffy",
    songUrl: "/musics/anthony-vega-the-charming-thief.mp3"
  },
  {
    trackNumber: 6,
    originalTitle: "Floor Plan",
    artist: "Ziggy",
    thematicTitle: "Blade’s City Chase",
    character: "Blade",
    songUrl: "/musics/ziggy-floor-plan.mp3"
  },
  {
    trackNumber: 7,
    originalTitle: "Keep Your Head Down",
    artist: "The Magnetic Buzz",
    thematicTitle: "Daywalker Rampage",
    character: "Blade",
    songUrl: "/musics/the-magnetic-buzz-keep-your-head-down.mp3"
  },
  {
    trackNumber: 8,
    originalTitle: "Hero Is Born",
    artist: "idokay",
    thematicTitle: "The Slayer Rises",
    character: "Buffy",
    songUrl: "/musics/idokay-hero-is-born.mp3"
  },
  {
    trackNumber: 9,
    originalTitle: "Nothing Can Stop Us",
    artist: "Nobou",
    thematicTitle: "Crimson Dominion",
    character: "Alucard",
    songUrl: "/musics/nobou-nothing-can-stop-us.mp3"
  },
  {
    trackNumber: 10,
    originalTitle: "The Play",
    artist: "Eli Benacot",
    thematicTitle: "After the Hunt",
    character: "Van Helsing",
    songUrl: "/musics/eli-benacot-the-play-instrumental-version.mp3"
  }
];
