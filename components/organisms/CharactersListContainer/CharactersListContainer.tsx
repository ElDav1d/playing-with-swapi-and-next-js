import { MainHeading } from "../../atoms/StyledHeadings/StyledHeadings";
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
          <MainHeading>Lister Page</MainHeading>
          <CharactersList characters={characters} />
        </section>
      ) : (
        <section>
          <MainHeading>{FILTER_FAIL_HEADING}</MainHeading>
          <h2>{FILTER_FAIL_SUBHEADING}</h2>
        </section>
      )}
      <section>
        <CharactersListPagination />
      </section>
    </article>
  );
};

export default CharactersListContainer;
