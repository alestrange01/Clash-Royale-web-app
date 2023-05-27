<html>
	<head>
		<title>StrangeRoyale</title>
		<meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
		<link href='https://unpkg.com/css.gg@2.0.0/icons/css/arrow-down-r.css' rel='stylesheet'>		
        <link rel="stylesheet" href="{{ URL::to('css/navbar.css') }}">
		<link rel="stylesheet" href="{{ URL::to('css/deck_creator.css') }}"/>
		<link rel="stylesheet" href="{{ URL::to('css/footer.css') }}"/>
        <link rel="stylesheet" href="{{ URL::to('css/loading.css') }}"/>
		<script src="{{ URL::to('js/deck_creator.js') }}" defer="true"></script>
        <script src="{{ URL::to('js/burger-menu.js') }}" defer="true"></script>
		<meta name="viewport" content="width=device-width, initial-scale=1"> 
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
		<link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@700&display=swap" rel="stylesheet">	
    </head>
	
	<body>
		@include('navbar')

        @include('burger-menu')

        <div id="bloccologo">
            <img src="{{ URL::to('assets/crown.png') }}" alt="logo" id="logobloccologo">	
            <h1 id="bloccologotitle">StrangeRoyale</h1>
            <p id="bloccologosubtitle">play, have fun, compete</p>
        </div>


			
		<div id="intro" class="hidden">Crea il tuo deck: seleziona 8 carte <br> Ordine le carte per rarità</div>
        <div class="container hidden">
            <div>
                <label><input type="radio" name="order" value="up"><span>Crescente</span></label>
                <label><input type="radio" name="order" value="down"><span>Decrescente</span></label>
			</div>
			<div>
                <label><input type="radio" name="order" value="common"><span>Comuni</span></label>
                <label><input type="radio" name="order" value="rare"><span>Rare</span></label>
                <label><input type="radio" name="order" value="epic"><span>Epiche</span></label>
                <label><input type="radio" name="order" value="legendary"><span>Leggendarie</span></label>
                <label><input type="radio" name="order" value="hero"><span>Eroi</span></label>
			</div>
        </div>

        <div id="loading" class="bassa">
            <span>loading</span>
            <div class="words">
                <span class="word">cards</span>
                <span class="word">stats</span>
                <span class="word">players</span>
                <span class="word">clan</span>
            </div>
        </div>

		<article id="album-view">
			
			
		</article>

		<article id="modale" class="hidden"> 
		
		</article>
		
		<div class="gg-arrow-down-r hidden" id="arrow-down"></div>
	
		<div id="deck" class="hidden">
            <div></div>
        </div>

        @include('footer')
		
	</body>
</html>