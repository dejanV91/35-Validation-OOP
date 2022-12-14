let config = {
    "ime_prezime": {
        required: true,
        minLength: 3,
        maxLength: 50,
    },

    "korisnicko_ime": {
        reguired: true,
        minLength: 5,
        maxLength: 50
    },

    "email": {
        required: true,
        email: true,
        minLength: 5,
        maxLength: 50
    },

    "broj_telefona": {
        minLength: 9,
        maxLength: 13
    },

    "zip_broj": {
        minLength: 4,
        maxLength: 6,
        zipBroj : true
    },

    "lozinka": {
        required: true,
        minLength: 7,
        maxLength: 25,
        matching: "ponovi_lozinku"
    },

    "ponovi_lozinku": {
        reguired: true,
        minLength: 7,
        maxLength: 25,
        matching: "lozinka"
    }
}


let validator = new Validator(config);




 
