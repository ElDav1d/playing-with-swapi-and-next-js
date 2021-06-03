import { render, screen } from '../test-utils';
import { mockHomeCarouselPics } from '../../mocks';

import CarouselPic from '../../components/atoms/CarouselPic/CarouselPic';

const mockedPic = mockHomeCarouselPics[0];
const anyTextmatcher = /.*?/i

describe("CarouselPic renders an image with SEO/accesibility attributes: ", () => {
  beforeEach(() => {
    render(
      <CarouselPic path={mockedPic.path} title={mockedPic.title} alt={mockedPic.alt} />
    );
  })

  it("one is 'alt' attribute", () => {
    expect(screen.getByAltText(anyTextmatcher)).toBeInTheDocument;
  })

  it("one is 'title' attribute", () => {
    expect(screen.getByTitle(anyTextmatcher)).toBeInTheDocument;
  })
})