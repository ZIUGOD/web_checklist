window.addEventListener("DOMContentLoaded", main);

function main() {
    const sendbutton = document.getElementById("sendbutton");
    let listname;
    let lists = [];
    let load = JSON.parse(localStorage.getItem("listas"));
    const deleteAllButton = document.createElement("button");
    deleteAllButton.innerHTML = "Delete All";
    deleteAllButton.className = "btn btn-outline-danger";
    deleteAllButton.onclick = () => {
        lists = [];
        localStorage.removeItem("listas");
        document.querySelectorAll("h1").forEach((h1) => h1.remove());
    };
    document.querySelector("#sendbutton").after(deleteAllButton);
    if (load) {
        for (const el of load) {
            addlist(el.name, el.tasks);
            for (const tsk of el.tasks) {
                addtask(tsk, document.getElementById(el.name));
            }
        }
    }
    sendbutton.onclick = () => {
        listname = document.getElementById("inputlistname").value;
        if (lists.find((list) => list.name === listname)) {
            alert("Uma lista com esse nome já existe. Tente outro nome.");
            document.getElementById("inputlistname").value = "";
            return;
        }
        document.getElementById("inputlistname").value = "";
        addlist(listname, []);
    };
    function addlist(name, tasks) {
        const taskbutton = document.createElement("button");
        taskbutton.innerHTML = "Adicionar tarefa";
        taskbutton.className = "btn btn-outline-primary";
        taskbutton.id = `${name}btn`;
        const deletebutton = document.createElement("button");
        deletebutton.className = "btn btn-outline-danger";
        deletebutton.innerHTML = "Deletar lista";
        const listul = document.createElement("ul");
        listul.id = name;
        listul.className = "list-group";
        const listelement = document.createElement("h1");
        listelement.innerHTML = name;
        listelement.append(taskbutton);
        listelement.append(deletebutton);
        listelement.append(listul);
        const list = {
            name: name,
            tasks: tasks,
        };
        taskbutton.onclick = () => {
            const taskname = prompt("Nome da nova tarefa?");
            if (list.tasks.find((task) => task === taskname)) {
                alert("Uma tarefa com esse nome já existe. Tente outro nome");
                return;
            }
            if (!taskname) {
                alert("Nome de tarefa inválido.");
                return null;
            }
            list.tasks.push(taskname);
            addtask(taskname, listul);
        };
        deletebutton.onclick = () => {
            listelement.remove();
            const index = lists.findIndex((list) => list.name === name);
            lists.splice(index, 1);
            localStorage.setItem("listas", JSON.stringify(lists));
        };
        lists.push(list);
        document.querySelector("body").append(listelement);
        localStorage.setItem("listas", JSON.stringify(lists));
    }
    function addtask(name, ul) {
        const task = document.createElement("li");
        task.className = "list-group-item";
        const taskbox = document.createElement("input");
        taskbox.type = "checkbox";
        taskbox.className = "form-check-input me-1";
        taskbox.id = `${name}checkbox`;
        const tasklabel = document.createElement("label");
        tasklabel.className = "form-check-label";
        tasklabel.setAttribute("for", taskbox.id);
        tasklabel.innerHTML = name;
        taskbox.addEventListener("change", function () {
            if (taskbox.checked) {
                tasklabel.style.textDecoration = "line-through";
            } else {
                tasklabel.style.textDecoration = "none";
            }
        });
        task.append(taskbox);
        task.append(tasklabel);
        ul.append(task);
        localStorage.setItem("listas", JSON.stringify(lists));
    }
    sendbutton.disabled = true;
    document.querySelector("#inputlistname").onkeyup = togglecheck;
    document.querySelector("#inputlistname").onkeydown = togglecheck;
    function togglecheck() {
        sendbutton.disabled =
            document.querySelector("#inputlistname").value === "";
    }
}
