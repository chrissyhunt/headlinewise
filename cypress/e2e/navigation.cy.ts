describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('user can navigate to all pages from desktop nav bar', () => {
    cy.getByData('nav-link').eq(0).should('have.text', 'Home').click()
    cy.location('pathname').should('eq', '/')

    cy.getByData('nav-link').eq(1).should('have.text', 'About').click()
    cy.location('pathname').should('eq', '/about')

    cy.getByData('nav-link').eq(2).should('have.text', 'Data').click()
    cy.location('pathname').should('eq', '/data')

    cy.getByData('nav-link')
      .eq(3)
      .should('have.text', 'GitHub')
      .should(
        'have.attr',
        'href',
        'https://github.com/chrissyhunt/headlinewise'
      )
      .should('have.attr', 'target', '_blank')

    cy.getByData('nav-link')
      .eq(4)
      .should('have.text', 'Hire Me ✨')
      .should(
        'have.attr',
        'href',
        'https://www.linkedin.com/in/chrissyhuntnyc/'
      )
      .should('have.attr', 'target', '_blank')
  })

  it(
    'user can navigate to all pages from mobile nav drawer',
    { viewportWidth: 600 },
    () => {
      cy.getByData('hamburger-trigger').click()
      cy.getByData('mobile-nav-link').eq(0).should('have.text', 'Home').click()
      cy.location('pathname').should('eq', '/')

      cy.getByData('hamburger-trigger').click()
      cy.getByData('mobile-nav-link').eq(1).should('have.text', 'About').click()
      cy.location('pathname').should('eq', '/about')

      cy.getByData('hamburger-trigger').click()
      cy.getByData('mobile-nav-link').eq(2).should('have.text', 'Data').click()
      cy.location('pathname').should('eq', '/data')

      cy.getByData('hamburger-trigger').click()
      cy.getByData('mobile-nav-link')
        .eq(3)
        .should('have.text', 'GitHub')
        .should(
          'have.attr',
          'href',
          'https://github.com/chrissyhunt/headlinewise'
        )
        .should('have.attr', 'target', '_blank')

      cy.getByData('mobile-nav-link')
        .eq(4)
        .should('have.text', 'Hire Me ✨')
        .should(
          'have.attr',
          'href',
          'https://www.linkedin.com/in/chrissyhuntnyc/'
        )
        .should('have.attr', 'target', '_blank')
    }
  )

  it('user can navigate to all pages from footer', () => {
    // nav links
    cy.getByData('footer-nav-link').eq(0).should('have.text', 'Home').click()
    cy.location('pathname').should('eq', '/')

    cy.getByData('footer-nav-link').eq(1).should('have.text', 'About').click()
    cy.location('pathname').should('eq', '/about')

    cy.getByData('footer-nav-link').eq(2).should('have.text', 'Data').click()
    cy.location('pathname').should('eq', '/data')

    cy.getByData('footer-nav-link')
      .eq(3)
      .should('have.text', 'GitHub')
      .should(
        'have.attr',
        'href',
        'https://github.com/chrissyhunt/headlinewise'
      )
      .should('have.attr', 'target', '_blank')

    cy.getByData('footer-nav-link')
      .eq(4)
      .should('have.text', 'Hire Me ✨')
      .should(
        'have.attr',
        'href',
        'https://www.linkedin.com/in/chrissyhuntnyc/'
      )
      .should('have.attr', 'target', '_blank')

    // author link
    cy.getByData('author-link')
      .should('have.text', 'Chrissy Hunt')
      .should('have.attr', 'href', 'https://chrissyhunt.com')
      .should('have.attr', 'target', '_blank')

    // login link
    cy.getByData('login-link').should('have.text', 'Admin Login').click()
    cy.location('pathname').should('eq', '/login')
  })
})
