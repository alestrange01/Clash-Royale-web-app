<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>StrangeRoyale</title>
        <link rel="stylesheet" href='{{ URL::to("css/home.css") }}'>
        <link rel="stylesheet" href='{{ URL::to("css/navbar.css") }}'>
        <link rel="stylesheet" href='{{ URL::to("css/footer.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src='{{ URL::to("../js/burger-menu.js") }}' defer></script>
    </head>

    <body>
                
        <nav id="navigation-bar">
            <div id="logodiv">
                <img src="assets/crown.png" alt="logo" id="logo">	
                <h1 id="logotitle">StrangeRoyale</h1>
                <p id="logosubtitle">play, have fun, compete</p>
            </div>
            <a href='/home'><u>Home</u></a>
            <a href='/deck_creator'>Deck Creator</a>
            <a href='/players'>Players</a>
            <a href='/clans'>Clans</a>
            <a href='/login'>Log in</a>
            <button><a href='/signup'> Sign Up </a></button>
        </nav>
        
        <header id="sopra">
            <div id="overlay"> </div>
            <p>Benvenuto in StrangeRoyale!</p>
        </header>

        <div id="burger-menu">
            <label for="burger">
                <input type="checkbox" id="burger">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>  
        <div id="burger-menu-links">
            <a href="/home"><img src="assets/home.svg" alt=""></a>
            <a href="/deck_creator"><img src="assets/deck_creator.svg" alt=""></a>
            <a href="/players"><img src="assets/players.svg" alt=""></a>
            <a href="/clans"><img src="assets/clans.svg" alt=""></a>
            <a href="/login"><img src="assets/login.svg" alt=""></a>
            <a href="/signup"><img src="assets/signup.svg" alt=""></a>
        </div>

        <article id="menu">

            <div class='menu-element'>
                <div class='text'>
                    Benvenuto nel mio sito dedicato a Clash Royale, il popolare gioco di strategia sviluppato da Supercell.
                    Qui puoi trovare tutto ciò che ti serve per creare il tuo deck personalizzato, consultare le informazioni
                    sulle carte, i giocatori e i clan.
                </div>
                <img src="assets/stemmatrasp.png">
            </div>
            <button class="registration"> <a href='/signup'> Join the Community </a></button>  
            <div class='menu-element'>
                <div class='text'>
                    Quì avrai la possibilità di vedere i deck creati dagli altri utenti e interagire con loro. 
                    Potrai condividere le tue creazioni e ricevere feedback dai membri della community 
                    Scopri tutto ciò che c'è da sapere su Clash Royale e divertiti a giocare come mai prima d'ora!
                </div>
                <img src="assets/War_Shield.webp">
            </div>

        </article>

        
        @include('footer')

    </body>

</html>
