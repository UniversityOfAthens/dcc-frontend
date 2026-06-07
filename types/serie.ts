export type Episode = {
  name: string;
  link1: string;
  link2: string;
  notes: string;
};

export type Serie = {
  id: string;
  name: string;
  speaker: string;
  description: string;
  episodes: Episode[];
  created?: string;
  updated?: string;
};
