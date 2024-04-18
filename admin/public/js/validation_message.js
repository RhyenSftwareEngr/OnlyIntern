const validationContainer = document.getElementById("update-validation")
const validationCloseBtn = document.getElementById("update-validation-close")
const validationText = document.getElementById("update-validation-text")
validationCloseBtn.addEventListener("click", event => {
    validationContainer.style.display = "none"
    validationContainer.style.pointerEvents = "none"
    validationText.innerText = '';
})