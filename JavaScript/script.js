window.addEventListener("DOMContentLoaded", main);


function main() {
  const sendbutton = document.getElementById("sendbutton");
  let lists = [];
  let listname;
  let loaded = JSON.parse(localStorage.getItem("listas"));

  if (loaded) {
    for (const el of loaded) {
      addlist(el)
    }
  }

  function addlist(name) {
    const element = document.createElement("h1")
    element.innerHTML = name
    element.id = name

    document.querySelector("body").append(element)
    lists.push(name)
    localStorage.setItem("listas", JSON.stringify(lists))
    sendbutton.disabled = true
  }

  sendbutton.disabled = true

  document.querySelector("#inputlistname").onkeyup = () => {
    sendbutton.disabled = document.querySelector("#inputlistname").value === "";
  }

  sendbutton.onclick = () => {
    listname = document.getElementById("inputlistname").value
    if (listname !== "") {
      addlist(listname)
      document.querySelector("#inputlistname").value = ""
    } else {
      alert("Cannot create null list name.")
      sendbutton.disabled = true
    }

  }
}