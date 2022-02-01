const form = document.getElementById('register');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmar-contraseña');

const showError = (input) => {
  const icon = document.querySelector(`#${input.id} ~ .input-icon`);
  const span = document.querySelector(`#${input.id} + span.error`);
  if (input.validity.valueMissing) {
    span.textContent = 'Campo obligatorio';
  } else if (input.validity.tooShort) {
    span.textContent = `Al menos ${input.minLength} caracteres`;
  } else if (input.validity.typeMismatch) {
    span.textContent = input.title;
  } else if (input.validity.patternMismatch) {
    span.textContent = input.title;
  } else if (input.value !== password.value || input.value.trim() === '') {
    span.textContent = input.title;
  }
  span.classList.add('invalid');
  input.classList.add('invalid');
  input.classList.remove('success');
  icon.classList.add('input-icon--error', 'fa-exclamation-circle');
};

const hideError = (input) => {
  const span = document.querySelector(`#${input.id} + span.error`);
  if (input.name === 'image') {
    span.textContent = '';
    span.classList.remove('invalid');
    input.classList.remove('invalid');
    input.classList.add('success');
  } else {
    span.textContent = '';
    span.classList.remove('invalid');
    input.classList.remove('invalid');
    const icon = document.querySelector(`#${input.id} ~ .input-icon`);
    icon.classList.remove('input-icon--error', 'fa-exclamation-circle');
    icon.classList.add('input-icon--success', 'fa-check-circle');
    input.classList.add('success');
  }
};

form.addEventListener('input', (event) => {
  if (event.target === confirmPass) {
    if (
      confirmPass.value !== password.value ||
      event.target.value.trim() === ''
    ) {
      showError(confirmPass);
    } else {
      hideError(confirmPass);
    }
  } else if (event.target === password) {
    if (!password.validity.valid) {
      showError(password);
    } else {
      hideError(password);
    }
    if (
      confirmPass.value !== password.value ||
      confirmPass.value.trim() === ''
    ) {
      showError(confirmPass);
    } else {
      hideError(confirmPass);
    }
  } else if (event.target.validity.valid) {
    hideError(event.target);
  } else {
    showError(event.target);
  }
});

form.addEventListener('submit', (event) => {
  const mail = document.getElementById('email');
  const name = document.getElementById('name');
  const image = document.getElementById('userAddImage');
  const fileExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

  if (!name.validity.valid) {
    event.preventDefault();
    showError(name);
  }
  if (!mail.validity.valid) {
    event.preventDefault();
    showError(mail);
  }
  if (!password.validity.valid) {
    event.preventDefault();
    showError(password);
  }
  if (password.value !== confirmPass.value || password.value.trim() === '') {
    event.preventDefault();
    showError(confirmPass);
  }
  if (!fileExt.exec(image.value)) {
    event.preventDefault();
    showError(image);
  }
});
