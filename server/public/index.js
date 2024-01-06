const signupForm = document.querySelector('form.signup');
const loginForm = document.querySelector('form.login');
``;

const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

// const reqUrl = 'http://localhost:3000';

async function signup() {
    const email = signupForm.email.value;
    const password = signupForm.password.value;

    emailError.textContent = '';
    passwordError.textContent = '';

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        if (data.error) {
            emailError.textContent = data.error.email;
            passwordError.textContent = data.error.password;
        }
        if (data.id) {
            location.assign('/');
        }
    } catch (err) {
        console.log(err);
    }
}

async function loginWithGoogle() {
    try {
        await fetch('/auth/google');
    } catch (err) {
        console.log(err);
    }
}
async function login() {
    const email = loginForm.email.value;
    const password = loginForm.password.value;
    console.log(email, password);

    emailError.textContent = '';
    passwordError.textContent = '';

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        const data = await response.json();
        if (data.error) {
            emailError.textContent = data.error.email;
            passwordError.textContent = data.error.password;
        }
        if (data.id) {
            location.assign('/');
        }
    } catch (err) {
        console.log(err);
    }
}

async function logout() {
    try {
        const response = await fetch('/auth/logout');

        const data = await response.json();
        console.log(data);
    } catch (err) {
        throw new Error(err);
    }
}

signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    signup();
});

loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginType = e.target;
    console.log(loginType);
});

document.querySelector('button.google').addEventListener('click', (e) => {
    loginWithGoogle();
});
