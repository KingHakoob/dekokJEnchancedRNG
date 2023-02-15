function SaveToLocalStorageByName(name){
    let nameList = GetLocalStorage();

    nameList.push(name);
    localStorage.setItem('NameList', JSON.stringify(nameList));
}

function GetLocalStorage(){
    let localStorageData = localStorage.getItem('NameList');

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}

function RemoveFromLocalStorage(name){
    let nameList = GetLocalStorage();
    let nameIndex = nameList.indexOf(name);

    nameList.splice(nameIndex, 1);
    localStorage.setItem('NameList', JSON.stringify(nameList));
}

export { SaveToLocalStorageByName, GetLocalStorage, RemoveFromLocalStorage };