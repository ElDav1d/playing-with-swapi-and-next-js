import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useRouter } from "next/router";
import { useVisitedCharacters } from "../../../context/visitedCharacters";
import { VisitedPages } from "../../../interfaces";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

const Header = () => {
  const router = useRouter();
  const { state, dispatch } = useVisitedCharacters();
  const visitedPages: VisitedPages = state.visitedCharacterPages;
  const listerPath = "characters-list";
  const FILTER_PLACEHOLDER_TEXT = "Type something";

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
        />
      )}
      {visitedPages.length > 0 && (
        <VisitedCharacterNavigation pages={visitedPages} />
      )}
    </header>
  );
};

export default Header;
