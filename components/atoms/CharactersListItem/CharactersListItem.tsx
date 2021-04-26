import Link from "next/Link";
import { useRouter } from "next/router";
import { useVisitedCharacters } from "../../../context/visitedCharacters";
import { VisitedPage, VisitedPages } from "../../../interfaces";

type Props = {
  name: string;
  index: number;
};

type ClickEvent = React.MouseEvent;

const getVisitedCharacter = (name: string, path: string) => {
  return {
    name: name,
    path: path,
  };
};

const createPayLoad = (
  name: string,
  maxPages: number,
  path: string,
  pages: VisitedPages
) => {
  const payLoad = [...pages];
  if (payLoad.length === maxPages) {
    payLoad.pop();
  }
  payLoad.unshift(getVisitedCharacter(name, path));

  return payLoad;
};

const pageWasVisited = (pages: VisitedPages, pageName: string) => {
  return pages.find((page: VisitedPage) => page.name === pageName);
};

const CharactersListItem = ({ name, index }: Props) => {
  const MAX_VISITED_PAGES: number = 3;
  const router = useRouter();
  const characterPath: string = `/character/${index}`;
  const { state, dispatch } = useVisitedCharacters();
  const visitedPages = state.visitedCharacterPages;

  const clickHandler = (event: ClickEvent) => {
    event.preventDefault();

    if (!pageWasVisited(visitedPages, name)) {
      const payLoad = createPayLoad(
        name,
        MAX_VISITED_PAGES,
        characterPath,
        visitedPages
      );

      dispatch({
        type: "updateVisitedCharacterPages",
        payload: payLoad,
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
