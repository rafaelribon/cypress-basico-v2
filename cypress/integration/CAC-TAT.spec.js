/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Ribon')
        cy.get('#email').type('rafae@exemple.com')
        cy.get('#open-text-area').type('Teste Preenchimento do formulario',{delay:0} )
        cy.contains('button','Enviar').click()

        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {

        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Ribon')
        cy.get('#email').type('rafaeexemple.com')
        cy.get('#open-text-area').type('Teste Preenchimento do formulario')
        cy.contains('button','Enviar').click()
        
        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não-númerico',function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value','')
    })


    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        
        cy.get('#firstName').type('Rafael')
        cy.get('#lastName').type('Ribon')
        cy.get('#email').type('rafa@eexemple.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste Preenchimento do formulario')
        cy.contains('button','Enviar').click()

        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        
        cy.get('#firstName')
            .type('Rafael')
            .should('have.value','Rafael')
            .clear()
            .should('have.value', '')

        cy.get('#lastName')
            .type('Ribon')
            .should('have.value','Ribon')
            .clear()
            .should('have.value', '')
        
        cy.get('#email')
            .type('rafael@exemple.com')
            .should('have.value','rafael@exemple.com')
            .clear()
            .should('have.value', '') 

        cy.get('#phone')
            .type('1145456789')
            .should('have.value','1145456789')
            .clear()
            .should('have.value', '')     


    })

    it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.',function(){

        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })
  })