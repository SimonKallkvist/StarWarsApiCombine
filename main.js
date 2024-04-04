// -_-

// globals
let apiKey = 'https://swapi.dev/api/people/';
let apiKeyImage = 'https://akabab.github.io/starwars-api/api/id/';

let charArray = [];

let char1 = document.querySelector('.char1');
let charOneName = document.querySelector('.charOneName');
let charOneImage = document.querySelector('.charOneImage');
let extraInfoOne = document.querySelector('.extraInfoOne');
let char2 = document.querySelector('.char2');
let charTwoName = document.querySelector('.charTwoName');
let charTwoImage = document.querySelector('.charTwoImage');
let extraInfoTwo = document.querySelector('.extraInfoTwo');

let extraInfoShared = document.querySelector('.extraInfo');

let createBtn = document.querySelectorAll('.createChar');

let compareBtn = document.querySelector('.compareBtn');

let sharedMovies = document.querySelector('.sharedMovies');

// Class for characheter creation
class Character {
  constructor(
    name,
    gender,
    height,
    weight,
    hairColor,
    skinColor,
    eyeColor,
    movies,
    moviesSpec,
    imgUrl,
    id
  ) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.weight = weight;
    this.hairColor = hairColor;
    this.skinColor = skinColor;
    this.eyeColor = eyeColor;
    this.movies = movies;
    this.moviesSpec = moviesSpec;
    this.imgUrl = imgUrl;
    this.id = id;
  }

  static ComparePlanet() {
    // compare two chars homeplanets
  }

  // which movie and when was the first charachter apperence
  async firstApperence() {
    let firstMovie = this.moviesSpec[0];

    let firstApperence = await getExtraData(firstMovie);
    return firstApperence;
  }

  // Which movies does the chars appear in at the same time
  static async sharedMovies() {
    // Compare and print name of movie both char was in

    // Create an array containging all overlapping

    let shared = charArray[0].moviesSpec.filter((element) =>
      charArray[1].moviesSpec.includes(element)
    );
    console.log(shared);

    let promises = shared.map(async (shared) => {
      let movieName = await getExtraData(shared);
      return movieName;
    });

    let sharedMovies = await Promise.all(promises);

    console.log(sharedMovies);

    return sharedMovies;
  }

  // async firstEncounter() {
  //   // Check first date that char appeard in a movie
  //   let movieApper = `${this.name} appears in `;
  //   let key = this.moviesSpec;

  //   // Use map to create an array of promises
  //   let promises = key.map(async (key) => {
  //     let moviesPartic = await getExtraData(key);
  //     return moviesPartic;
  //   });

  //   // Wait for all promises to resolve
  //   let moviesParticArray = await Promise.all(promises);

  //   // Concatenate results
  //   // moviesParticArray.forEach((moviesPartic) => {
  //   //   movieApper += `"${moviesPartic}" `;
  //   // });

  //   console.log(moviesParticArray);
  //   return moviesParticArray;
  // }

  expensiveRide() {
    // print the name of most expensive ride
  }
}

// show extra eventListener connected to firstEncounter();
// showExtra.addEventListener('click', async () => {
//   extraInfoShared.innerHTML = '';
//   let extraInfo = await charArray[1].firstEncounter();
//   if (extraInfo) {
//     let extra = document.createElement('p');
//     extra.innerText = extraInfo;
//     extraInfoShared.append(extra);
//   }
// });

// Api call using axios, fetching data
let getData = async (number) => {
  try {
    let id = number;
    let response = await axios.get(apiKey + id);
    console.log(response.data);
    let char = response.data;
    return char;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null or any other appropriate value when there's an error
  }
};

// Get Image
let getImageData = async (number) => {
  let id = number;
  let response = await axios.get(apiKeyImage + id + '.json');
  let charImage = response.data.image;
  return charImage;
};

let getExtraData = async (apiExtra) => {
  try {
    let response = await axios.get(apiExtra);
    console.log(response.data.release_date);
    let char = response.data;
    return char;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null or any other appropriate value when there's an error
  }
};

// Generate random number
let randomNumber = () => {
  return Math.floor(Math.random() * 83) + 1;
  // return 1;
};

// Eventlistener for btns, to be able to know which has been pressed
createBtn.forEach((createBtn) => {
  createBtn.addEventListener('click', async () => {
    clearInfoBoxes();
    let randomNr = randomNumber();
    let char = await getData(randomNr);
    let charImage = await getImageData(randomNr);

    createInstance(char, charImage, createBtn);
  });
});

// Creating the instance of Character, and adding to the charArray
let createInstance = (char, imageUrl, btn) => {
  let pokemon = new Character(
    char.name,
    char.gender,
    Number(char.height),
    Number(char.mass),
    char.hair_color,
    char.skin_color,
    char.eye_color,
    char.films.length,
    char.films,
    imageUrl,
    btn.id
  );

  if (btn.id == '1') {
    charArray[0] = pokemon;
  } else {
    charArray[1] = pokemon;
  }
  console.log(charArray);

  renderCharacters();
};

