class Errands {
    constructor(date = "", time = "", description = "") {
        this.date = date;
        this.time = time;
        this.description = description;
        this.checkboxes = document.getElementsByName("done");
        this.createErrand(this.date, this.time, this.description);
        this.completeErrand();
    }

    createErrand(date, time, description) {
        let errandBox = document.createElement("div");
        errandBox.classList = "errand";

        let errandDate = document.createElement("div");
        errandDate.classList = "date";
        errandDate.innerHTML = date;

        let errandTime = document.createElement("div");
        errandTime.classList = "time";
        errandTime.innerHTML = time;

        let errandDescription = document.createElement("div");
        errandDescription.classList = "description";
        errandDescription.innerHTML = description;

        let done = document.createElement("div");
        done.classList = "done";

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "done");

        let label = document.createElement("label");
        label.setAttribute("for", "done");
        label.innerHTML = "Klart";

        done.appendChild(checkbox);
        done.appendChild(label);

        errandBox.appendChild(done);
        errandBox.appendChild(errandDate);
        errandBox.appendChild(errandTime);
        errandBox.appendChild(errandDescription);

        document.getElementById("content").appendChild(errandBox);
    }

    completeErrand () {
        for (let checkbox of this.checkboxes) {
            checkbox.addEventListener("change", function(event){
                if (checkbox.checked === true) {
                    console.log("checkad");
                    event.currentTarget.parentNode.parentNode.remove();
                }
            });
        } 
    }
}

new Errands("16 oktober 2019", "KL 11:00", "Gör något");
new Errands("17 oktober 2019", "KL 12:00", "Gör något");
new Errands("18 oktober 2019", "KL 13:00", "Gör något");
new Errands("19 oktober 2019", "KL 14:00", "Gör något");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    document.getElementById("addButton").addEventListener("click", function () {
        let errand = new Errands("Datum", "Tid", "Beskrivning");
        console.log(errand);
    });

    document.getElementById("searchButton").addEventListener("click", function () {
        console.log("Sök in progress")
    });

    document.getElementById("homeButton").addEventListener("click", function () {
        console.log("Hem in progress")
    });
    document.getElementById("errandsButton").addEventListener("click", function () {
        console.log("Ärenden in progress...")
    });
    document.getElementById("dealsButton").addEventListener("click", function () {
        console.log("Affärer in progress...")
    });
    document.getElementById("customersButton").addEventListener("click", function () {
        console.log("Kontakter in progress..")
    });
    document.getElementById("moreButton").addEventListener("click", function () {
        console.log("Mer in progress...")
    });

});