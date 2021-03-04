import Link from "next/Link";

type Props = {
  name: string;
  index: number;
};

const CharactersListItem = (props: Props) => {
  return (
    <li key={props.index}>
      <Link href={`/character/${props.index}`}>
        <a>
          <h2>{props.name}</h2>
          <p>{props.index}</p>
        </a>
      </Link>
    </li>
  );
};

export default CharactersListItem;
