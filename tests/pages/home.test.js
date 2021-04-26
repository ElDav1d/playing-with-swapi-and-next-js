import { render, screen } from '../test-utils.js';

import { VisitedCharactersContextProvider } from '../../context/visitedCharacters';
import Home from '../../pages/index.tsx';

describe('Home', () => {
  it('renders home page with one header, main and footer tags ', () => {
    render(
      <VisitedCharactersContextProvider>
        <Home />
      </VisitedCharactersContextProvider>
    );
    const header = screen.getByRole('banner',);
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');


    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  })
})