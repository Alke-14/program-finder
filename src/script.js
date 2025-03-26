/* FETCH DATA FROM JSON FILE  */
document.addEventListener("DOMContentLoaded", function () {
    fetch('./assets/programs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            populatePrograms(data.undergrads, "undergrad");
            populatePrograms(data.grads, "grad");
            updateProgramCount();
        })
        .catch(error => console.error("Error fetching JSON data:", error));
});

/* SEARCH BAR */
const inputField = document.getElementById("search");

inputField.addEventListener("input", function (event) {
    const searchValue = event.target.value.toLowerCase();
    console.log("Search value:", searchValue);
    document.getElementById("programData").querySelectorAll(".program-item").forEach(programElement => {
        const programName = programElement.querySelector(".program-name").textContent.toLowerCase();
        if (programName.includes(searchValue)) {
            programElement.style.display = "block";
        } else {
            programElement.style.display = "none";
        }
    }
    );
});



/* LOAD PROGRAMS
* Add classes to the program cards
*/
function populatePrograms(programs, type) {
    const programData = document.getElementById("programData");
    programs.forEach(program => {
        const programElement = document.createElement("div");
        programElement.classList.add("program-item");
        programElement.setAttribute("data-type", type); // Identify as 'undergrad' or 'grad'

        const imgElement = document.createElement("img");
        imgElement.src = program.image;
        imgElement.classList.add("program-image"); 
        imgElement.alt = `Image of ${program.name}`;

        const nameElement = document.createElement("p");
        nameElement.classList.add("program-name"); 
        nameElement.textContent = program.name;

        const linkElement = document.createElement("a");
        linkElement.href = program.url;
        linkElement.title = "Learn more about " + program.name;

        linkElement.appendChild(imgElement);
        programElement.appendChild(linkElement);
        programElement.appendChild(nameElement);
        programData.appendChild(programElement);
    });
    addPrograms(1); // Display first set of programs
};


/* 
    The following logic uses a variable to determine what behavior to give the LOAD MORE button
    This button is updated based on what filter is selected (All, Undergrad, Grad)
*/

let filter = "all";

const loadMoreButton = document.getElementById("more");
const gradButton = document.getElementById("grad");
const programIncrement = 4;
let currentPage = 1;

loadMoreButton.addEventListener("click", function () {
    if (filter == "all") {
        currentPage++;
        addPrograms(currentPage);
        handleButtonStatus();
    } else if (filter == "grad") {
        currentPage++;
        addGrad(currentPage);
        handleGradButtonStatus();
    }
    else if (filter == "undergrad") {
        currentPage++;
        addUgrad(currentPage);
        handleUgradButtonStatus();
    }

});

/* UPDATE BUTTON BEHAVIOR */
/* If all programs are loaded into the page, disable the button */

function handleButtonStatus() {
    const programItems = document.querySelectorAll('[data-type]');
    const totalPrograms = programItems.length;
    if (currentPage * programIncrement >= totalPrograms) {
        loadMoreButton.disabled = true;
    } else {
        loadMoreButton.disabled = false;
        
    }
};

function handleGradButtonStatus() {
    const programItems = document.querySelectorAll('[data-type = "grad"]');
    const totalPrograms = programItems.length;
    if (currentPage * programIncrement >= totalPrograms) {
        loadMoreButton.disabled = true;
    } else {
        loadMoreButton.disabled = false;
        
    }
};

function handleUgradButtonStatus() {
    const programItems = document.querySelectorAll('[data-type = "undergrad"]');
    const totalPrograms = programItems.length;
    if (currentPage * programIncrement >= totalPrograms) {
        loadMoreButton.disabled = true;
    } else {
        loadMoreButton.disabled = false;
        
    }
};



/* LOGIC TO ADD PROGRAMS BASED ON CATEGORY */
function addPrograms(pageIndex) {
    const start = (pageIndex - 1) * programIncrement;
    const end = start + programIncrement;
    const programItems = document.querySelectorAll('[data-type]');

    programItems.forEach((item, index) => {
        item.style.display = index < end ? '' : 'none';
    });
    document.getElementById("programCount").textContent = Math.min(end, programItems.length);
}


function addGrad(pageIndex) {
    const start = (pageIndex - 1) * programIncrement;
    const end = start + programIncrement;
    const programItems = document.querySelectorAll('[data-type = "grad"]');

    programItems.forEach((item, index) => {
        item.style.display = index < end ? '' : 'none';
    });
    document.getElementById("programCount").textContent = Math.min(end, programItems.length);
}

function addUgrad(pageIndex) {
    const start = (pageIndex - 1) * programIncrement;
    const end = start + programIncrement;
    const programItems = document.querySelectorAll('[data-type = "undergrad"]');

    programItems.forEach((item, index) => {
        item.style.display = index < end ? '' : 'none';
    });
    document.getElementById("programCount").textContent = Math.min(end, programItems.length);
}



/* DISPLAY TOTAL COUNT OF PROGRAMS */
function updateProgramCount() {
    document.getElementById("totalPrograms").textContent = document.querySelectorAll('[data-type]').length;
}


/* FILTER BUTTONS */
document.getElementById("all").addEventListener("click", () => filterPrograms("all"));
document.getElementById("undergrad").addEventListener("click", () => filterPrograms("undergrad"));
document.getElementById("grad").addEventListener("click", () => filterPrograms("grad"));



function filterPrograms(type) {
    const allPrograms = document.querySelectorAll('[data-type]');
    const undergradFilter = document.getElementById("undergrad");
    const gradFilter = document.getElementById("grad");

    allPrograms.forEach(program => {
        console.log("all");
        if (type === "all" || program.getAttribute("data-type") === type) {
            program.style.display = 'block';
        } else {
            program.style.display = 'none';
        }
    });
    filter = "all"; // update filter to determine Load More button behavior
    currentPage = 1; // Reset to the first page
    addPrograms(currentPage); // Display first set of programs
    handleButtonStatus(); // Update button status based on filter

    undergradFilter.addEventListener("click", function () {
        document.querySelectorAll(".program-item").forEach(programElement => {
            console.log("undergrad");
            if (programElement.getAttribute("data-type") === "undergrad") {
                programElement.style.display = "block";
            } else {
                programElement.style.display = "none";
            }
        });
        filter = "undergrad";
        addUgrad(1);
        handleUgradButtonStatus();
    });
    
    gradFilter.addEventListener("click", function () {
        document.querySelectorAll(".program-item").forEach(programElement => {
            console.log("grad");
            if (programElement.getAttribute("data-type") === "grad") {
                programElement.style.display = "block";
            } else {
                programElement.style.display = "none";
            }
        });
        filter = "grad";
        addGrad(1);
        handleGradButtonStatus();
    });
}
