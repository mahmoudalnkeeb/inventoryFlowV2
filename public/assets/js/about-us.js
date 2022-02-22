let    mainLinks = document.querySelector('.mainLinks');
let    togglerBTN = document.querySelector('.togglerBTN');

if (document.querySelector('html').lang === 'ar') {
    document.body.style.fontFamily= " 'Cairo',system-ui ";
    document.getElementById('langBTN').style.marginLeft= 'initial'
    document.getElementById('langBTN').style.marginRight= '28px'
}else{
    document.body.style.fontFamily= " 'Poppins',system-ui ";
}

togglerBTN.addEventListener('click',(e)=>{
    mainLinks.classList.toggle('active');
})