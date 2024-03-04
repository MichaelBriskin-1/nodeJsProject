const sendUserData = () => {
    
    let userName = document.getElementById('name').value;
    let userEmail = document.getElementById('email').value;
    let userPassword = document.getElementById('password').value;

    
    fetch('/signup', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            userName,
            userEmail,
            userPassword
        })
    })
    .then(res => res.json())
    .then(data => {
    
    if(data == 'user added'){
        window.location.href = '/';
}
    else {
        alert(`${userEmail} is alreaedy in use`)
}})
.catch(err => console.log(err))
}

const getSignUp = () => {
    window.location.href = '/signup';

}



const login = () => {
    let userEmail = document.getElementById('myEmail').value
    let userPassword = document.getElementById('myPassword'),value

    fetch('/login', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            
            userEmail,
            userPassword
        })
})
.then(res => res.json())
.then(data => {
if (data == 'user not found') {
       alert('user not found') 
}
else{
    window.location.href = '/product';
}
})
.catch(err => console.log(err))
}

