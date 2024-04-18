const hourValue = document.querySelector("[hour-value]")
const progressBar = document.querySelector("[progress-bar]")

function updateConicGradient(percentValue) {
    progressBar.style.background = `
        radial-gradient(closest-side, white 80%, transparent 80% 100%),
        conic-gradient(var(--accent) ${percentValue}%, var(--accent-low) 0)
    `;
}

function calculatePercentage(value, max) {
    return (value/max)*100
}

let valMax = hourValue.textContent.split("/")
updateConicGradient(calculatePercentage(parseInt(valMax[0]), parseInt(valMax[1])));