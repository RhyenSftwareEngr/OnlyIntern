let remarkToggled = false
const remarkInput = document.getElementById("remark-input")
const enableRemarkBtn = document.getElementById("enable-remark-btn")
const submitRemarkBtn = document.getElementById("submit-remark-btn")
function toggleRemarkBtn() {
    remarkToggled = !remarkToggled
    
  if (remarkToggled === true) {
    enableRemarkBtn.style.fill = "var(--accent)"
    submitRemarkBtn.style.display = "block"
    remarkInput.readOnly = false;
  } else {
    enableRemarkBtn.style.fill = "var(--text)"
    submitRemarkBtn.style.display = "none"
    remarkInput.readOnly = true;
  }
}