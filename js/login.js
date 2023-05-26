
function checkSubmit(event) {
    const form = document.querySelector("form");
    if  (form.email_tag.value === "" || form.password.value === "") {
        //se c'è almeno un campo vuoto
        event.preventDefault();
        console.log("campo vuoto");
        document.querySelector("#error_form").classList.remove("hidden");
    }
    else {
        console.log("tutto ok");
    }
}


document.querySelector("form").addEventListener("submit", checkSubmit);
const errors = document.querySelector(".errors");