const text = document.querySelector(".dynamic-txt");

const textLoad = () => {
    setTimeout(
        () => {
            text.textContent = "a Software Engineer";
        }, 0
    );

    setTimeout(
        () => {
            text.textContent = "a FullStack Developer";
        }, 4000
    );
}


textLoad();
setInterval(textLoad, 12000);