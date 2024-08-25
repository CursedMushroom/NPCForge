//change gender, hierarchy, clothing? options
let presetData;

fetch('json/presets/religiousPresets.json')
    .then(response => response.json())
    .then(data => {
        presetData = data;
        console.log('Preset data loaded:', presetData);
    })
    .catch(error => console.error('Error fetching preset data:', error));


function handlePresetChange() {
    const presetSelect = document.querySelector('#presetSelect');
    const selectedPreset = presetSelect.value;
    const hierarchySelect = document.querySelector('#hierarchyAmount');
    const clothingSelect = document.querySelector('.clothselect');
    const genderSelect = document.querySelectorAll("#gender-checkboxes input[type='checkbox']");


    // Reset all

    hierarchySelect.value = "20:50:30";
    clothingSelect.value = "random";
    genderSelect.forEach(checkbox => checkbox.checked = false);

    if (selectedPreset && presetData[selectedPreset]) {
        const preset = presetData[selectedPreset];

        
        hierarchySelect.value = preset.hierarchyPositionRatios;
        clothingSelect.value = "custom";
        
        //gender checkboxes
        preset.gender.forEach(gender => {
            // Find the checkbox for the given gender value
            const genderCheckbox = document.querySelector(`#gender-checkboxes input[type='checkbox'][value="${gender}"]`);
        
            // Log the gender being processed and the checkbox found
            console.log('Processing gender:', gender);
        
            if (genderCheckbox) {
                genderCheckbox.checked = true;
                console.log('Checked:', gender);
            }
        });

        console.log('Applied preset:', preset);
       
    }
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

