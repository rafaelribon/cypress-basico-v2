/// <reference types="Cypress" />


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Rafael')
    cy.get('#lastName').type('Ribon')
    cy.get('#email').type('rafae@exemple.com')
    cy.get('#open-text-area').type('Teste Preenchimento do formulario',{delay:0} )
    cy.contains('button','Enviar').click()

})