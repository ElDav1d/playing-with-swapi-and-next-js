import { render, screen } from '../test-utils.js';
import Home from '../../pages/index.tsx';

describe('Home', () => {
  it('renders home page', () => {
    render(<Home />)
    expect(screen.getByText(/hello world/i));
  })
})