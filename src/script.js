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
            handleButtonStatus();
        } else {
            programElement.style.display = "none";
        }
    }
    );
});




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
        linkElement.title = "Learn more about " + grad.name;

        linkElement.appendChild(imgElement);
        programElement.appendChild(linkElement);
        programElement.appendChild(nameElement);
        programData.appendChild(programElement);
    });
    addPrograms(1); // Display first set of programs
}

const loadMoreButton = document.getElementById("more");
const programIncrement = 4;
let currentPage = 1;

loadMoreButton.addEventListener("click", function () {
    currentPage++;
    addPrograms(currentPage);
    handleButtonStatus();
});

function handleButtonStatus() {
    const programItems = document.querySelectorAll("#programData > div");
    const totalPrograms = programItems.length;
    if (currentPage * programIncrement >= totalPrograms) {
        loadMoreButton.disabled = true;
    } else {
        loadMoreButton.disabled = false;
        
    }
};

function addPrograms(pageIndex) {
    const start = (pageIndex - 1) * programIncrement;
    const end = start + programIncrement;
    const programItems = document.getElementById("programData").querySelectorAll(".program-item");

    programItems.forEach((item, index) => {
        item.style.display = index < end ? '' : 'none';
    });
    document.getElementById("programCount").textContent = Math.min(end, programItems.length);
}

function updateProgramCount() {
    document.getElementById("totalPrograms").textContent = document.querySelectorAll("#programData > div").length;
}

// Show All logic
document.getElementById("all").addEventListener("click", () => filterPrograms("all"));
document.getElementById("undergrad").addEventListener("click", () => filterPrograms("undergrad"));
document.getElementById("grad").addEventListener("click", () => filterPrograms("grad"));

function filterPrograms(type) {
    const allPrograms = document.querySelectorAll("#programData > div");
    allPrograms.forEach(program => {
        if (type === "grad" || program.getAttribute("data-type") === "grad") {
            console.log("grad only");
            program.style.display = 'block';
        } else {
            program.style.display = 'none';
        }
    });
    currentPage = 1; // Reset to the first page
    addPrograms(currentPage); // Display first set of programs
    handleButtonStatus(); // Update button status based on filter
}

/* FILTER BUTTONS */
const undergradFilter = document.getElementById("undergrad");
const gradFilter = document.getElementById("grad");

undergradFilter.addEventListener("click", function () {
    document.querySelectorAll(".program-item").forEach(programElement => {
        if (programElement.getAttribute("data-type") === "undergrad") {
            programElement.style.display = "block";
        } else {
            programElement.style.display = "none";
        }
    });
    
});

gradFilter.addEventListener("click", function () {
    document.querySelectorAll(".program-item").forEach(programElement => {
        if (programElement.getAttribute("data-type") === "grad") {
            programElement.style.display = "block";
        } else {
            programElement.style.display = "none";
        }
    });

    
});
