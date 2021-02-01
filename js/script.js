// Slide

window.SimpleSlide=class{constructor(t){this.config={slide:t.slide,auto:!1!==t.auto,nav:!!t.nav&&t.nav,time:t.time?t.time:5e3,pauseOnHover:!!t.pauseOnHover&&t.pauseOnHover},this.pause=!1,this.activeClass="active",this.slide=document.querySelector(`[data-slide="${this.config.slide}"]`),this.slide&&(this.items=[...this.slide.children],this.init())}activateSlide(t){this.items.forEach(t=>t.classList.remove(this.activeClass)),t?(t.classList.add(this.activeClass),this.activateNav(t)):(this.items[0].classList.add(this.activeClass),this.activateNav(this.items[0]))}activateNav(t){if(this.config.nav){const i=this.items.indexOf(t),e=[...this.nav.children];e.forEach(t=>t.classList.remove(this.activeClass)),e[i].classList.add(this.activeClass)}}pauseOnHover(){this.items.forEach(t=>{t.addEventListener("mouseenter",()=>this.pause=!0),t.addEventListener("mouseleave",()=>this.pause=!1)})}rotateSlide(){if(!this.pause){const t=this.slide.querySelector(".active").nextElementSibling;this.activateSlide(t)}}initAutoSlide(){!0===this.config.auto&&(clearInterval(this.autoSlide),this.autoSlide=setInterval(this.rotateSlide,this.config.time))}createNavigation(){this.nav=document.createElement("div"),this.nav.setAttribute("data-slide-nav",this.config.slide),this.items.forEach((t,i)=>{this.nav.innerHTML+=`<button data-slide-item="${i}">${i+1}</button>`}),this.slide.after(this.nav)}handleNavigationEvent({currentTarget:t}){const i=t.getAttribute("data-slide-item");this.activateSlide(this.items[i]),this.initAutoSlide()}bindEventsToNavigation(){[...this.nav.children].forEach(t=>{t.addEventListener("click",this.handleNavigationEvent)})}initNavigation(){this.createNavigation(),this.bindEventsToNavigation()}bindFunctions(){this.rotateSlide=this.rotateSlide.bind(this),this.handleNavigationEvent=this.handleNavigationEvent.bind(this)}init(){this.bindFunctions(),this.initAutoSlide(),this.config.nav&&this.initNavigation(),this.config.pauseOnHover&&this.pauseOnHover(),this.activateSlide(this.items[0])}};

new SimpleSlide({
    slide: 'quote', // nome do atributo data-slide="principal"
    time: 5000, // tempo de transição dos slides
    pauseOnHover: false, // pausa a transição automática
});

new SimpleSlide({
    slide: "slide",
    nav: true,
    auto: true,
    time: 5000,
    pauseOnHover: true,
});


// Animação

window.SimpleAnime=class{constructor(){this.items=document.querySelectorAll("[data-anime]"),this.init()}animateItems(){this.items.forEach(t=>{const e=Number(t.getAttribute("data-anime"));isNaN(e)||setTimeout(()=>{t.classList.add("anime")},e)})}handleVisibility(){void 0!==document.visibilityState?"visible"===document.visibilityState&&this.animateItems():this.animateItems()}init(){this.handleVisibility=this.handleVisibility.bind(this),this.handleVisibility(),document.addEventListener("visibilitychange",this.handleVisibility)}}

new SimpleAnime();

// Simple Form

window.SimpleForm=class{constructor(t){this.config=t,this.form=document.querySelector(t.form),this.form&&"function"==typeof window.fetch&&(this.url=this.form.getAttribute("action"),this.formButton=this.form.querySelector(t.button),this.init())}displayError(){this.form.innerHTML=this.config.erro}displaySuccess(){this.form.innerHTML=this.config.sucesso}getFormValues(){const t=new FormData;return this.form.querySelectorAll("[name]").forEach(e=>{const r=e.getAttribute("name"),n=e.value;t.append(r,n)}),t}validateForm(){const t=this.form.querySelectorAll("[required]");let e=!0;return t.forEach(t=>{e&&(e=!!t.value)}),e}onSendForm(t){t.preventDefault(),t.currentTarget.disabled=!0,t.currentTarget.innerText="Enviando..."}sendForm(t){this.validateForm()&&(this.onSendForm(t),fetch(this.url,{method:"POST",body:this.getFormValues()}).then(t=>{if(!t.ok)throw Error(t.statusText);return t.text()}).then(t=>this.displaySuccess()).catch(t=>{this.displayError()}))}init(){this.sendForm=this.sendForm.bind(this),this.formButton.addEventListener("click",this.sendForm)}}

new SimpleForm({
    form: ".formphp", // seletor do formulário
    button: "#enviar", // seletor do botão
    erro: "<div id='form-erro'><h2>Erro no envio!</h2><p>Um erro ocorreu, tente para o email contato@bikcraft.com.</p></div>", // mensagem de erro
    sucesso: "<div id='form-sucesso'><h2>Formulário enviado com sucesso</h2><p>Em breve eu entro em contato com você.</p></div>", // mensagem de sucesso
  });