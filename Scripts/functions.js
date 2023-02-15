import { GetLocalStorage, RemoveFromLocalStorage } from "./localStorage.js";

let randNameBtn = document.getElementById('randNameBtn');

let nameCounter = document.getElementById('nameCounter');
let listDisplayDiv = document.getElementById('listDisplayDiv');
let groupDisplayBody = document.getElementById('groupDisplayBody');

let groupSizeSlider = document.getElementById('groupSizeSlider');
let groupSize = document.getElementById('groupSize');


function DisplayList(){
    listDisplayDiv.innerHTML = '';
    let counter = 0;

    let nameList = GetLocalStorage();
    nameList.map(name => {
        let nameTag = document.createElement('p');
        nameTag.className = 'nameTag';
        nameTag.textContent = name;

        let nameTagCol = document.createElement('div');
        nameTagCol.className = 'col-6 nameTagCol';
        nameTagCol.appendChild(nameTag);

        let removeBtn = document.createElement('button');
        removeBtn.className = 'btn btn-danger';
        removeBtn.textContent = 'Remove';
        removeBtn.type = 'button';
        removeBtn.addEventListener('click', function(){
            RemoveFromLocalStorage(name);
            DisplayList();
            SetMaxGroupSize();
        })

        let removeBtnCol = document.createElement('div');
        removeBtnCol.className = 'col-6 removeBtnCol';
        removeBtnCol.appendChild(removeBtn);

        let listRow = document.createElement('div');
        listRow.className = 'row listRow';
        listRow.appendChild(nameTagCol);
        listRow.appendChild(removeBtnCol);

        let listDiv = document.createElement('div');
        listDiv.className = 'listDiv';
        listDiv.appendChild(listRow);

        listDisplayDiv.appendChild(listDiv);
        counter++;
    })
    nameCounter.textContent = 'Total Names: ' + counter;
}

function GetRandom(groupSize){
    let nameList = GetLocalStorage();
    let listLength = nameList.length;
    let groupList;

    if(groupSize == 1){
        groupList = nameList[Math.floor(Math.random() * nameList.length)];
    }else{
        groupList = [];
        if(listLength < groupSize){
            groupList = [nameList];
        }
        else{
            for(let j = 0; j < Math.floor(listLength / groupSize); j++){
                let tempGroup = [];
                let index = 0;
    
                while(tempGroup.length < groupSize){
                    let notSame = false;
                    index = Math.floor(Math.random() * nameList.length);
                    for(let i = 0; i < tempGroup.length; i++){
                        if(tempGroup[i] == nameList[index]) { notSame = true; }
                    }
                    if(!notSame){
                        tempGroup.push(nameList[index]);
                        nameList.splice(index, 1);
                    }
                }
                groupList.push(tempGroup);
            }
            for(let i = 0; i < nameList.length; i++){
                let index = i;
                while(index > groupList.length-1) { 
                    index -= groupList.length;
                 }
                groupList[index].push(nameList[i]);
            }
        }
    }
    DisplayGroups(groupList);
}

function DisplayGroups(groupList){
    groupDisplayBody.innerHTML = '';
    if((typeof groupList) == 'string'){
        let name = document.createElement('p');
        name.className = 'groupTxt';
        name.textContent = groupList;
        groupDisplayBody.appendChild(name);
    }else{
        let groupNum = 1;
        groupList.map(group => {
            let groupTxt = document.createElement('p');
            groupTxt.className = 'groupTxt';
            groupTxt.textContent = 'Group ' + groupNum + ': ' + group.join(', ');
            groupDisplayBody.appendChild(groupTxt);

            groupNum++;
        })
    }

}

function SetGroupSize(){
    groupSize.textContent = groupSizeSlider.value;
    if(groupSizeSlider.value == 1) { randNameBtn.textContent = 'Get Random Name'; }
    else{ randNameBtn.textContent = 'Get Random Groups'; }
}

function SetMaxGroupSize(){
    let nameList = GetLocalStorage();
    groupSizeSlider.setAttribute('max', nameList.length);
}

export { DisplayList, GetRandom, SetGroupSize, SetMaxGroupSize }