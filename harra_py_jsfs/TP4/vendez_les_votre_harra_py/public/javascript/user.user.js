let userlogin;
let userpassword;
let username;

const setupListener = () => {
    username = document.getElementById('username');
    getUser();
    document.getElementById('update').addEventListener('click', update);
    document.getElementById('logout').addEventListener('click', logout);
    document.getElementById('createObjet').addEventListener('click', createObjet);
} 

window.addEventListener('DOMContentLoader', setupListener);

const getUser = async () => {
    const requestOptions = {
                                method :'GET',
                            };
    const response = await fetch('user/me', requestOptions);
    console.log(response);
    console.log("oui2");
    if(response.ok) {
        const user = await response.json();
        console.log(user);
        username.value = user.name || '';
    }
    else {
        const error = await response.json();
        handleError(error);
    }
}

const update = async () => {
    const userData = { name : username.value };
    const body = JSON.stringify(userData);
    const requestOptions = {
                            method :'PUT',
                            headers : { "Content-Type": "application/json"},
                            body : body
                            };
    const response = await fetch('user/me', requestOptions);
    if(response.ok) {
        const updatedUser = await response.json();
        console.log(`user updated : ${JSON.stringify(updatedUser)}`);
    }
    else {
        const error = await response.json();
        handleError(error);
    }
}

const logout = async () => {
    const requestOptions = {
        method : 'GET',
    };
    const response = await fetch('access/logout', requestOptions);
    if(response.ok) {
        window.location.href = '/';
    }
} 

const handleError = error => {
    if (error.redirectTo){
        window.location.href = error.redirectTo; 
    } else {
        console.log(`error : ${error.message}`);
    }
}
