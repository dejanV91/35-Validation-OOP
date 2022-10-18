class Validator {
    constructor(config){
        this.elementsConfig = config;
        this.errors = { }

        this.generateErrorsObject();
        this.inputListener();
    }

    generateErrorsObject() {
        for(let field in this.elementsConfig){
            this.errors[field] = [];
        }
    }

    inputListener() {
        let inputSelector = this.elementsConfig;

        for(let field in inputSelector) {
            let el = document.querySelector(`input[name = "${field}"]`);

            el.addEventListener("input", this.validate.bind(this))
        }
    }

    validate(e) {
        let elFields = this.elementsConfig;

        let field = e.target; 
        let fieldName = field.getAttribute("name");
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if (elFields[fieldName].required) {
            if(fieldValue === ""){
                this.errors[fieldName].push("polje je prazno")
            }
        }
    }
}