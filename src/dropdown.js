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
    const allCheckboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
    const checkboxes = Array.from(allCheckboxes).filter(checkbox => checkbox.checked && !checkbox.id.includes('All'));

    const selectedValue = checkboxes
        .map(checkbox => checkbox.parentNode.textContent.trim())
        .slice(0, 2)
        .join(", ") || "--- Race ---";

    const remainingCount = checkboxes.length - 2;
    if (remainingCount > 0) {
        document.getElementById("selected-value").textContent = `${selectedValue} +${remainingCount} more selected`;
    } else {
        document.getElementById("selected-value").textContent = selectedValue;
    }
}

function toggleAll(event, sectionId) {
    const allChecked = event.target.checked;
    const checkboxes = document.querySelectorAll(`#${sectionId} input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
        checkbox.checked = allChecked;
        updateSelectedValue(event);
    });
}