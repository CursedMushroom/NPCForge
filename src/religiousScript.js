function getPresetData() {
    const presetSelect = document.getElementById('presetSelect');
    const selectedPreset = presetSelect.value;

    fetch('json/presets/religiousPresets.json')
        .then(response => response.json())
        .then(data => {
            const presetData = data;
            console.log('Preset data loaded');

            if (selectedPreset && presetData[selectedPreset]) {
                const preset = presetData[selectedPreset];

                fetch('json/colors.json')
                    .then(response => response.json())
                    .then(colorJsonData => {
                        const colorData = colorJsonData;
                        console.log('Color data loaded');
                        let colors=[];
                        for(let i=0; i<3; i++){
                            colors.push(colorData.colors[Math.floor(Math.random() * colorData.colors.length)]);
                        }

                        let card = {
                            name: preset.name,
                            alignment: preset.alignment[Math.floor(Math.random() * preset.alignment.length)],
                            symbol: preset.symbols[Math.floor(Math.random() * preset.symbols.length)],
                            hierarchy: preset.hierarchyPositionRatios,
                            prompt: preset.prompts[Math.floor(Math.random() * preset.prompts.length)],
                            colors: colors
                        }
                        generateBreakdownCard(card);
                     })
               

            } else {
                console.log('Preset not found or not selected:', selectedPreset);

            }
        })
        .catch(error => console.error('Error fetching preset data:', error));
}



function generateBreakdownCard(cardData) {
    //name
    //alignment
    //symbol
    //hierarchy Position Ratio?
    //prompt
    //colors
    console.log(cardData);
    console.log(cardData.colors[0].hex);

    const card = document.createElement('div');
    card.classList.add('card');
    card.classList.add('breakdown-card');


    card.innerHTML = `
        <div class="card-title">
            <h2 id="character-name"><b>${cardData.name}</b></h2>
            <div class="card-buttons">
                <button class="lock" onclick="toggleLock(event)"><i class="fa-solid fa-unlock"></i></button>
                <button class="delete" onclick="deleteCard(event)"><i class="fa-solid fa-x"></i></button>
            </div>
        </div>
        <hr id="core-hr">
        <div class="card-info">
            <p  class="card-aignment"><span class="title">Alignment:</span> ${cardData.alignment}</p>
            <p  class="card-symbol"><span class="title">Symbol:</span> ${cardData.symbol}</p>
            <p  class="card-hierarchy"><span class="title">Hierarchy:</span> ${cardData.hierarchy}</p>
            <p  class="card-prompt"><span class="title">Prompt:</span> ${cardData.prompt}</p>
            
            <span class="title">Colors</span>
            <div class="colors-container">
            <div class="color-info">
                <div class="color-box" style="background-color: #${cardData.colors[0].hex}"></div>
                <p class="color-name">${cardData.colors[0].name}</p>
            </div>
            <div class="color-info">
                <div class="color-box" style="background-color: #${cardData.colors[1].hex}"></div>
                <p class="color-name">${cardData.colors[1].name}</p>
            </div>
            <div class="color-info">
                <div class="color-box" style="background-color: #${cardData.colors[2].hex}"></div>
                <p class="color-name">${cardData.colors[2].name}</p>
            </div>
            
            
        </div>
            
               
            
            
           
          
        </div>
    `;

    const results = document.querySelector('.results');
    results.appendChild(card);

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
