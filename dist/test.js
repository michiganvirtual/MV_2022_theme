const draggableSpans = document.querySelectorAll(".draggable>span");

// get the div element that will be the drop zone
const dropZone = document.querySelector(".droppable");

// add a "dragstart" event listener to each span element
draggableSpans.forEach((span) => {
  span.addEventListener("dragstart", (event) => {
    // set the data that will be dragged and dropped
    event.dataTransfer.setData("text/plain", event.target.id);
    console.log("test");
  });
});

// add a "dragover" event listener to the drop zone
dropZone.addEventListener("dragover", (event) => {
  // prevent the default behavior of not allowing drops
  event.preventDefault();
});

// add a "drop" event listener to the drop zone
dropZone.addEventListener("drop", (event) => {
  // prevent the default behavior of not allowing drops
  event.preventDefault();

  // get the id of the dropped element
  let droppedElementId = "";
  droppedElementId.innerHTML = event.dataTransfer.getData("text/plain");

  // get the dragged element using the id
  const draggedElement = document.getElementById(droppedElementId);

  // append the dragged element to the drop zone
  dropZone.lastChild.appendChild(draggedElement);
});
