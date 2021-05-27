import { useRouter } from "next/router";
import styled from "styled-components";

const StyledGoBackLink = styled.a`
  text-decoration: none;
  position: relative;
  display: inline-block;
  color: blue;
  cursor: pointer;
  margin-top: 1rem;
  margin-left: 0.75rem;
  margin-bottom: 1rem;
  padding-bottom: 0.25rem;
  text-transform: uppercase;
  border-bottom: solid 1px blue;
  &:before {
    position: absolute;
    left: -1rem;
    content: "<";
    height: 1em;
  }
`;

const GoBackLink = () => {
  const router = useRouter();
  const currentQuery = router.query.id.toString();
  const listerPath = "characters-list";

  const getListerPageQuery = (queryID: string) => {
    const characterID = parseInt(queryID);
    let listerPageQuery: number;
    switch (true) {
      case characterID < 11:
        listerPageQuery = 1;
        break;
      case characterID < 21:
        listerPageQuery = 2;
        break;
      case characterID < 31:
        listerPageQuery = 3;
        break;
      case characterID < 41:
        listerPageQuery = 4;
        break;
      case characterID < 51:
        listerPageQuery = 5;
        break;
      case characterID < 61:
        listerPageQuery = 6;
        break;
      case characterID < 71:
        listerPageQuery = 7;
        break;
      case characterID < 81:
        listerPageQuery = 8;
        break;
      default:
        listerPageQuery = 9;
    }
    return listerPageQuery;
  };

  return (
    <StyledGoBackLink
      href={`/${listerPath}/${getListerPageQuery(currentQuery)}`}
    >
      GO BACK
    </StyledGoBackLink>
  );
};

export default GoBackLink;
