"use strict";
function main() {
    const links = document.querySelectorAll(".navbar .nav-links li");
    toggleLinks(links);
    typeWriter();
}
function toggleLinks(links) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            links.forEach(l => l.querySelector("a")?.classList.remove("active"));
            link.querySelector("a")?.classList.add("active");
        });
    });
}
function typeWriter() {
    const root = document.querySelectorAll("main .text");
    root.forEach(async function (el) {
        const words = el.getAttribute("data-text")?.split(",").map(str => str.trim());
        if (words) {
            let counter = 0;
            const words_length = words.length;
            const delay = getDelay();
            while (true) {
                const word = words[counter];
                const word_length = word.length;
                for (let i = 0; i < word_length; i++) {
                    el.innerHTML = word.substring(0, i + 1);
                    await sleep(delay);
                }
                await sleep(delay * 2);
                for (let j = word_length - 1; j >= 0; j--) {
                    el.innerHTML = word.substring(0, j);
                    await sleep(delay);
                }
                counter = (counter >= words_length - 1) ? 0 : counter + 1;
            }
        }
    });
}
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time * 1000));
}
function getDelay() {
    const rootElement = document.documentElement;
    const rootStyles = window.getComputedStyle(rootElement);
    let delay = 1;
    if (rootStyles) {
        delay = parseFloat(rootStyles.getPropertyValue("--cursor-delay").trim());
        console.log(delay);
    }
    return delay;
}
main();
