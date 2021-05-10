import { CharacterItems } from "../../../interfaces";
import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

type Props = {
  characters: CharacterItems;
};

const CharactersListContainer = ({ characters }: Props) => {
  return (
    <article>
      {characters.length ? (
        <section>
          <h2>Lister Page</h2>
          <CharactersList characters={characters} />
        </section>
      ) : (
        <section>
          <h2>These are not the droids you're looking for</h2>
          <h3>Try searching for something else!</h3>
        </section>
      )}
      <section>
        <CharactersListPagination />
      </section>
    </article>
  );
};

export default CharactersListContainer;
