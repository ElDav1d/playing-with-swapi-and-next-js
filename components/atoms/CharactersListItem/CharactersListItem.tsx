import Link from "next/Link";
import { useRouter } from "next/router";
import { useVisitedCharacters } from "../../../context/visitedCharacters";
import { VisitedPage, VisitedPages } from "../../../interfaces";

type Props = {
  name: string;
  index: number;
};

type ClickEvent = React.MouseEvent;

const CharactersListItem = (props: Props) => {
  const MAX_VISITED_PAGES : number = 3;
  const router = useRouter();
  const characterPath : string = `/character/${props.index}`;
  const { state, dispatch } = useVisitedCharacters();
  const visitedPages = state.visitedCharacterPages;

  const getVisitedCharacter = (props: Props) => {
    return {
      name: props.name,
      path: characterPath,
    };
  };

  const createPayLoad = (
    props: Props,
    maxPages: number,
    state: VisitedPages
  ) => {
    let payLoad = [...state];
    if (payLoad.length === maxPages) {
      payLoad.pop();
    }
    payLoad.unshift(getVisitedCharacter(props));
  
    return payLoad;
  };

  const pageWasVisited = (state: VisitedPages, props: Props) => {
    return state.find((page: VisitedPage) => page.name === props.name);
  };

  const clickHandler = (event: ClickEvent) => {
    event.preventDefault();

    if (!pageWasVisited(visitedPages, props)) {
      dispatch({
        type: "updateVisitedCharacterPages",
        payload: createPayLoad(props, MAX_VISITED_PAGES, visitedPages),
      });
    }

    router.push({ pathname: characterPath });
  };

  return (
    <li key={props.index}>
      <Link href={characterPath}>
        <a onClick={clickHandler}>
          <h2>{props.name}</h2>
          <p>{props.index}</p>
        </a>
      </Link>
    </li>
  );
};

export default CharactersListItem;
