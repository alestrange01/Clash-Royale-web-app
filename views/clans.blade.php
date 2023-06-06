<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>StrangeRoyale</title>
        <link rel="stylesheet" href="{{ URL::to('css/home.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/player_clan_stats.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/search_bar.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/navbar.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/footer.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/loading.css') }}"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src="{{ URL::to('js/onPlayerJson.js') }}"></script>
        <script src="{{ URL::to('js/clans.js') }}" defer="true"></script>
        <script src="{{ URL::to('js/burger-menu.js') }}" defer="true"></script>
    </head>

    <body class="background">
        @include('navbar')
        
        <header id="sopra">
            <div id="overlay"> </div>
        </header>

        @include('burger-menu')

        <div id="intro">Discover all the clans around the world!</div>

        <div class="container-input">
        <form>
            @csrf
            <input type="submit" id="submit">
            <input type="text" placeholder="Search Clan" name="clan_tag" id="input" value="{{ $player_clan_tag }}">
        </form>
        </div>

        <div id="loading" class="hidden">
            <span>loading</span>
            <div class="words">
                <span class="word">clan</span>
                <span class="word">stats</span>
                <span class="word">players</span>
                <span class="word">cards</span>
            </div>
        </div>

        <div id="error" class="hidden">
            <span>Clan not found</span>
        </div>

        <article id="menuPlayer" class="infoMenu hidden">
            <div id="playerInfo">
                <div id="name" class="info"></div>
                <img id="clanLogo" src="" alt="">
                <div id="tag" class="info"></div>
                <div id="type" class="info"></div>
                <div id="clanWarTrophies" class="info"><span></span><img src="{{ URL::to('assets/cw-trophy.webp') }}" alt="" class="trophy"></div>
                <div id="description" class="info"></div>  
            </div>

            <div id="stats">
                <div id="location" class="info"></div>
                <div id="clanScore" class="info"></div>
                <div id="requiredTrophies" class="info"><span></span><img src="{{ URL::to('assets/trophy.webp') }}" alt="" class="trophy"></div>
                <div id="donationsPerWeek" class="info"></div>
                <div id="membersCount" class="info"></div>
            </div>
            <p class="statsTitle">Members of the Clan</p>
            <div id="members"></div>
            
        </article>

        @include('footer')

    </body>

</html>
