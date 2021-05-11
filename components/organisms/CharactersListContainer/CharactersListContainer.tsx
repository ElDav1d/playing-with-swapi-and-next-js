import { CharacterItems } from "../../../interfaces";
import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

type Props = {
  characters: CharacterItems;
};

const CharactersListContainer = ({ characters }: Props) => {
  const FILTER_FAIL_HEADING = "These are not the droids you're looking for";
  const FILTER_FAIL_SUBHEADING = "Try searching for something else!";
  return (
    <article>
      {characters.length ? (
        <section>
          <h2>Lister Page</h2>
          <CharactersList characters={characters} />
        </section>
      ) : (
        <section data-testid="filter-fail-message-block">
          <h2>{FILTER_FAIL_HEADING}</h2>
          <h3>{FILTER_FAIL_SUBHEADING}</h3>
        </section>
      )}
      <section>
        <CharactersListPagination />
      </section>
    </article>
  );
};

export default CharactersListContainer;
