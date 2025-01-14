const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');

function validateEmail(email){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}

form.addEventListener('submit', (event) => {
    let errors = [];
    errors = getLoginFormErrors(email_input.value, password_input.value);

    if(errors.length > 0){
      event.preventDefault();
      error_message.innerText  = errors.join(". ");
    }
    else {
      let loginInfo = {
        email: email_input.value,
        password: password_input.value 
      };
      localStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      event.preventDefault();
      window.location.href = "../html/homepage.html";
    }

    // sa fac cu local storage
})

function getLoginFormErrors(email, password){
    let errors = [];
  
    if(email === '' || email == null){
      errors.push('Email is required');
      email_input.parentElement.classList.add('incorrect');
    }
    else if(validateEmail(email) == 0){
      errors.push('Make sure the email has a valid format:\nname@domain.com');
      email_input.parentElement.classList.add('incorrect');
    }
    else if(password === '' || password == null){
      errors.push('Password is required');
      password_input.parentElement.classList.add('incorrect');
    }
  
    return errors;
}

const inputs = [email_input, password_input].filter(input => input != null);

inputs.forEach(input => {
    input.addEventListener('input', () => {
      if(input.parentElement.classList.contains('incorrect')){
        input.parentElement.classList.remove('incorrect');
        error_message.innerText = '';
      }
    })
})
