/*************************************************************************
    Funziona che elabora le informazioni del giocatore di 
    clash royale dall'API $url = "https://api.clashroyale.com/v1/players/" 
**************************************************************************/

function onPlayerJson(json){
  console.log(json);
  if(json.player_info.exists === true){

    document.querySelector("#name").textContent = json.player_info.name;
    document.querySelector("#tag").textContent = json.player_info.tag;
    document.querySelector("#level").textContent = "Level: "+json.player_info.expLevel;
    document.querySelector("#trophy span").textContent = json.player_info.trophies+"/7500 ";
    document.querySelector("#clan").innerHTML = "";
    if(json.player_info.clan !== undefined){
        const text = document.createElement("span");
        text.textContent = "Clan: ";
        const clanname = document.createElement("a");
        clanname.textContent = json.player_info.clan.name;
        clanname.href = "/clans/"+ encodeURIComponent(json.player_info.clan.tag);
        clanname.classList.add("playerSearch");
        const role = document.createElement("span");
        role.textContent = " ("+json.player_info.role+")";
        document.querySelector("#clan").appendChild(text);
        document.querySelector("#clan").appendChild(clanname);
        document.querySelector("#clan").appendChild(role);
    }else{
        document.querySelector("#clan").textContent = "No Clan";
    }

    document.querySelector("#arena").textContent = json.player_info.arena.name;
    document.querySelector("#maxTrophies span").textContent = "Max Trophies: "+json.player_info.bestTrophies+"  ";
    document.querySelector("#battleCount").textContent = "Battle Count: "+json.player_info.battleCount;
    document.querySelector("#wins").textContent = "Wins: "+json.player_info.wins;
    document.querySelector("#losses").textContent = "Losses: "+json.player_info.losses;
    document.querySelector("#draws").textContent = "Draws: "+(json.player_info.battleCount - json.player_info.wins - json.player_info.losses);
    document.querySelector("#winRate").textContent = "Win Rate: "+(json.player_info.wins/json.player_info.battleCount*100).toFixed(2) + "%";
    document.querySelector("#threeCrownWins").textContent = "Three Crown Wins: "+json.player_info.threeCrownWins;
    document.querySelector("#totalDonations").textContent = "Total Donations: "+json.player_info.totalDonations;
    document.querySelector("#challengeMaxWins").textContent = "Challenge Max Wins: "+json.player_info.challengeMaxWins;
    document.querySelector("#tournamentCardsWon").textContent = "Tournament Cards Won: "+json.player_info.tournamentCardsWon;
    document.querySelector("#tournamentBattleCount").textContent = "Tournament Battle Count: "+json.player_info.tournamentBattleCount;


    //Elimino possibili bagde precedenti
    document.querySelector("#badges").innerHTML = "";
    //creo la lista dei badge
    const badges = document.querySelector("#badges");
    //itero su tutti i badge del giocatore o seleziono i primi 10
    const badgesInfo = json.player_info.badges;
    badgesInfo.sort(function(a, b) {
        return b.level - a.level;
      });

    let badgeCount = 0; // Contatore per il numero di elementi badgeimg creati
    for (let i = 0; i < badgesInfo.length && badgeCount < 10; i++) {
      if (badgesInfo[i].name !== "YearsPlayed") { //non so perche ma il badge YearsPlayedin alcuni casi non ha l'icona 
        const badgeimg = document.createElement("img");
        badgeimg.src = json.player_info.badges[i].iconUrls.large;
        badgeimg.dataset.title = json.player_info.badges[i].name;
        badgeimg.dataset.level = json.player_info.badges[i].level;
        badges.appendChild(badgeimg);
        
        badgeCount++; // Incrementa il contatore solo se viene creato un elemento badgeimg
      }
    }

    //Elimino possibili carte precedenti
    document.querySelector("#mostUsedCard").innerHTML = "";
    const mostUsedCard = document.querySelector("#mostUsedCard");
    const cardimg = document.createElement("img");
    cardimg.src = json.player_info.currentFavouriteCard.iconUrls.medium;
    const cardname = document.createElement("span");
    cardname.textContent = json.player_info.currentFavouriteCard.name;
    mostUsedCard.appendChild(cardname);
    mostUsedCard.appendChild(cardimg);

    //mostro i dati della carta presi dal DB
    const cardID = json.player_info.currentFavouriteCard.id;
    fetch("/get_card_info?card_id="+cardID).then(response => response.json()).then(onCardJson);



    
    //Elimino possibili chest precedenti
    document.querySelector("#upcomingChests").innerHTML = "";

    const upcomingChests = document.querySelector("#upcomingChests");
    // Filtra gli elementi con i campi name specifici
    const chests = json.upcoming_chests.items;
    const desiredNames = ["Royal Wild Chest", "Magical Chest", "Legendary Chest", "Mega Lightning Chest"];
    const filteredChests = chests.filter(chest => desiredNames.includes(chest.name));

    // Itero sugli elementi filtrati
    filteredChests.forEach(chest => {
      const name = chest.name;
      const index = chest.index;
      const chestdiv = document.createElement("div");
      const chestname = document.createElement("span");
      chestname.textContent = name;
      console.log(`Name: ${name}, Index: ${index}`);
      const chestimg = document.createElement("img");
      //mappa che associa il nome del baule con l'immagine
      const chestMap =   {"Royal Wild Chest": "/assets/royal-wild-chest.png", 
                          "Magical Chest": "/assets/magical-chest.png", 
                          "Legendary Chest": "/assets/legendary-chest.png", 
                          "Mega Lightning Chest": "/assets/mega-lightning-chest.png"};
      chestimg.src = chestMap[name];
      const chestindex = document.createElement("span");
      chestindex.textContent = "+"+(parseInt(index)+1);
      chestdiv.appendChild(chestname);
      chestdiv.appendChild(chestimg);
      chestdiv.appendChild(chestindex);
      upcomingChests.appendChild(chestdiv);

      //tolgo la modale: aggiungo classe hidden
      /* setTimeout(function() {
          console.log("Dopo 5 secondi");

          document.querySelector("#menuPlayer").classList.remove("hidden");
          document.querySelector("#loading").classList.add("hidden");
          }, 5000); */

      //rimuovo la classe hidden dalla sezione dei risultati
      document.querySelector("#menuPlayer").classList.remove("hidden");
    });
  }
  else{
    document.querySelector("#error").classList.remove("hidden");
  }
  document.querySelector("#loading").classList.add("hidden");
}

function onCardJson(json){
  //il file php fa: echo json_encode(array('id' => $entry['id'], 'name' => $entry['name'], 'cost' => $entry['cost'], 'health_shield' => $entry['health_shield'], 'damage' => $entry['damage'], 'hit_speed' => $entry['hit_speed'], 'dps' => $entry['dps'], 'spawn_death_damage' => $entry['spawn_death_damage'], 'attack_range' => $entry['attack_range'], 'spawn_count' => $entry['spawn_count']));
  console.log(json);
  const cardInfo = document.createElement("div");

  const cardCost = document.createElement("span");
  cardCost.textContent = "Cost: "+json.cost;
  const elixir = document.createElement("img");
  elixir.src = "/assets/elixir.webp";
  elixir.classList.add("trophy");
  elixir.classList.add("cardinfoimg");
  cardCost.appendChild(elixir);
  cardInfo.appendChild(cardCost);
  

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
  document.querySelector("#mostUsedCard").appendChild(cardInfo);

}


