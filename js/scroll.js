function scrollToTarget(caminho) {
    var targetElement = document.getElementById(caminho);
    targetElement.scrollIntoView({ behavior: "smooth" });
}
