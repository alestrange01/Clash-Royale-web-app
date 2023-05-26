const myclanid = '#LV2CLY8U';
const myplayerid = '#QL9GVP9';

const taken = [];
let hero = false;
const MAX = 8;

let ascendingjson = null;
let descendingjson = null;
let commonjson = null;
let rarejson = null;
let epicjson = null;
let legendaryjson = null;
let herojson = null;

function orderCards(cards) {
    // console.log(cards);
    // Ordinamento crescente per "maxLevel"
    ascendingjson = {'items' : cards.items.slice().sort((a, b) => b.maxLevel - a.maxLevel)};
  
    // Ordinamento decrescente per "maxLevel"
    descendingjson = {'items': ascendingjson.items.slice().reverse()};

    // Selezione per rarità
    commonjson = {'items': cards.items.slice().filter(card => card.maxLevel == 14)};
    rarejson = {'items': cards.items.slice().filter(card => card.maxLevel == 12)};
    epicjson = {'items': cards.items.slice().filter(card => card.maxLevel == 9)};
    legendaryjson = {'items': cards.items.slice().filter(card => card.maxLevel == 6)};
    herojson = {'items': cards.items.slice().filter(card => card.maxLevel == 4)};
  

    /* console.log("ascending");
    console.log(ascendingjson);
    console.log("descending");
    console.log(descendingjson); */
}

function onJsonCard(json){
    console.log('JSON ricevuto');
    console.log(json);
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    let results = json.items;


    console.log("taken: " + taken);
    if(document.querySelector('input[type="radio"][value="up"]:checked')){
        // console.log("up");
        const ascendingcards = ascendingjson.items;
        console.log(ascendingcards);
        results = ascendingcards.slice().filter(card => !taken.includes(card.id));
    }
    else if(document.querySelector('input[type="radio"][value="down"]:checked')){
        // console.log("down");
        const descendingcards = descendingjson.items;
        results = descendingcards.slice().filter(card => !taken.includes(card.id));
    }else if(document.querySelector('input[type="radio"][value="common"]:checked')){
        // console.log("common");
        const commoncards = commonjson.items;
        results = commoncards.slice().filter(card => !taken.includes(card.id));
    }else if(document.querySelector('input[type="radio"][value="rare"]:checked')){
        // console.log("rare");
        const rarecards = rarejson.items;
        results = rarecards.slice().filter(card => !taken.includes(card.id));
    }else if(document.querySelector('input[type="radio"][value="epic"]:checked')){
        // console.log("epic");
        const epiccards = epicjson.items;
        results = epiccards.slice().filter(card => !taken.includes(card.id));
    }else if(document.querySelector('input[type="radio"][value="legendary"]:checked')){
        // console.log("legendary");
        const legendarycards = legendaryjson.items;
        results = legendarycards.slice().filter(card => !taken.includes(card.id));
    }else if(document.querySelector('input[type="radio"][value="hero"]:checked')){
        // console.log("hero");
        const herocards = herojson.items;
        results = herocards.slice().filter(card => !taken.includes(card.id));
    }




    console.log("results: " + results.length);

    //console.log("30 elemento: "+results[30].name + " " + results[30].maxLevel);
    for(result of results)
    {
        // Leggiamo info
        const immagine = result.iconUrls.medium;
        const blocco = document.createElement('div');
        blocco.classList.add('album');
        blocco.dataset.id = result.id;
        const img = document.createElement('img');
        img.src = immagine;
        img.dataset.id = result.id;
        img.dataset.name = result.name;
        // img.dataset.level = result.maxLevel;
        const maxLevel = result.maxLevel;
        let rarity;
        switch(maxLevel){
            case 14: 
                rarity = "Common";
                blocco.classList.add("common");
                break;
            case 12:
                rarity = "Rare";
                blocco.classList.add("rare");
                break;
            case 9:
                rarity = "Epic";
                blocco.classList.add("epic");
                break;
            case 6:
                rarity = "Legendary";
                blocco.classList.add("legendary");
                break;
            case 4:
                rarity = "Hero";
                blocco.classList.add("hero");
                break;
            default:
                rarity = "unknown";  
        }

        img.dataset.rarity = rarity;

        const name = document.createElement('p');
        name.textContent = result.name;
        name.addEventListener("click", modalInfo);
        

        // img.addEventListener("click", selection);
        blocco.addEventListener("click", selection);
    
        blocco.appendChild(img);
        blocco.appendChild(name);
        
        library.appendChild(blocco);
    }

    //nascondo la loading
    document.querySelector("#loading").classList.add("hidden");
    //mostro l'intro
    document.querySelector("#intro").classList.remove("hidden");
    //mostro i radio button
    document.querySelector(".container").classList.remove("hidden");

}

