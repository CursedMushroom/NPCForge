function toggleGenderDropdown(event) {
    event.stopPropagation();
    const checkboxes = document.getElementById("gender-checkboxes");
    checkboxes.classList.toggle("show");
}

document.addEventListener("click", function(event) {
    const checkboxes = document.getElementById("gender-checkboxes");
    const selectBox = document.querySelector(".select-box");

    if (!selectBox.contains(event.target) && !checkboxes.contains(event.target)) {
        checkboxes.classList.remove("show");
    }
});

function updateGenderValue(event) {
    event.stopPropagation();
    const allCheckboxes = document.querySelectorAll("#gender-checkboxes input[type='checkbox']");
    const checkboxes = Array.from(allCheckboxes).filter(checkbox => checkbox.checked && !checkbox.id.includes('All'));

    const selectedValue = checkboxes
        .map(checkbox => checkbox.parentNode.textContent.trim())
        .slice(0, 3)
        .join(", ") || "--- Gender ---";

    const remainingCount = checkboxes.length - 3;
    if (remainingCount > 0) {
        document.getElementById("selected-gender-value").textContent = `${selectedValue} +${remainingCount} more selected`;
    } else {
        document.getElementById("selected-gender-value").textContent = selectedValue;
    }
}