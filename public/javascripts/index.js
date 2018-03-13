//register Var
const formFields = {
  age: '',
  breed:'',
  dognName:'',
  email:'',
  ownerName: '',
  phone: ''

};



let dogName = document.getElementById('dogName');
let age = document.getElementById('age');
let breed = document.getElementById('breed');
let email = document.getElementById('email');
let ownerName = document.getElementById('ownerName');
let phone = document.getElementById('phone');


// event listeners for input changes


// dog name change and object update
dogNameChange = (event) => {
  formFields.dogName = event.target.value.toLowerCase().trim();
}

dogName.addEventListener('change', dogNameChange);


// age change and object update
ageChange = (event) => {
  formFields.age = event.target.value;
}

age.addEventListener('change', ageChange);


// breed change and object update
breedChange = (event) => {
  formFields.breed = event.target.value;
}

breed.addEventListener('change', breedChange);


// email change and object update
emailChange = (event) => {
  formFields.email = event.target.value;
}

email.addEventListener('change', emailChange);


// owner change and object update
ownerNameChange = (event) => {
  formFields.ownerName = event.target.value.trim();
}

ownerName.addEventListener('change', ownerNameChange);


// phone change and object update
phoneChange = (event) => {
  formFields.phone = event.target.value;
}

phone.addEventListener('change', phoneChange);



// register fetch 

let buttonSubmit = document.getElementById('submitButton');
onRegisterDog = () => {
    fetch('http://localhost:3050/register',{
      method: 'POST',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        age: formFields.age,
        breed: formFields.breed,
        dogName: formFields.dogName,
        email: formFields.email,
        ownerName: formFields.ownerName,
        phone: formFields.phone
      })
    })
    .then(response => {
      return response.json();
    })
    .then(user => {
      if(formFields.dogName === '' || formFields.breed === '' || formFields.age === '' ||
        formFields.ownerName === '' ||formFields.email === '') {
        return alert('Please fill in dog name, breed, age, your name, and email to register!');
      } else if (user){
        return alert('Thank you for registering for pup!');
      } else{
      return alert('Unable to register!');
      }
    })
    .catch(err => {
      alert('Could not register user!');
    })
  }


buttonSubmit.addEventListener('click', onRegisterDog);



// search var
const search = {
  searchDogName: ''
};

let searchDogName = document.getElementById('searchDogName');


// search dog input change and object update
searchInputChange = (event) => {
  search.searchDogName = event.target.value.toLowerCase().trim();
}

searchDogName.addEventListener('change', searchInputChange);




//search results function
  searchResultsData = (results) => {
    results.forEach( result => {
      let table = document.getElementById("resultstable");
      let row = table.insertRow(table.rows.length);
      let resultsOwnerName = row.insertCell(0);
      let resultsEmail = row.insertCell(1);
      let resultsPhone = row.insertCell(2);
      resultsOwnerName.innerHTML = result.ownername;
      resultsEmail.innerHTML = result.email;
      resultsPhone.innerHTML = result.phone;

    });
  }

// search fetch

let buttonSearch = document.getElementById('searchButton');

  onSearch = () => {
    fetch(`http://localhost:3050/search?searchDogName=${search.searchDogName}`)
    .then(response => response.json())
    .then( response => {
      return this.searchResultsData(response);
    })
    .catch(err => {
      return alert('No pups registered with that name!');
    })
  }
 buttonSearch.addEventListener('click', onSearch);
