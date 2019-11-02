document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("plus").addEventListener("click", newBusiness);
    document.getElementById("cancel").addEventListener("click", cancel);
    document.getElementById("add").addEventListener("click", add);
    document.getElementById("plusWeb").addEventListener("click", newBusiness);
    
    let api = getJSON('http://5daef40cf2946f001481d046.mockapi.io/user');

    console.log(api);

    function addBusiness () {
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

    function newBusiness () {
        for(let i = 0; i < api.length; i++){
            let option = document.createElement("option");
            option.innerHTML = api[i].companyName;
            document.getElementById("options").appendChild(option);
        }

        document.querySelector(".addBusinessContainer").classList.add("visible");
        document.getElementById("headerBar").classList.add("hide");
    }

    function add () {
       let company = document.getElementById("options").value;
       let sum = document.getElementById("sum").valueAsNumber;
       let addNewBusiness = {
           companyName: company,
           businessValue: sum,
       } 
       api.unshift(addNewBusiness);
       console.log(api);
       
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
       
       document.getElementById(JSON.stringify(api.length +1)).addEventListener("click", remove);

       document.querySelector(".addBusinessContainer").classList.remove("visible");
    }

    function remove () {
        document.getElementById(this.id).remove();
    }

    function cancel () {
        document.querySelector(".addBusinessContainer").classList.remove("visible");
    }

    addBusiness();
});

