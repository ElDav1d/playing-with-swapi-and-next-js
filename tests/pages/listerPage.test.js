import { render, screen, within, act } from '../test-utils.js';
import userEvent from '@testing-library/user-event';
import { mockCharacterList } from '../../mocks';

import { CharactersContextProvider } from '../../context/Characters';
import ListerPage from '../../pages/characters-list/[page].tsx';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "characters-list",
      query: { page: "1" },
      events: {
        on: () => { },
        off: () => { },
      },
      push: jest.fn()
    }
  }
}))

describe("Lister Page", () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <ListerPage charactersOnPage={mockCharacterList} />
      </CharactersContextProvider>
    );
  })

  it("renders lister with one header, main and footer tags", () => {
    const header = screen.getByRole('banner',);
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  })

  it("renders a character list with linked items containing their own heading", () => {
    const list = screen.getAllByRole('list')[0];
    const listItems = within(list).getAllByRole('listitem');
    const targetedListItem = listItems[0];
    const itemLink = within(targetedListItem).getByRole('link');

    expect(within(itemLink).getByRole('heading', { name: /fulano-el-yedai/i }));
  })

  it("render's a filter search input", () => {
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });

    expect(searchInput).toBeInTheDocument();
  })
})

describe("page header displays", () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <ListerPage charactersOnPage={mockCharacterList} />
      </CharactersContextProvider>
    );
  })

  it("no visited pages from start", () => {
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  })

  it("one visited character page when a list item is clicked", () => {
    const charactersList = screen.getByTestId('characters-list');
    const characterslistItems = within(charactersList).getAllByTestId('characters-list-item');
    const targetedListItem = characterslistItems[0];
    const itemLink = within(targetedListItem).getByRole('link');

    userEvent.click(itemLink);
    expect(screen.queryByRole('navigation')).toBeInTheDocument();
  })

  it("a maximum of three visited character pages", () => {
    const charactersList = screen.getByTestId('characters-list');
    const characterslistItems = within(charactersList).getAllByTestId('characters-list-item');
    const charactersLinks = characterslistItems.map(item => within(item).getByRole('link'));


    charactersLinks.map(link => {
      userEvent.click(link);
    })

    const navList = within(screen.queryByRole('navigation')).queryByRole('list');
    const navListItems = within(navList).queryAllByRole('listitem');

    expect(navListItems).toHaveLength(3);
  })

  it("the same links if a visited character page is visited again and its link is already displayed", () => {
    const charactersList = screen.getByTestId('characters-list');
    const characterslistItems = within(charactersList).getAllByTestId('characters-list-item');
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
    const sameLink = within(lastVisitedCharacter).queryByRole('link', { name: /wookiee alopecico/i });

    expect(sameLink).toHaveAttribute('href', '/character/2');
  })

  it("a new different link if a character page is visited and its link isn't displayed yet", () => {
    const charactersList = screen.getByTestId('characters-list');
    const characterslistItems = within(charactersList).getAllByTestId('characters-list-item');
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

describe("characters' list displays", () => {
  beforeEach(() => {
    jest.useFakeTimers();

    render(
      <CharactersContextProvider>
        <ListerPage charactersOnPage={mockCharacterList} />
      </CharactersContextProvider>
    );
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  it("no items when not matching search input", async () => {
    const DEBOUNCE_TIME = 750
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });
    const charactersList = screen.queryByTestId('characters-list');

    expect(charactersList).toBeInTheDocument();

    userEvent.type(searchInput, 'condemor');
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    expect(charactersList).not.toBeInTheDocument();
  })

  it("an error message when not matching search input", async () => {
    const DEBOUNCE_TIME = 750
    const HEADING_TEXT = /these are not the droids you're looking for/i;
    const SUBHEADING_TEXT = /try searching for something else!/i
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });

    userEvent.type(searchInput, 'condemor');
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const filterFailHeading = await screen.findByRole('heading', { name: HEADING_TEXT });
    const filterFailSubheading = await screen.findByRole('heading', { name: SUBHEADING_TEXT });

    expect(filterFailHeading).toBeInTheDocument();
    expect(filterFailSubheading).toBeInTheDocument();
  })

  it("one item when specific search input match", async () => {
    const DEBOUNCE_TIME = 750
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });
    const charactersList = screen.queryByTestId('characters-list');

    expect(charactersList).toBeInTheDocument();

    userEvent.type(searchInput, 'fulano');
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const charactersListItems = await screen.findAllByTestId('characters-list-item');

    expect(charactersListItems).toHaveLength(1);
  })

  it("several items when non specific search input match", async () => {
    const DEBOUNCE_TIME = 750
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });

    userEvent.type(searchInput, 'yedai');
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const charactersListItems = await screen.findAllByTestId('characters-list-item');

    expect(charactersListItems).toHaveLength(2);
  })

  it("all items when changing lister page after filtering the current one", async () => {
    const DEBOUNCE_TIME = 750
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });
    const paginationButton = screen.getByRole('button', { name: /page 2/i })

    expect(paginationButton).toBeInTheDocument()


    userEvent.type(searchInput, 'yedai');
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const charactersListItems = await screen.findAllByTestId('characters-list-item');

    expect(charactersListItems).toHaveLength(2);

    userEvent.click(paginationButton);
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const newCharactersListItems = await screen.findAllByTestId('characters-list-item');

    expect(newCharactersListItems).toHaveLength(4);
  })

  it("all items when coming back from any other page", async () => {
    const DEBOUNCE_TIME = 750
    const searchInput = screen.getByRole('textbox', { placeholder: /type something/i });
    const listerPageLink = screen.getByRole('link', { name: /lister page/i })

    userEvent.type(searchInput, 'yedai');
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const charactersListItems = await screen.findAllByTestId('characters-list-item');

    expect(charactersListItems).toHaveLength(2);

    userEvent.click(listerPageLink);
    act(() => jest.advanceTimersByTime(DEBOUNCE_TIME))

    const newCharactersListItems = await screen.findAllByTestId('characters-list-item');

    expect(newCharactersListItems).toHaveLength(4);
  })
})