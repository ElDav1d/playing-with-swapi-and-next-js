import { render, screen, within } from '../test-utils.js';
import userEvent from '@testing-library/user-event';

import { CharactersContextProvider } from '../../context/Characters';
import ListerPage from '../../pages/characters-list/[page].tsx';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: { page: "1" },
      events: {
        on: () => { },
        off: () => { },
      },
      push: jest.fn()
    }
  }
}))

const propsMock = [
  {
    name: "Fulano-El-Yedai",
    index: 1,
  },
  {
    name: "Wookie Alopecico",
    index: 2,
  },
  {
    name: "Princesa Lerda",
    index: 3,
  },
  {
    name: "Eewok Pivot",
    index: 4,
  },
]

describe('ListerPage', () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <ListerPage charactersOnPage={propsMock} />
      </CharactersContextProvider>
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

describe('page header displays', () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <ListerPage charactersOnPage={propsMock} />
      </CharactersContextProvider>
    );
  })

  it('no visited pages from start', () => {
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  })

  it('one visited character page when a list item is clicked', () => {
    const charactersList = screen.getAllByRole('list')[0];
    const characterslistItems = within(charactersList).getAllByRole('listitem');
    const targetedListItem = characterslistItems[0];
    const itemLink = within(targetedListItem).getByRole('link');

    userEvent.click(itemLink);
    expect(screen.queryByRole('navigation')).toBeInTheDocument();
  })

  it('a maximum of three visited character pages', () => {
    const charactersList = screen.getAllByRole('list')[0];
    const characterslistItems = within(charactersList).getAllByRole('listitem');
    const charactersLinks = characterslistItems.map(item => within(item).getByRole('link'));

    charactersLinks.map(link => {
      userEvent.click(link);
    })

    const navList = within(screen.queryByRole('navigation')).queryByRole('list');
    const navListItems = within(navList).queryAllByRole('listitem');

    expect(navListItems).toHaveLength(3);
  })

  it('the same links if a visited character page is visited again and its link is already displayed', () => {
    const charactersList = screen.getAllByRole('list')[0];
    const characterslistItems = within(charactersList).getAllByRole('listitem');
    const charactersLinks = characterslistItems.map(item => within(item).getByRole('link'));

    const clickAllCharacters = () => {
      charactersLinks.map(link => {
        userEvent.click(link);
      })
    };

    const clickLastCharacter = () => { userEvent.click(charactersLinks[charactersLinks.length - 1]); };

    clickAllCharacters();
    clickLastCharacter();

    const navList = within(screen.queryByRole('navigation')).queryByRole('list');
    const visitedCharacters = within(navList).queryAllByRole('listitem');
    const lastVisitedCharacter = visitedCharacters[visitedCharacters.length - 1];
    const sameLink = within(lastVisitedCharacter).queryByRole('link', { name: /wookie alopecico/i });

    expect(sameLink).toHaveAttribute('href', '/character/2');
  })

  it('a new different link if a character page is visited and its link is not displayed yet', () => {
    const charactersList = screen.getAllByRole('list')[0];
    const characterslistItems = within(charactersList).getAllByRole('listitem');
    const charactersLinks = characterslistItems.map(item => within(item).getByRole('link'));

    const clickAllCharacters = () => {
      charactersLinks.map(link => {
        userEvent.click(link);
      })
    };

    const clickFirstCharacter = () => { userEvent.click(charactersLinks[0]); };

    clickAllCharacters();
    clickFirstCharacter();

    const navList = within(screen.queryByRole('navigation')).queryByRole('list');
    const visitedCharacters = within(navList).queryAllByRole('listitem');
    const newLink = within(visitedCharacters[0]).queryByRole('link', { name: /fulano-el-yedai/i });

    expect(newLink).toHaveAttribute('href', '/character/1');
  })
})