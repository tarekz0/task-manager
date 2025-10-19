
describe('Happy path', () => {
  it('creates a task and updates dashboard metrics', () => {
    cy.visit('/')
    cy.contains('Tasks').click()
    cy.contains('Add Task').click()
    cy.get('input[name="title"]').type('Write E2E test')
    cy.get('input[name="estimatedHours"]').clear().type('3')
    cy.get('select[name="status"]').select('Open')
    cy.get('select[name="category"]').select('Engineering')
    cy.get('input[name="assignee"]').type('Tarek')
    cy.get('input[name="dueDate"]').type('2030-01-01')
    cy.contains('Save').click()
    cy.contains('Write E2E test').should('exist')
    cy.contains('Dashboard').click()
    cy.contains('Total Tasks').parent().should('contain.text', '3') // initial 2 + 1 new
  })
})
