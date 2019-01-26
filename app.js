/* global $ */

 

'use strict';

const API_KEY = 'jw5xJG0RXp0oqEODHj0rIhDjjIU9TFCRda8Hf7dx';
//userLimit default to 10

function fetchURI(userState, userLimit = 10){ 
  fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${userState}&limit=${userLimit - 1}&fields=addresses&api_key=${API_KEY}`)
    .then(response => response.json())
    .then((json) => display(generateHtml(json.data)));
}

function getUserState() {
  let userState = $('.js-state').val();
  return userState.replace(/\s/g, '');
}

function display(string) {
  $('.park-list').html(string);
}

function getUserLimit() {
  const userLimit = $('.js-limit').val();
  return userLimit;
}

function generateHtml(array) {
  //fullName, description, url
  let html = '';
  array.forEach(function(item){
    html += 
    `<li>
      <ul>
        <li class="name">${item.fullName}</li>
        <li>${item.description}</li>
        <li><a href ="${item.directionsUrl}">${item.addresses[1].line1} ${item.addresses[1].city} ${item.addresses[1].stateCode} ${item.addresses[1].postalCode}</a></li>
        <li><a href="${item.url}">Go to their website</a></li>
      </ul>
    </li>`;
  });

  return html;
}

function handleUserInput() {
  $('.js-form').on('submit', function(event){
    event.preventDefault();
    fetchURI(getUserState(), getUserLimit())
    $('.js-state').val('');
  });
  
}


$(handleUserInput);

//search for parks in more than 1 state ---- stateCode
//max num results default 10
//search must trigger call to NPS API
//Full name of park
//description
//full website URL
//multiple searches - only display most recent one


//text input, submit
//display content

