import Link from "next/Link";
import { VisitedPage } from "../../../interfaces";

type Props = {
  page: VisitedPage;
};

const VisitedCharactersNavigationItem = (props: Props) => {
  const page = props.page;

  return (
    <li>
      <Link href={page.path}>
        <a>
          <p>{page.name}</p>
        </a>
      </Link>
    </li>
  );
};

export default VisitedCharactersNavigationItem;
