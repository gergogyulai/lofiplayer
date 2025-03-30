export type AmbientType = {
  id: string;
  name: string;
  path: string;
};

export const ambients: AmbientType[] = [
  {
    id: "default",
    name: "Vinyl Crackle",
    path: "/assets/ambient/vinyl.mp3",
  },
  {
    id: "ocean",
    name: "Ocean",
    path: "/assets/ambient/ocean.mp3",
  }
];

export function getAmbientById(id: string): Promise<AmbientType | undefined> {
    return new Promise((resolve) => {
        const ambient = ambients.find(ambient => ambient.id === id);
        resolve(ambient);
    });
}
