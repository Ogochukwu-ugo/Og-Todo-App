let form = document.getElementById("form");
let input = document.getElementById("todoInput");
let msg = document.getElementById("errormsg");
let detail = document.getElementById("itemStore");
// let check = document.getElementById("check-img");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button clicked");

    formValidation();
});

let formValidation = () => {
    if (input.value.trim() === "") {
    msg.innerHTML = "No blank space, Enter item to do";
    // console.log("failed");
    } else {
        // console.log("success");
        msg.innerHTML = " ";
        acceptData();
    }
};
    
let data = []; 

let acceptData = () => {
    data.push({
        item : input.value,
         id: new Date().getTime(), 
        isComplete: false
    });

    localStorage.setItem("data", JSON.stringify(data));
    // console.log(data);

    addItems();
};

let addItems = () => {
    detail.innerHTML = "";
    data.map((x, y) =>{
        return (detail.innerHTML += `
            <li class="todo-item d-flex mx-auto ${x.isComplete ? 'complete' : ' '} " id=${x.id}>
                <div data-id="${x.id}" class="check-mark my-auto" >
                    <img src="./assets/check.png" alt="check icon" id="check-img" style="display:${x.isComplete ? 'block' : 'none'}"   >
                </div>
                <p class="todo-detail my-auto ${x.isComplete ? 'complete'  : ' '}">
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

    // console.log(data);
};


function createEventListeners(){
    let todoCheckMarks = document.querySelectorAll(".todo-item .check-mark");
    todoCheckMarks.forEach((checkMark)=> {
        // console.log(checkMark.getAttribute("data-id"), "the check mark")
        checkMark.addEventListener("click", function(){
            updateItem(checkMark.getAttribute("data-id"));
            
        });
    });

};


let updateItem = (id) => {
    console.log(id, "this is  the id");
    for(let i=0;  i < data.length; i++) {
        // console.log(data[i])
        if(data[i].id == id){
            data[i].isComplete = !data[i].isComplete;
            let selectedItem = document.querySelector(`li[id="${data[i].id}"]`);
            // console.log(selectedItem, data[i], data[i].item)
            if(data[i].isComplete){
                selectedItem.classList.add("complete");
                selectedItem.querySelector("img").style.display = "block";
                selectedItem.querySelector("p").style.textDecoration = "line-through"; // Fixing the property to set text-decoration
            } else {
                selectedItem.classList.remove("complete");
                selectedItem.querySelector("img").style.display = "none";
                selectedItem.querySelector("p").style.textDecoration = "none"; // Fixing the property to set text-decoration
            }
        };
    };
        
    localStorage.setItem("data", JSON.stringify(data));
    // console.log(updateItem(data[y].id));
}; 



// To get data from localStorage
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    addItems();
})();


