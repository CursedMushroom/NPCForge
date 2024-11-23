let racePool = [];
let lockedCards = [];
let genders = [];
let hierarchy;
let chosenPresetData;



function getPresetData() {
    const presetSelect = document.getElementById('presetSelect');
    const selectedPreset = presetSelect.value;

    fetch('json/presets/religiousPresets.json')
        .then(response => response.json())
        .then(data => {
            const presetJsonData = data;
            console.log('Preset data loaded');

            if (selectedPreset && presetJsonData[selectedPreset]) {
                const preset = presetJsonData[selectedPreset];
                chosenPresetData = preset;

                fetch('json/colors.json')
                    .then(response => response.json())
                    .then(colorJsonData => {
                        const colorData = colorJsonData;
                        console.log('Color data loaded');
                        let colors = [];
                        for (let i = 0; i < 3; i++) {
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

//breakdown card
function generateBreakdownData() {

    fetch('json/religion.json')
        .then(response => response.json())
        .then(data => {
            let name, hierarchy;
            const breakdownData = data;

            if (Math.random() < 0.5) {
                // console.log("single name");
                name = getRandomElement(breakdownData.singluarNames);
            } else {
                // console.log("combo name");
                name = `${getRandomElement(breakdownData.nameSet1)} ${getRandomElement(breakdownData.connector)} ${getRandomElement(breakdownData.nameSet2)}`;
            }


            const selectElement = document.getElementById("hierarchyAmount");
            const selectedValue = selectElement.value;
            if (selectedValue !== "none") {
                hierarchy = selectedValue;
                fetch('json/colors.json')
                    .then(response => response.json())
                    .then(colorJsonData => {
                        const colorData = colorJsonData;
                        console.log('Color data loaded');
                        let colors = [];
                        for (let i = 0; i < 3; i++) {
                            colors.push(colorData.colors[Math.floor(Math.random() * colorData.colors.length)]);
                        }

                        let card = {
                            name: name,
                            alignment: getRandomElement(breakdownData.alignment),
                            symbol: getRandomElement(breakdownData.symbols),
                            hierarchy: hierarchy,
                            prompt: getRandomElement(breakdownData.prompts),
                            colors: colors
                        }
                        generateBreakdownCard(card);
                    })
            } else {
                alert('Please select a hierarchy');
            }

        })
        .catch(error => console.error('Error fetching breakdown data:', error));

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
    results.innerHTML = ''
    results.appendChild(card);

};


function generateCharacter(raceData, gender, hierarchy, voiceData, familyData, personalityData) {
    // console.log(raceData, gender, hierarchy);

    let name, age, voice;
    let pronouns = [];
    let spouse;
    let children = [];
    let job, clothing, accessory, footware;
    let personality = [];
    let likes = [];
    let dislikes = [];
    let appearanceType, appearanceStyle, appearanceColor, eyes, height, build, skinColor, skinDetail, skinScar, skinBirthmark, skinTattoo, facialHair;
    const { "fem-names": femNames, "masc-names": mascNames, "androgynous-names": androNames, ratio, ageMin, ageMax, appearance, surnames: surname, race } = raceData;
    const skin = appearance.skin;
    const totalRatio = ratio.feminine + ratio.masculine + ratio.androgynous;
    const randomGender = gender[Math.floor(Math.random() * gender.length)];
    switch (randomGender) {
        case "Male":
            name = getRandomElement(mascNames);
            if (appearance.facialHair && Math.random() < 0.5) {
                facialHair = getRandomElement(appearance.facialHair);
            } else {
                facialHair = "None";
            }
            pronouns = ["he", "him", "his"];
            break;
        case "Female":
            name = getRandomElement(femNames);
            facialHair = "None";
            pronouns = ["she", "her", "her"];
            break;
        case "nonBinary":
            name = getRandomElement(androNames);
            if (appearance.facialHair && Math.random() < 0.4) {
                facialHair = getRandomElement(appearance.facialHair);
            } else {
                facialHair = "None";
            }
            pronouns = ["they", "them", "their"];
            break;

    }
    let surnameF = getRandomElement(surname);
    name += ` ${surnameF}`;
    age = Math.floor(Math.random() * (ageMax - ageMin + 1)) + ageMin;
    height = getRandomElement(appearance.height);
    build = getRandomElement(appearance.build);
    eyes = getRandomElement(appearance.eyes);
    voice = getRandomElement(voiceData.voiceTypes);

    if (appearance.hair) {
        appearanceType = getRandomElement(appearance.hair.type);
        appearanceStyle = appearanceType !== "Bald" ? getRandomElement(appearance.hair.style) : "None";
        appearanceColor = appearanceType !== "Bald" ? getRandomElement(appearance.hair.color) : "None";
        skinColor = getRandomElement(skin.color);
    } else if (appearance.feathers) {
        appearanceType = getRandomElement(appearance.feathers.type);
        appearanceStyle = "Feathered";
        appearanceColor = getRandomElement(appearance.feathers.color);
        skinColor = getRandomElement(appearanceColor);
    } else if (appearance.fur) {
        appearanceType = getRandomElement(appearance.fur.type);
        appearanceStyle = "Fur";
        appearanceColor = getRandomElement(appearance.fur.color);
        skinColor = getRandomElement(appearanceColor);
    } else if (appearance.scales) {
        appearanceType = getRandomElement(appearance.scales.type);
        appearanceStyle = "Scaled";
        appearanceColor = getRandomElement(appearance.scales.color);
        skinColor = appearanceColor;
    }

    skinDetail = (skin.details && skin.details.length > 0 && Math.random() < 0.4) ? getRandomElement(skin.details) : "None";
    skinScar = (skin.scar && skin.scar.length > 0 && Math.random() < 0.4) ? `${getRandomElement(skin.scar)} on the ${getRandomElement(skin.bodyPart)}` : "None";
    skinBirthmark = (skin.birthmark && skin.birthmark.length > 0 && Math.random() < 0.4) ? `${getRandomElement(skin.birthmark)} on the ${getRandomElement(skin.bodyPart)}` : "None";
    skinTattoo = (skin.tattoos && skin.tattoos.length > 0 && Math.random() < 0.4) ? `${getRandomElement(skin.tattoos)} on the ${getRandomElement(skin.bodyPart)}` : "None";



    //personality info
    personality.push(getRandomElement(personalityData.traits.positive)); //positive trait
    personality.push(getRandomElement(personalityData.traits.negative)); //negative trait
    personality.push(getRandomElement(personalityData.traits.neutral)); //neutral trait

    let availableLikes = [...personalityData.likes];
    let availableDislikes = [...personalityData.dislikes];

    for (let i = 0; likes.length < 3 && dislikes.length < 3; i++) {
        let like = getRandomElement(availableLikes);
        likes.push(like);
        availableLikes = availableLikes.filter(item => item !== like);

        let dislike = getRandomElement(availableDislikes);
        dislikes.push(dislike);
        availableDislikes = availableDislikes.filter(item => item !== dislike);
    }


    //family info

    //if married -> generate spouse
    //if children, random number -> generate children

    if (Math.random() < 0.4) {//40% chance of being married
        const spouseRandom = Math.random() * totalRatio;
        let minSpouseAge = Math.max(age - 10, ageMin);
        let maxSpouseAge = Math.min(age + 10, ageMax);

        if (spouseRandom < ratio.feminine) {
            spouse = {
                name: getRandomElement(femNames) + ` ${surnameF}`,
                age: Math.floor(Math.random() * (maxSpouseAge - minSpouseAge + 1)) + minSpouseAge,
                pronouns: ["she", "her", "her"],
                status: getRandomElement(familyData.married)
            };
        } else if (spouseRandom < ratio.feminine + ratio.masculine) {
            spouse = {
                name: getRandomElement(mascNames) + ` ${surnameF}`,
                age: Math.floor(Math.random() * (maxSpouseAge - minSpouseAge + 1)) + minSpouseAge,
                pronouns: ["he", "him", "his"],
                status: getRandomElement(familyData.married)
            };

        } else {
            spouse = {
                name: getRandomElement(androNames) + ` ${surnameF}`,
                age: Math.floor(Math.random() * (maxSpouseAge - minSpouseAge + 1)) + minSpouseAge,
                pronouns: ["they", "them", "their"],
                status: getRandomElement(familyData.married)
            };
        }

        //generate children
        if (Math.random() < 0.3) {
            let numChildren = Math.floor(Math.random() * 4) + 1;

            for (let i = 0; i < numChildren; i++) {
                let childRandom = Math.random() * totalRatio;
                let childName = "";
                let childAge = Math.floor(Math.random() * (age - ageMin)) + 1;;
                if (childRandom < ratio.feminine) {
                    childName = getRandomElement(femNames) + ` ${surnameF}`;
                    children.push({
                        name: childName,
                        age: childAge,
                        pronouns: ["she", "her", "her"],
                        status: getRandomElement(familyData.parentChildRelationship)
                    });
                } else if (childRandom < ratio.feminine + ratio.masculine) {
                    childName = getRandomElement(mascNames) + ` ${surnameF}`;
                    children.push({
                        name: childName,
                        age: childAge,
                        pronouns: ["he", "him", "his"],
                        status: getRandomElement(familyData.parentChildRelationship)
                    });
                } else {
                    childName = getRandomElement(androNames) + ` ${surnameF}`;
                    children.push({
                        name: childName,
                        age: childAge,
                        pronouns: ["they", "them", "their"],
                        status: getRandomElement(familyData.parentChildRelationship)
                    });
                }
            }
        } else {
            children = [];
        }
    } else {
        spouse = {
            name: "None",
            age: "None",
            pronouns: ["None", "None", "None"],
            status: getRandomElement(familyData.single)
        };

        if (Math.random() < 0.3) {
            let numChildren = Math.floor(Math.random() * 4) + 1;

            for (let i = 0; i < numChildren; i++) {
                let childRandom = Math.random() * totalRatio;
                let childName = "";
                let childAge = Math.floor(Math.random() * (age - ageMin)) + 1;;
                if (childRandom < ratio.feminine) {
                    childName = getRandomElement(femNames) + ` ${surnameF}`;
                    children.push({
                        name: childName,
                        age: childAge,
                        pronouns: ["she", "her", "her"],
                        status: getRandomElement(familyData.parentChildRelationship)
                    });
                } else if (childRandom < ratio.feminine + ratio.masculine) {
                    childName = getRandomElement(mascNames) + ` ${surnameF}`;
                    children.push({
                        name: childName,
                        age: childAge,
                        pronouns: ["he", "him", "his"],
                        status: getRandomElement(familyData.parentChildRelationship)
                    });
                } else {
                    childName = getRandomElement(androNames) + ` ${surnameF}`;
                    children.push({
                        name: childName,
                        age: childAge,
                        pronouns: ["they", "them", "their"],
                        status: getRandomElement(familyData.parentChildRelationship)
                    });
                }
            }
        } else {
            children = [];
        }
    }


    //job
    let hierarchyRatios = hierarchy.split(":").map(Number);
    let jobNumber = Math.floor(Math.random() * 100);
    let highThreshold = hierarchyRatios[0];
    let midThreshold = hierarchyRatios[0] + hierarchyRatios[1];
    if (chosenPresetData !== "" || chosenPresetData !== undefined) {
        if (jobNumber < highThreshold) {
            job = chosenPresetData.roles.high[Math.floor(Math.random() * chosenPresetData.roles.high.length)];

            clothing = getRandomElement(chosenPresetData.clothing.high[job].clothing);
            accessory = getRandomElement(chosenPresetData.clothing.high[job].accessories);
            footware = getRandomElement(chosenPresetData.clothing.high[job].footwear);
        } else if (jobNumber < midThreshold) {
            job = chosenPresetData.roles.mid[Math.floor(Math.random() * chosenPresetData.roles.mid.length)];

            clothing = getRandomElement(chosenPresetData.clothing.mid[job].clothing);
            accessory = getRandomElement(chosenPresetData.clothing.mid[job].accessories);
            footware = getRandomElement(chosenPresetData.clothing.mid[job].footwear);
        } else {
            job = chosenPresetData.roles.low[Math.floor(Math.random() * chosenPresetData.roles.low.length)];

            clothing = getRandomElement(chosenPresetData.clothing.low[job].clothing);
            accessory = getRandomElement(chosenPresetData.clothing.low[job].accessories);
            footware = getRandomElement(chosenPresetData.clothing.low[job].footwear);
        }
    }






    const character = {
        name: name,
        age: age,
        eyes: eyes,
        prounouns: pronouns,
        race: race,
        voice: voice,
        height: height,
        build: build,
        skinColor: skinColor,
        appearanceType: appearanceType,
        appearanceStyle: appearanceStyle,
        appearanceColor: appearanceColor,
        facialHair: facialHair,
        skinDetail: skinDetail,
        skinScar: skinScar,
        skinBirthmark: skinBirthmark,
        skinTattoo: skinTattoo,
        job: job,
        clothing: clothing,
        accessory: accessory,
        footware: footware,
        // jewelry: jewelry,
        personality: personality,
        likes: likes,
        dislikes: dislikes,
        spouse: spouse,
        children: children
    };
    console.log(character);
    console.log(chosenPresetData);


}











function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//card scripts
function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
    lockedCards = lockedCards.filter(lockedCard => lockedCard !== card);
};
function toggleLock(event) {
    const card = event.target.closest('.card');
    const lockIcon = card.querySelector('.lock i');

    if (lockIcon.classList.contains('fa-unlock')) {
        lockIcon.classList.remove('fa-unlock');
        lockIcon.classList.add('fa-lock');
        lockedCards.push(card);
    } else {
        lockIcon.classList.remove('fa-lock');
        lockIcon.classList.add('fa-unlock');
        lockedCards = lockedCards.filter(lockedCard => lockedCard !== card);
    }
}


async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response for provided url was not ok ' + response.statusText);
        }

        let data = await response.json();

        const voiceResponse = await fetch('json/voice.json');
        if (!voiceResponse.ok) {
            throw new Error('Network response for voice was not ok ' + voiceResponse.statusText);
        }
        const voiceData = await voiceResponse.json();

        const familyResponse = await fetch('json/family.json');
        if (!familyResponse.ok) {
            throw new Error('Network response for family was not ok ' + familyResponse.statusText);
        }
        const familyData = await familyResponse.json();

        const personalityResponse = await fetch('json/personality.json');
        if (!personalityResponse.ok) {
            throw new Error('Network response for personality was not ok ' + personalityResponse.statusText);
        }
        const personalityData = await personalityResponse.json();

        generateCharacter(data, genders, hierarchy, voiceData, familyData, personalityData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


function getCheckedValues(id, checkArray) {
    const checkboxes = document.querySelectorAll(`input[name="${id}"]:checked`);

    checkArray.splice(0, checkArray.length);

    checkboxes.forEach((checkbox) => {
        if (!checkbox.id.includes('All')) { // Exclude "All" checkboxes
            checkArray.push(checkbox.value);
        }
    });

    console.log("Checked values: " + checkArray.join(', '));
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('reset').addEventListener('click', function () {
        const presetSelect = document.getElementById('presetSelect');
        const hierarchySelect = document.querySelector('#hierarchyAmount');
        const clothingSelect = document.querySelector('.clothselect');
        const genderSelect = document.querySelectorAll("#gender-checkboxes input[type='checkbox']");
        const races = document.querySelectorAll('input[name="race"]');



        hierarchySelect.value = "20:50:30";
        clothingSelect.value = "random";
        genderSelect.forEach(checkbox => checkbox.checked = true);
        races.forEach(race => race.checked = false);
        presetSelect.value = "none";

        document.getElementById("selected-gender-value").textContent = "Female, Male, Non-Binary / Androgynous";
        updateSelectedValue();

    }

    )
    document.getElementById('generateBtn').addEventListener('click', function () {
        const presetSelect = document.getElementById('presetSelect');
        const breakdowncardCheck = document.querySelector('#breakdown').checked;
        const selectedPreset = presetSelect.value;
        chosenPresetData = "";
        if (selectedPreset !== "none") {
            getPresetData();
        } else {
            if (breakdowncardCheck == true) {
                generateBreakdownData();
            }
        }

        getCheckedValues("race", racePool);
        getCheckedValues("gender", genders);

        hierarchy = document.getElementById('hierarchyAmount').value;

        if (racePool.length === 0) {
            alert('Please select at least 1 race');
            return;
        }
        if (genders.length === 0) {
            alert('Please select at least 1 gender');
            return;
        }

        else {
            const results = document.querySelector('.results');
            results.innerHTML = '';
            // lockedCards.forEach(card => results.appendChild(card));


            const amountSelect = document.getElementById('npcAmount');
            const amountValue = amountSelect.value;
            for (let i = 0; i < amountValue; i++) {
                let choice = getRandomElement(racePool);
                fetchJSON(`json/races/${choice}.json`);
            }
        }



    });

});
