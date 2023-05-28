<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>StrangeRoyale</title>
        <link rel="stylesheet" href='{{ URL::to("css/home.css") }}'>
        <link rel="stylesheet" href='{{ URL::to("css/navbar.css") }}'>
        <link rel="stylesheet" href='{{ URL::to("css/footer.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src='{{ URL::to("js/burger-menu.js") }}' defer></script>
    </head>

    <body>
                
        @include('navbar')
        
        <header id="sopra">
            <div id="overlay"> </div>
            <p>Benvenuto in StrangeRoyale!</p>
        </header>

        @include('burger-menu')

        <article id="menu">

            <div class='menu-element'>
                <div class='text'>
                    Benvenuto nel mio sito dedicato a Clash Royale, il popolare gioco di strategia sviluppato da Supercell.
                    Qui puoi trovare tutto ciò che ti serve per creare il tuo deck personalizzato, consultare le informazioni
                    sulle carte, i giocatori e i clan.
                </div>
                <img src="{{ URL::to('assets/stemmatrasp.png') }}">
            </div>
            <button class="registration"> <a href='/signup'> Join the Community </a></button>  
            <div class='menu-element'>
                <div class='text'>
                    Quì avrai la possibilità di salvare le tue creazioni e modificarle a tuo piacimento. 
                    Scopri tutto ciò che c'è da sapere su Clash Royale e divertiti a giocare come mai prima d'ora!
                </div>
                <img src="{{ URL::to('assets/War_Shield.webp') }}">
            </div>

        </article>

        
        @include('footer')

    </body>

</html>
