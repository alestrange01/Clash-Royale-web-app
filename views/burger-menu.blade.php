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
    <!-- $img1 = /assets/signup.svg -->
    <a href="{{$links['link1']}}"><img src="{{ URL::to($links['img1']) }}" alt=""></a>
    <a href="{{$links['link2']}}"><img src="{{ URL::to($links['img2']) }}" alt=""></a>
</div>