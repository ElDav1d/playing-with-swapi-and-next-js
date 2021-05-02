import { CharacterItems } from "../../../interfaces";
import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

type Props = {
  characters: CharacterItems;
};

const CharactersListContainer = ({ characters }: Props) => {
  return (
    <section>
      <CharactersList characters={characters} />
      <CharactersListPagination />
    </section>
  );
};

export default CharactersListContainer;
