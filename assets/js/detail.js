// /**
//  * @license MIT
//  * @author usmanshani <roberrtips@gmail.com>
//  * @copyright usmanshani 2024
//  */

// "use strict";
// import { fetchData } from './api.js';
// import { getTime } from './module.js';
// const $detailContainer=document.querySelector("[data-detail-container]")
// ACCESS_POINT +=`/${window.location.search.slice(window.location.search.indexOf("=") + 1)}`
// // ACCESS_POINT=`/${window.location.search.slice(window.location.search.indexOf("="))}`
// fetchData(null, data =>{
//     console.log(data)
// const {
//     images:{LARGE,REGULAR,SMALL , THUMBNAIL},
//     lagel:title,
//     source:author,
//     ingredients =[],
//     totalTime:cookingTime=0,
//     calories=0,
//     cuisineType=[],
//     dietLabels=[],
//     dishType=[],
//     yield:servings=0,
//     ingredientLines=[],
//     uri,

// }=data.recipe
// document.title = `${title} - Cook.io`
// const banner=LARGE??REGULAR??SMALL??THUMBNAIL;
// const {uri:bannerUrl,width,height}=banner;
// const tags=[...cuisineType,...dietLabels,...dishType]
// let tagElements=""
// let ingredientsItems=""
// const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
// const isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);
// tags.map(tag =>{
//     let type=""
//     if(cuisineType.includes(tag)){
//         type="cuisineType"
//     }

//     else if(dietLabels.includes(tag)){
//         type="diet"
//     }
//   else{
//     tagElements +=`
//     <a href="./recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label-large has-state">${tag}</a>
    
//     `
//   }


// })
// ingredientLines.map(ingredient =>{
//     ingredientsItems += `
//     <li class="ingr-item">
//     ${ingredient}
// </li>
//     `
// })
// $detailContainer.innerHTML = `
// <figure class="detail-banner img-holder">
// <img src="${bannerUrl}" width="${width}" height="${height}"
//     alt="${title}" class="img-cover">

// </figure>
// <div class="detail-content">
// <div class="title-wrapper">
//     <h1 class="display-small">${title ?? "Untitled"}</h1>
//     <button class="btn btn-secondary has-state has-icon ${isSaved ? "saved" : "removed"}" onclick="saveRecipe(this,'${recipeId}')">
//         <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
//         <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>

//         <span class="label-large save-text">Save</span>
//         <span class="label-large unsaved-text">Unsave</span>


//     </button>
// </div>
// <div class="detail-author label-large">
//     <span class="span">by</span>${author}
// </div>
// <div class="detail-stats">
//     <div class="stats-item">
//         <span class="display-medium">${ingredients.length}</span>
//         <span class="label-medium">Ingredients</span>
//     </div>
//     <div class="stats-item">
//         <span class="display-medium">${getTime(cookingTime).time || "<1"}</span>
//         <span class="label-medium">${getTime(cookingTime).timeUnit}</span>
//     </div>

//     <div class="stats-item">
//         <span class="display-medium">${Math.floor(calories)}</span>
//         <span class="label-medium">Calories</span>
//     </div>



// </div>
// ${tagElements ? `<div class="tag-list">
// ${tagElements}
// </div>` :"" }


// <h2 class="title-medium ingr-title">
//     Ingredients
//     <span class="label-medium">for ${servings}</span>
// </h2>

// ${ingredientsItems ?`<ul class="body-large ingr-list"> ${ingredientsItems}</ul>` :""}

// </div>
// `
// }) 


"use strict";
import { fetchData } from './api.js';
import { getTime } from './module.js';

window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const $detailContainer = document.querySelector("[data-detail-container]");

fetchData(null, data => {
    const {
        images: { large, regular, small, thumbnail },
        label: title,
        source: author,
        ingredients = [],
        totalTime: cookingTime = 0,
        calories = 0,
        cuisineType = [],
        dietLabels = [],
        dishType = [],
        yield: servings = 0,
        ingredientLines = [],
        uri,

    } = data.recipe;

    document.title = `${title} - Cook.io`;

    const banner = large ?? regular ?? small ?? thumbnail;
    const { uri: bannerUrl, width, height } = banner;

    const tags = [...cuisineType, ...dietLabels, ...dishType];
    let tagElements = "";
    let ingredientsItems = "";

    const recipeId = uri.slice(uri.lastIndexOf("_") + 1);
    const isSaved = window.localStorage.getItem(`cookio-recipe${recipeId}`);

    tags.map(tag => {
        let type = "";
        if (cuisineType.includes(tag)) {
            type = "cuisineType";
        } else if (dietLabels.includes(tag)) {
            type = "diet";
        } else {
            tagElements += `
                <a href="./recipes.html?${type}=${tag.toLowerCase()}" class="filter-chip label-large has-state">${tag}</a>
            `;
        }
    });

    ingredientLines.map(ingredient => {
        ingredientsItems += `
            <li class="ingr-item">${ingredient}</li>
        `;
    });

    $detailContainer.innerHTML = `
        <figure class="detail-banner img-holder">
            <img src="${bannerUrl}" width="${width}" height="${height}" alt="${title}" class="img-cover">
        </figure>
        <div class="detail-content">
            <div class="title-wrapper">
                <h1 class="display-small">${title ?? "Untitled"}</h1>
                <button class="btn btn-secondary has-state has-icon ${isSaved ? "saved" : "removed"}" onclick="saveRecipe(this,'${recipeId}')">
                    <span class="material-symbols-outlined bookmark-add" aria-hidden="true">bookmark_add</span>
                    <span class="material-symbols-outlined bookmark" aria-hidden="true">bookmark</span>
                    <span class="label-large save-text">Save</span>
                    <span class="label-large unsaved-text">Unsave</span>
                </button>
            </div>
            <div class="detail-author label-large">
                <span class="span">by</span>${author}
            </div>
            <div class="detail-stats">
                <div class="stats-item">
                    <span class="display-medium">${ingredients.length}</span>
                    <span class="label-medium">Ingredients</span>
                </div>
                <div class="stats-item">
                    <span class="display-medium">${getTime(cookingTime).time || "<1"}</span>
                    <span class="label-medium">${getTime(cookingTime).timeUnit}</span>
                </div>
                <div class="stats-item">
                    <span class="display-medium">${Math.floor(calories)}</span>
                    <span class="label-medium">Calories</span>
                </div>
            </div>
            ${tagElements ? `<div class="tag-list">${tagElements}</div>` : ""}
            <h2 class="title-medium ingr-title">Ingredients<span class="label-medium">for ${servings}</span></h2>
            ${ingredientsItems ? `<ul class="body-large ingr-list">${ingredientsItems}</ul>` : ""}
        </div>
    `;
});
