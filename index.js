import{a as v,S as w,i}from"./assets/vendor-BjRz3xa9.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const S="49665099-2f67bd35a0157bd44eee07542",q="https://pixabay.com/api/",E=15;async function u(s,e){return(await v.get(q,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:E,page:e}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more"),B=new w(".gallery a");function p(s){const e=s.map(r=>`
    <li class="gallery-item">
      <a href="${r.largeImageURL}">
        <img src="${r.webformatURL}" alt="${r.tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${r.likes}</p>
        <p><b>Views:</b> ${r.views}</p>
        <p><b>Comments:</b> ${r.comments}</p>
        <p><b>Downloads:</b> ${r.downloads}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",e),B.refresh()}function P(){f.innerHTML=""}function h(){m.classList.add("visible")}function g(){m.classList.remove("visible")}function $(){y.classList.add("visible")}function b(){y.classList.remove("visible")}const L=document.querySelector(".form"),M=L.querySelector('input[name="search-text"]'),R=document.querySelector(".load-more");let a="",n=1,c=0;L.addEventListener("submit",async s=>{if(s.preventDefault(),a=M.value.trim(),!a){i.error({title:"Error",message:"Please enter a search term!"});return}n=1,P(),b(),h();try{const e=await u(a,n);c=e.totalHits,e.hits.length===0?i.info({title:"No Results",message:"Sorry, there are no images matching your search query."}):(p(e.hits),c>15&&$())}catch{i.error({title:"Error",message:"Something went wrong."})}finally{g()}});R.addEventListener("click",async()=>{n+=1,h();try{const s=await u(a,n);p(s.hits);const e=document.querySelector(".gallery-item");if(e){const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}n*15>=c&&(b(),i.info({title:"End of Results",message:"We're sorry, but you've reached the end of search results."}))}catch{i.error({title:"Error",message:"Failed to load more images."})}finally{g()}});
//# sourceMappingURL=index.js.map
