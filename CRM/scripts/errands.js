/*This class will sort errands etc. Work in progress*/
class ErrandManegement {
    constructor() {
        this.errandId = 0;
        this.activeErrands = [];
        this.archivedErrands = [];
    }
}

/*Class for creating and editing errand objects*/
class Errands {
    constructor(id, date = "", time = "", description = "") {
        this.IdNumber = id;
        this.date = date;
        this.time = time;
        this.description = description;
        this.createErrand(this.IdNumber, this.date, this.time, this.description);
        this.errandEditor();
        this.completeErrand(document.getElementsByName("done"));
    }

    /*Creates and appends all DOM elements associated with the errands*/
    createErrand(id, date, time, description) {
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

        let idContainer = document.createElement("div");
        idContainer.classList.add("hidden");
        idContainer.innerHTML = id;

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
        errandBox.appendChild(idContainer);

        document.getElementById("content").appendChild(errandBox);
    }

    /*Lets the user edit existing errands*/
    errandEditor() {
        globalThis.clickedErrandId = null;

        /*Opens and adds the "text values" of the clicked errand to the edit popup*/
        for (let errand of document.getElementsByClassName("errand")) {
            errand.addEventListener("click", function (event) {

                /*This if statement prevents opening the edit popup when the "done" checkbox is checked*/
                if (event.currentTarget.firstChild.firstChild.checked) {
                    return;
                }

                document.getElementById("edit-date").value = event.currentTarget.getElementsByTagName("div")[1].innerHTML;
                document.getElementById("edit-time").value = event.currentTarget.getElementsByTagName("div")[2].innerHTML;
                document.getElementById("edit-desc").value = event.currentTarget.getElementsByTagName("div")[3].innerHTML;
                globalThis.clickedErrandId = event.currentTarget.getElementsByTagName("div")[4].innerHTML;

                document.getElementById("popup-background").classList.remove("hidden");
                document.getElementById("editErrandPopup").classList.remove("hidden");
            });
        }

        /*Adds the edited inputs to the errand*/
        document.getElementById("edit-addButton").addEventListener("click", function (event) {
            event.preventDefault();

            for (let errand of document.getElementsByClassName("errand")) {

                if (errand.getElementsByTagName("div")[4].innerHTML == globalThis.clickedErrandId) {
                    errand.getElementsByTagName("div")[1].innerHTML = document.getElementById("edit-date").value;
                    errand.getElementsByTagName("div")[2].innerHTML = document.getElementById("edit-time").value;
                    errand.getElementsByTagName("div")[3].innerHTML = document.getElementById("edit-desc").value;
                }
            }

            document.getElementById("popup-background").classList.add("hidden");
            document.getElementById("editErrandPopup").classList.add("hidden");
        });

        /*Closes the popup without making any changes*/
        document.getElementById("edit-closeButton").addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("popup-background").classList.add("hidden");
            document.getElementById("editErrandPopup").classList.add("hidden");
        });
    }

    /*Removes errand when "klar" checkbox is checked.*/
    /*Will be moved to archive in the future (work in progress)*/
    completeErrand(checkboxes) {
        for (let checkbox of checkboxes) {
            checkbox.addEventListener("change", function (event) {
                if (checkbox.checked === true) {
                    event.currentTarget.parentNode.parentNode.remove();
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    let currentSession = new ErrandManegement();

    /*Opens the "add errand" popup window*/
    document.getElementById("openAddErrand").addEventListener("click", function () {
        document.getElementById("date").value = "";
        document.getElementById("time").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("popup-background").classList.remove("hidden");
        document.getElementById("addErrandPopup").classList.remove("hidden");
    });

    document.getElementById("popup-background").addEventListener("click", closePopup);
    document.getElementById("closeButton").addEventListener("click", closePopup);

    /*Creates new errand object*/
    document.getElementById("addButton").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("addErrandPopup").classList.add("hidden");
        document.getElementById("popup-background").classList.add("hidden");
        let errand = new Errands(currentSession.errandId, document.getElementById("date").value, document.getElementById("time").value, document.getElementById("desc").value);
        currentSession.errandId++;
        currentSession.activeErrands.push(errand);
    });

    /*Closes all popup windows*/
    function closePopup(event) {
        event.preventDefault();
        document.getElementById("addErrandPopup").classList.add("hidden");
        document.getElementById("popup-background").classList.add("hidden");
        document.getElementById("editErrandPopup").classList.add("hidden");
    }

    /*Bottom menu bar. Might not be necessary (links in html)*/
    document.getElementById("homeButton").addEventListener("click", function () {
        console.log("Hem in progress...");
    });
    document.getElementById("errandsButton").addEventListener("click", function () {
        console.log("Ärenden in progress...");
    });
    document.getElementById("dealsButton").addEventListener("click", function () {
        console.log("Affärer in progress...");
    });
    document.getElementById("customersButton").addEventListener("click", function () {
        console.log("Kontakter in progress..");
    });
    document.getElementById("moreButton").addEventListener("click", function () {
        console.log("Mer in progress...");
    });
});