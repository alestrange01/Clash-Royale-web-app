
//Funzione che gestisce il json del clan
function onClanJson(json){
    console.log(json);

    if(json.exists === true){
        document.querySelector("#name").textContent = json.name;
        document.querySelector("#clanLogo").src = "https://royaleapi.github.io/cr-api-assets/badges/"+json.clanLogo+".png";;
        document.querySelector("#tag").textContent = json.tag;
        document.querySelector("#type").textContent = "Type: "+json.type;
        document.querySelector("#clanWarTrophies span").textContent = "War Trophies: "+json.clanWarTrophies;
        document.querySelector("#description").textContent = json.description;

        document.querySelector("#location").textContent = "Location: "+json.location.name;
        document.querySelector("#clanScore").textContent = "Score: "+json.clanScore;
        document.querySelector("#requiredTrophies span").textContent = "Required Trophies: "+json.requiredTrophies;
        document.querySelector("#donationsPerWeek").textContent = "Donations Per Week: "+json.donationsPerWeek;
        document.querySelector("#membersCount").textContent = "Members: "+json.members;


        //Gestisco i membri del clan
        //Elimino possibili risultati precedenti
        document.querySelector("#members").innerHTML = "";

        //Controllo se ci sono membri ed itero
        const members = json.memberList;
        if(members.length == 0){
            const errore = document.createElement("h1");
            errore.textContent = "Non ci sono membri nel clan";
            document.querySelector("#members").appendChild(errore);
        }
        else{
            for(let i=0; i<members.length; i++){
                const div = document.createElement("div");
                div.dataset.id = members[i].tag;
                //Name
                const name = document.createElement("a");
                name.textContent = members[i].name;
                name.href = "/players/"+ encodeURIComponent(members[i].tag);
                name.classList.add("playerSearch");

                //Tag
                const tag = document.createElement("a");
                tag.textContent = members[i].tag;
                tag.href = "/players/"+ encodeURIComponent(members[i].tag);
                tag.classList.add("playerSearch");

                //Trophies
                const trophies = document.createElement("span");
                const trophiesText = document.createElement("span");
                trophiesText.textContent = "Trophies: "+members[i].trophies+"/7500 ";
                const trophiesImage = document.createElement("img");
                trophiesImage.src = "/assets/trophy.webp";
                trophiesImage.classList.add("trophy");
                trophies.appendChild(trophiesText);
                trophies.appendChild(trophiesImage);
                //Role
                const role = document.createElement("span");
                role.textContent = "("+members[i].role+")";

                div.appendChild(name);
                div.appendChild(tag);
                div.appendChild(trophies);
                div.appendChild(role);
                
                document.querySelector("#members").appendChild(div);

            }
        }
        document.querySelector("#menuPlayer").classList.remove("hidden");
    }
    else{
        document.querySelector("#error").classList.remove("hidden");
    }

    document.querySelector("#loading").classList.add("hidden");


}



function searchClan(event){
    event.preventDefault();
    const token = document.head.querySelector('meta[name="csrf-token"]').content;

    //Nascondo il menu del clan
    document.querySelector("#menuPlayer").classList.add("hidden");
    document.querySelector("#error").classList.add("hidden");

    //Prendo il dato inserito dall'utente
    const formData = new FormData(form);
    //faccio la fetch al file players_info.php che mi restituisce il json del giocatore cercato
    fetch("/get_clan", {method: "post", body: formData, headers: {'X-CSRF-TOKEN': token}})
    .then(response => response.json()).then(onClanJson);

    //Mostro la loading
    document.querySelector("#loading").classList.remove("hidden");
}

//seleziono il form
const form = document.querySelector("form");
form.addEventListener("submit", searchClan);

if(form.clan_tag.value != ""){
    form.dispatchEvent(new Event("submit"));
}

