let racePool = [];

function generateCharacter(data, pronouns, wealthData, voiceData) {

    //charcter info//
    let name, age, pronounSubject, pronounObject, pronounPossessive, collectiveNoun, possessiveNoun, voice;
    let job, underClothing, overClothing, accessories, jewelry;
    let appearanceType, appearanceStyle, appearanceColor, eyes, height, build, skinColor, skinDetail, skinScar, skinBirthmark, skinTattoo, facialHair;
    const { "fem-names": femNames, "masc-names": mascNames, "androgynous-names": androNames, ratio, ageMin, ageMax, appearance, surnames: surname, race } = data;
    const skin = appearance.skin;
    const totalRatio = ratio.feminine + ratio.masculine + ratio.androgynous;

    const random = Math.random() * totalRatio;


    if (random < ratio.feminine) {
        name = getRandomElement(femNames);
        const femPronouns = pronouns.find(pronoun => pronoun.gender === "Female");
        pronounSubject = femPronouns.pronounSubject;
        pronounObject = femPronouns.pronounObject;
        pronounPossessive = femPronouns.pronounPossessive;
        collectiveNoun = femPronouns.collectiveNoun;
        possessiveNoun = femPronouns.possessiveNoun;
        facialHair = "None";
    } else if (random < ratio.feminine + ratio.masculine) {
        name = getRandomElement(mascNames);
        const mascPronouns = pronouns.find(pronoun => pronoun.gender === "Male");
        pronounSubject = mascPronouns.pronounSubject;
        pronounObject = mascPronouns.pronounObject;
        pronounPossessive = mascPronouns.pronounPossessive;
        collectiveNoun = mascPronouns.collectiveNoun;
        possessiveNoun = mascPronouns.possessiveNoun;

        // 50/50 chance for facial hair for males if the race has facial hair
        if (appearance.facialHair && Math.random() < 0.5) {
            facialHair = getRandomElement(appearance.facialHair);
        } else {
            facialHair = "None";
        }
    } else {
        name = getRandomElement(androNames);
        const nbPronouns = pronouns.find(pronoun => pronoun.gender === "Non-Binary");
        pronounSubject = nbPronouns.pronounSubject;
        pronounObject = nbPronouns.pronounObject;
        pronounPossessive = nbPronouns.pronounPossessive;
        collectiveNoun = nbPronouns.collectiveNoun;
        possessiveNoun = nbPronouns.possessiveNoun;

        // 40/60 chance for facial hair for non-binary if the race has facial hair
        if (appearance.facialHair && Math.random() < 0.4) {
            facialHair = getRandomElement(appearance.facialHair);
        } else {
            facialHair = "None";
        }
    }

    name += ` ${getRandomElement(surname)}`;
    age = Math.floor(Math.random() * (ageMax - ageMin + 1)) + ageMin;
    height = getRandomElement(appearance.height);
    build = getRandomElement(appearance.build);
    eyes = getRandomElement(appearance.eyes);
    voice= getRandomElement(voiceData.voiceTypes);

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
 
    
    //wealth info (job, clothing, accessories)
    const wealthSelect = document.getElementById('npcWealth').value;
    const selectedWealthData = wealthData[wealthSelect];

    job = getRandomElement(selectedWealthData.jobs);
    console.log(job);

    if (pronounSubject === "he") {// masc clothing
        underClothing = `${getRandomElement(selectedWealthData.clothing.underClothingColor)} ${getRandomElement(selectedWealthData.clothing.mascUnderClothing)}`;
        overClothing = `${getRandomElement(selectedWealthData.clothing.overClothingColor)} ${getRandomElement(selectedWealthData.clothing.mascOverClothing)}`;
        accessories = getRandomElement(selectedWealthData.clothing.accessory);
        jewelry = getRandomElement(selectedWealthData.clothing.jewelry);

        
    }
    if (pronounSubject === "she") {//fem clothing

        underClothing = `${getRandomElement(selectedWealthData.clothing.underClothingColor)} ${getRandomElement(selectedWealthData.clothing.femUnderClothing)}`;
        overClothing = `${getRandomElement(selectedWealthData.clothing.overClothingColor)} ${getRandomElement(selectedWealthData.clothing.femOverClothing)}`;
        accessories = getRandomElement(selectedWealthData.clothing.accessory);
        jewelry = getRandomElement(selectedWealthData.clothing.jewelry);


    }
    if (pronounSubject === "they") { //50/50 masc/fem clothing

        if (Math.random() < 0.5) {//masc clothing
            underClothing = `${getRandomElement(selectedWealthData.clothing.underClothingColor)} ${getRandomElement(selectedWealthData.clothing.mascUnderClothing)}`;
            overClothing = `${getRandomElement(selectedWealthData.clothing.overClothingColor)} ${getRandomElement(selectedWealthData.clothing.mascOverClothing)}`;
            accessories = getRandomElement(selectedWealthData.clothing.accessory);
            jewelry = getRandomElement(selectedWealthData.clothing.jewelry);



        }
        else {//fem clothing
            underClothing = `${getRandomElement(selectedWealthData.clothing.underClothingColor)} ${getRandomElement(selectedWealthData.clothing.femUnderClothing)}`;
            overClothing = `${getRandomElement(selectedWealthData.clothing.overClothingColor)} ${getRandomElement(selectedWealthData.clothing.femOverClothing)}`;
            accessories = getRandomElement(selectedWealthData.clothing.accessory);
            jewelry = getRandomElement(selectedWealthData.clothing.jewelry);


        }

    }

    const character = {
        name: name,
        age: age,
        eyes: eyes,
        pronounSubject: pronounSubject,
        pronounObject: pronounObject,
        pronounPossessive: pronounPossessive,
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
        underClothing: underClothing,
        overClothing: overClothing,
        accessories: accessories,
        jewelry: jewelry
    };
    generateCard(character);
}


