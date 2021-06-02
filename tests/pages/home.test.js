import { render, screen } from '../test-utils.js';
import { mockHomeCarouselPics } from '../../mocks'

import { CharactersContextProvider } from '../../context/Characters';
import Home from '../../pages/index.tsx';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: "",
    }
  }
}))

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>;
    },
  };
});

describe('Home', () => {
  beforeEach(() => {
    render(
      <CharactersContextProvider>
        <Home picsOnCarousel={mockHomeCarouselPics} />
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

  it("it first renders a heading with the page's title", () => {
    const heading = screen.getByRole('heading', { name: document.title });

    expect(heading).toBeInTheDocument();
  })

  it("renders the outer list of the images' carousel", () => {
    const carouselList = screen.getByRole('list');

    expect(carouselList).toHaveClass("react-multi-carousel-track");
  })
})