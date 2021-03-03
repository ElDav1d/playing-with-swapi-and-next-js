import { VisitedPage, VisitedPages } from "../../../interfaces";
import VisitedCharactersNavigationItem from "../../atoms/VisitedCharactersNavigationItem/VisitedCharactersNavigationItem";

type Props = {
  pages: VisitedPages;
};

const VisitedCharactersNavigation = (props: Props) => {
  return (
    <nav>
      <ul>
        <h3>Visited Pages</h3>
        {props.pages.map((page: VisitedPage) => (
          <VisitedCharactersNavigationItem key={page.name} page={page} />
        ))}
      </ul>
    </nav>
  );
};

export default VisitedCharactersNavigation;
