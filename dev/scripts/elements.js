let elementId = "none";

function fcnDetails(id) {
  if (elementId != "none") {
    if (elementId != id) {
      document.getElementById(elementId).classList.remove("element_detail");
      document.getElementById(id).classList.add("element_detail");
    } else {
      document.getElementById(id).classList.remove("element_detail");
    }
  } else {
    document.getElementById(id).classList.add("element_detail");
  }
  elementId = id;
  if (window.getSelection) {window.getSelection().removeAllRanges();}
 else if (document.selection) {document.selection.empty();}
}

let info = [];
// To change the request, edit this url
// let url = "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json";
let url = "/scripts/elements.json";
// the ajax request
function ajax() {
  let xhr = new XMLHttpRequest();
  // console.log(xhr);
  xhr.open("GET", url, true);
  xhr.onreadystatechange = callback;
  // console.log(xhr.readyState, xhr.status, xhr.statusText);
  xhr.send();

  function callback() {
    // console.log(xhr.readyState, xhr.status, xhr.statusText);
    if (xhr.readyState == 4) {
      let response = JSON.parse(xhr.responseText);
      // console.log(response);
      info = response;
      // console.log(info.elements.length);
      elementBuilder();

    }
  }
}
window.onload = ajax;

// console.log(info);

function elementBuilder() {
  let style = document.createElement('style');
  let elementList = info.elements;
  for (var element of elementList) {
    // console.log(element);
    style.innerHTML += `.${element.name.toLowerCase()} {
      grid-column-start: ${element.xpos};
      grid-column-end: ${element.xpos === 18 ? `-1` : element.xpos + 1};
      grid-row-start: ${element.ypos};
      grid-row-end: ${element.ypos + 1};
    }`

    var elementStructure = `<div id="${element.name.toLowerCase()}" class="element ${element.category.toLowerCase().replace(/[^A-Z0-9]+/ig, "_")} ${element.name.toLowerCase()}" onmouseup="fcnDetails('${element.name.toLowerCase()}')">
    <div class="atomicWeight"><span class="hidden">Atomic Weight: </span> ${element.number}</div>
    <div class="elementSymbol"><span class="hidden">Symbol: </span> ${element.symbol}</div>
    <div class="elementName">${element.name}</div>
    <div class="atomicMass"><span class="hidden">Atomic Mass: </span> ${element.atomic_mass}</div>
    <div class="density"><span class="hidden">Density: ${element.density}</span></div>
    <div class="meltPoint"><span class="hidden">Melting Point: ${element.melt}</span></div>
    <div class="boilingPoint"><span class="hidden">Boiling Point: ${element.boil}</span></div>
    <div class="elementCategory"><span class="hidden">Element Category:<br> ${element.category}</span></div>
    <div class="summary"><span class="hidden">${element.summary}</span></div>
    </div>`;  // this is using template literals to build the structure of the element. The ".replace(/[^A-Z0-9]+/ig, "_")" is using regex to remove any spaces or characters that aren't numbers or letters and replace them with underscores.
    // I also used .toLowerCase() quite a bit to make sure there aren't any weird issues with different selectors coming in as different cases and not being correctly used.
    // console.log(elementStructure);
    document.getElementById('chemTable').innerHTML += elementStructure;

  }

  let head = document.getElementsByTagName("head")[0].appendChild(style);
// console.log(style.innerHTML);

}
window.addEventListener('keypress', function(e) {
    if(e.key == "Escape"){
    	let id = document.getElementById(elementId);
      if (id) {
        id.classList.remove("element_detail");
      }
    }
});
// `<div id="hydrogen" class="element diatomic_nonmetal hydrogen" onmouseup="fcnDetails('hydrogen')">
// <div class="atomicWeight">1</div>
// <div class="elementSymbol">H</div>
// <div class="elementName">Hydrogen</div>
// <div class="atomicMass">1.008</div>
// </div>`
