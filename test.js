class Validator{
    constructor(config){
        this.elementsConfig = config;
        this.errors = { }

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig) {
            this.errors[field] = [];    
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfig;

        for(let field in inputSelector) {
            let el = document.querySelector(`input[name="${field}"]`);

            el.addEventListener("input", this.validate);
        }
    }

    validate(e) {
        console.log();
    }
}