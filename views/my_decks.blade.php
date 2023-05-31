<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>StrangeRoyale</title>
        <link rel="stylesheet" href="{{ URL::to('css/home.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/my_decks.css') }}">
        <link rel="stylesheet" href="{{ URL::to('css/player_clan_stats.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/deck_creator.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/navbar.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/footer.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/loading.css') }}"/>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src="{{ URL::to('js/my_decks.js') }}" defer="true"></script>
        <script src="{{ URL::to('js/burger-menu.js') }}" defer="true"></script>
       
    </head>

    <body class="background">
        
        @include('navbar')
        
        <header id="sopra">
            <div id="overlay"> </div>
            <!-- benvenuto personalizzato -->
            <p id="benvenuto">{{ $user->username }}'s decks</p>
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

        <article id="modale" class="hidden"> 
		
		</article>

        <article id="menu" class="hidden">
            <div id="first_deck" class='menu-element hidden'>
                <div class='text'>
                    Sei pronto a scoprire tutto il divertimento e la strategia dietro al gioco? 
                    Crea il tuo primo mazzo personalizzato e inizia subito a giocare! I mazzi ti consentono di mettere insieme le carte che preferisci, creando una strategia unica e affascinante. 
                    Scegli le tue carte preferite, assemblale in un mazzo e sperimenta il brivido di combattere contro avversari formidabili. 
                    Non perdere l'opportunità di dimostrare le tue abilità! Clicca qui per creare il tuo primo mazzo e immergiti nell'emozionante mondo del gioco.
                </div>
                <img src="{{ URL::to('assets/cards.webp') }}">
            </div>
            <button class="registration"> <a href='/deck_creator'> Crea un nuovo deck </a></button>  
        </article>

        @include('footer')

    </body>

</html>
