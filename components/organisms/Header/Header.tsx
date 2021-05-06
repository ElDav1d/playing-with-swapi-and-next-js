import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useRouter } from "next/router";
import { useRef } from "react";
import { useCharactersContext } from "../../../context/Characters";
import { VisitedPages } from "../../../interfaces";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

const Header = () => {
  const router = useRouter();
  const { state, dispatch } = useCharactersContext();
  const visitedPages: VisitedPages = state.visitedCharacterPages;
  const filterKeyword: string = state.filterCharactersKeyword;
  const listerPath = "characters-list";
  const FILTER_PLACEHOLDER_TEXT = "Type something";

  const filterRef = useRef<HTMLInputElement>();

  if (!filterKeyword && filterRef.current) {
    filterRef.current.value = "";
  }

  const inputHandler = (event: Event) => {
    const eTarget = event.target as HTMLInputElement;
    dispatch({
      type: "UPDATE_FILTER_KEYWORD",
      payload: eTarget.value.toLocaleLowerCase(),
    });
  };

  return (
    <header>
      <LogoLink />
      <Link href={`/${listerPath}/1`}>
        <a>Lister Page</a>
      </Link>
      {router.pathname.includes(listerPath) && (
        <SearchInput
          placeholder={FILTER_PLACEHOLDER_TEXT}
          onChange={inputHandler}
          inputRef={filterRef}
        />
      )}
      {visitedPages.length > 0 && (
        <VisitedCharacterNavigation pages={visitedPages} />
      )}
    </header>
  );
};

export default Header;
