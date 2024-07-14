function toggleDropdown(event) {
    event.stopPropagation();
    const checkboxes = document.getElementById("checkboxes");
    checkboxes.classList.toggle("show");
}

document.addEventListener("click", function(event) {
    const checkboxes = document.getElementById("checkboxes");
    const selectBox = document.querySelector(".select-box");

    if (!selectBox.contains(event.target) && !checkboxes.contains(event.target)) {
        checkboxes.classList.remove("show");
    }
});

function updateSelectedValue(event) {
    event.stopPropagation();
    const checkboxes = document.querySelectorAll("#checkboxes input:checked");
    const count = checkboxes.length;

    let selectedValue;
    if (count === 0) {
        selectedValue = "--- Races ---";
    } else {
        const selectedNames = Array.from(checkboxes)
            .map(checkbox => checkbox.parentNode.textContent.trim());

        if (count > 2) {
            selectedValue = `${selectedNames.slice(0, 2).join(", ")} +${count - 2} selected`;
        } else {
            selectedValue = selectedNames.join(", ");
        }
    }

    document.getElementById("selected-value").textContent = selectedValue;
}