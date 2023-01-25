// facilita completando e ajudando nas criações 
/// <reference types="cypress"/> 


//suit
describe('home', () =>{
    // cada it deve ser um unico teste
    // não custruir testes dependentes
    it('webapp deve estar online', ()=>{// 1 descri 2 func
        cy.visit('/')//visita o site

        // time proprio de 4 s para validação
        cy.title().should('eq', 'Gerencie suas tarefas com Mark L')//2 argumentos  , 1 event comparação 2 o que será comparado
    })
})