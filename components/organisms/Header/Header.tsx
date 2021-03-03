import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useAppContext } from "../../../context/store.js";
import { VisitedPages } from "../../../interfaces";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

const Header = () => {
  const [state] = useAppContext();
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
