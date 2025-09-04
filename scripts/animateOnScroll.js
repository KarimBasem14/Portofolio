
// IntersectionObserver(callback, options)
// callback is called each time an observed element gets in or out of the viewport
// entries tell what changed
const observer = new IntersectionObserver( (enteries)=> {
    enteries.forEach((entry) => {
        // If it is visible
        if (entry.isIntersecting){
            console.log(entry.target)
            entry.target.classList.add("show");
        }
        else{
            // When it is outside the screen
            entry.target.classList.remove("show");
        }
    })
}, {});

const projectCards = document.querySelectorAll(".project-card");

// Observe (listen) to the project cards
projectCards.forEach(el => observer.observe(el))