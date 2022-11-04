let description;
let price;

const setup = () => {
    const result = document.getElementById('result');
    document.getElementById('createbutton').addEventListener('click', objetCreation);
}

window.addEventListener('DOMContentLoaded', setup);

const objetCreation = async () => {
    const requestOptionsUser = {
        method : 'GET'
    };
    let user;
    const responseUser = await fetch('users/me', requestOptionsUser);
    console.log(responseUser);  
    if (responseUser.ok){
        user = await responseUser.json();
    } else {
        const errorUser = await responseUser.json();
        console.log(`error : ${errorUser.message}`);
    }

    const newObj = {
                    description: objetdescription.value,
                    price: objetprice.value,
                    userId: user.id
                    };
    console.log(newObj);
    clearValues();
    const bodyContent = JSON.stringify(newObj);
    const requestOptions = {
                                method : 'POST',
                                headers : { "Content-Type": "application/json" },
                                body : bodyContent
                            };

    const response = await fetch('objects/create', requestOptions);
    if(response.ok) {
        const objet = await response.json();
        result.textContent = `objet ${objet.description} created with id ${objet._id}`;
    } else {
        const error = await response.json();
        result.textContent = `error ${error.message}`;
    };
    clearValues();
} 

const clearValues = function() {
    objetdescription.value = "";
    objetprice.value = "";
} 