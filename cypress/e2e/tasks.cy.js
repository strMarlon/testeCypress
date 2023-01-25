/// <reference types="cypress"/> 
//import {faker} from '@faker-js/faker'       biblioteca faker

//suit

describe('tarefas', ()=> {

    let testData;

    before(()=> {//reaproveitação  executa somente uma vez 
        cy.fixture('tasks').then(t => {
            testData = t
        })  
    })


    //organização por contexto
    context('cadastro', ()=> {
        it('deve cadastrar uma nova tarefa', ()=> {

            const taskName = 'Ler um livro de Node.js'
    
            cy.removeTaskByName(taskName)//preparando o ter (stap)
            cy.createTask(taskName)// criar uma tarefa 
                
            cy.contains('main div p',taskName)
                .should('be.visible')
    
        })
    
        it('Não deve permitir tarefa duplicada', ()=> {

            const task = testData.dup//sub objeto que tem a mass tesk

            
    
            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)// criar uma tarefa
    
            // Então vejo a mensagem de duplicado
            cy.get('.swal2-html-container')
                .should('be.visible')//ta na tela ?
                .should('have.text', 'Task already exists!')// ta com esse texto?
        })
    
        it('Campo obrigatorio', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    
    })
    context('atualização', ()=> {
        it('deve concluir uma tarefa', ()=> {
            const task = {
                name: 'Pagar contas de consumo',
                is_done: false
            }
            
            cy.removeTaskByName(task.name)
            cy.postTask(task)      

            cy.visit('/')
            
            cy.contains('p', task.name)
                .parent()// vai para o element pai
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')// verificando se tem no css  
        })
    })

    context('exclusão', ()=> {
        it('deve remover uma tarefa', ()=> {
            const task = {
                name: 'Estudar Javascript',
                is_done: false
            }
            
            cy.removeTaskByName(task.name)//remove a mass
            cy.postTask(task)// cadastra novamente      

            cy.visit('/')
            
            cy.contains('p', task.name)
                .parent()// vai para o element pai
                .find('button[class*=ItemDelete]')
                .click()

            cy.contains('p', task.name)
                .should('not.exist')// verificando se tem no css  
        })
    })
})




















