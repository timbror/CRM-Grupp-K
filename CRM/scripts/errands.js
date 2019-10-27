/*Class for sorting and printing errands*/
class ErrandManegement {
    constructor() {
        this.errandId = 0;
        this.activeErrands = [];
        this.archivedErrands = [];
        
    }

    /*Sorts errands by time and date*/
    sortAndPrint() {
        /*Resets the errand container*/
        document.getElementById("errandContainer").innerHTML = "";

        /*Sorts errand by time*/
        this.activeErrands.sort(function(a, b){
            return Number(a.getElementsByTagName("div")[2].innerHTML.replace(/[^0-9]/g,'')) - Number(b.getElementsByTagName("div")[2].innerHTML.replace(/[^0-9]/g,''));  
        });

        /*Sorts errand by date*/
        this.activeErrands.sort(function(a, b){
            return Number(a.getElementsByTagName("div")[1].innerHTML.replace(/[^0-9]/g,'')) - Number(b.getElementsByTagName("div")[1].innerHTML.replace(/[^0-9]/g,''));  
        });

        /*Apends errand to the errand container*/
        for(let errand of this.activeErrands) {
            document.getElementById("errandContainer").appendChild(errand);
        }
    }

    /*Prints out errands in the archive*/
    printArchive() {
        document.getElementById("errandArchive").innerHTML = "";

        for(let errand of this.archivedErrands) {
            document.getElementById("errandArchive").appendChild(errand);
        }
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
        currentSession.errandId++;
    }

    /*Creates the errand and adds it to activeErrands array*/
    createErrand(id, date, time, description) {
        let errandBox = document.createElement("div");
        errandBox.classList = "errand";
        errandBox.id = id;

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
        checkbox.addEventListener("change", this.completeErrand);

        let label = document.createElement("label");
        label.innerHTML = "Klart";

        label.appendChild(checkbox);
        done.appendChild(label);

        errandBox.appendChild(done);
        errandBox.appendChild(errandDate);
        errandBox.appendChild(errandTime);
        errandBox.appendChild(errandDescription);

        currentSession.activeErrands.push(errandBox);
        currentSession.sortAndPrint();
    }

    /*Lets the user edit existing errands*/
    errandEditor() {
        globalThis.clickedErrandId = null;

        /*Opens and adds the "text values" of the clicked errand to the edit popup*/
        for (let errand of document.getElementsByClassName("errand")) {
            errand.addEventListener("click", function (event) {

                /*This if statement prevents opening the edit popup when the "done" checkbox is checked*/
                if (event.currentTarget.firstChild.firstChild.lastChild.checked) {
                    return;
                }

                document.getElementById("edit-date").value = event.currentTarget.getElementsByTagName("div")[1].innerHTML;
                document.getElementById("edit-time").value = event.currentTarget.getElementsByTagName("div")[2].innerHTML;
                document.getElementById("edit-desc").value = event.currentTarget.getElementsByTagName("div")[3].innerHTML;
                globalThis.clickedErrandId = event.currentTarget.id;

                document.getElementById("popup-background").classList.remove("hidden");
                document.getElementById("editErrandPopup").classList.remove("hidden");
            });
        }

        /*Adds the edited inputs to the errand*/
        document.getElementById("edit-addButton").addEventListener("click", function (event) {
            event.preventDefault();

            for (let errand of document.getElementsByClassName("errand")) {
                if (errand.id == globalThis.clickedErrandId) {
                    errand.getElementsByTagName("div")[1].innerHTML = document.getElementById("edit-date").value;
                    errand.getElementsByTagName("div")[2].innerHTML = document.getElementById("edit-time").value;
                    errand.getElementsByTagName("div")[3].innerHTML = document.getElementById("edit-desc").value;
                }
            }

            document.getElementById("popup-background").classList.add("hidden");
            document.getElementById("editErrandPopup").classList.add("hidden");
            currentSession.sortAndPrint();
        });

        /*Closes the popup without making any changes*/
        document.getElementById("edit-closeButton").addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("popup-background").classList.add("hidden");
            document.getElementById("editErrandPopup").classList.add("hidden");
        });
    }

    /*Moves errand to the archive*/
    completeErrand(event) {
        event.currentTarget.disabled = true;
        currentSession.archivedErrands.unshift(event.currentTarget.parentNode.parentNode.parentNode);
        let idx = currentSession.activeErrands.indexOf(event.currentTarget.parentNode.parentNode.parentNode);
        currentSession.activeErrands.splice(idx, 1);
        event.currentTarget.parentNode.parentNode.parentNode.remove();
    }
}

document.addEventListener('DOMContentLoaded', (event) => {

    currentSession = new ErrandManegement();

    new Errands(currentSession.errandId, "2019-10-25", "12:30", "Gör något");
    new Errands(currentSession.errandId, "2019-10-25", "11:30", "Gör något");
    new Errands(currentSession.errandId, "2019-10-25", "13:30", "Gör något");
    new Errands(currentSession.errandId, "2019-10-26", "15:30", "Gör något");
    new Errands(currentSession.errandId, "2019-10-26", "14:30", "Gör något");

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
        new Errands(currentSession.errandId, document.getElementById("date").value, document.getElementById("time").value, document.getElementById("desc").value);
    });

    /*Closes all popup windows*/
    function closePopup(event) {
        event.preventDefault();
        document.getElementById("addErrandPopup").classList.add("hidden");
        document.getElementById("popup-background").classList.add("hidden");
        document.getElementById("editErrandPopup").classList.add("hidden");
    }

    /*Displays active errands*/
    document.getElementById("showErrands").addEventListener("click", function(event) {
        event.currentTarget.classList.add("selected");
        document.getElementById("showArchive").classList.remove("selected");
        document.getElementById("errandArchive").classList.add("hidden");
        document.getElementById("errandContainer").classList.remove("hidden");
    });

    /*Displays errands archive*/
    document.getElementById("showArchive").addEventListener("click", function(event) {
        event.currentTarget.classList.add("selected");
        document.getElementById("showErrands").classList.remove("selected");
        currentSession.printArchive();
        document.getElementById("errandContainer").classList.add("hidden");
        document.getElementById("errandArchive").classList.remove("hidden");
    });
});