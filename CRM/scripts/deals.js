document.addEventListener("DOMContentLoaded", function(e){
    
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

    addBusiness();
});