function modalInfo(event){
    event.stopPropagation();

    modale.innerHTML = '';
    modale.classList.remove("hidden");
    body.classList.add("no-scroll");



    const img = document.createElement("img");
    img.src = event.currentTarget.parentNode.querySelector("img").src;

    const backbtn = document.createElement("span");
    backbtn.textContent = "BACK";
    backbtn.classList.add("btnred");    
    backbtn.addEventListener("click", chiudiModaleClick);
    const buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.appendChild(backbtn);


    modale.appendChild(img);
    modale.appendChild(buttons);


    const cardID = event.currentTarget.parentNode.dataset.id;
    fetch("get_card_info.php?q="+cardID)
    .then(response => response.json())
    .then(onCardJson);

}

function onCardJson(json){
    console.log(json);
    const cardInfo = document.createElement("div");
    cardInfo.id = "cardinfo";

    const cardCost = document.createElement("span");
    cardCost.textContent = "Cost: "+json.cost;
    const elixir = document.createElement("img");
    elixir.src = "images/elixir.webp";
    elixir.classList.add("elixir");
    cardCost.appendChild(elixir);
    cardInfo.appendChild(cardCost);

    const cardname = document.createElement("h1");
    cardname.textContent = json.name;
  

    if (json.health_shield !== null) {
        const cardHealthShield = document.createElement("span");
        cardHealthShield.textContent = "Health(Shield): "+json.health_shield;
        cardInfo.appendChild(cardHealthShield);
    }
    if (json.damage !== null) {
        const cardDamage = document.createElement("span");
        cardDamage.textContent = "Damage: "+json.damage;
        cardInfo.appendChild(cardDamage);
    }
    if (json.hit_speed !== null) {
        const cardHitSpeed = document.createElement("span");
        cardHitSpeed.textContent = "Hit Speed: "+json.hit_speed;
        cardInfo.appendChild(cardHitSpeed);
    }
    if(json.dps !== null){
        const cardDps = document.createElement("span");
        cardDps.textContent = "DPS: "+json.dps;
        cardInfo.appendChild(cardDps);
    }
    if(json.spawn_death_damage !== null){
        const cardSpawnDeathDamage = document.createElement("span");
        cardSpawnDeathDamage.textContent = "Spawn/Death Damage: "+json.spawn_death_damage;
        cardInfo.appendChild(cardSpawnDeathDamage);
    }
    if(json.attack_range !== null){
        const cardAttackRange = document.createElement("span");
        cardAttackRange.textContent = "Attack Range: "+json.attack_range;
        cardInfo.appendChild(cardAttackRange);
    }
    if(json.spawn_count !== null){
        const cardSpawnCount = document.createElement("span");
        cardSpawnCount.textContent = "Spawn Count: "+json.spawn_count;
        cardInfo.appendChild(cardSpawnCount);
    }


    modale.prepend(cardname);
    modale.insertBefore(cardInfo, modale.querySelector("#buttons"));

}


function onResponse(response) {
    console.log('Risposta ricevuta');
    if(response.ok){
        console.log('JSON ricevuto');
        return response.json();
    }
    console.log('Risposta non valida');
    return null;
}

