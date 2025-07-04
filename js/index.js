import * as api from "./api.js"
import {getData, updateData,deleteData} from "./api.js";




async function getUsers(){ // search data in an api file
        try{
            const response = await getData();
            return response.data;
        }catch(err){
            if(err.response){
                console.error(err.response); //the server response with an error code
            }else if(err.request){
                console.error(err.request); // request something but did not response
            }else{
                console.error(err); // something went wrong
            }
        }
}

async function addUser(name, email){
    try {
        const newData = {
            name: name,
            email: email
        };
        await api.addData(newData);
    }catch(err){

        console.error(err)
    }
}

async function deleteUser(id) {

    await api.deleteData(id)
    console.log("Successfully deleted user");
}
async function updateUser(id){
    await api.updateData(id);
}



/*DOM*/
const container = document.querySelector(".users");// the main container

/*
*   event submits.
*   validate inputs
*   create object with the input data
*   and pass the object in paragrams
* */

const form = document.getElementById("main-form");
form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const inputName = document.getElementById("name");
    const inputEmail = document.getElementById("email");
     
    if((!inputName.value || !inputEmail.value)){
        alert("fill all the inputs")
        return;
    }



    addUser(inputName.value, inputEmail.value)
        .then(res =>{
            alert(res +  " Updated successfully ")
    }).catch(err =>{
            alert("Updated failed " + err);
    })
    inputName.value = "";
    inputEmail.value = "";
    renderUsers();

})


/*capture click event in icons (delete and update)*/
container.addEventListener("click", (event) =>{
    if(event.target.classList.contains("delete")){ // if you click in the delete button then ->
        deleteUser(event.target.dataset.id).then(res =>{
           alert("Successfully deleted user");
        }).catch(err =>{
            alert("delete failed " + err);
        })
    }else if(event.target.classList.contains("update")){ // if you click in the update button then ->
    }

    renderUsers();
})





const renderUsers = () => {
    getUsers().then((data) => {
        container.innerHTML = "";
        data.forEach((user) => {
            const userContainer = document.createElement("div");
            userContainer.classList.add("container-user-box");
            userContainer.innerHTML += `
             <div class="user-info">
                 <span>${user.name}</span>
                <span>${user.email}</span>
                <div class="icons-container">
                    <i class="fa-regular fa-trash-can icon-btn delete" data-id="${user.id}"></i>
                    <i class="fa-regular fa-pen-to-square icon-btn update" data-id="${user.id}"></i>
                </div>
            </div>
            <div class="container-upload-form hide" data-id="${user.id}">
                    <form action="">
                        <input  class="form-input" type="text" name="upload-name" id="upload-name" data-id="${user.id}" placeholder="Change name"></input>   
                        <input  class="form-input" type="text" name="upload-email" id="upload-email" data-id="${user.id}" placeholder="Change Email"></input>
                         <button type="submit">Upload</button>
                     </form>    
            </div>
            `;
            container.appendChild(userContainer);
        })
    }).catch(err =>{
        container.innerHTML = `Error showing users : ${err}`;
    })
}

renderUsers();




