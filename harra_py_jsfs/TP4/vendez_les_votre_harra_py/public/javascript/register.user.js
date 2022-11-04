let userlogin;
let userpassword;
let username;

const setup = () => {
    userlogin = document.getElementById('userlogin');
    username = document.getElementById('userlogin');
    userpassword = document.getElementById('userpassword');
    document.getElementById('register').addEventListener('click', () => register(false));
    document.getElementById('adminregister').addEventListener('click', adminRegister);
}
window.addEventListener('DOMContentLoaded', setup);

const register = async admin => {
    const userData = {
        name : userlogin.value,
        login : userlogin.value,
        password : userpassword.value,
        admin : admin || false
    };
    console.log(`data ${userData.admin}`);
    const body = JSON.stringify(userData);
    console.log(body);
    const requestOptions = {
        method : 'POST',
        headers : {"Content-Type": "application/json"},
        body : body
    };
    const response = await fetch('access/register', requestOptions);
    if(response.ok) {
        const createdUser = await response.json();
        console.log(`user registered : ${JSON.stringify(createdUser)}`);
        window.location.href = '/access/login';
    }
    else {
        const error = await response.json();
        console.log(`error : ${error.message}`);
        document.getElementById('problem').textContent = `error : ${error.message}`;
    }
}  

const adminRegister = () => register(true);