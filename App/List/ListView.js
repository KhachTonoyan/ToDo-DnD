import AddCategory from "../../addCategory/addCategory.js"

const { containerAddCat, inputAddCat, buttonAddCat } = new AddCategory();
const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
mainDiv.classList.add("list")

//adding new section was causing a complete update that resulted in a user data loss
function render(element) {
    const newSection = renderUtil(element);

    mainDiv.appendChild(newSection);
}

//moved this function out of the "render" to keep the code cleaner
//currently box id is missing
function renderUtil(element) {
    const header = document.createElement("p"); //name of the section
    header.textContent = `${element.value}`

    const category = document.createElement("div");
    category.className = "cat_main"
    category.appendChild(header); //add name

    const taskInputBox = document.createElement("form");
    const input_id = new Date().getTime();
    taskInputBox.innerHTML = `<input type="text" id=${input_id}><br>`

    //when user clicks enter his task is being added to the top of the current container
    taskInputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); //to prevent autoupdate of the page
            const taskInput = document.getElementById(input_id);

                                                        //this node can use ItemView as a constructor
            taskInputBox.insertAdjacentHTML('afterend', `<p>${taskInput.value}</p>`)
            taskInput.value = "";
        }
    })

    category.appendChild(taskInputBox);
    return category;
}


export default class ListView {
    constructor() {
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




