document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="header-newsletter.css">');
const current = location.pathname.split('/').pop() || 'index.html';
const pages = [['Home','index.html'],['Blog','blog.html'],['Newsletter','newsletter.html'],['About','about.html'],['Connect','connect.html']];
const linkList = pages.map(([label,url])=>`<a href="${url}" ${current===url?`aria-current="page"`:''}>${label}</a>`).join('');
document.querySelector('#site-header').innerHTML=`<header class="site-header"><div class="header-signup-bar"><div class="wrap header-signup-inner"><div id="header-signup-form"></div></div></div><div class="wrap nav-wrap"><a class="brand" href="index.html" aria-label="Hustle and Juggle home"><img src="hnj-logo.svg" alt="Hustle and Juggle"></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button><nav class="nav-links" aria-label="Main navigation">${linkList}</nav></div></header>`;
document.querySelector('#site-footer').innerHTML=`<footer class="site-footer"><div class="wrap"><div class="footer-top"><div class="footer-brand"><a class="footer-logo" href="index.html"><img src="hnj-logo.svg" alt="Hustle and Juggle"></a><p>A space for all the things you are—and the life you’re building around them.</p></div><div class="footer-links"><div><strong>Explore</strong>${pages.slice(0,3).map(([l,u])=>`<a href="${u}">${l}</a>`).join('')}</div><div><strong>Say hello</strong><a href="about.html">Our story</a><a href="connect.html">Connect</a><a href="mailto:hustleandjuggle@gmail.com">Email us</a></div></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Hustle & Juggle. Made with care.</span><span>Make room for what matters. ✳</span></div></div></footer>`;
const formHTML=(context='page')=>`<form class="email-form ${context==='header'?'header-email-form':'newsletter-email-form'}" action="https://formsubmit.co/hustleandjuggle@gmail.com" method="POST" novalidate><input type="hidden" name="_subject" value="New Subscriber"><input type="hidden" name="_captcha" value="true"><div class="email-field"><input type="email" name="email" placeholder="Your Email" aria-label="Your email address" autocomplete="email" required><span class="email-error" role="alert" hidden>Invalid Email Address</span></div><button class="button" type="submit">Sign Up</button></form>`;
document.querySelector('#header-signup-form').innerHTML=formHTML('header');
document.querySelectorAll('#page-signup-form').forEach(el=>el.innerHTML=formHTML());
document.querySelectorAll('.email-form').forEach(form=>{
 const email=form.querySelector('input[type="email"]');
 const error=form.querySelector('.email-error');
 const validate=()=>{
  const valid=email.value.trim()!==''&&email.validity.valid;
  error.hidden=valid;
  email.setAttribute('aria-invalid',String(!valid));
  return valid;
 };
 form.addEventListener('submit',event=>{
  if(!validate()){
   event.preventDefault();
   email.focus();
  }
 });
});
const toggle=document.querySelector('.menu-toggle');toggle.addEventListener('click',()=>{const nav=document.querySelector('.nav-links');const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰'});
if(new URLSearchParams(location.search).has('subscribed')){const target=document.querySelector('.signup-panel,.newsletter-large');if(target){const notice=document.createElement('p');notice.className='signup-success';notice.setAttribute('role','status');notice.textContent='Thank you for signing up. Please check your inbox for a confirmation email.';target.prepend(notice);target.scrollIntoView({behavior:'smooth',block:'center'})}}
