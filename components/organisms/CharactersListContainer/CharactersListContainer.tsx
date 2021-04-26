import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

type CharacterItem = {
  name: string;
};

type Characters = CharacterItem[];

type Props = {
  characters: Characters;
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
