document.addEventListener('DOMContentLoaded', (event) => {
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let today = new Date().toLocaleDateString('sv', options);
    document.getElementById("todayDate").innerHTML = today;

    document.getElementById("mailButton").addEventListener("click", function(){
        console.log("mail in progress");
    });
});