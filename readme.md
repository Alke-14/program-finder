# Program Finder

The following Program Finder component is intended to load information of programs dynamically and effectively using HTML, Bootstrap, JSON and JavaScript. Its overall was made under the consideration to be easy to navigate without losing the efficiency of a search for programs. 

To prevent saturation of content in both a mobile and desktop displau, there is a "Load More" button to generate 4 additional programs. Also, filter buttons have been implemented when looking/loading programs for Undergraduate, Graduate, or All Programs; based on the filter that was selected, "Load More" functionality will be updated to only load the programs that said filter specifies.

Below is the logic in charge of updating the "Load More" button behavior using a variable: (If there are additional questions, please refer to comments found in `src/scripts.js` file)
```

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
```

Below is the display for desktop and mobile version.

### Desktop
![alt text](image.png)

### Mobile
![alt text](image-1.png)