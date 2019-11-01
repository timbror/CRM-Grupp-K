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
        $("#errandContainer").empty();

        /*Sorts errand by time*/
        this.activeErrands.sort(function (a, b) {
            return Number(a.getElementsByTagName("div")[2].innerHTML.replace(/[^0-9]/g, '')) - Number(b.getElementsByTagName("div")[2].innerHTML.replace(/[^0-9]/g, ''));
        });

        /*Sorts errand by date*/
        this.activeErrands.sort(function (a, b) {
            return Number(a.getElementsByTagName("div")[1].innerHTML.replace(/[^0-9]/g, '')) - Number(b.getElementsByTagName("div")[1].innerHTML.replace(/[^0-9]/g, ''));
        });

        /*Apends errand to the errand container*/
        for (let errand of this.activeErrands) {
            $("#errandContainer").append(errand);
        }
    }

    /*Prints out errands in the archive*/
    printArchive() {
        $("#errandArchive").empty();

        for (let errand of this.archivedErrands) {
            $("#errandArchive").append(errand);
        }
    }
}

/*Class for creating and editing errand objects*/
class Errands {
    constructor(id, date = "", time = "", name = "", description = "") {
        this.IdNumber = id;
        this.date = date;
        this.time = time;
        this.name = name;
        this.description = description;
        this.createErrand(this.IdNumber, this.date, this.time, this.name, this.description);
        this.errandEditor();
        currentSession.errandId++;
    }

    /*Creates the errand and adds it to activeErrands array*/
    createErrand(id, date, time, name, description) {
        let errandBox = document.createElement("div");
        errandBox.classList = "errand";
        errandBox.id = id;

        let errandDate = document.createElement("div");
        errandDate.classList = "date";
        errandDate.innerHTML = date;

        let errandTime = document.createElement("div");
        errandTime.classList = "time";
        errandTime.innerHTML = time;

        let errandName = document.createElement("div");
        errandName.innerHTML = name;

        let errandDescription = document.createElement("div");
        errandDescription.classList = "description";
        errandDescription.innerHTML = description;

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", "done");
        checkbox.addEventListener("click", this.completeErrand);

        let label = document.createElement("label");
        label.classList = "done";

        let text = document.createElement("div");
        text.addEventListener("click", this.completeErrand);
        text.innerHTML = "Klart";

        label.appendChild(checkbox);
        label.appendChild(text);
        errandBox.appendChild(label);
        errandBox.appendChild(errandDate);
        errandBox.appendChild(errandTime);
        errandBox.appendChild(errandName);
        errandBox.appendChild(errandDescription);

        currentSession.activeErrands.push(errandBox);
        currentSession.sortAndPrint();
    }

    /*Lets the user edit existing errands*/
    errandEditor() {
        globalThis.clickedErrandId = null;

        /*Opens and adds the "text values" of the clicked errand to the edit popup*/
        for (let errand of document.getElementsByClassName("errand")) {
            errand.onclick = function (event) {

                if (event.currentTarget.parentNode.id == "errandArchive") {
                    return;
                }

                document.getElementById("edit-date").value = event.currentTarget.getElementsByTagName("div")[1].innerHTML;
                document.getElementById("edit-time").value = event.currentTarget.getElementsByTagName("div")[2].innerHTML;
                document.getElementById("edit-desc").value = event.currentTarget.getElementsByTagName("div")[3].innerHTML;
                globalThis.clickedErrandId = event.currentTarget.id;

                document.getElementById("popup-background").classList.remove("hidden");
                document.getElementById("editErrandPopup").classList.remove("hidden");
            };
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
        event.stopPropagation();
        event.currentTarget.parentNode.classList.add("hidden");
        currentSession.archivedErrands.unshift(event.currentTarget.parentNode.parentNode);
        let idx = currentSession.activeErrands.indexOf(event.currentTarget.parentNode.parentNode);
        currentSession.activeErrands.splice(idx, 1);
        event.currentTarget.parentNode.parentNode.remove();

    }
}

/*Instead of DOMContentLoaded*/
$(function() {
    console.log("ready");

    currentSession = new ErrandManegement();

    $.ajax({
        url: "https://5db0cc7e8087400014d38308.mockapi.io/tasks/errand",
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                $("#namePicker").append("<option value='" + data[i].name + "'>" + data[i].name + "</option>");
                new Errands(currentSession.errandId, data[i].date, data[i].time, data[i].name, data[i].description);
            }
        }
    });

    /*Opens the "add errand" popup window*/
    $("#openAddErrand").on("click", function () {
        $("#date").val("");
        $("#time").val("");
        $("#desc").val("");
        $("#popup-background").removeClass("hidden");
        $("#addErrandPopup").removeClass("hidden");
    });

    $("#popup-background").on("click", closePopup);
    $("#closeButton").on("click", closePopup);

    /*Creates new errand object*/
    $("#addButton").on("click", function (event) {
        event.preventDefault();
        //console.log($("#namePicker :selected").val());
        $("#addErrandPopup").addClass("hidden");
        $("#popup-background").addClass("hidden");
        //console.log($("#date").val());
        new Errands(currentSession.errandId, $("#date").val(), $("#time").val(), $("#desc").val());
    });

    /*Closes all popup windows*/
    function closePopup(event) {
        event.preventDefault();
        $("#addErrandPopup").addClass("hidden");
        $("#popup-background").addClass("hidden");
        $("#editErrandPopup").addClass("hidden");
    }

    /*Displays active errands*/
    $("#showErrands").on("click", function (event) {
        $(event.currentTarget).addClass("selected");
        $("#showArchive").removeClass("selected");
        $("#errandArchive").addClass("hidden");
        $("#errandContainer").removeClass("hidden");
        $("#openAddErrand").removeClass("hidden");
    });

    /*Displays errands archive*/
    $("#showArchive").on("click", function (event) {
        $(event.currentTarget).addClass("selected");
        $("#showErrands").removeClass("selected");
        currentSession.printArchive();
        $("#errandContainer").addClass("hidden");
        $("#errandArchive").removeClass("hidden");
        $("#openAddErrand").addClass("hidden");
    });
});