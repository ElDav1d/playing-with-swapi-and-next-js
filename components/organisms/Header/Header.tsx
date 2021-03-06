import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCharactersContext } from "../../../context/Characters";
import { VisitedPages } from "../../../interfaces";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

type ClickEvent = React.MouseEvent;

const Header = () => {
  const { pathname, push } = useRouter();
  const { charactersContextState, charactersContextDispatch } =
    useCharactersContext();
  const visitedPages: VisitedPages =
    charactersContextState.visitedCharacterPages;
  const contextKeyword: string = charactersContextState.filterCharactersKeyword;
  const listerPath = "characters-list";
  const FILTER_LEGEND_TEXT = "Filter by Name, Species, Homeworld or Film";
  const FILTER_PLACEHOLDER_TEXT = "Type something";
  const [filterQuery, setFilterQuery] = useState<string>("");

  useEffect(() => {
    setFilterQuery(contextKeyword);
  }, [contextKeyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      storeKeyword(filterQuery);
    }, 750);

    return () => clearTimeout(timer);
  }, [filterQuery]);

  const storeKeyword = (keyWord: string) => {
    const payload = keyWord.toLowerCase();

    charactersContextDispatch({
      type: "UPDATE_FILTER_KEYWORD",
      payload: payload,
    });

    return payload;
  };

  const inputHandler = (event: Event) => {
    const eTarget = event.target as HTMLInputElement;
    setFilterQuery(eTarget.value);
  };

  const listerLinkHandler = (event: ClickEvent) => {
    event.preventDefault();

    charactersContextDispatch({
      type: "UPDATE_FILTER_KEYWORD",
      payload: "",
    });

    push({ pathname: `/${listerPath}/1` });
  };

  return (
    <header>
      <LogoLink />
      <Link href={`/${listerPath}/1`}>
        <a onClick={listerLinkHandler}>Lister Page</a>
      </Link>
      {pathname.includes(listerPath) && (
        <form>
          <SearchInput
            incomingValue={filterQuery}
            legendText={FILTER_LEGEND_TEXT}
            placeholderText={FILTER_PLACEHOLDER_TEXT}
            onChange={inputHandler}
          />
        </form>
      )}
      {visitedPages.length > 0 && (
        <VisitedCharacterNavigation pages={visitedPages} />
      )}
    </header>
  );
};

export default Header;
