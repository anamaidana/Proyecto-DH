const form = document.querySelector('form');
const nombre = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');
const nutritional = document.getElementById('nutritional');

const showError = (input) => {
  const span = document.querySelector(`#${input.id} + span.error`);
  if (input.validity.valueMissing) {
    span.textContent = 'Campo obligatorio';
  } else if (input.validity.tooShort) {
    span.textContent = `Al menos ${input.minLength} caracteres`;
  }

  span.classList.add('invalid');
  input.classList.add('invalid');
  input.classList.remove('success');
};

const hideError = (input) => {
  const span = document.querySelector(`#${input.id} + span.error`);
  span.textContent = '';
  span.classList.remove('invalid');
  input.classList.remove('invalid');
  input.classList.add('success');
};

form.addEventListener('submit', (event) => {
  if (!nombre.validity.valid) {
    event.preventDefault();
    showError(nombre);
  } else {
    hideError(nombre);
  }

  if (price.value.trim() === '') {
    event.preventDefault();
    showError(price);
  } else {
    hideError(price);
  }

  if (description.value.trim().length < 20) {
    event.preventDefault();
    showError(description);
  } else {
    hideError(description);
  }

  if (nutritional.value.trim().length < 20) {
    event.preventDefault();
    showError(nutritional);
  } else {
    hideError(nutritional);
  }
});
