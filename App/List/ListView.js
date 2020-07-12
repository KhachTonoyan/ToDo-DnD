import AddCategory from "../../addCategory/addCategory.js"

const {containerAddCat,inputAddCat,buttonAddCat} = new AddCategory()
const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
mainDiv.classList.add("list")


// function render(element){
//     // mainDiv.innerHTML="";
    
//     const newS = renderUtil(element);
   
//     mainDiv.appendChild(newS);
// }

function render(list){
    mainDiv.innerHTML="";
    list.map((element) => {
        return renderUtil(element);
    }).forEach(element => {
        mainDiv.appendChild(element);
    })
}


//moved this function out of the "render" to keep the code cleaner
function renderUtil({name, id}){
    const category = document.createElement("div");
    category.className = "cat_main"
    const taskInputBox = document.createElement("form");
    taskInputBox.innerHTML = `<input type="text" id="task_input_box"><br>`

    //when user clicks enter his task is being added to the top of the current container
    taskInputBox.addEventListener('keypress', (event) => {
        if(event.key === 'Enter'){
            event.preventDefault(); //to prevent autoupdate of the page
            category.insertAdjacentHTML('afterbegin', `<p>sdf</p>`)
        }
    })

    category.appendChild(taskInputBox);
    return category;
}


export default class ListView {
    constructor(){
        this.addInput = inputAddCat;
        this.addContainer = containerAddCat;
        this.addButton = buttonAddCat;
        this.mainDiv = mainDiv;
    }
    bindOnAddToList = (cb) => {
        this.add = cb
        this.addButton.onclick = () => this.add(this.addInput)
    }
    listUpdate = (list) => {
        render(list)
    }
}




