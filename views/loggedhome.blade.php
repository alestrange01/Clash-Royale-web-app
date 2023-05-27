<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>StrangeRoyale</title>
        <link rel="stylesheet" href="{{ URL::to('css/home.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/player_clan_stats.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/navbar.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/footer.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/loading.css') }}"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src="{{ URL::to('js/onPlayerJson.js') }}" defer="true"></script>
        <script src="{{ URL::to('js/loggedhome.js') }}" defer="true"></script>
        <script src="{{ URL::to('js/burger-menu.js') }}" defer="true"></script>
    </head>

    <body class="background">
        <nav id="navigation-bar">
            <div id="logodiv">
                <img src="{{ URL::to('assets/crown.png') }}" alt="logo" id="logo">	
                <h1 id="logotitle">StrangeRoyale</h1>
                <p id="logosubtitle">play, have fun, compete</p>
            </div>
            <a href='/home'><u>Home</u></a>
            <a href='/deck_creator'>Deck Creator</a>
            <a href='/players'>Players</a>
            <a href='/clans'>Clans</a>
            <a href='/my_decks'>My decks</a>
            <button><a href='/logout'> Log Out </a></button>
        </nav>
        
        <header id="sopra">
            <div id="overlay"> </div>
            <!-- benvenuto personalizzato -->
            <p id="benvenuto">Benvenuto {{ $user->username }} su StrangeRoyale!</p>
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
            <a href="/home"><img src="{{ URL::to('assets/home.svg') }}" alt=""></a>
            <a href="/deck_creator"><img src="{{ URL::to('assets/deck_creator.svg') }}" alt=""></a>
            <a href="/players"><img src="{{ URL::to('assets/players.svg') }}" alt=""></a>
            <a href="/clans"><img src="{{ URL::to('assets/clans.svg') }}" alt=""></a>
            <a href="/my_decks"><img src="{{ URL::to('assets/my_decks.svg') }}" alt=""></a>
            <a href="logout"><img src="{{ URL::to('assets/logout.svg') }}" alt=""></a>
        </div>

        <div id="loading">
            <span>loading</span>
            <div class="words">
                <span class="word">player</span>
                <span class="word">stats</span>
                <span class="word">cards</span>
                <span class="word">info</span>
            </div>
        </div>


        <article id="menuPlayer" class="infoMenu hidden">
            <div id="playerInfo">
                <div id="name" class="info"></div>
                <div id="tag" class="info"></div>
                <div id="level" class="info"></div>
                <div id="trophy" class="info"><span></span><img src="{{ URL::to('assets/trophy.webp') }}" alt="" class="trophy"></div>
                <div id="clan" class="info"></div>  
            </div>

            <div id="stats">
                <div id="arena" class="info"></div>
                <div id="maxTrophies" class="info"><span></span><img src="{{ URL::to('assets/trophy.webp') }}" alt="" class="trophy"></div>
                <div id="starPoints" class="info"></div>
                <div id="expPoints" class="info"></div>
                <div id="totalExpPoints" class="info"></div>
                <div id="battleCount" class="info"></div>
                <div id="wins" class="info"></div>
                <div id="losses" class="info"></div>
                <div id="draws" class="info"></div>
                <div id="winrate" class="info"></div>
                <div id="threeCrownWins" class="info"></div>
                <div id="totalDonations" class="info"></div>
                <div id="challengeMaxWins" class="info"></div>
                <div id="tournamentCardsWon" class="info"></div>
                <div id="tournamentBattleCount" class="info"></div>
            </div>
            <p class="statsTitle">Achievement Badges</p>

            <div id="badges"></div>

            <p class="statsTitle">Most Used Card</p>
            <div id="mostUsedCard"></div>

            <p class="statsTitle">Upcoming Chests</p>
            <div id="upcomingChests"></div>


        </article>

        @include('footer')

    </body>

</html>
