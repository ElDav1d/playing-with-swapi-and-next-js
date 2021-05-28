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

  const getListerPageQuery = (queryID: string): number => {
    if (parseInt(queryID) <= 10) {
      return 1;
    } else {
      const [ten, unit] = queryID.split("");
      return parseInt(unit) === 0 ? parseInt(ten) : parseInt(ten) + 1;
    }
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
