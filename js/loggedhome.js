function playerInfo(){
    fetch('/get_player').then(response => response.json()).then(onPlayerJson);
}

playerInfo();
