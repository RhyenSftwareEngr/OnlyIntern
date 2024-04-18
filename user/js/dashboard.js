const menuIcon = document.getElementById("menu-icon")
const menuPath = document.getElementById("menu-path")

/*  
    Author: Raymond Luigi Caolboy
    Description: Toggling of the sidebar in the dashboard, 
                 also changes the design of the svg when toggled
*/

menuIcon.addEventListener("click", e => {
    if (!document.body.classList.contains("closed")) {
        document.body.classList.add("closed")
        menuPath.setAttribute('d', "M4 6h16v2H4zm0 5h12v2H4zm0 5h8v2H4z")
    } else {
        document.body.classList.remove("closed")
        menuPath.setAttribute('d', "M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z")
    }
})