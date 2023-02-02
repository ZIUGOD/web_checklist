window.addEventListener("DOMContentLoaded", main);


function main() {
  const sendbutton = document.getElementById("sendbutton");
  let lists = [];
  let listname;


  function addlist(name) {
    const element = document.createElement("h1")
    element.innerHTML = name
    element.id = name

    document.querySelector("body").append(element)
  }

  sendbutton.onclick = () => {
    listname = document.getElementById("inputlistname").value
    addlist(listname)
  }
}