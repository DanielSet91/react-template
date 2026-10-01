import { afterEach, expect, it } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from '@tanstack/react-router';
import App from '../../App';
import { router, queryClient } from '../../Router/router';
import { renderWithProviders } from '../../test/render';

afterEach(() => {
  queryClient.clear();
});
it('creates a project, opens its detail, saves changes and refreshes the list', async () => {
  router.update({
    history: createMemoryHistory({ initialEntries: ['/projects'] }),
    context: { queryClient },
  });
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await screen.findByText('Your first project');
  await user.type(screen.getByLabelText('Project name'), 'Launch app');
  await user.click(screen.getByRole('button', { name: 'Save project' }));
  await screen.findByText('Launch app');
  const links = screen.getAllByRole('link', { name: 'View project' });
  await user.click(links[links.length - 1]);
  await screen.findByRole('heading', { name: 'Launch app' });
  const field = screen.getByLabelText('Project name');
  await user.clear(field);
  await user.type(field, 'Launched');
  await user.click(screen.getByRole('button', { name: 'Save project' }));
  await screen.findByRole('heading', { name: 'Launched' });
  await user.click(screen.getByRole('link', { name: 'Projects' }));
  await waitFor(() =>
    expect(screen.getByRole('heading', { name: 'Launched' })).toBeVisible(),
  );
});
