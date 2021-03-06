import Link from "next/Link";
import { useRouter } from "next/router";
import { useCharactersContext } from "../../../context/Characters";
import { VisitedPage, VisitedPages } from "../../../interfaces";
import { createPayload } from "../../../utils/createPayload";

type Props = {
  name: string;
  species: string[];
  homeworld: string;
  films: string[];
  index: number;
};

type ClickEvent = React.MouseEvent;

const pageWasVisited = (pages: VisitedPages, pageName: string) => {
  return pages.find((page: VisitedPage) => page.name === pageName);
};

const CharactersListItem = ({
  name,
  species,
  homeworld,
  films,
  index,
}: Props) => {
  const MAX_VISITED_PAGES: number = 3;
  const { push } = useRouter();
  const characterPath: string = `/character/${index}`;
  const { charactersContextState, charactersContextDispatch } =
    useCharactersContext();
  const visitedPages = charactersContextState.visitedCharacterPages;

  const clickHandler = (event: ClickEvent): void => {
    event.preventDefault();

    if (!pageWasVisited(visitedPages, name)) {
      if (visitedPages.length === MAX_VISITED_PAGES) {
        charactersContextDispatch({
          type: "DELETE_VISITED_CHARACTER",
          payload: "",
        });
      }
      charactersContextDispatch({
        type: "ADD_VISITED_CHARACTER",
        payload: createPayload(name, characterPath),
      });
    }

    push({ pathname: characterPath });
    return;
  };

  return (
    <li
      key={index}
      data-testid="characters-list-item"
      style={{ wordBreak: "break-all" }}
    >
      <Link href={characterPath}>
        <a onClick={clickHandler}>
          <h2>{name}</h2>
          <h3>SPECIES</h3>
          <p>{species}</p>
          <h3>HOMEWORLD</h3>
          <h3>{homeworld}</h3>
          <h3>FILMS</h3>
          <ul>
            {films.map((film, index) => (
              <li key={index}>{film}</li>
            ))}
          </ul>
        </a>
      </Link>
    </li>
  );
};

export default CharactersListItem;
