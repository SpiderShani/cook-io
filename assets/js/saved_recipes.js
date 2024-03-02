/**
 * @license MIT
 * @author usmanshani <roberrtips@gmail.com>
 * @copyright usmanshani 2024
 */


"use strict";
import { getTime } from "./module.js";
const saveRecipes=Object.keys(window.localStorage).filter(item =>{
    return item.startsWith("cookio-recipe")
})

const $saveRecipeContainer= document.querySelector("[data-saved-recipe-container]")
$saveRecipeContainer.innerHTML = `

<h2 class="headline-small section-title">All Saved Recipes</h2>
`
const $gridList=document.createElement("div")
$gridList.classList.add("grid-list")
if(saveRecipes.length){
   saveRecipes.map((saveRecipe,index)=>{
    const {
        recipe:{
            image,
            label:title,
            totalTime:cookingTime,
            uri

        }
    }=JSON.parse(window.localStorage.getItem(saveRecipe))
    const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
    const isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);
    const $card = document.createElement("div");
    $card.classList.add("card");
    $card.style.animationDelay = `${100 * index}ms`;
    $card.innerHTML = `
    <figure class="card-media img-holder">
    <img
      src="${image}"
      loading="lazy"
      height="195"
      width="195"
      class="img-cover"
      alt="${title}"
    />
  </figure>
  <div class="card-body">
    <h3 class="title-small">
      <a href="./detail.html" class="card-link"
        > ${title ?? "Untitled"}</a
      >
    </h3>
    <div class="meta-wrapper">
      <div class="meta-item">
        <span
          class="material-symbols-outlined"
          aria-hidden="true"
          >schedule</span
        >
        <span class="label-medium">${getTime(cookingTime).time || "<1"} ${
          getTime(cookingTime).timeUnit
        }</span>
      </div>

      <button
        class="icon-btn has-state ${isSaved ? "saved" : "removed"}"
        aria-label="Add to saved recipes" onclick = "saveRecipe(this ,'${recipeId}')"
      >
        <span
          class="material-symbols-outlined bookmark-add"
          aria-hidden="true"
          >bookmark_add</span
        >
        <span
          class="material-symbols-outlined bookmark"
          aria-hidden="true"
          >bookmark</span
        >
      </button>
    </div>
  </div> 
    
    `;
    $gridList.appendChild($card);
   })
}
else{
    $saveRecipeContainer.innerHTML += `
    <p class="body-large">You don't saved any recipes yet!</p>
    `
}
$saveRecipeContainer.appendChild($gridList)