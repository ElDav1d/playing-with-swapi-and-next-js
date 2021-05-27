import { render, screen, within } from '../test-utils';
import { mockCharacterDetails } from '../../mocks';

import { CharactersContextProvider } from '../../context/Characters';
import CharacterPage from '../../pages/character/[id].tsx';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "character",
      query: { id: "61" },
    }
  }
}))

describe("Character Page", () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <CharacterPage character={mockCharacterDetails} />
      </CharactersContextProvider>
    );
  })

  it("renders detail page with one header, main and footer tags", () => {
    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  })

  it("it first renders a heading with the character's name", () => {
    const pageHeadings = screen.getAllByRole('heading');

    expect(pageHeadings[0]).toHaveTextContent(/fulano-el-yedai/i);
  })

  it("renders a link to the character's lister page", () => {
    const goBackLink = screen.getByRole('link', { name: /go back/i });

    expect(goBackLink).toHaveAttribute('href', '/characters-list/7');
  })

  it("renders a 3 items films' list nested into a main details list", async () => {
    const pageLists = screen.getAllByRole('list');
    const detailsList = pageLists[0];
    const nestedList = within(detailsList).getByRole('list');
    const nestedListItems = within(nestedList).getAllByRole('listitem');
    const nestedListHeading = within(detailsList).getByRole('heading', { name: /films/i });

    expect(nestedListItems).toHaveLength(3);
    expect(nestedListHeading).toBeInTheDocument();
  })
})