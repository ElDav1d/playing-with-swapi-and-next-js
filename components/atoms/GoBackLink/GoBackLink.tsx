import { useRouter } from "next/router";
import styled from "styled-components";
import { useCharactersContext } from "../../../context/Characters";
import { createPayload } from "../../../utils";

type ClickEvent = React.MouseEvent;
interface getQueryCallback {
  (query: string): number;
}

const StyledGoBackLink = styled.a`
  border-bottom: solid 1px blue;
  color: blue;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  margin-left: 0.75rem;
  margin-top: 1rem;
  padding-bottom: 0.25rem;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;

  &:before {
    content: "<";
    height: 1em;
    left: -1rem;
    position: absolute;
  }
`;

export const LISTER_PATH_NAME = "characters-list";

export const getListerPageQuery = (queryID: string): number => {
  if (parseInt(queryID) <= 10) {
    return 1;
  } else {
    const [ten, unit] = queryID.split("");
    return parseInt(unit) === 0 ? parseInt(ten) : parseInt(ten) + 1;
  }
};

export const getListerPagePath = (
  path: string,
  queryGetter: getQueryCallback,
  query: string
): string => `/${path}/${queryGetter(query)}`;

const GoBackLink = ({ characterName }) => {
  const { query, pathname, push } = useRouter();
  const currentQuery = query.id.toString();
  const { charactersContextState, charactersContextDispatch } =
    useCharactersContext();
  const visitedPages = charactersContextState.visitedCharacterPages;

  const clickHandler = (event: ClickEvent): void => {
    event.preventDefault();

    if (!visitedPages.length) {
      charactersContextDispatch({
        type: "ADD_VISITED_CHARACTER",
        payload: createPayload(characterName, pathname),
      });
    }

    push({
      pathname: getListerPagePath(
        LISTER_PATH_NAME,
        getListerPageQuery,
        currentQuery
      ),
    });
  };

  return (
    <StyledGoBackLink href="/" onClick={clickHandler}>
      GO BACK
    </StyledGoBackLink>
  );
};

export default GoBackLink;
