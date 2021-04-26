import { render, screen, within } from '../test-utils.js';

import { VisitedCharactersContextProvider } from '../../context/visitedCharacters';
import ListerPage from '../../pages/characters-list/[page].tsx';

const propsMock = [
  {
    name: "Fulano-El-Yedai",
    index: 1,
  },
  {
    name: "Wookie Alopécico",
    index: 2,
  },
  {
    name: "Princesa Lerda",
    index: 3,
  },
]

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { page: "1" },
      events: {
        on: () => { },
        off: () => { },
      }
    }
  }
}))

describe('ListerPage', () => {
  beforeEach(() => {
    render(
      <VisitedCharactersContextProvider>
        <ListerPage charactersOnPage={propsMock} />
      </VisitedCharactersContextProvider>
    );
  })

  it('renders lister with one header, main and footer tags ', () => {
    const header = screen.getByRole('banner',);
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  })

  it('renders a character list with linked items containing their own heading', () => {
    const list = screen.getAllByRole('list')[0];
    const listItems = within(list).getAllByRole('listitem');
    const targetedListItem = listItems[0];
    const itemLink = within(targetedListItem).getByRole('link');

    expect(within(itemLink).getByRole('heading', { name: /fulano-el-yedai/i }));
  })
})