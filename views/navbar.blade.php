<nav id="navigation-bar">
    <div id="logodiv">
        <img src="{{ URL::to('assets/crown.png') }}" alt="logo" id="logo">	
        <h1 id="logotitle">StrangeRoyale</h1>
        <p id="logosubtitle">play, have fun, compete</p>
    </div>
    <a href='/home'>Home </a>
    <a href='/deck_creator'>Deck Creator</a>
    <a href='/players'>Players</a>
    <a href='/clans'>Clans</a>
    <a href='{{$link1}}'>{{$text1}}</a>
    <button><a href='{{$link2}}'>{{$text2}}</a></button>
</nav>