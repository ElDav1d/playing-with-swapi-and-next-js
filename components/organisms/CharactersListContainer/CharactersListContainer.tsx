import styled from "styled-components";
import { CharacterItems } from "../../../interfaces";
import CharactersList from "../../molecules/CharactersList/CharactersList";
import CharactersListPagination from "../../molecules/CharacterListPagination/CharacterListPagination";

const MainHeading = styled.h1`
  margin: 1rem;
  @media (min-width: 768px) {
    margin: 2.5rem 1rem;
  }
  @media (min-width: 1024px) {
    margin: 3rem 1rem;
  }
`;

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
        <section data-testid="filter-fail-message-block">
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