// Function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCard(character) {
    const card = document.createElement('div');
    card.classList.add('card');

    let hairOrScaleInfo = '';


    if (character.appearanceStyle === "Scaled") {
        hairOrScaleInfo = `
            <p class="character-scale-color"><span class="title">Scale Color:</span> ${character.appearanceColor}</p>
            <p class="character-scale-type"><span class="title">Scale Type:</span> ${character.appearanceType}</p>
        `;
    } else if (character.appearanceStyle === "Feathered") {
        hairOrScaleInfo = `
            <p class="character-feather-color"><span class="title">Feather Color:</span> ${character.appearanceColor}</p>
            <p class="character-feather-type"><span class="title">Feather Type:</span> ${character.appearanceType}</p>
        `;
    } else if (character.appearanceStyle === "Fur") {
        hairOrScaleInfo = `
            <p class="character-fur-color"><span class="title">Fur Color:</span> ${character.appearanceColor}</p>
            <p class="character-fur-type"><span class="title">Fur Type:</span> ${character.appearanceType}</p>
        `;
    } else {
        hairOrScaleInfo = `
            <p class="character-hair"><span class="title">Hair Type:</span> ${character.appearanceType}</p>
            ${character.appearanceType !== "Bald" ? `<p class="character-hair-color"><span class="title">Hair Color:</span> ${character.appearanceColor}</p>` : ""}
            ${character.appearanceType !== "Bald" ? `<p class="character-hair-style"><span class="title">Hair Style:</span> ${character.appearanceStyle}</p>` : ""}
        `;
    }

    card.innerHTML = `
        <div class="card-title">
            <h2 id="character-name"><b>${character.name}</b></h2>
            <div class="card-buttons">
                <button class="lock"><i class="fa-solid fa-unlock"></i></button>
                <button class="delete" onclick="deleteCard(event)"><i class="fa-solid fa-x"></i></button>
            </div>
        </div>
        <hr id="core-hr">
        <div class="card-info">
            <p class="character-pronouns"><span class="title">Pronouns:</span> ${character.pronounSubject}/${character.pronounObject}/${character.pronounPossessive}</p>
            <p class="character-age"><span class="title">Age:</span> ${character.age}</p>
            <p class="character-race"><span class="title">Race:</span> ${character.race}</p>
            <p class="character-job"><span class="title">Job:</span> ${character.job}</p>
            <div class="appearance-info">
                <p class="character-height"><span class="title">Height:</span> ${character.height}</p>
                <p class="character-build"><span class="title">Build:</span> ${character.build}</p>
                <p class="character-voice"><span class="title">Voice:</span> ${character.voice}</p>
                ${character.appearanceStyle !== "Feathered" && character.appearanceStyle !== "Scaled" && character.appearanceStyle !== "Fur" ? `<p class="character-skin-color"><span class="title">Skin Color:</span> ${character.skinColor}</p>` : ""}
                <p class="character-eyes"><span class="title">Eye Color:</span> ${character.eyes}</p>
                ${hairOrScaleInfo}
                ${character.facialHair !== "None" ? `<p class="character-facial-hair"><span class="title">Facial Hair:</span> ${character.facialHair}</p>` : ""}
                ${character.skinDetail !== "None" ? `<p class="character-skin-details"><span class="title">Skin Details:</span> ${character.skinDetail}</p>` : ""}
                ${character.skinScar !== "None" ? `<p class="character-skin-scar"><span class="title">Skin Scar:</span> ${character.skinScar}</p>` : ""}
                ${character.skinBirthmark !== "None" ? `<p class="character-skin-birthmark"><span class="title">Skin Birthmark:</span> ${character.skinBirthmark}</p>` : ""}
                ${character.skinTattoo !== "None" ? `<p class="character-skin-tattoo"><span class="title">Skin Tattoo:</span> ${character.skinTattoo}</p>` : ""}
            </div>
            <hr>
            <div class="card-profession">
                <p class="character-under-clothing"><span class="title">Under Clothing:</span> ${character.underClothing}</p>
                <p class="character-over-clothing"><span class="title">Over Clothing:</span> ${character.overClothing}</p>
                <p class="character-accessories"><span class="title">Accessories:</span> ${character.accessories}</p>
                <p class="character-jewelry"><span class="title">Jewelry:</span> ${character.jewelry}</p>
            </div>
        </div>
    `;

    const results = document.querySelector('.results');
    results.appendChild(card);
}
// Function to fetch JSON data and generate character
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response for provided url was not ok ' + response.statusText);
        }
        const data = await response.json();

        // Fetch pronouns JSON data
        const pronounsResponse = await fetch('json/pronouns.json');
        if (!pronounsResponse.ok) {
            throw new Error('Network response for pronouns was not ok ' + pronounsResponse.statusText);
        }
        const pronounsData = await pronounsResponse.json();

        const wealthResponse = await fetch('json/wealth.json');
        if (!wealthResponse.ok) {
            throw new Error('Network response for wealth was not ok ' + wealthResponse.statusText);
        }
        const wealthData = await wealthResponse.json();

        const voiceResponse = await fetch('json/voice.json');
        if (!voiceResponse.ok) {
            throw new Error('Network response for voice was not ok ' + voiceResponse.statusText);
        }
        const voiceData = await voiceResponse.json();

        console.log(voiceData)

        generateCharacter(data, pronounsData, wealthData, voiceData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function getCheckedValues() {
    const checkboxes = document.querySelectorAll('input[name="race"]:checked');
    const values = [];
    checkboxes.forEach((checkbox) => {
        if (!checkbox.id.includes('All')) { // Exclude "All" checkboxes
            values.push(checkbox.value);
        }
    });
    racePool = values;
    console.log("Checked values: " + racePool.join(', '));
}

function deleteCard(event) {
    const card = event.target.closest('.card');
    card.remove();
};

// Add event listener to the button after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('elfBtn').addEventListener('click', function () {
        getCheckedValues();
    });
    document.getElementById('generateBtn').addEventListener('click', function () {
       
        getCheckedValues();
        if (racePool.length === 0) {
            alert('Please select at least 1 race');
            return; 
        }

        const wealthSelectElement = document.getElementById('npcWealth');
        const selectedWealthValue = wealthSelectElement.value;

        if (selectedWealthValue === "") {
            alert('Please select a wealth distribution');
            return; 
        }


        else {
            const selectElement = document.getElementById('npcAmount');
            const selectedValue = selectElement.value;

            for (let i = 0; i < selectedValue; i++) {
                let choice = getRandomElement(racePool);
                fetchJSON(`json/${choice}.json`);
            }
        }

    });
});

