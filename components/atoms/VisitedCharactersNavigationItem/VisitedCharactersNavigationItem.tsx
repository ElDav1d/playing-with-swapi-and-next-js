import Link from "next/Link";
import { VisitedPage } from "../../../interfaces";

type Props = {
  page: VisitedPage;
};

const VisitedCharactersNavigationItem = (props: Props) => {
  const page = props.page;

  return (
    <Link href={page.path}>
      <a>
        <li>{page.name}</li>
      </a>
    </Link>
  );
};

export default VisitedCharactersNavigationItem;
