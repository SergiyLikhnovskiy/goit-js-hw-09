const formData = { email: '', message: '' };
const refs = {
  form: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';

const getLocalData = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsLocalData = JSON.parse(savedData);
      formData.email = parsLocalData.email ?? '';
      formData.message = parsLocalData.message ?? '';
      refs.form.elements.email.value = formData.email;
      refs.form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.error('Помилка', error);
  }
};
getLocalData();

refs.form.addEventListener('input', event => {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }
});

refs.form.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }
  console.log('Submitted data:', formData);
  formData.email = '';
  formData.message = '';
  refs.form.reset();
});
