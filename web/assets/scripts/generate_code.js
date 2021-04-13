let codelist = [];

function generate_code(selector) {
    [...document.querySelectorAll(selector)].forEach(element => {
        element.innerHTML = codelist[Math.round(Math.random()*(codelist.length - 1))]
    });
}
