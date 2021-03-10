import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useVisitedCharacters } from "../../../context/visitedCharacters";
import { VisitedPages } from "../../../interfaces";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

const Header = () => {
  const { state } = useVisitedCharacters();
  const visitedPages: VisitedPages = state.visitedCharacterPages;

  return (
    <header>
      <LogoLink />
      <Link href={`/characters-list/1`}>
        <a>Lister Page</a>
      </Link>
      {visitedPages.length > 0 && (
        <VisitedCharacterNavigation pages={visitedPages} />
      )}
    </header>
  );
};

export default Header;
