import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

type CharacterItem = {
  name: string;
};

type Characters = CharacterItem[];

type Props = {
  characters: Characters;
};

const CharactersListContainer = (props: Props) => {
  return (
    <section>
      <CharactersList characters={props.characters} />
      <CharactersListPagination />
    </section>
  );
};

export default CharactersListContainer;
