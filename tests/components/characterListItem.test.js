import { render, screen, within } from '../test-utils';
import { mockCharacter } from '../../mocks';

import { CharactersContextProvider } from '../../context/Characters';
import CharactersListItem from '../../components/atoms/CharactersListItem/CharactersListItem';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn()
    }
  }
}))

describe(CharactersListItem, () => {
  it('renders a list item with a link to a character page', () => {
    render(
      <CharactersContextProvider>
        <CharactersListItem
          name={mockCharacter.name}
          species={mockCharacter.species}
          homeworld={mockCharacter.homeworld}
          films={mockCharacter.films}
          index={mockCharacter.index}
        />
      </CharactersContextProvider >
    );

    const listItem = screen.getAllByRole('listitem')[0];

    const targetedLink = within(listItem).getByRole('link', { name: /fulano-el-yedai/i });

    expect(targetedLink).toHaveAttribute('href', '/character/1');
  })
})