function openAlert(){
    modale.innerHTML='';
    modale.classList.remove("hidden");
    body.classList.add("no-scroll");    

    const errorMessage = document.createElement("span");
    errorMessage.id = "error-message";
    errorMessage.textContent = "Puo' essere scelto solo un eroe!";
    
    const backbtn = document.createElement("span");
    backbtn.textContent = "BACK";
    backbtn.classList.add("btnred");    
    backbtn.addEventListener("click", chiudiModaleClick);

    const buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.appendChild(backbtn);

    modale.appendChild(errorMessage);
    modale.appendChild(buttons);

}

function selection(event){
    event.stopPropagation();

    deck.classList.remove("hidden");
    // const immagine = event.currentTarget;
    const blocco = event.currentTarget;
    const immagine = blocco.querySelector("img");
    if(immagine.dataset.rarity == "Hero"){
        if(hero){
            openAlert();
            return;
        }
        hero = true;
    }
    // immagine.removeEventListener("click", selection);
    // immagine.addEventListener("click", deselection);
    // const src = immagine.src;

    blocco.removeEventListener("click", selection);
    immagine.addEventListener("click", deselection);

   

    // const blocco = immagine.parentNode;
    blocco.classList.add("hidden");

    const imgspan = document.createElement("span");
    imgspan.appendChild(immagine);

    taken.push(parseInt(immagine.dataset.id));

    deck.appendChild(imgspan);
    // body.appendChild(deck);

    
    if(end()){
        // const imgs = document.querySelectorAll("#album-view img");
        // for (const img of imgs) {
        //     img.removeEventListener("click", selection);
        // }
        const divs = document.querySelectorAll("#album-view .album");
        for (const div of divs) {
            div.removeEventListener("click", selection);
        }
        const button = document.createElement("button");
        button.id = "confirm";
        button.textContent = "Confirm Deck";
        button.addEventListener("click", openModal);
        deck.appendChild(button);
    }


}

function deselection(event){
    event.stopPropagation();
    const immagine = event.currentTarget;
    immagine.removeEventListener("click", deselection);

    const imgspan = immagine.parentNode;
    imgspan.remove();

    const blocchi = document.querySelectorAll("#album-view .album");
    for (const blocco of blocchi) {
        if(blocco.dataset.id == immagine.dataset.id){
            blocco.prepend(immagine);
            blocco.classList.remove("hidden");
            // blocco.querySelector("img").addEventListener("click", selection);
            blocco.addEventListener("click", selection);
        }
    }


    if(immagine.dataset.rarity == "Hero"){
        hero = false;
    }

    taken.splice(taken.indexOf(immagine.dataset.id),1);
    if(taken.length === MAX-1){
        // const imgs = document.querySelectorAll("#album-view img");
        // for (const img of imgs) {
        //     img.addEventListener("click", selection);
        // }
        const divs = document.querySelectorAll("#album-view .album");
        for (const div of divs) {
            div.addEventListener("click", selection);
        }
        const btn = document.querySelector("#deck button");
        btn.remove();
    }
    if(taken.length == 0){
        deck.classList.add("hidden");
        // arrow_down.classList.add("hidden");
    }

}

function end(){
    return (taken.length == MAX)
}

