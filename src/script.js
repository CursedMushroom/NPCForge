let racePool = [];

function generateCharacter(data, pronouns) {
    let name, age, pronounSubject, pronounObject, pronounPossessive, collectiveNoun, possessiveNoun;
    let appearanceType, appearanceStyle, appearanceColor, eyes, height, build, skinColor, skinDetail, skinScar, skinBirthmark, skinTattoo, facialHair;

    const { "fem-names": femNames, "masc-names": mascNames, "androgynous-names": androNames, ratio, ageMin, ageMax, appearance, surnames: surname } = data;
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
        appearanceStyle = "Furry";
        appearanceColor = getRandomElement(appearance.fur.color);
        skinColor = getRandomElement(appearanceColor);
    } else if (appearance.scales) {
        appearanceType = getRandomElement(appearance.scales.type);
        appearanceStyle = "Scaled";
        appearanceColor = getRandomElement(appearance.scales.color);
        skinColor = getRandomElement(appearanceColor);
    }

    skinDetail = (skin.details && skin.details.length > 0 && Math.random() < 0.4) ? getRandomElement(skin.details) : "None";
    skinScar = (skin.scar && skin.scar.length > 0 && Math.random() < 0.4) ? `${getRandomElement(skin.scar)} on the ${getRandomElement(skin.bodyPart)}` : "None";
    skinBirthmark = (skin.birthmark && skin.birthmark.length > 0 && Math.random() < 0.4) ? `${getRandomElement(skin.birthmark)} on the ${getRandomElement(skin.bodyPart)}` : "None";
    skinTattoo = (skin.tattoos && skin.tattoos.length > 0 && Math.random() < 0.4) ? `${getRandomElement(skin.tattoos)} on the ${getRandomElement(skin.bodyPart)}` : "None";

    console.log(`Name: ${name}, Age: ${age}`);
    console.log(`Pronouns: ${pronounSubject}/${pronounObject}/${pronounPossessive}`);
    console.log(`Hair: ${appearanceType} ${appearanceStyle} ${appearanceColor}`);
    console.log(`Facial Hair: ${facialHair}`);
    console.log(`Height: ${height}, Build: ${build}`);
    console.log(`Skin: Color: ${skinColor}, Detail: ${skinDetail}, Scar: ${skinScar}, Birthmark: ${skinBirthmark}, Tattoo: ${skinTattoo}`);
    console.log('--------------------------------------------------------------------');

    // Example of displaying on the HTML element with id 'characterDescription'
    const characterDescription = document.getElementById('characterDescription');
    characterDescription.textContent = `Name: ${name}, Age: ${age}, Hair: ${appearanceType} ${appearanceStyle} ${appearanceColor}, Facial Hair: ${facialHair}, Skin: ${skinColor}`;
}

// Function to get a random element from an array
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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

        generateCharacter(data, pronounsData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Call fetchJSON 
fetchJSON('json/human.json');



function getCheckedValues() {
    const checkboxes = document.querySelectorAll('input[name="race"]:checked');
    const values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    racePool=values;
    console.log("Checked values: " + racePool.join(', '));
   
}

// Add event listener to the button after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('elfBtn').addEventListener('click', function () {
        getCheckedValues();
    });
    document.getElementById('generateBtn').addEventListener('click', function () {
        fetchJSON('json/human.json');
    });
});

