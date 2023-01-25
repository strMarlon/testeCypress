/// <reference types="cypress"/> 
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//coston comands para enca 
Cypress.Commands.add('createTask', (taskName = '')=> {// comando customizado 
    cy.visit('/')//rota principal da url base
    //buscando pelo xpef
    cy.get('input[placeholder="Add a new Task"]').as('inputTask') // " as " cria um apelido para o inpput do get

    if(taskName !== ''){
        cy.get('@inputTask')
            .type(taskName)
    }

    cy.contains('button', 'Create').click()
})

Cypress.Commands.add('isRequired', (targetMessage) =>{
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
                text
            ).to.eq(text)
    })
})

//coston comands para enca
Cypress.Commands.add('removeTaskByName',(taskName)=>{

    cy.request({
        url: Cypress.env('apiUrl') + '/helper/tasks',
        method: 'DELETE', // deleta
        body: {name: taskName}
    }).then(response => {
        expect(response.status).to.eq(204)// erro(204)
    })
})
//conston comands para enca
Cypress.Commands.add('postTask',(task)=>{
    cy.request({
        url: Cypress.env('apiUrl') + '/tasks',
        method: 'POST', // cadastra
        body: task
    }).then(response => {
        expect(response.status).to.eq(201)// deu certo (201)
    })
})