import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('react-dark-mode-toggle', () => () => <div>dark-mode-toggle</div>);
jest.mock('typewriter-effect', () => () => <div>a Senior Engineer / Tech Lead</div>);
jest.mock('react-reveal', () => ({ children }) => children);
jest.mock('react-reveal/Fade', () => ({ children }) => children);

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    const fixtures = {
      'profile/navbar.json': {
        sections: [{ title: 'Home', href: '/' }],
      },
      'profile/routes.json': {
        sections: [],
      },
      'profile/home.json': {
        name: 'Dung Nguyen',
        roles: ['a Senior Engineer / Tech Lead'],
      },
      'profile/architectureHighlights.json': {
        title: 'Architecture Highlights',
        intro: 'Architecture intro',
        items: [
          {
            title: 'Highlight',
            context: 'Context',
            constraint: 'Constraint',
            decision: 'Decision',
            impact: 'Impact',
          },
        ],
      },
      'profile/social.json': {
        social: [],
      },
    };

    return Promise.resolve({
      json: () => Promise.resolve(fixtures[url] || {}),
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders architecture highlights on the home page', async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/Architecture Highlights/i)).toBeInTheDocument();
  });
});
