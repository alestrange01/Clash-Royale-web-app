







function onChange(event){
    if(event.target.checked){
        document.querySelector("#burger-menu-links").classList.add('visible');
    }else{
        document.querySelector("#burger-menu-links").classList.remove('visible');
    }
}





const checkbox = document.querySelector('#burger-menu input');
checkbox.addEventListener('change', onChange);
