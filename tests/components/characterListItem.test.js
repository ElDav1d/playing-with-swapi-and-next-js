import { render, screen, within } from '../test-utils';

import { CharactersContextProvider } from '../../context/Characters';
import CharactersListItem from '../../components/atoms/CharactersListItem/CharactersListItem';

const propsMock = {
  name: "Fulano-El-Yedai",
  index: 13
}

describe(CharactersListItem, () => {
  it('renders a list item with a link to a character page', () => {
    render(
      <CharactersContextProvider>
        <CharactersListItem name={propsMock.name} index={propsMock.index} />
      </CharactersContextProvider >
    );

    const listItem = screen.getByRole('listitem');

    const targetedLink = within(listItem).getByRole('link', { name: /fulano-el-yedai/i });

    expect(targetedLink).toHaveAttribute('href', '/character/13');
  })
})