function getPresetData() {
    const presetSelect = document.getElementById('presetSelect');
    const selectedPreset = presetSelect.value;

    fetch('json/presets/religiousPresets.json')
        .then(response => response.json())
        .then(data => {
            const presetData = data;
            console.log('Preset data loaded:', presetData);

            if (selectedPreset && presetData[selectedPreset]) {
                const preset = presetData[selectedPreset];


                let card = {
                    name: preset.name,
                    alignment: preset.alignment[Math.floor(Math.random() * preset.alignment.length)],
                    symbol: preset.symbols[Math.floor(Math.random() * preset.symbols.length)],
                    hierarchy: preset.hierarchyPositionRatios,
                    prompt: preset.prompts[Math.floor(Math.random() * preset.prompts.length)],
                    colors: preset.colors
                };
                console.log(card);

            } else {
                console.log('Preset not found or not selected:', selectedPreset);
            }
        })
        .catch(error => console.error('Error fetching preset data:', error));
}



function generateBreakdownCard(presetData) {
    //name
    //alignment
    //symbol
    //hierarchy Position Ratio?
    //prompt
    //colors

};



document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reset').addEventListener('click', function () {
        const presetSelect = document.getElementById('presetSelect');
        const selectedPreset = presetSelect.value;
        if (selectedPreset !== "None") {
            getPresetData();
        } else {
            console.log('No preset selected');
        }
    }

    )
    document.getElementById('generateBtn').addEventListener('click', function () {



    });

});
