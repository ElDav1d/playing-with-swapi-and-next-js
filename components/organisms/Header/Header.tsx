import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCharactersContext } from "../../../context/Characters";
import { VisitedPages } from "../../../interfaces";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

const Header = () => {
  const router = useRouter();
  const { state, dispatch } = useCharactersContext();
  const visitedPages: VisitedPages = state.visitedCharacterPages;
  const contextKeyword: string = state.filterCharactersKeyword;
  const listerPath = "characters-list";
  const FILTER_PLACEHOLDER_TEXT = "Type something";
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setQuery(contextKeyword);
  }, [contextKeyword]);

  useEffect(() => {
    const timer = setTimeout(() => {
      storeKeyword(query);
    }, 750);
    return () => clearTimeout(timer);
  }, [query]);

  const storeKeyword = (keyWord: string) => {
    const payload = keyWord.toLowerCase();
    dispatch({
      type: "UPDATE_FILTER_KEYWORD",
      payload: payload,
    });
    return payload;
  };

  const inputHandler = (event: Event) => {
    const eTarget = event.target as HTMLInputElement;
    setQuery(eTarget.value);
  };

  return (
    <header>
      <LogoLink />
      <Link href={`/${listerPath}/1`}>
        <a>Lister Page</a>
      </Link>
      {router.pathname.includes(listerPath) && (
        <SearchInput
          incomingValue={query}
          placeholder={FILTER_PLACEHOLDER_TEXT}
          onChange={inputHandler}
        />
      )}
      {visitedPages.length > 0 && (
        <VisitedCharacterNavigation pages={visitedPages} />
      )}
    </header>
  );
};

export default Header;
