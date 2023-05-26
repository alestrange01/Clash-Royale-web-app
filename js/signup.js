
function checkName(event) {
    const name = event.currentTarget;
    const re = /^[a-zA-Z]{2,25}$/;

    if (!re.test(name.value)) { 
        //entriamo qui se il nome non rispetta la regex
        document.querySelector("#error_name").classList.remove("hidden");
        name.classList.add("error_input");
        ErrorStatus.name = false;
    } else { 
        //entriamo qui se il nome rispetta la regex
        document.querySelector("#error_name").classList.add("hidden");
        name.classList.remove("error_input");
        ErrorStatus.name = true;
    }
}

function checkSurname(event) {
    const surname = event.currentTarget;
    const re = /^[a-zA-Z]{2,25}$/;

    if (!re.test(surname.value)) { 
        document.querySelector("#error_surname").classList.remove("hidden");
        surname.classList.add("error_input");
        ErrorStatus.surname = false;
    } else {
        document.querySelector("#error_surname").classList.add("hidden");
        surname.classList.remove("error_input");
        ErrorStatus.surname = true;
    }
}

function onPlayerTagJson(json) {
    console.log(json);
    if (json.exists) {
        document.querySelector("#error_player_tag span").textContent = "Player tag già in uso";
        document.querySelector("#error_player_tag").classList.remove("hidden");
        document.querySelector("#player_tag").classList.add("error_input");
        ErrorStatus.player_tag = false;
    } else if(typeof json.valid !== 'undefined' && !json.valid){//controllo che: se esiste json.valid e json.valid è false
        document.querySelector("#error_player_tag span").textContent = "Player tag non valido";
        document.querySelector("#error_player_tag").classList.remove("hidden");
        document.querySelector("#player_tag").classList.add("error_input");
        ErrorStatus.player_tag = false;
    } else {
        document.querySelector("#error_player_tag").classList.add("hidden");
        document.querySelector("#player_tag").classList.remove("error_input");
        ErrorStatus.player_tag = true;
    }
}

function checkPlayerTag(event){
    const playerTag = event.currentTarget;
    const re = /^#/; //deve iniziare con #

    if (!re.test(playerTag.value)) { 
        document.querySelector("#error_player_tag span").textContent = "Il player tag deve iniziare con un carattere '#'";
        document.querySelector("#error_player_tag").classList.remove("hidden");
        playerTag.classList.add("error_input");
        ErrorStatus.player_tag = false;
    }    
    else {
        fetch(CHECK_PLAYER_TAG_URL+"?q=" + encodeURIComponent(playerTag.value)).then(onResponse).then(onPlayerTagJson);
    }
}


function onEmailJson(json) {
    if (json.exists) {
        document.querySelector("#error_email span").textContent = "Email già in uso";
        document.querySelector("#error_email").classList.remove("hidden");
        document.querySelector("#email").classList.add("error_input");
        ErrorStatus.email = false;
    } else {
        document.querySelector("#error_email").classList.add("hidden");
        document.querySelector("#email").classList.remove("error_input");
        ErrorStatus.email = true;
    }

}

function checkEmail(event) {
    const email = event.currentTarget;
    //controllo che l'email sia valida: uso una regex standard
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email.value)) {
        document.querySelector("#error_email span").textContent = "Email non valida";
        document.querySelector("#error_email").classList.remove("hidden");
        email.classList.add("error_input");
        ErrorStatus.email = false;
    }
    else {
        //faccio una fetch a check_email.php passado la stringa email tolowercase con encodeURIComponent
        fetch(CHECK_EMAIL_URL+"?q=" + encodeURIComponent(email.value.toLowerCase())).then(onResponse).then(onEmailJson);

    }

}
// CONTROLLO PASSWORD: deve contenere almeno una minuscola, una maiuscola e un carattere speciale
function checkPassword(event) {
    const password = event.currentTarget;
    const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!#\$%&@()*\+,.\-:;=\?\[\]_{|}])[A-Za-z\d!#\$%&@()*\+,.\-:;=\?\[\]_{|}]{8,}$/;

    if (!re.test(password.value)) {
        document.querySelector("#error_password").classList.remove("hidden");
        password.classList.add("error_input");
        ErrorStatus.password = false;
    } else {
        document.querySelector("#error_password").classList.add("hidden");
        password.classList.remove("error_input");
        ErrorStatus.password = true;
    }
    //controllo se la password e la conferma password coincidono
    const confirmPassword = document.querySelector("#confirm_password");
    if (confirmPassword.value !== password.value) {
        document.querySelector("#error_confirm_password").classList.remove("hidden");
        confirmPassword.classList.add("error_input");
        ErrorStatus.confirm_password = false;
    } else {
        document.querySelector("#error_confirm_password").classList.add("hidden");
        confirmPassword.classList.remove("error_input");
        ErrorStatus.confirm_password = true;
    }
}

function checkConfirmPassword(event) {
    const confirmPassword = event.currentTarget;
    const password = document.querySelector("#password");

    if (confirmPassword.value !== password.value) {
        document.querySelector("#error_confirm_password").classList.remove("hidden");
        confirmPassword.classList.add("error_input");
        ErrorStatus.confirm_password = false;
    } else {
        document.querySelector("#error_confirm_password").classList.add("hidden");
        confirmPassword.classList.remove("error_input");
        ErrorStatus.confirm_password = true;
    }
}




//TAG prova: #2LGPPLL8 
function checkSubmit(event) {
    const form = document.querySelector("form");
    if  (form.name.value === "" || form.surname.value === "" || form.player_tag.value === "" || form.email.value === "" || form.password.value === "" || form.confirm_password.value === "") {
        //se c'è almeno un campo vuoto
        event.preventDefault();
        console.log("campo vuoto");
        document.querySelector("#error_form").classList.remove("hidden");
    } 
    else if (!ErrorStatus.name || !ErrorStatus.surname || !ErrorStatus.player_tag || !ErrorStatus.email || !ErrorStatus.password || !ErrorStatus.confirm_password){
        //se c'è almeno un errore
        event.preventDefault();
        console.log("errore");
        console.log(ErrorStatus);
    }//altrimenti  
    else {
        console.log("tutto ok");
    }

}

function onResponse(response) {
    if (!response.ok) 
        return null;
    return response.json();
}




const ErrorStatus = {name: false, surname: false, player_tag: false, email: false, password: false, confirm_password: false};
document.querySelector("#name").addEventListener("blur", checkName);
document.querySelector("#surname").addEventListener("blur", checkSurname);
document.querySelector("#player_tag").addEventListener("blur", checkPlayerTag);
document.querySelector("#email").addEventListener("blur", checkEmail);
document.querySelector("#password").addEventListener("blur", checkPassword);
document.querySelector("#confirm_password").addEventListener("blur", checkConfirmPassword);
document.querySelector("#submit").addEventListener("click", checkSubmit);
const errors = document.querySelector(".errors");