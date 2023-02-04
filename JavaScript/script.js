window.addEventListener("DOMContentLoaded", main)

function main() {
    const sendbutton = document.getElementById("sendbutton")
    let listname
    let lists = []
    let load = JSON.parse(localStorage.getItem("listas"))

    if (load) {
        for (const el of load) {
            addlist(el.name,el.tasks)
            for (const tsk of el.tasks) {
                addtask(tsk,document.getElementById(el.name))
            }
        }
    }
    sendbutton.onclick = () => {
        listname = document.getElementById("inputlistname").value
        addlist(listname,[])
    }
    function addlist(name,tasks) {
        const taskbutton = document.createElement("button")
        taskbutton.innerHTML = "Adicionar tarefa"
        taskbutton.id = `${name}btn`
        const listul = document.createElement("ul")
        listul.id = name
        listul.className = "list-group"
        const listelement = document.createElement("h1")
        listelement.innerHTML = name
        listelement.append(taskbutton)
        listelement.append(listul)
        const list = {
            name: name,
            tasks: tasks
        }
        taskbutton.onclick = () => {
            const taskname = prompt("Nome da nova tarefa?")
            if (!taskname) {
                alert("Nome de tarefa inválido.")
                return null
            }
            list.tasks.push(taskname)
            addtask(taskname,listul)
        }
        lists.push(list)
        document.querySelector("body").append(listelement)
        localStorage.setItem("listas",JSON.stringify(lists))
    }

    function addtask(name,ul) {
        const task = document.createElement("li")
        task.className = "list-group-item"
        const taskbox = document.createElement("input")
        taskbox.type = "checkbox"
        taskbox.className = "form-check-input me-1"
        taskbox.id = `${name}checkbox`
        const tasklabel = document.createElement("label")
        tasklabel.className = "form-check-label"
        tasklabel.setAttribute("for",taskbox.id)
        tasklabel.innerHTML = name
        task.append(taskbox)
        task.append(tasklabel)
        ul.append(task)
        localStorage.setItem("listas",JSON.stringify(lists))
    }
      sendbutton.disabled = true

    document.querySelector("#inputlistname").onkeyup = togglecheck
    document.querySelector("#inputlistname").onkeydown = togglecheck
    function togglecheck() {
        sendbutton.disabled = document.querySelector("#inputlistname").value === ""
    }

}
