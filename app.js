let form = document.getElementById("form");
let input = document.getElementById("todoInput");
let msg = document.getElementById("errormsg");
let detail = document.getElementById("itemStore");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");

    formValidation();
});

let formValidation = () => {
    if (input.value.trim() === "") {
    msg.innerHTML = "No blank space, Enter item to do";
    console.log("failed");
    } else {
        console.log("success");
        msg.innerHTML = " ";
        acceptData();
    }
};
    
let data = []; 

let acceptData = () => {
    data.push({
        item : input.value,
         id: Math.floor(Math.random() * 15), 
        isComplete: false
    });

    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);

    addItems();
};

let addItems = () => {
    detail.innerHTML = "";
    data.map((x, y) =>{
        return (detail.innerHTML += `
            <li class="todo-item d-flex mx-auto isCompleted " id=${y}>
                <div data-id="${x.id}" class="check-mark my-auto" >
                    <img src="./assets/check.png" alt="check icon" >
                </div>
                <p class="todo-detail my-auto">
                    ${x.item}
                </p>
                <span class="add my-auto d-flex">
                    <i  onClick="editItem(this)" data-bs-target="#form" class="fa fa-pencil" aria-hidden="true"></i>
                    <i onClick="deleteItem(this); addItems()" class="fa fa-trash" aria-hidden="true"></i>
                </span>
            </li>
        `);
    });

    createEventListeners();

    resetForm();
};

let resetForm = () => {
    input.value= "";
};


let editItem = (e) => {
    let selectedItem = e.parentElement.parentElement;

    input.value = selectedItem.innerText;

    deleteItem(e);
}


let deleteItem = (e) => {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};

// let updateItem = (id) => {
//     for(let i=0; i < data.length; i++) {
//         if(data[i].id ===id){
//             data[i].isComplete = !data[i].isComplete;
//         };
//     };
//     // return data();
//     console.log(updateItem(id));
// };




function createEventListeners(){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach((checkMark)=> {
        checkMark.addEventListener("click", function(){
            isCompleted(checkMark.dataset.id);
        });
    });

};


function isCompleted(id){
    let updateItem = () => {
    for(let i=0; i < data.length; i++) {
        if(data[i].id ===id){
            data[i].isComplete = !data[i].isComplete;
        };
    };
    
    console.log(updateItem(id));
}; 
    
};


// function isCompleted(id){
//     // Find the task with the matching id
//     let task = data.find((addItems) => addItems.id === id);

//     // Update the task's isComplete property
//     task.isComplete = !task.isComplete;

//     // Find the element with the matching id
//     let updateItem = document.getElementById(id);

//     // Add or remove the 'complete' class based on the task's isComplete property
//     if (addItems.isComplete === true) {
//         updateItem.classList.add('complete');
//     } else {
//         updateItem.classList.remove('complete');
//     }
//     console.log(updateItem); 
// }



// To get data from localStorage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    addItems();
})();


