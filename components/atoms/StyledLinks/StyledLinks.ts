import styled, { css } from "styled-components";

interface CaretLinkProps {
  readonly Left: boolean;
}

export const CaretLink = styled.a<CaretLinkProps>`
  border-bottom: solid 1px blue;
  color: blue;
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-bottom: 0.25rem;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;

  &:before {
    height: 1em;
    position: absolute;
  }

  ${props =>
    props.Left &&
    css`
      &:before {
        content: "<";
        left: -1rem;
      }
    `}
`;
