import { useRouter } from "next/router";
import styled from "styled-components";

const StyledGoBackLink = styled.a`
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
  return (
    <StyledGoBackLink onClick={() => router.back()}>GO BACK</StyledGoBackLink>
  );
};

export default GoBackLink;
