window.addEventListener("DOMContentLoaded", main);

function main() {
  let listname;
  const sendListNameButton = document.getElementById("sendlistname");

  sendListNameButton.onclick = function() {
    listname = document.getElementById("inputlistname").value;
    console.log(listname)
    const novo = document.createElement("h1")
    novo.innerHTML = listname
    document.body.appendChild(novo)
  };
}
