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

            el.addEventListener("input", this.validate.bind(this));
        }
    }

    validate(e) {
        let elFields = this.elementsConfig;

        let field = e.target
        let fieldName = field.getAttribute("name");
        let fieldValue = field.value;

        this.errors[fieldName] = [];

        if (elFields[fieldName].required) {
            if(fieldValue === ""){
                this.errors[fieldName].push("polje je prazno")
            }
        }

        if(elFields[fieldName].email){
            if (!this.validateEmail(fieldValue)) {
                this.errors[fieldName].push("Neispravna email adresa")
            }
        }

        if (fieldValue.length < elFields[fieldName].minLength || fieldValue.length > elFields[fieldName].maxLength) {
            this.errors[fieldName].push(`Polje morati imati minimalno ${elFields[fieldName].minLength} i maximalno ${elFields[fieldName].maxLength} karaktera`);
        }

        
        if (elFields[fieldName].zipBroj) {
            let num = parseInt(fieldValue);
            if (isNaN(num)) {
                this.errors[fieldName].push("U polje se mogu upisati samo brojevi");
            }
        }

        if (elFields[fieldName].matching) {
            let matchingEl = document.querySelector(`input[name="${elFields[fieldName].matching}"]`);

            if (fieldValue !== matchingEl.value) {
                this.errors[fieldName].push("Lozinke se ne poklapaju");
            }else{
                this.errors[fieldName] = [];
                this.errors[matchingEl.name] = []
            }
        }
        this.populateErrors(this.errors);
    }

    populateErrors(errors){
        for(const elem of document.querySelectorAll("ul")){
            elem.remove();
        }

        for (let key of Object.keys(errors)){
            let parentElement = document.querySelector(`input[name="${key}"]`).parentElement;
            let errorsElement = document.createElement("ul");
            parentElement.appendChild(errorsElement);

            errors[key].forEach((error) => {
                let li = document.createElement("li");
                li.innerText = error;

                errorsElement.appendChild(li);
            });
        }
    }
    
    validateEmail(email) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true
        }else{
            return false
        }
    }
}