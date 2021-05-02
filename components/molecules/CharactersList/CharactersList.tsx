import { useRouter } from "next/router";
import { CharacterItems } from "../../../interfaces";
import CharactersListItem from "../../atoms/CharactersListItem/CharactersListItem";

type Props = {
  characters: CharacterItems;
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
      {characters.map(({ name, species, homeworld, films }, index) => (
        <CharactersListItem
          key={getItemId(index)}
          name={name}
          species={species}
          homeworld={homeworld}
          films={films}
          index={getItemId(index)}
        />
      ))}
    </ul>
  );
};

export default CharactersList;
