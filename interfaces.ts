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

export type CharacterDetailData = {
  name: string;
  species: string[];
  homeworld: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  gender: string;
  films: string[];
};

export type CharacterDetailItem = {
  detailTitle: string;
  detailContent: string | string[];
};

export type CarouselPics = CarouselPic[];

export type CarouselPic = {
  path: string;
  title: string;
  alt: string;
};
