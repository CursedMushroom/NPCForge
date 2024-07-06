document.getElementById('generateBtn').addEventListener('click', generateCharacter);

function generateCharacter() {
    const names = ['Alex', 'Jamie', 'Taylor', 'Jordan', 'Casey'];
    const jobs = ['Engineer', 'Artist', 'Teacher', 'Doctor', 'Chef'];
    const personalities = ['kind-hearted', 'ambitious', 'funny', 'introverted', 'outgoing'];
    const likes = ['reading books', 'playing sports', 'traveling', 'cooking', 'gardening'];
    const dislikes = ['loud noises', 'crowded places', 'spicy food', 'cold weather', 'waiting'];
    const family = [
        { spouse: 'Sam', kids: 2 },
        { spouse: 'Morgan', kids: 0 },
        { spouse: null, kids: 0 },
        { spouse: 'Chris', kids: 1 },
        { spouse: null, kids: 0 }
    ];

    const name = getRandomElement(names);
    const job = getRandomElement(jobs);
    const personality = getRandomElement(personalities);
    const like = getRandomElement(likes);
    const dislike = getRandomElement(dislikes);
    const familyDetails = getRandomElement(family);

    let familyDescription = '';
    if (familyDetails.spouse) {
        familyDescription = `Married to ${familyDetails.spouse} with ${familyDetails.kids} kid(s).`;
    } else {
        familyDescription = 'Single with no kids.';
    }

    const description = `${name} is a ${personality} ${job} who loves ${like} and dislikes ${dislike}. ${familyDescription}`;

    document.getElementById('characterDescription').textContent = description;
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

//const url = 'json/allRaces.json';

async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
fetchJSON('json/allRaces.json');



const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})