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
            list.tasks.push(taskname)
            addtask(taskname,listul)
        }
        lists.push(list)
        document.querySelector("body").append(listelement)
        localStorage.setItem("listas",JSON.stringify(lists))
    }

    function addtask(name,ul) {
        const task = document.createElement("li")
        task.innerHTML = name
        ul.append(task)
        localStorage.setItem("listas",JSON.stringify(lists))
    }

}
