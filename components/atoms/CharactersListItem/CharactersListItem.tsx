import Link from "next/Link";
import { useRouter } from "next/router";
import { useCharactersContext } from "../../../context/Characters";
import { VisitedPage, VisitedPages } from "../../../interfaces";

type Props = {
  name: string;
  species: string[];
  homeworld: string;
  films: string[];
  index: number;
};

type ClickEvent = React.MouseEvent;

const createPayload = (name: string, path: string) => {
  return {
    name: name,
    path: path,
  };
};

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
  const router = useRouter();
  const characterPath: string = `/character/${index}`;
  const { state, dispatch } = useCharactersContext();
  const visitedPages = state.visitedCharacterPages;

  const clickHandler = (event: ClickEvent) => {
    event.preventDefault();

    if (!pageWasVisited(visitedPages, name)) {
      if (visitedPages.length === MAX_VISITED_PAGES) {
        dispatch({
          type: "DELETE_VISITED_CHARACTER",
          payload: "",
        });
      }
      dispatch({
        type: "ADD_VISITED_CHARACTER",
        payload: createPayload(name, characterPath),
      });
    }

    router.push({ pathname: characterPath });
  };

  return (
    <li key={index} style={{ wordBreak: "break-all" }}>
      <Link href={characterPath}>
        <a onClick={clickHandler}>
          <h2>{name}</h2>
          <h3>{species}</h3>
          <h3>{homeworld}</h3>
          <h3>{films}</h3>
          <p>{index}</p>
        </a>
      </Link>
    </li>
  );
};

export default CharactersListItem;
