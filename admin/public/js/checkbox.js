function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('adviser')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}