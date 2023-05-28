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
        @include('navbar')
        
        <header id="sopra">
            <div id="overlay"> </div>
            <!-- benvenuto personalizzato -->
            <p id="benvenuto">Benvenuto {{ $user->username }} su StrangeRoyale!</p>
        </header>

        @include('burger-menu')

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
