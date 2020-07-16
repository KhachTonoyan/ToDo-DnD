import itemState from "../Details/ItemState.js";
const items = itemState.getItems()
function isEmpty(text){
    if(text.trim()){
        return false
    }
    return true
}


export default class ListModel {
    constructor(){
        this.list = JSON.parse(localStorage.getItem('list')) || []
    }
    
    addToList = (element) => {
        if(!isEmpty(element.value)){
            this.update(element);
            element.value="";
        }
    }

    bindOnListUpdate = (cb) => {
        this.update = cb;
    }
    getInfoAboutCat = (config) => {
        this.list.push(config)
    }
    onPageLoad = () => {
        this.list.forEach(config => {
            config.items = items[config.dragAreaID]
            this.update({},config)
        }) 
    }
    sendToLocalStorage = () =>{
        itemState.sendToLocalStorage()
        localStorage.setItem('list', JSON.stringify(this.list))
    }
    clearLocalStorage = () =>{
        localStorage.clear()
    }
}