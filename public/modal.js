const slides = [];

slides.push(`<h3 class="mx-auto mb-3">Welcome to PathAlgo Visualizer</h3>
<p>This is a simple app that aims to find the minmum distance between the start and the end node in a 2D grid.</p>
<img src="./imgs/path.png" class="p-3" style="display:block;margin:auto;width:200px;height:150px">`);

slides.push(`<h3 class="mx-auto d-block mb-3">Pick an Algorithm</h3>
<p>You can choose to visualize the algoritms from the list below.Some algorithms are <b>weighted</b> and some are <b>Non-weighted</b>.Some gurantee the shortest path while some do not.</p>
<img src="./imgs/algos.png" class="p-3" style="display:block;margin:auto;width:50%;height:auto">`);

slides.push(`<h3 class="mx-auto d-block mb-3">Adding Walls</h3>
<p>Walls are basically imprenatable i.e they act as infinite weights.</p>
<p>Walls can be added by left clicking a node and then dragging it around to add and remove the walls.</p>
<img src="./imgs/walls.gif" class="p-3" style="display:block;margin:auto;width:60%;height:auto">`);

slides.push(`<h3 class="mx-auto d-block mb-3">Draging Nodes</h3>
<p>The Start and the End Nodes can be dragged inorder to change their position.</p>
<p>Note that you can drag them even after the algorithm has completed to get an instant visual.</p>
<img src="./imgs/drag.gif" class="p-3" style="display:block;margin:auto;width:60%;height:auto">`);

const modal = document.querySelector(".modal-body");
const slideIndicator = document.querySelector(".close");
const nextBtn = document.getElementById("modalNextBtn");
const prevBtn = document.getElementById("modalPrevBtn");
const skipBtn = document.getElementById("modalSkipBtn");
const finishBtn = document.getElementById("modalFinishBtn");

let modalIndex = 0;

modal.innerHTML = slides[modalIndex];
slideIndicator.innerHTML = `${modalIndex+1}/${slides.length}`
prevBtn.style.display = "none";
finishBtn.style.display = "none";

function changeIndex(val) {
    modalIndex += val;
    slideIndicator.innerHTML = `${modalIndex+1}/${slides.length}`
    if(modalIndex === 0) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "inline-block"
        finishBtn.style.display = "none";
    }
    if(modalIndex > 0) {
        prevBtn.style.display = "inline-block";
        nextBtn.style.display = "inline-block";
        finishBtn.style.display = "none";
    }
    if(modalIndex === slides.length-1) {
        nextBtn.style.display = "none";
        finishBtn.style.display = "inline-block"
    }
    modal.innerHTML = slides[modalIndex];
}

nextBtn.addEventListener('click', () => {
    changeIndex(1);
});

prevBtn.addEventListener('click', () => {
    changeIndex(-1);
})

finishBtn.addEventListener('click', () => {
    skipBtn.click();
})



