<nav id="navigation-bar">
    <div id="logodiv">
        <img src="{{ URL::to('assets/crown.png') }}" alt="logo" id="logo">	
        <h1 id="logotitle">StrangeRoyale</h1>
        <p id="logosubtitle">play, have fun, compete</p>
    </div>
    @if($u == 'home')
    <a href='/home'><u>Home</u></a>
    @else
    <a href='/home'>Home</a>
    @endif

    @if($u == 'deck_creator')
    <a href='/deck_creator'><u>Deck Creator</u></a>
    @else
    <a href='/deck_creator'>Deck Creator</a>
    @endif

    @if($u == 'players')
    <a href='/players'><u>Players</u></a>
    @else
    <a href='/players'>Players</a>
    @endif

    @if($u == 'clans')
    <a href='/clans'><u>Clans</u></a>
    @else
    <a href='/clans'>Clans</a>
    @endif

    @if($u == 'my_decks')
    <a href='{{$links["link1"]}}'><u>{{$links["text1"]}}</u></a>
    @else
    <a href='{{$links["link1"]}}'>{{$links["text1"]}}</a>
    @endif

    <button><a href='{{$links["link2"]}}'>{{$links["text2"]}}</a></button>
</nav>