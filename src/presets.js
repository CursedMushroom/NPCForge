let presetData;


fetch('json/presets.json')
.then(response => response.json())
.then(data => {
    presetData = data;
    console.log('Preset data loaded:', presetData);
})
.catch(error => console.error('Error fetching preset data:', error));


function handlePresetChange() {
    const presetSelect = document.getElementById('presetSelect');
    const selectedPreset = presetSelect.value;
    const races = document.querySelectorAll('input[name="race"]');
    const wealthSelect = document.getElementById('npcWealth');

    // Reset all checkboxes and wealth distribution to random
    races.forEach(race => race.checked = false);
    wealthSelect.value = "random";

    if (selectedPreset && presetData[selectedPreset]) {
        const preset = presetData[selectedPreset];

        // Check off the corresponding races
        preset.races.forEach(raceName => {
            const raceCheckbox = document.querySelector(`input[name="race"][value="${raceName}"]`);
            if (raceCheckbox) {
                raceCheckbox.checked = true;
                console.log('Checked:', raceName);
            }
            
        });

        // Set the wealth distribution
        wealthSelect.value = preset.wealth_dis.toLowerCase();

        console.log('Applied preset:', preset);
        console.log(wealthSelect.value);
    }
    updateSelectedValue();
}

function updateSelectedValue(event) {
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