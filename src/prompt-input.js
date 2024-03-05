// Create an HTML input form
const inputForm = document.createElement('input');
inputForm.type = 'text';
inputForm.placeholder = 'Enter your input';
inputForm.style.position = 'absolute';
inputForm.style.top = '50%';
inputForm.style.left = '50%';
inputForm.style.transform = 'translate(-50%, -50%)';
document.body.appendChild(inputForm);

// Later in your code, when you want to prompt the user
inputForm.focus(); // Set focus to the input field
inputForm.addEventListener('change', function() {
    const userInput = inputForm.value;
    // Handle the user input
    console.log('User input:', userInput);
});

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import { Preferences } from '@capacitor/preferences';

// JSON "set" example
export const setObject = async () => {
  await Preferences.set({
    key: 'user',
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" example
export const getObject = async () => {
  const ret = await Preferences.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

