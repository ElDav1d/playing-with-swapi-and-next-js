import { CharacterItems } from "../../../interfaces";
import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

type Props = {
  characters: CharacterItems;
};

const CharactersListContainer = ({ characters }: Props) => {
  return (
    <section>
      {characters.length ? (
        <CharactersList characters={characters} />
      ) : (
        <>
          <h2>These are not the droids you're looking for</h2>
          <h3>Try searching for something else!</h3>
        </>
      )}
      <CharactersListPagination />
    </section>
  );
};

export default CharactersListContainer;
