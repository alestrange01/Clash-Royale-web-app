function onDeckJson(jsondecks, jsoncards) {
    console.log(jsondecks);
    console.log(jsoncards);
    const deckMenu = document.querySelector('#menu');
    if(jsondecks.status == 'empty'){
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
            imgedit.src = "images/edit.svg";
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
                        deckdiv.appendChild(img);
                    }
                }
            }
            div.appendChild(deckdiv);

            const button = document.createElement("button");
            button.classList.add("bin-button");
            const img = document.createElement("img");
            img.src = "images/bin.svg";
            img.classList.add("icon"); 
            button.appendChild(img);
            button.addEventListener('click', openModalDelete);
            div.appendChild(button);
            deckMenu.prepend(div);
        }
    }
    document.querySelector('#menu .registration').classList.remove('hidden');
    document.querySelector('#loading').classList.add('hidden');
    document.querySelector('#menu').classList.remove('hidden');
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
    fetch('edit_deck.php?deckid='+ encodeURIComponent(deckid) + '&deckname=' + encodeURIComponent(deckname))
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
    fetch('delete_deck.php?deckid='+ encodeURIComponent(deckid))
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

fetch('get_cards.php')
  .then(response => response.json())
  .then(cards => {
    fetch('get_user_decks.php')
      .then(response => response.json())
      .then(decks=> {
        onDeckJson(decks, cards);
      });
  });

const modale = document.querySelector('#modale');
const body = document.querySelector('body');
window.addEventListener('keydown', chiudiModale);