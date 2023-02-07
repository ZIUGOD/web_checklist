window.addEventListener("DOMContentLoaded", main);

function main() {
    document.getElementById("inputlistname").focus();
    const sendbutton = document.getElementById("sendbutton");
    let listname;
    let lists = [];
    let load = JSON.parse(localStorage.getItem("listas"));
    const deleteAllButton = document.createElement("button");
    deleteAllButton.innerHTML = "Deletar tudo";
    deleteAllButton.className = "btn btn-outline-danger";
    deleteAllButton.onclick = () => {
        lists = [];
        localStorage.removeItem("listas");
        document.querySelectorAll(".lists").forEach((lists) => lists.remove());
    };
    document.querySelector("#sendbutton").after(deleteAllButton);
    if (load) {
        for (const el of load) {
            addlist(el.name, el.tasks);
            for (const tsk of el.tasks) {
                addtask(tsk.name, tsk ,document.getElementById(el.name));
            }
        }
    }
    sendbutton.onclick = () => {
        document.getElementById("inputlistname").focus();
        listname = document.getElementById("inputlistname").value;
        if (lists.find((list) => list.name === listname)) {
            alert("Uma lista com esse nome já existe. Tente outro nome.");
            document.getElementById("inputlistname").value = "";
            togglecheck()
            return;
        }
        document.getElementById("inputlistname").value = "";
        addlist(listname, []);
    };
    function addlist(name, tasks) {
        togglecheck()
        const taskbutton = document.createElement("button");
        taskbutton.innerHTML = "Adicionar tarefa";
        taskbutton.className = "btn btn-outline-primary";
        taskbutton.id = "taskbtn";
        const deletebutton = document.createElement("button");
        deletebutton.className = "btn btn-outline-danger";
        deletebutton.innerHTML = "Deletar lista";
        deletebutton.id = "taskdelbtn";
        const listul = document.createElement("ul");
        listul.id = name;
        listul.className = "list-group";
        const listn = document.createElement("h1");
        listn.innerHTML = name;
        listn.append(taskbutton);
        listn.append(deletebutton);
        listn.append(listul);
        const entirelist = document.createElement("div")
        entirelist.className = "lists"
        entirelist.append(listn)
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
            const taskobj = {
                name: taskname,
                checked: false,
                textDecoration: "none",
            }
            list.tasks.push(taskobj);
            addtask(taskname, taskobj,listul);
        };
        deletebutton.onclick = () => {
            entirelist.remove();
            const index = lists.findIndex((list) => list.name === name);
            lists.splice(index, 1);
            localStorage.setItem("listas", JSON.stringify(lists));
        };
        lists.push(list);
        document.querySelector("#listbox").append(entirelist);
        localStorage.setItem("listas", JSON.stringify(lists));
    }
    function addtask(name,taskobj,ul) {
        const task = document.createElement("li");
        task.className = "list-group-item";
        const taskbox = document.createElement("input");
        taskbox.type = "checkbox";
        taskbox.className = "form-check-input me-1";
        taskbox.id = `${name}checkbox`;
        if (taskobj.checked) {
            taskbox.checked = true
        }
        const tasklabel = document.createElement("label");
        tasklabel.className = "form-check-label";
        tasklabel.setAttribute("for", taskbox.id);
        if (taskobj.checked) {
            tasklabel.style.textDecoration = "line-through"
            tasklabel.style.color = "black"
        }
        tasklabel.innerHTML = name;
        taskbox.addEventListener("change", function () {
            if (taskbox.checked) {
                taskobj.checked = true
                localStorage.setItem("listas", JSON.stringify(lists))
                tasklabel.style.textDecoration = "line-through";
                tasklabel.style.color = "black"
            } else {
                taskobj.checked = false
                localStorage.setItem("listas", JSON.stringify(lists))
                tasklabel.style.textDecoration = "none";
                tasklabel.style.color = "white"
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
        if (!sendbutton.disabled) {
            sendbutton.className = "btn btn-primary"
        } else {
            sendbutton.className = "btn btn-outline-primary"
        }
    }
}
