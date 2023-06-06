function searchPlayer(event){
    event.preventDefault();
    //const token = document.head.querySelector('meta[name="csrf-token"]').content;
    //Nascondo il menu del giocatore
    document.querySelector("#menuPlayer").classList.add("hidden");
    document.querySelector("#error").classList.add("hidden");
    //Prendo il dato inserito dall'utente
    const formData = new FormData(form);
    //faccio la fetch al file players_info.php che mi restituisce il json del giocatore cercato
    fetch("/get_player", {method: "post", body: formData})
    .then(response => response.json()).then(onPlayerJson);

    //Mostro la loading
    document.querySelector("#loading").classList.remove("hidden");

}

//seleziono il form
const form = document.querySelector("form");
form.addEventListener("submit", searchPlayer);


if(form.player_tag.value != ""){
    form.dispatchEvent(new Event("submit"));
}




