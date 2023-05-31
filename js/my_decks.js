function onDeckJson(jsondecks, jsoncards) {
    console.log(jsondecks);
    console.log(jsoncards);
    const deckMenu = document.querySelector('#menu');
    if(jsondecks.user_status == 'empty'){
        document.querySelector('#first_deck').classList.remove('hidden');
    }
    else{
        //jsondecks è del tipo {status: 'ok', decks: [deck1, deck2, ...]}
        //decks è un array di oggetti deck: id title cards
        //cards è un array di oggetti card: 'id'
        for(let deck of jsondecks.decks){
            const div = document.createElement('div');
            div.dataset.deckid = deck.id;
            div.classList.add('deck-block');
            const dvititle = document.createElement('div');
            const title = document.createElement('h1');
            title.textContent = decodeURIComponent(deck.title.replace(/\+/g, ' '));
            const imgedit = document.createElement('img');
            imgedit.src = "/assets/edit.svg";
            imgedit.classList.add("edit-icon");
            imgedit.addEventListener('click', openModalEdit);
            dvititle.appendChild(title);
            dvititle.appendChild(imgedit);
            div.appendChild(dvititle);



            const deckdiv = document.createElement('div');
            deckdiv.classList.add('deckcards');
            //itero sulle carte del deck
            for(let card of deck.cards){
                //cerco la carta corrispondente nell'array jsoncards
                for(let jsoncard of jsoncards.items){
                    if(jsoncard.id == card){
                        const img = document.createElement('img');
                        img.src = jsoncard.iconUrls.medium;
                        img.dataset.id = jsoncard.id;
                        img.addEventListener('click', modalInfo);
                        deckdiv.appendChild(img);
                    }
                }
            }
            div.appendChild(deckdiv);

            const button = document.createElement("button");
            button.classList.add("bin-button");
            const img = document.createElement("img");
            img.src = "/assets/bin.svg";
            img.classList.add("icon"); 
            button.appendChild(img);
            button.addEventListener('click', openModalDelete);
            div.appendChild(button);
            deckMenu.prepend(div);
        }
    }
    console.log(jsondecks.users);


    if(jsondecks.users.length != 0){
        for(let user of jsondecks.users){
            if(user.decks != 'empty'){
                const userName = document.createElement('h1');
                userName.textContent = user.name + "'s decks";
                deckMenu.appendChild(userName);
                for(let deck of user.decks){
                    const div = document.createElement('div');
                    div.dataset.deckid = deck.id;
                    div.classList.add('deck-block');
                    const dvititle = document.createElement('div');
                    const title = document.createElement('h1');
                    title.textContent = decodeURIComponent(deck.title.replace(/\+/g, ' '));
                    dvititle.appendChild(title);
                    div.appendChild(dvititle);



                    const deckdiv = document.createElement('div');
                    deckdiv.classList.add('deckcards');
                    //itero sulle carte del deck
                    for(let card of deck.cards){
                        //cerco la carta corrispondente nell'array jsoncards
                        for(let jsoncard of jsoncards.items){
                            if(jsoncard.id == card){
                                const img = document.createElement('img');
                                img.src = jsoncard.iconUrls.medium;
                                img.dataset.id = jsoncard.id;
                                img.addEventListener('click', modalInfo);
                                deckdiv.appendChild(img);
                            }
                        }
                    }
                    div.appendChild(deckdiv);

                    const button = document.createElement("button");
                    button.classList.add("heart-button");
                    const img = document.createElement("img");
                    img.src = "/assets/heart.svg";
                    img.classList.add("icon");
                    button.appendChild(img);
                    button.addEventListener('click', openModalSave);
                    div.appendChild(button);
                    deckMenu.appendChild(div);
                }
            }
        }
    }

    document.querySelector('#menu .registration').classList.remove('hidden');
    document.querySelector('#loading').classList.add('hidden');
    document.querySelector('#menu').classList.remove('hidden');
}

