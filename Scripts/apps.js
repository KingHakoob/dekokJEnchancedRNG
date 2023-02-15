import { SaveToLocalStorageByName, GetLocalStorage } from "./localStorage.js";
import { DisplayList, GetRandom, SetGroupSize, SetMaxGroupSize } from "./functions.js";

let addNameInput = document.getElementById('addNameInput');
let addNameBtn = document.getElementById('addNameBtn');
let randNameBtn = document.getElementById('randNameBtn');

let groupSizeSlider = document.getElementById('groupSizeSlider');
let groupSize = document.getElementById('groupSize');
let groupDisplayBody = document.getElementById('groupDisplayBody');

addNameBtn.addEventListener('click', function(){
    if(addNameInput.value) { 
        SaveToLocalStorageByName(addNameInput.value); 
        DisplayList();
        SetMaxGroupSize();
    }
    addNameInput.value = '';
})

randNameBtn.addEventListener('click', function(){
    let nameList = GetLocalStorage();
    if(nameList.length == 0) {
        groupDisplayBody.innerHtml = '';

        let hurtfulMessage = document.createElement('p');
        hurtfulMessage.textContent = 'You Have To Add Names First You (Something Slightly Hurtful)';

        groupDisplayBody.appendChild(hurtfulMessage);
    }
    else { GetRandom(groupSize.textContent); }
})

groupSizeSlider.addEventListener('change', function(){
    SetGroupSize();
})

DisplayList();
SetGroupSize();
SetMaxGroupSize();