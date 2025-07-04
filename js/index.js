import * as api from "./api.js";
import { getData, updateData, deleteData } from "./api.js";

async function getUsers() {
  // search data in an api file
  try {
    const response = await getData();
    return response.data;
  } catch (err) {
    if (err.response) {
      console.error(err.response); //the server response with an error code
    } else if (err.request) {
      console.error(err.request); // request something but did not response
    } else {
      console.error(err); // something went wrong
    }
  }
}

const addUser = async (name, email) => {
  try {
    const newData = {
      name: name,
      email: email,
    };
    return await api.addData(newData);
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (id) => {
  try {
    return await api.deleteData(id);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (id, name, email) => {
  try {
    const dataToUpdate = {
      name: name,
      email: email
    };
   /* 
    if name or email are undefined it will delete the property from the object
   */

    dataToUpdate.name === undefined && delete dataToUpdate.name;
    dataToUpdate.email === undefined && delete dataToUpdate.email;

    return await api.updateData(id, dataToUpdate);
    
  } catch (err) {
    throw new Error(err);
  }
};




/* DOM */
const container = document.querySelector(".users"); // the main container

const form = document.getElementById("main-form");
form.addEventListener("submit", (event) => {
  // for add new user
  event.preventDefault();
  const inputName = document.getElementById("name");
  const inputEmail = document.getElementById("email");

  if (!inputName.value || !inputEmail.value) {
    alert("fill all the inputs");
    return;
  }

  addUser(inputName.value, inputEmail.value)
    .then(() => {
      console.log("added successfully");
      inputName.value = "";
      inputEmail.value = "";
      renderUsers(); // reload page
    })
    .catch((err) => {
      alert("Updated failed " + err);
    });
});

/*capture click event in icons (delete and update)*/
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    // if you click in the delete button then ->
    deleteUser(event.target.dataset.id)
      .then(() => {
        renderUsers();
      })
      .catch((err) => {
        alert("delete failed " + err);
      });
  } else if (event.target.classList.contains("update")) {
    showFormToUpdate(event);
  }
});

const showFormToUpdate = (event) => {
  const userId = event.target.dataset.id;
  //only open the form that owns the user
  const updateContainer = document.querySelector(
    `.container-upload-form[data-id="${userId}"]`
  );
  updateContainer.classList.toggle("hide");

  /* 
        check the upload form
        if the form is visible then hide it
        if the form is hidden then show it
        this is done by toggling the class "hide"
        and the form is only visible for the user that owns it
    
    */
  updateContainer.addEventListener("submit", (e) => {
    e.preventDefault();
    const newInputName = document.querySelector(
      `.input-name[data-id="${userId}"]`
    );
    const newInputEmail = document.querySelector(
      `.input-email[data-id="${userId}"]`
    );

    let name = newInputName.value || undefined;
    let email = newInputEmail.value || undefined;

    if (!name && !email) {
      alert("At leats one input have to be filled");
      return;
    }

    updateUser(userId, name, email)
      .then(() => {
        renderUsers();
      })
      .catch((error) => alert("Update failed " + error));
  });

};

const renderUsers = () => {
  getUsers()
    .then((data) => {
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
                        <input  class="form-input input-name" type="text" name="upload-name" id="upload-name" data-id="${user.id}" placeholder="Change name"></input>   
                        <input  class="form-input input-email" type="text" name="upload-email" id="upload-email" data-id="${user.id}" placeholder="Change Email"></input>
                         <button type="submit">Upload</button>
                     </form>    
            </div>
            `;
        container.appendChild(userContainer);
      });
    })
    .catch((err) => {
      container.innerHTML = `Error showing users : ${err}`;
    });
};

renderUsers();
