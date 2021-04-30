import { render, screen } from '../test-utils.js';

import { CharactersContextProvider } from '../../context/Characters';
import Home from '../../pages/index.tsx';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: "",
    }
  }
}))

describe('Home', () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <Home />
      </CharactersContextProvider>
    );
  })

  it("renders home page with one header, main and footer tags", () => {
    const header = screen.getByRole('banner',);
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');


    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  })

  it("doesn't render a filter search input", () => {
    const searchInput = screen.queryByRole('textbox', { placeholder: /type something/i });

    expect(searchInput).not.toBeInTheDocument();
  })
})