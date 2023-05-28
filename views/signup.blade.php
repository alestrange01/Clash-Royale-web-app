<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>StrangeRoyale Sign Up</title>
        <script>
            const CHECK_PLAYER_TAG_URL = "{{ URL::to('signup/check/player_tag') }}";
            const CHECK_EMAIL_URL = "{{ URL::to('signup/check/email') }}";
        </script>

        <link rel="stylesheet" href='{{ URL::to("css/signup.css") }}'>
        <link rel="stylesheet" href='{{ URL::to("css/footer.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src='{{ URL::to("js/signup.js") }}' defer></script>
    </head>

    <body>
        <header>
            <img src="assets/crown.png" alt="logo" id="logo">	
            <h1 id="logotitle">StrangeRoyale</h1>
            <p id="logosubtitle">play, have fun, compete</p>
        </header>


        <div class="form-box">
            <form class="form" name='signup' method='post' autocomplete='off'>
                @csrf
            <span class="title">Welcome</span>
                <span class="subtitle">Sign up to <a href="{{ URL::to('home') }}">StrangeRoyale</a></span>
                <div class="form-container">
                    <input id="name" type="text" class="input" name="name" placeholder="Name" value='{{ old("name") }}'>
                    <input id="surname" type="text" class="input"  name="surname" placeholder="Surname"  value='{{ old("surname") }}'>
                    <input id="player_tag" type="text" class="input" name="player_tag" placeholder="Player Tag" value='{{ old("player_tag") }}'>
                    <input id="email" type="email" class="input" name="email" placeholder="Email" value='{{ old("email") }}'>
                    <input id="password" type="password" class="input" name="password" placeholder="Password" value='{{ old("password") }}'>
                    <input id="confirm_password" type="password" class="input" name="confirm_password" placeholder="Confirm Password" value="">
                </div>
                <!-- manipolazione errori -->
                <div class="errors">
                @foreach ($errors->all() as $error)
                    <div class='error'>
                        <img src='{{ URL::to("assets/cross.png") }}'/>
                        <span>{{ $error }}</span>
                    </div>
                @endforeach
                </div>



                <div class="errors">
                    <div id="error_name" class='error hidden'><img src='assets/cross.png'/><span>Nome non valido</span></div>
                    <div id="error_surname" class='error hidden'><img src='assets/cross.png'/><span>Cognome non valido</span></div>
                    <div id="error_player_tag" class='error hidden'><img src='assets/cross.png'/><span></span></div>
                    <div id="error_email" class='error hidden'><img src='assets/cross.png'/><span></span></div>
                    <div id="error_password" class='error hidden'><img src='assets/cross.png'/><span>Password con almeno una: minuscola, maiuscola e carattere speciale</span></div>
                    <div id="error_confirm_password" class='error hidden'><img src='assets/cross.png'/><span>Le password non coincidono</span></div>
                    <div id="error_form" class='error hidden'><img src='assets/cross.png'/><span>Compila tutti i campi</span></div>
                </div>
                
                
                <div class="submit">
                    <input type='submit' value="Sign Up" id="submit">
                </div>
            </form>
            <div class="form-section">
                <p>Have an account? <a href="{{ URL::to('login') }}">Log in</a></p>
            </div>
        </div>

        <section id="how-to-player-tag">
                <div class="tagtitle"><p>Come trovare il tuo tag giocatore</p></div>
                <div class="taghowto">
                    <span class="box">
                        <img src="assets/pt-home.jpg" alt="">
                        <p>1. Seleziona il nome del giocatore</p>
                    </span>
                    <span class="box">
                        <img src="assets/pt-profile.jpg" alt="">
                        <p>2. Seleziona il tag del giocatore</p>
                    </span>
                    <span class="box">
                        <img src="assets/pt-copy.jpg" alt="">
                        <p>3. Copia il tag</p>
                    </span>
                </div>
        </section>

        @include('footer')


    </body>
</html>