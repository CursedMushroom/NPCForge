function generateCharacter(data, pronouns) {
    let name, age, pronounSubject, pronounObject, pronounPossessive, collectiveNoun, possessiveNoun;
    const { "fem-names": femNames, "masc-names": mascNames, "androgynous-names": androNames, ratio, "surnames": surname, ageMin, ageMax } = data;

    const totalRatio = ratio.feminine + ratio.masculine + ratio.androgynous;

    const random = Math.random() * totalRatio;

    if (random < ratio.feminine) {
        name = getRandomElement(femNames);
        // Assign feminine pronouns
        const femPronouns = pronouns.find(pronoun => pronoun.gender === "Female");
        pronounSubject = femPronouns.pronounSubject;
        pronounObject = femPronouns.pronounObject;
        pronounPossessive = femPronouns.pronounPossessive;
        collectiveNoun = femPronouns.collectiveNoun;
        possessiveNoun = femPronouns.possessiveNoun;
    } else if (random < ratio.feminine + ratio.masculine) {
        name = getRandomElement(mascNames);
        // Assign masculine pronouns
        const mascPronouns = pronouns.find(pronoun => pronoun.gender === "Male");
        pronounSubject = mascPronouns.pronounSubject;
        pronounObject = mascPronouns.pronounObject;
        pronounPossessive = mascPronouns.pronounPossessive;
        collectiveNoun = mascPronouns.collectiveNoun;
        possessiveNoun = mascPronouns.possessiveNoun;
    } else {
        name = getRandomElement(androNames);
        // Assign non-binary pronouns
        const nbPronouns = pronouns.find(pronoun => pronoun.gender === "Non-Binary");
        pronounSubject = nbPronouns.pronounSubject;
        pronounObject = nbPronouns.pronounObject;
        pronounPossessive = nbPronouns.pronounPossessive;
        collectiveNoun = nbPronouns.collectiveNoun;
        possessiveNoun = nbPronouns.possessiveNoun;
    }
    name += ` ${getRandomElement(surname)}`;
    // Generate a random age
    age = Math.floor(Math.random() * (ageMax - ageMin + 1)) + ageMin;

    console.log(`Name: ${name}, Age: ${age}`);
    console.log(`Pronouns: ${pronounSubject}/${pronounObject}/${pronounPossessive}`);
    console.log('--------------------------------------------------------------------');
    document.getElementById('characterDescription').textContent = `Name: ${name}, Age: ${age}`;
    // console.log(`Collective Noun: ${name} ${collectiveNoun}`);
    // console.log(`Possessive Noun: ${name} ${possessiveNoun}`);
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
            throw new Error('Network response was not ok ' + response.statusText);
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

// Add event listener to the button after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generateBtn').addEventListener('click', function () {
        fetchJSON('json/human.json');
    });
});
