export type VisitedPage = {
  name: string;
  path: string;
};

export type VisitedPages = VisitedPage[];

export type CharacterItem = {
  name: string;
  species: string[];
  homeworld: string;
  films: string[];
};

export type CharacterItems = CharacterItem[];
