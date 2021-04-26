import { useRouter } from "next/router";
import CharactersListItem from "../../atoms/CharactersListItem/CharactersListItem";

type CharacterItem = {
  name: string;
};

type Characters = CharacterItem[];

type Props = {
  characters: Characters;
};

const CharactersList = ({ characters }: Props) => {
  const router = useRouter();

  const calcItemId = (itemIndex: number, currentPage: number) => {
    if (currentPage === 1) return itemIndex;
    return itemIndex + (currentPage - 1) * 10;
  };

  const getItemId = (index: number) => {
    const currentPage: number = +router.query.page;

    return calcItemId(index + 1, currentPage);
  };

  return (
    <ul>
      {characters.map(({ name }, index) => (
        <CharactersListItem
          key={getItemId(index)}
          name={name}
          index={getItemId(index)}
        />
      ))}
    </ul>
  );
};

export default CharactersList;
