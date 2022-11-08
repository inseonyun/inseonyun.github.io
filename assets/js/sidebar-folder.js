function spread(count){
    let folderCheckbox = document.getElementById('folder-checkbox-' + count);
    if(folderCheckbox){
        if(folderCheckbox.checked) folderCheckbox.checked = !folderCheckbox.checked
        else folderCheckbox.checked = !folderCheckbox.checked
    }

    let spreadIcon = document.getElementById('spread-icon-' + count);
    if(spreadIcon){
        if(spreadIcon.innerHTML == 'arrow_right') {
            spreadIcon.innerHTML = 'arrow_drop_down';
            spreadIcon.style.color = 'grey';
        }else{
            spreadIcon.innerHTML = 'arrow_right';
            spreadIcon.style.color = 'white';
        }
    }
}