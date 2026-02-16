import header from './components/header'



class homePage {

    constructor(){
        // this.header é a var local do constructor
        // = header é o header que foi importado
        //constructor.header.goToPreReg  -- exemplo
        this.header = header
    }


    go() {
        cy.visit('/')
    }
}
export default new homePage()