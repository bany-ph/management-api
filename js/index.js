import * as api from "./api.js"



api.getData()
    .then(res => {
        console.log(res.data)
    })
    .catch(err => console.log(err));



const form = document.getElementById("form");

form.addEventListener("submit", (event) =>{
    console.log("si")
    event.preventDefault();
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
     
    if((!inputName.value || !inputEmail.value)){
        alert("fill all the inputs")
        return;
    }

    const newData = {
        name: inputName.value,
        email: inputEmail.value 
    }

    api.addData(newData)

    

 
})


  