/**
 * @license MIT
 * @author usmanshani <roberrtips@gmail.com>
 * @copyright usmanshani 2024
 */

"use strict";
window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";
const APP_ID = "7343b93c";
const API_KEY = "ec12febe6e6136cd29b52c7ccbf1fded";
const TYPE = "public";
export const fetchData = async function (queries, successCallback) {
  const query = queries
    ?.join("&")
    .replace(/,/g, "=")
    .replace(/ /g, "%20")
    .replace(/\+/g, "%2B");
  const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${
    query ? `&${query}` : ""
  }`;
  const response = await  fetch(url);
  if(response.ok){
    const data = await  response.json();
    successCallback(data)
  }
};
