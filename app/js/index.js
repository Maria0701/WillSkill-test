
import { menuOpener } from "./components/menuOpener";

try {
    const opener = document.querySelector('.js-toggler');
    const menuElt = document.querySelector('.header__menu');  
    
    if (opener && menuElt) {
        const eltToOpen = document.querySelector('.header');
        const closeElt = menuElt.querySelector('.js-close');
        menuOpener(opener, menuElt, eltToOpen, closeElt);
    }    
} catch(e) {
    console.log(e);
}
