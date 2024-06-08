describe('Headlines', () => {
  it('view headline and analysis', () => {
    // home page
    cy.visit('http://localhost:3000')
    cy.get('h1').first().should('have.text', '🦉 HeadlineWise')
    cy.get('h1')
      .eq(1)
      .should('have.text', 'Select a topic to review headlines:')
    cy.getByData('topic').first().click()

    // topic page
    cy.location('pathname').should('include', '/topics')
    cy.getByData('headline-card')
      .first()
      .then(($card: JQuery) => {
        const title = $card.find('[data-test="headline-card-title"]').text()
        cy.wrap($card).click()

        // article details
        cy.getByData('article-details')
          .should('be.visible')
          .then(($details: JQuery) => {
            cy.wrap($details).find('h1').should('have.text', title)
            cy.wrap($details)
              .getByData('display-label')
              .eq(0)
              .should('have.text', 'The Headline')
            cy.wrap($details)
              .getByData('display-label')
              .eq(1)
              .should('have.text', 'Language')
            cy.wrap($details)
              .getByData('display-label')
              .eq(2)
              .should('have.text', 'Politics')
            cy.wrap($details)
              .getByData('display-label')
              .eq(3)
              .should('have.text', 'Analysis')
          })
      })
  })
})
