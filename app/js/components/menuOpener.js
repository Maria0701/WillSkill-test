const bodyElement = document.querySelector('body');

const registrationTemplate = `<h2 class="popup__name">Create account</h2>
<div class="popup__bottom">
    <form action="." class="popup__form">
        <label  class="popup__label">
            <span class="popup__label-name">E-mail</span>
            <input type="text" class="popup__input" name="email" placeholder="" required="required">
        </label>
        <label  class="popup__label">
            <span class="popup__label-name">Password</span>
            <input type="password" class="popup__input" name="password" placeholder="" required="required">
        </label>
        <input class="btn btn--primary popup__submit" type="submit" value="Sign In" />
    </form>
</div>
<div class="popup__bottom2">
    <p class="popup__register">Already have an account?  <a href="#" class="popup__link" title="register" data-action="login">Login</a></p>
</div>`;

const loginTemplate = `<h2 class="popup__name">Log in to your account</h2>
<div class="popup__top">
    <button class="popup__signin popup__signin--fb btn">
        <span>
            <svg width="24" height="24">
                <use xlink:href="img/sprite.svg#icon-fb"></use>
            </svg>
        </span>
        Sign In with Facebook
    </button>
    <button class="popup__signin popup__signin--google btn">
        <span>
            <svg width="24" height="24">
                <use xlink:href="img/sprite.svg#icon-google"></use>
            </svg>
        </span>
        Sign In with Google
    </button>
</div>
<div class="popup__orline">or</div>
<div class="popup__bottom">
    <form action="." class="popup__form">
        <label  class="popup__label">
            <span class="popup__label-name">E-mail</span>
            <input type="text" class="popup__input" name="email" placeholder="" required="required">
        </label>
        <label  class="popup__label">
            <span class="popup__label-name">Password</span>
            <input type="text" class="popup__input" name="password" placeholder="" required="required">
        </label>
        <input class="btn btn--primary popup__submit" type="submit" value="Sign In" />
    </form>
    <a href="#" class="popup__remind popup__link" title="title">Forgot Your Pasword</a>
</div>
<div class="popup__bottom2">
    <p class="popup__register">Don't have an account? <a href="#" class="popup__link" title="register"  data-action="register">Register</a></p>
</div>`;


export function menuOpener (opener, elt, eltToOpen, closeElt) {
    const headerElt = eltToOpen;
    const overlay = document.querySelector('.overlay');
    const closeEl = closeElt || opener;
    const menuLinks = [...headerElt.querySelectorAll('.menu__link')];
    const registerElt = headerElt.querySelector('[data-action="register"]');

    function outOfAreaHandler(evt) {
        if (elt.contains(evt.target))  return;        
        closeHandler();
    }    
    

    function closeHandler() {
        headerElt.classList.remove('opened');
        bodyElement.classList.remove('overflow-hidden');        
        overlay.removeEventListener('click', outOfAreaHandler);
        opener.addEventListener('click', openHandler);
        overlay.classList.remove('overlay--active');
        closeEl.removeEventListener('click', closeHandler);
        menuLinks.forEach(item => item.removeEventListener('click', linksHandler));
    }
    

    function openHandler(evt) {
        evt.preventDefault();
        closeOtherElts();
        bodyElement.classList.add('overflow-hidden'); 
        headerElt.classList.add('opened');
        opener.removeEventListener('click', openHandler);
        closeEl.addEventListener('click', closeHandler);
        overlay.addEventListener('click', outOfAreaHandler);
        overlay.classList.add('overlay--active');
        menuLinks.forEach(item => item.addEventListener('click', linksHandler));       
    }

    function closeOtherElts() {
        const opened = document.querySelector('.opened')
        if (opened && opened !== headerElt)  opened.classList.remove('opened');
    }

    function linksHandler(evt) {
        const target = evt.target.closest('.menu__link');
        if (target.classList.contains('menu__link--active')) {
            closeHandler();
            return;
        }

        const blockId = target.getAttribute('href');
        if (blockId.startsWith('#')) {
            evt.preventDefault();
            closeHandler();
            document.querySelector(blockId).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: "start",
            })        
        }    
    }
   
    
    opener.addEventListener('click', openHandler);
}