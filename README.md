# Harbey Spaceships: A "Spaceship" Database App built with [React.js](https://reactjs.org)

### Summary

Harbey Spaceships is a card-gallery app created using React and React Hooks. The ship information were displayed using the [SpaceX API](https://api.spacex.land/graphql/) and [Apollo Client](https://www.apollographql.com/docs/react/) to fetch data. [TailwindCSS](https://tailwindcss.com/) was used for the generating css elements.

### Getting Started

Clone the repository on your local machine and cd into it:

```
git clone git@github.com:mertbarut/space-mission.git
cd space-mission
```

Install dependencies

```
npm install --legacy-peer-deps
```

Run Harbey Spaceships from the root directory:

```
npm start
```

### Dependencies

Production:
- react v18.1.0
- react-dom v18.1.0
- react-scripts v5.0.1
- apollo/client v3.6.2
- graphql v16.5.0
- react-beautiful-dnd v13.1.0
- web-vitals v2.1.4

Development:
- @testing-library/jest-dom v5.16.4
- @testing-library/react v13.2.0
- @testing-library/user-event v14.2.0
- autoprefixer v10.4.7
- cypress v9.6.1
- eslint v8.15.0
- eslint-plugin-cypress v2.12.1
- postcss v8.4.13
- tailwindcss v3.0.24

### Features

**1. Draggable Ship Cards**

On the front page, every ship has information regarding their name, image, built year, total number of missions traveled and whether it is active or not displayed in cards. By default, only ships built in the last 10 years is displayed. 

Cards holding these information can be dragged and dropped, and the order of appearance in this list can be changed.

Clicking on "Show Details" button displays solely more information about the selected
spaceship.

**2. Search functionality**

Using the search bar, you can filter the vehicles by name, type or the name of the mission the ship has been in.

**3. Favorites list**

Spaceships can be saved as favorite, which will be saved above the search bar. Spaceships can also be removed from favorites.

**4. Responsive Card View**

Detailed view of the selected spaceship card changes depending on the screen width.

**5. Error handling**

There is an error displayed when the SpaceX API is not available.

### Tests

Functionality of the components are tested with Jest and Cypress.

Favorite functionality, among others, is tested with Jest. These tests can be launched with:
```
npm test
```

Search bar and the detailed view is tested with Cypress. These tests can be launched with:
```
npm run cypress:open
```

### Known Issues

- When search bar is used, the images are unnecessarily re-rendered

### Coming Soon

- [ ] Add pagination to display more ships
- [ ] Add a Crew Members Tab

### Contributing

Everyone is welcomed to contribute to this project. You can contribute either by submitting bugs or suggesting improvements by opening an issue on GitHub. Please see the [CONTRIBUTING](CONTRIBUTING.md) guidelines for more information.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).