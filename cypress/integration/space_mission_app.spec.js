describe('basic tests', function() {
  it('app front page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Harbey Spaceships')
  })
})

describe('search bar', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
    cy.get('#results').as('results')
  })
  it('search form can be selected', function() {
    cy.get('#search').click()
  })
  it('search form accepts input', function() {
    cy.get('#search').click().type('42')
  })
  it('ships can be searched by name', function() {
    cy.get('#search').click().type('go')
    cy.get('@results').should('contain', 'GO Ms Tree')
    cy.get('@results').should('contain', 'GO Quest')
    cy.get('@results').should('contain', 'GO Ms Chief')
  })
  it('ships can be searched by type', function() {
    cy.get('#search').click().type('barge')
    cy.get('@results').should('contain', 'Just Read The Instructions 1')
    cy.get('@results').should('contain', 'Just Read The Instructions 2')
    cy.get('@results').should('contain', 'Of Course I Still Love You')
  })
  it('ships can be searched by mission', function() {
    cy.get('#search').click().type('tess')
    cy.get('@results').should('contain', 'GO Quest')
    cy.get('@results').should('contain', 'Of Course I Still Love You')
  })
  it('there is a message for queries that return no match', function() {
    cy.get('#search').click().type('4242')
    cy.get('@results').should('contain', 'No Match')
  })
})

describe('detailed information about ships', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('more detailed information about ships is displayed after clicking on show details button', function() {
    cy.get('#display-button-GOMSTREE').click()
    cy.contains('Build Year')
    cy.contains('Type')
    cy.contains('Model')
    cy.contains('Landings')
    cy.contains('High Speed Craft')
    cy.contains('2015')
  })
  it('clicking on back button takes user to the main page', function() {
    cy.get('#display-button-GOMSTREE').click()
    cy.get('#back-button-GOMSTREE').click()
  })
})