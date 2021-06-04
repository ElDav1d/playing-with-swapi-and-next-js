import { render, screen } from '../test-utils';
import { mockCharacter, mockQueryID } from '../../mocks';

import GoBackLink from '../../components/atoms/GoBackLink/GoBackLink';
import { LISTER_PATH_NAME, getListerPageQuery, getListerPagePath } from '../../components/atoms/GoBackLink/GoBackLink';
import { CharactersContextProvider } from '../../context/Characters';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: mockQueryID },
    }
  }
}))

describe("Go Back Link", () => {

  it("renders an accesible link to the character's lister page", () => {
    render(
      <CharactersContextProvider>
        <GoBackLink characterName={mockCharacter.name} />
      </CharactersContextProvider>
    );

    const goBackLink = screen.getByRole('link', { name: /go back/i });
    expect(goBackLink).toBeInTheDocument();
  })

  it("goes back to the lister page where the character's link is accesible", () => {
    const expectedPathName = "/characters-list/7";

    expect(getListerPagePath(LISTER_PATH_NAME, getListerPageQuery, mockQueryID)).toEqual(expectedPathName)
  })
})