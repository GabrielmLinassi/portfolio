const handleSubmit=e=>{e.preventDefault();const t=new FormData(e.target);let r={};t.forEach((e,t)=>{r[t]=e}),fetch(e.target.action,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(r)}).finally(()=>{alert("Obrigado pela mensagem. Logo entrarei em contato."),e.target.reset()})},handleScroll=()=>{$returnTop=$("#return-to-top"),$(this).scrollTop()>=50?$returnTop.fadeIn(200):$returnTop.fadeOut(200)};function SKILLBAR_ANIME(){document.querySelectorAll(".skillbar").forEach(e=>{const t=e.querySelector(".skillbar__headway"),r=(e.querySelector(".skillbar__header"),t.dataset.skillbarValue),o=t.dataset.skillbarLabel,l=e.querySelector(".skillbar__label"),a=e.querySelector(".skillbar__counter");l.textContent=`${o}`,a.textContent=`${r}%`,t.style.width=`${r}%`})}const options={rootMargin:"0px",threshold:.3},callback=(e,t)=>{e.forEach(e=>{e.isIntersecting&&SKILLBAR_ANIME()})};let observer=new IntersectionObserver(callback,options),target=document.querySelector(".skillcards");observer.observe(target),window.onload=(()=>{document.querySelector("form").addEventListener("submit",handleSubmit)}),window.onscroll=handleScroll,$("video").on("playing",()=>{$("video").css({transition:"opacity .8s linear",opacity:1}),$(".video-bg").append("<style>\n        .video-bg:before { \n            transition: backdrop-filter .8s linear; \n            -webkit-backdrop-filter: blur(0px);\n            backdrop-filter: blur(0px); \n        }\n    </style>")});