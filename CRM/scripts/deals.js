document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("plus").addEventListener("click", newBusiness);
    document.getElementById("cancel").addEventListener("click", cancel);
    document.getElementById("add").addEventListener("click", add);
    document.getElementById("plusWeb").addEventListener("click", newBusiness);
    
    let api = getJSON('http://5daef40cf2946f001481d046.mockapi.io/user');

    //creates options for select from api
    for(let i = 0; i < api.length; i++){
        let option = document.createElement("option");
        option.innerHTML = api[i].companyName;
        document.getElementById("options").appendChild(option);
    }

    //creates div business from api
    function apiBusiness () {
        for(let i = 0; i < api.length; i++){
            let newBusiness = document.createElement("div");
            newBusiness.className = "business"
            let h3 = document.createElement("h3");
            h3.innerHTML = api[i].companyName;
            let h4 = document.createElement("h4");
            h4.innerHTML = api[i].businessValue + " USD";
            newBusiness.appendChild(h3);
            newBusiness.appendChild(h4);
            document.querySelector(".container").appendChild(newBusiness);

        }
    }

    //makes addBusinessContainer visible
    function newBusiness () {
        document.querySelector(".addBusinessContainer").classList.add("visible");
    }

    //gets value from select and input number and creates object addNewBusiness
    function add () {
       let company = document.getElementById("options").value;
       let sum = document.getElementById("sum").valueAsNumber;
       let addNewBusiness = {
           companyName: company,
           businessValue: sum,
       } 
       //adds it to the first index of array
       api.unshift(addNewBusiness);
       
       //creates new business div and prepends to container
       let newBusiness = document.createElement("div");
       newBusiness.className = "business"
       newBusiness.id = JSON.stringify(api.length +1);
       let h3 = document.createElement("h3");
       h3.innerHTML = api[0].companyName;
       let h4 = document.createElement("h4");
       h4.innerHTML = api[0].businessValue + " USD";
       let removeBtn = document.createElement("button");
       removeBtn.id = "remove";
       removeBtn.innerHTML = "Ta bort";
       newBusiness.appendChild(h3);
       newBusiness.appendChild(h4);
       newBusiness.appendChild(removeBtn);
       document.querySelector(".container").prepend(newBusiness);
       //adds an eventlistener to div which calls on remove
       document.getElementById(JSON.stringify(api.length +1)).addEventListener("click", remove);
       //hides addBusinessContainer when done
       document.querySelector(".addBusinessContainer").classList.remove("visible");
    }
    //removes added business div
    function remove () {
        document.getElementById(this.id).remove();
    }
    //cancels popup
    function cancel () {
        document.querySelector(".addBusinessContainer").classList.remove("visible");
    }

    apiBusiness();
});

