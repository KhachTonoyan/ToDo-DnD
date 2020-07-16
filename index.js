import list, {form, listDiv} from "./App/List/ListController.js"
import {weather,time} from "./App/widget/index.js"

const app = document.getElementById("app")

app.append(form,listDiv)


weather()
time()
