<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>StrangeRoyale Log In</title>
        <link rel="stylesheet" href='{{ URL::to("css/signup.css") }}'>
        <link rel="stylesheet" href='{{ URL::to("css/footer.css") }}'>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital@0;1&display=swap" rel="stylesheet">
        <script src='{{ URL::to("js/login.js") }}' defer></script>
    </head>

    <body>
        <header>
            <img src="assets/crown.png" alt="logo" id="logo">	
            <h1 id="logotitle">StrangeRoyale</h1>
            <p id="logosubtitle">play, have fun, compete</p>
        </header>


        <div class="form-box">
            <form class="form" method='post' name='login'>
            @csrf
            <span class="title">Welcome</span>
                <span class="subtitle">Log into <a href="/home">StrangeRoyale</a></span>
                <div class="form-container">
                    <input type="text" class="input" name='email_tag' placeholder="Email or Player Tag" value="{{ old('email_tag') }}">
                    <input type="password" class="input" name='password' placeholder="Password">
                </div>
                
                @foreach ($errors->all() as $error)
                    <div class="errors">
                        <div class="error">
                            <img src='assets/cross.png'/>
                            <span>{{ $error }}</span>
                        </div>
                    </div>
                @endforeach

                <div class="errors">
                    <div id="error_form" class='error hidden'><img src='assets/cross.png'/><span>Inserisci email/player tag e password</span></div>
                </div>
                <div class="submit">
                    <input type='submit' value="Log In" id="submit">
                </div>
                <p>Not a member? <a href="/signup">Sign up</a></p>
            </form>
            <div class="form-section">
                <a href="https://www.youtube.com/shorts/ZRF2071HZRU">Forgot password?</a> 
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