document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("plus").addEventListener("click", newBusiness);
    document.getElementById("cancel").addEventListener("click", cancel);
    
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

            console.log(api[i].businessValue);
        }
    }

    function newBusiness () {
        for(let i = 0; i < api.length; i++){
            let option = document.createElement("option");
            option.innerHTML = api[i].companyName;
            document.getElementById("options").appendChild(option);
            console.log(option);
        }

        document.querySelector(".addBusiness").classList.add("visible");
    }

    function cancel () {
        document.querySelector(".addBusiness").classList.remove("visible");
    }

    addBusiness();
});

