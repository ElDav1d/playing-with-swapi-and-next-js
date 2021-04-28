import Link from "next/Link";
import LogoLink from "../../molecules/LogoLink/LogoLink";
import { useRouter } from "next/router";
import { useVisitedCharacters } from "../../../context/visitedCharacters";
import { VisitedPages } from "../../../interfaces";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import VisitedCharacterNavigation from "../../molecules/VisitedCharactersNavigation/VisitedCharactersNavigation";

const Header = () => {
  const router = useRouter();
  const { state } = useVisitedCharacters();
  const visitedPages: VisitedPages = state.visitedCharacterPages;
  const listerPath = "characters-list";

  return (
    <header>
      <LogoLink />
      <Link href={`/${listerPath}/1`}>
        <a>Lister Page</a>
      </Link>
      {router.pathname.includes(listerPath) && <SearchInput />}
      {visitedPages.length > 0 && (
        <VisitedCharacterNavigation pages={visitedPages} />
      )}
    </header>
  );
};

export default Header;
