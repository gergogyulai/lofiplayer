export type StationType = {
  id: string;
  name: string;
  description?: string;
  streamUrl: string;
  bg: string;
  animated?: boolean;
  animatedBg?: string;
  cover: string;
  status: "online" | "offline";
  custom: boolean;
  builtIn?: boolean;
};

export const stations: StationType[] = [
  {
    id: "default",
    name: "Default",
    description: "The default station",
    streamUrl: "https://usa9.fastcast4u.com/proxy/jamz?mp=/1",
    animated: true,
    animatedBg: "/assets/stations/animated/default.mp4",
    bg: "/assets/stations/bg/default.png",
    cover: "/assets/stations/cover/default.png",
    status: "online",
    custom: false,
    builtIn: true
  },
  {
    id: "bliss",
    name: "Bliss",
    description: "The blissful station",
    streamUrl: "https://lfhh.radioca.st/stream",
    bg: "/assets/stations/bg/bliss.png",
    cover: "/assets/stations/cover/bliss.png",
    status: "offline",
    custom: false,
    builtIn: true
  },
  {
    id: "dreamscape",
    name: "Dreamscape",
    description: "The dreamscape station",
    streamUrl: "https://live.radiospinner.com/lofi-hip-hop-64",
    bg: "/assets/stations/bg/dreamscape.png",
    cover: "/assets/stations/cover/dreamscape.png",
    status: "online",
    custom: false,
    builtIn: true
  },
  {
    id: "ethernal",
    name: "Ethernal",
    description: "The ethernal station",
    streamUrl: "https://lfhh.radioca.st/stream",
    bg: "/assets/stations/bg/ethernal.png",
    cover: "/assets/stations/cover/ethernal.png",
    status: "online",
    custom: false,
    builtIn: true
  },
  {
    id: "nocturne",
    name: "Nocturne",
    description: "The nocturne station",
    streamUrl: "https://stream-153.zeno.fm/3u1qndyk8rhvv?zs=04YRkRsDTa6g3uNhuKl5-A",
    bg: "/assets/stations/bg/nocturne.png",
    cover: "/assets/stations/cover/nocturne.png",
    status: "online",
    custom: false,
    builtIn: true
  },
  {
    id: "radiant",
    name: "Radiant",
    description: "The radiant station",
    streamUrl: "https://live.hunter.fm/lofi_high",
    bg: "/assets/stations/bg/radiant.png",
    cover: "/assets/stations/cover/radiant.png",
    status: "offline",
    custom: false,
    builtIn: true
  },
  {
    id: "serenity",
    name: "Serenity",
    description: "The serenity station",
    streamUrl: "https://boxradio-edge-10.streamafrica.net/lofi",
    bg: "/assets/stations/bg/serenity.png",
    cover: "/assets/stations/cover/serenity.png",
    status: "online",
    custom: false,
    builtIn: true
  },
  {
    id: "synthwave",
    name: "Synthwave",
    description: "The synthwave station",
    streamUrl: "https://www.youtube.com/watch?v=4xDzrJKXOOY",
    bg: "/assets/stations/bg/synthwave.png",
    cover: "/assets/stations/cover/synthwave.png",
    status: "online",
    custom: false,
    builtIn: true
  }
];

export function getStationById(id: string): StationType | undefined {
  return stations.find(station => station.id === id);
}