function modalInfo(event){
    event.stopPropagation();

    modale.innerHTML = '';
    modale.classList.remove("hidden");
    body.classList.add("no-scroll");



    const img = document.createElement("img");
    img.src = event.currentTarget.src;

    const backbtn = document.createElement("span");
    backbtn.textContent = "BACK";
    backbtn.classList.add("btnred");    
    backbtn.addEventListener("click", chiudiModaleClick);
    const buttons = document.createElement("div");
    buttons.id = "buttons";
    buttons.appendChild(backbtn);


    modale.appendChild(img);
    modale.appendChild(buttons);


    const cardID = event.currentTarget.dataset.id;
    fetch("/get_card_info?card_id="+cardID)
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
    elixir.src = "/assets/elixir.webp";
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

function editDeckName(event){
    event.stopPropagation();
    const deckname = document.querySelector("#deck-name").value;
    if(deckname.length == 0){
        console.log("Deck senza nome");
        document.querySelector("#error-message").textContent = "Insert a Deck Name";
        document.querySelector("#error-message").classList.remove("hidden");
        return;
    }
    fetch('/edit_deck/'+ encodeURIComponent(deckid) + '/' + encodeURIComponent(deckname))
    .then(response => response.json())
    .then(onEditJson);
}

function onEditJson(json){
    console.log(json);
    if(json.status == 'ok'){
        window.location.reload(); //ricarica la pagina
    }
    else{
        if(json.error == 'title'){
            console.log("Deck non modificato");
            document.querySelector('#error-message').textContent = "Deck Name already used";
            document.querySelector('#error-message').classList.remove('hidden');
        }
        else{
            console.log("Deck non modificato");
            document.querySelector('#error-message').textContent = "Error in editing deck";
            document.querySelector('#error-message').classList.remove('hidden');
        }
    }
}

function onDeleteJson(json){
    console.log(json);
    if(json.status == 'ok'){
        window.location.reload(); //ricarica la pagina
    }
    else{
        console.log("Deck non salvato");
        document.querySelector('#error-message').textContent = "Error in deleting deck";
        document.querySelector('#error-message').classList.remove('hidden');
    }
}

function deleteDeck(event){
    event.stopPropagation();
    fetch('/delete_deck/'+ encodeURIComponent(deckid))
    .then(response => response.json())
    .then(onDeleteJson);
}

function openModalEdit(event){
    event.stopPropagation();
    modale.innerHTML='';
    modale.classList.remove("hidden");
    body.classList.add("no-scroll");

    deckid = event.currentTarget.parentNode.parentNode.dataset.deckid;
    console.log(deckid);

    const blocco = document.createElement("div");
    blocco.id = "deck-modal";


    const decknameinput = document.createElement("input");
    decknameinput.id = "deck-name";
    decknameinput.type = "text";
    decknameinput.required = "";
    decknameinput.placeholder = "New Deck Name";
    decknameinput.maxLength = 20;
  

    const imgs = event.currentTarget.parentNode.parentNode.querySelectorAll(".deckcards img");
    for (const img of imgs){
        const imgdiv = document.createElement("img");
        imgdiv.src = img.src;
        blocco.appendChild(imgdiv);  
    }  

    const confirmbtn = document.createElement("span");
    confirmbtn.textContent = "CONFIRM";
    confirmbtn.classList.add("btngreen");
    confirmbtn.addEventListener("click", editDeckName);  
    
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





function openModalDelete(event){
    event.stopPropagation();
    modale.innerHTML='';
    modale.classList.remove("hidden");
    body.classList.add("no-scroll");

    deckid = event.currentTarget.parentNode.dataset.deckid;

    const blocco = document.createElement("div");
    blocco.id = "deck-modal";


    const text = document.createElement("span");
    text.textContent = "Sei sicuro di voler eliminare il deck?";
    text.classList.add("text-confirm");
  

    const imgs = event.currentTarget.parentNode.querySelectorAll(".deckcards img");
    for (const img of imgs){
        const imgdiv = document.createElement("img");
        imgdiv.src = img.src;
        blocco.appendChild(imgdiv);  
    }  

    const confirmbtn = document.createElement("span");
    confirmbtn.textContent = "CONFIRM";
    confirmbtn.classList.add("btngreen");
    confirmbtn.addEventListener("click", deleteDeck);  
    
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


    
    modale.appendChild(text);
    modale.appendChild(blocco);
    modale.appendChild(buttons);
    modale.appendChild(errorMessage);
}


function openModalSave(event){
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
  

    const imgs = event.currentTarget.parentNode.querySelectorAll(".deckcards img");
    for (const img of imgs){
        const imgdiv = document.createElement("img");
        imgdiv.src = img.src;
        imgdiv.dataset.id = img.dataset.id;
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

function saveDeck(event){
    event.stopPropagation();
    const token = document.head.querySelector('meta[name="csrf-token"]').content;

    const deckname = document.querySelector("#deck-name").value;
    if(deckname.length == 0){
        console.log("Deck senza nome");
        document.querySelector("#error-message").textContent = "Insert a Deck Name";
        document.querySelector("#error-message").classList.remove("hidden");
        return;
    }
    const imgs = modale.querySelectorAll("#deck-modal img");
    const ids = [];
    for (const img of imgs) {
        ids.push(encodeURIComponent(img.dataset.id));
    }
    const json = JSON.stringify(ids); 
    console.log(json);
    const formdata = new FormData();
    formdata.append("title", encodeURIComponent(deckname));
    formdata.append("cards", json);
    fetch("/save_deck", {method: "post", body: formdata, headers: {'X-CSRF-TOKEN': token}})
    .then(response => response.json())
    .then(onSaveJson);
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

function chiudiModaleClick(event) {
    event.stopPropagation();
    modale.classList.add('hidden');
    img = modale.querySelector('img');
    img.remove();
    document.body.classList.remove('no-scroll');
}

function chiudiModale(event) {
	if(event.key === 'Escape') chiudiModaleClick(event);
}

let deckid = 0;

fetch('/get_cards')
  .then(response => response.json())
  .then(cards => {
    fetch('/get_user_decks2')
      .then(response => response.json())
      .then(decks=> {
        onDeckJson(decks, cards);
      });
  }).catch(error => {
    console.log("Controllare il token");
    const error_message_div = document.createElement("div");
    const error_message = document.createElement("h1");
    error_message.textContent = "Token non valido";
    const img_error = document.createElement("img");
    img_error.src = "/assets/cry.png";
    error_message_div.classList.add("error_token");
    error_message_div.appendChild(error_message);
    error_message_div.appendChild(img_error);
    body.insertBefore(error_message_div, document.querySelector("#loading"));   
    document.querySelector("#loading").classList.add("hidden");
  });

const modale = document.querySelector('#modale');
const body = document.querySelector('body');
window.addEventListener('keydown', chiudiModale);