function openModal(event){
    event.stopPropagation();
    modale.innerHTML='';
    modale.classList.remove("hidden");
    body.classList.add("no-scroll");

    const blocco = document.createElement("div");
    blocco.id = "deck-modal";


    const decknameinput = document.createElement("input");
    decknameinput.id = "deck-name";
    decknameinput.type = "text";
    decknameinput.required = "";
    decknameinput.placeholder = "Deck name";
    decknameinput.maxLength = 20;
  

    const imgs = document.querySelectorAll("#deck img");
    for (const img of imgs){
        const imgdiv = document.createElement("img");
        imgdiv.src = img.src;
        blocco.appendChild(imgdiv);  
    }  

    const confirmbtn = document.createElement("span");
    confirmbtn.textContent = "CONFIRM";
    confirmbtn.classList.add("btngreen");
    confirmbtn.addEventListener("click", saveDeck);  
    
    const backbtn = document.createElement("span");
    backbtn.textContent = "BACK";
    backbtn.classList.add("btnred");    
    backbtn.addEventListener("click", chiudiModaleClick);

    const buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.appendChild(confirmbtn);
    buttons.appendChild(backbtn);


    const errorMessage = document.createElement("span");
    errorMessage.id = "error-message";
    errorMessage.classList.add("hidden");


    modale.appendChild(decknameinput);
    modale.appendChild(blocco);
    modale.appendChild(buttons);
    modale.appendChild(errorMessage);

}

function chiudiModaleClick(event) {
    event.stopPropagation();
    modale.classList.add('hidden');
    document.body.classList.remove('no-scroll');
}

function chiudiModale(event) {
	if(event.key === 'Escape') chiudiModaleClick(event);
}

function visualizeDeck(event){
    event.stopPropagation();
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });

    if(deck == null) return;
    

}


function saveDeck(event){
    event.stopPropagation();
    
    const deckname = document.querySelector("#deck-name").value;
    if(deckname.length == 0){
        console.log("Deck senza nome");
        document.querySelector("#error-message").textContent = "Insert a Deck Name";
        document.querySelector("#error-message").classList.remove("hidden");
        return;
    }
    console.log("Salvataggio");
    const imgs = document.querySelectorAll("#deck img");
    const ids = [];
    for (const img of imgs) {
        ids.push(encodeURIComponent(img.dataset.id));
    }
    const json = JSON.stringify(ids);
    console.log(json);
    const formdata = new FormData();
    formdata.append("title", encodeURIComponent(deckname));
    formdata.append("cards", json);
    fetch("save_deck.php", {method: "post", body: formdata}).then(onResponse).then(onSaveJson);
}

function onSaveJson(json){
    console.log(json);
    if(json.status == "success"){
        console.log("Deck salvato");
        window.location.href = json.redirect;
    }else{
        if(json.hasOwnProperty('redirect')){
            window.location.href = json.redirect;
        }else{
            console.log("Deck non salvato");
            //error può essere settato a "title" o "cards"
            if(json.error == "title"){
                document.querySelector("#error-message").textContent = "Deck name already used";
                document.querySelector("#error-message").classList.remove("hidden");
            }else{
                document.querySelector("#error-message").textContent = "Deck already exists";
                document.querySelector("#error-message").classList.remove("hidden");
            }
        }
    }
}



/* fetch('get_cards.php').then(response => response.json())
.then(json => {
    onJsonCard(json);
    orderCards(json);}
); */
fetch('images/card.json').then(response => response.json())
.then(json => {
    onJsonCard(json);
    orderCards(json);}
);

const body = document.querySelector("body");
const album_view = document.querySelector("#album-view");
const deck = document.querySelector('#deck');

const modale = document.querySelector('#modale');
window.addEventListener('keydown', chiudiModale);

const arrow_down = document.querySelector("#arrow-down");
arrow_down.addEventListener("click", visualizeDeck);

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // l'elemento con id="deck" è diventato visibile nella viewport
        arrow_down.classList.add("opacity"); // nascondo la freccia
      } else {
        arrow_down.classList.remove("opacity") // mostro la freccia
        arrow_down.classList.remove("hidden");
      }
    });
  });
 
observer.observe(deck);

const radio = document.querySelectorAll(".container input");
for (const r of radio) {
    r.addEventListener("click", onRadioClick);
}

function onRadioClick(event){
    if(event.currentTarget.value == "up"){
        onJsonCard(ascendingjson);
    }else{
        onJsonCard(descendingjson);
    }
}

