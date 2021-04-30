import Link from "next/Link";
import { useRouter } from "next/router";
import { useCharactersContext } from "../../../context/Characters";
import { VisitedPage, VisitedPages } from "../../../interfaces";

type Props = {
  name: string;
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

const CharactersListItem = ({ name, index }: Props) => {
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
    <li key={index}>
      <Link href={characterPath}>
        <a onClick={clickHandler}>
          <h2>{name}</h2>
          <p>{index}</p>
        </a>
      </Link>
    </li>
  );
};

export default CharactersListItem;
