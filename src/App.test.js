import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client'
import './index.css'
import App from './App'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://api.spacex.land/graphql/',
  })
})

describe('favorite list tests', () => {
  test('favorites list has a placeholder when empty', async () => {
    const { getByTestId, unmount } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
    const favorites = screen.getByTestId('favorites')
    expect(favorites).toHaveTextContent('Your favorites will show up here')
    const user = userEvent.setup()
    const favoriteButton = await waitFor(() => getByTestId('fav-button-GOMSCHIEF'))
    await user.click(favoriteButton)
    expect(favorites).toHaveTextContent('GO Ms Chief')
    const unfavoriteButton = await waitFor(() => getByTestId('fav-button-GOMSCHIEF'))
    await user.click(unfavoriteButton)
    expect(favorites).toHaveTextContent('Your favorites will show up here')
    unmount()
  }),
  test('favorites list can be filled and emptied', async () => {
    const { getByTestId, unmount } = render(
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    )
    const favorites = screen.getByTestId('favorites')
    expect(favorites).toHaveTextContent('Your favorites will show up here')

    const user = userEvent.setup()

    const favoriteButton1 = await waitFor(() => getByTestId('fav-button-GOMSCHIEF'))
    await user.click(favoriteButton1)
    expect(favorites).toHaveTextContent('GO Ms Chief')

    const favoriteButton2 = await waitFor(() => getByTestId('fav-button-JRTI-1'))
    await user.click(favoriteButton2)
    expect(favorites).toHaveTextContent('Just Read The Instructions 1')

    const favoriteButton3 = await waitFor(() => getByTestId('fav-button-JRTI-2'))
    await user.click(favoriteButton3)
    expect(favorites).toHaveTextContent('Just Read The Instructions 2')

    const favoriteButton4 = await waitFor(() => getByTestId('fav-button-GOMSTREE'))
    await user.click(favoriteButton4)
    expect(favorites).toHaveTextContent('GO Ms Tree')

    const unfavoriteButton1 = await waitFor(() => getByTestId('fav-button-GOMSCHIEF'))
    await user.click(unfavoriteButton1)

    const unfavoriteButton2 = await waitFor(() => getByTestId('fav-button-JRTI-1'))
    await user.click(unfavoriteButton2)

    const unfavoriteButton3 = await waitFor(() => getByTestId('fav-button-JRTI-2'))
    await user.click(unfavoriteButton3)

    const unfavoriteButton4 = await waitFor(() => getByTestId('fav-button-GOMSTREE'))
    await user.click(unfavoriteButton4)

    expect(favorites).toHaveTextContent('Your favorites will show up here')
    unmount()
  })
})