// Rendering the chars on screen
let renderCharacters = () => {
  extraInfoOne.innerHTML = '';
  charArray.forEach((char) => {
    if (char) {
      let haircolor = document.createElement('p');
      haircolor.innerText = 'Haircolor: ' + char.hairColor;
      let height = document.createElement('p');
      height.innerText = 'Height: ' + char.height;
      height.setAttribute('value', char.height);
      let weight = document.createElement('p');
      weight.innerText = 'Weight: ' + char.weight;
      weight.setAttribute('value', char.weight);
      let gender = document.createElement('p');
      gender.innerText = 'Gender: ' + char.gender;
      let skinColor = document.createElement('p');
      skinColor.innerText = 'Skincolor: ' + char.skinColor;
      let eyeColor = document.createElement('p');
      eyeColor.innerText = 'Eyecolor: ' + char.eyeColor;
      let movies = document.createElement('p');
      movies.innerText = 'Movies: ' + char.movies;

      let showFirstEncounter = document.createElement('button');
      showFirstEncounter.classList.add('btn', 'showFirst');
      showFirstEncounter.innerText = 'First encounter with: ' + char.name;
      showFirstEncounter.id = char.id;

      showFirstEncounter.addEventListener('click', () => {
        showFirst(char);
      });

      if (char.id == '1') {
        char1.innerHTML = '';
        charOneName.innerText = char.name;
        charOneImage.src = char.imgUrl;
        char1.append(
          haircolor,
          height,
          weight,
          gender,
          skinColor,
          eyeColor,
          movies
        );
        extraInfoOne.append(showFirstEncounter);
      } else {
        char2.innerHTML = '';
        charTwoName.innerText = char.name;
        charTwoImage.src = char.imgUrl;
        char2.append(
          haircolor,
          height,
          weight,
          gender,
          skinColor,
          eyeColor,
          movies
        );
        extraInfoTwo.append(showFirstEncounter);
      }
    }
  });
};

compareBtn.addEventListener('click', () => {
  compareChars();
});

let compareChars = () => {
  // Get references to character stats elements
  let char1Stats = Array.from(char1.childNodes);
  let char2Stats = Array.from(char2.childNodes);

  // Attributes to compare
  let attributes = [
    'hairColor',
    'height',
    'weight',
    'gender',
    'skinColor',
    'eyeColor',
    'movies',
  ];

  // Iterate over attributes and compare them
  attributes.forEach((attribute) => {
    // Compare attribute values
    if (charArray[0][attribute] === charArray[1][attribute]) {
      // If equal, highlight both stats elements in yellow
      char1Stats[attributes.indexOf(attribute)].style.background = 'yellow';
      char2Stats[attributes.indexOf(attribute)].style.background = 'yellow';
    } else {
      // If not equal, remove any background color
      char1Stats[attributes.indexOf(attribute)].style.background = '';
      char2Stats[attributes.indexOf(attribute)].style.background = '';
    }
  });

  if (charArray[0].height > charArray[1].height) {
    char1Stats[attributes.indexOf('height')].style.background = 'green';
    char2Stats[attributes.indexOf('height')].style.background = '';
  } else if (charArray[0].height < charArray[1].height) {
    char2Stats[attributes.indexOf('height')].style.background = 'green';
    char1Stats[attributes.indexOf('height')].style.background = '';
  }

  // Weight
  if (charArray[0].weight > charArray[1].weight) {
    char1Stats[attributes.indexOf('weight')].style.background = 'green';
    char2Stats[attributes.indexOf('weight')].style.background = '';
  } else if (charArray[0].weight < charArray[1].weight) {
    char2Stats[attributes.indexOf('weight')].style.background = 'green';
    char1Stats[attributes.indexOf('weight')].style.background = '';
  }

  if (charArray[0].movies > charArray[1].movies) {
    char1Stats[attributes.indexOf('movies')].style.background = 'green';
    char2Stats[attributes.indexOf('movies')].style.background = '';
  } else if (charArray[0].movies < charArray[1].movies) {
    char2Stats[attributes.indexOf('movies')].style.background = 'green';
    char1Stats[attributes.indexOf('movies')].style.background = '';
  }
};

sharedMovies.addEventListener('click', async () => {
  //Do the chars share any movies?
  let sharedList = await Character.sharedMovies();
  extraInfoShared.innerHTML = '';
  console.log(sharedList);
  if (sharedList) {
    let ul = document.createElement('ul');
    let desc = document.createElement('p');
    desc.innerText = `${charOneName.innerText} and ${charTwoName.innerText} has starred in these movies togheter:`;
    sharedList.forEach((film) => {
      let li = document.createElement('li');
      li.innerText = film.title;
      ul.append(li);
    });
    extraInfoShared.append(desc, ul);
  } else {
    let desc = document.createElement('p');
    desc.innerText = `${charOneName.innerText} and ${charTwoName.innerText} has not starred in any movies togheter :( `;
    extraInfoShared.append(desc);
  }
});

let showFirst = async (char) => {
  let firstApperence = await char.firstApperence();
  console.log(firstApperence);

  let firstly = document.createElement('p');
  firstly.innerText = `The first time "${char.name}" was ever seen on the canvas was in "${firstApperence.title}" that released "${firstApperence.release_date}"`;
  firstly.style.fontSize = '24px';
  firstly.style.textTransform = 'none';
  firstly.style.textAlign = 'left';
  if (char.id == '1') {
    extraInfoOne.innerHTML = '';
    extraInfoOne.append(firstly);
  } else {
    extraInfoTwo.innerHTML = '';
    extraInfoTwo.append(firstly);
  }
};

let clearInfoBoxes = () => {
  extraInfoOne.innerHTML = '';
  extraInfoTwo.innerHTML = '';
  extraInfoShared.innerHTML = '';
};
