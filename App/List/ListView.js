import AddCategory from "../../addCategory/addCategory.js"

const { containerAddCat, inputAddCat, buttonAddCat } = new AddCategory();
const mainDiv = document.createElement("div");
mainDiv.className = "mainDiv";
mainDiv.classList.add("list")



//adding new section was causing a complete update that resulted in a user data loss
//push to list (state)
function render(element) {
    const newSection = renderUtil(element);

    mainDiv.appendChild(newSection);
    //list.push...
}

//moved this function out of the "render" to keep the code cleaner
//currently box id is missing
function renderUtil(element) {
    const header = document.createElement("p"); //name of the section
    header.textContent = `${element.value}`

    const category = document.createElement("div");
    category.classList.add("cat_main")
    category.appendChild(header); //add name

    //delete this
    const taskInputBox = document.createElement("div");
    const input_id = new Date().getTime();
    taskInputBox.innerHTML = `<input type="text" id=${input_id}><br>`

    //when user clicks enter his task is being added to the top of the current container
    taskInputBox.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskInput = document.getElementById(input_id);

                                                        //this node can use ItemView as a constructor
                                                        const bTest = document.createElement("button");
                                                        bTest.innerText = "X"
                                                        bTest.onclick = function foo(){
                                                            this.parentNode.remove();
                                                        }
                                                        const pTest = document.createElement("p");
                                                        pTest.textContent =taskInput.value;
                                                        pTest.appendChild(bTest)
            // taskInputBox.insertAdjacentHTML('afterend',)
            taskInputBox.appendChild(pTest)
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




