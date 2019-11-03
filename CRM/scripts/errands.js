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
        let errandBox = $("<div>", {
            "class": "errand",
            "id": id
        });
 
        let checkbox = $("<input>", {
            "type": "checkbox",
            "name": "done"
        });
        checkbox[0].addEventListener("click", this.completeErrand);

        let text = $("<div>", {
            html: "Klart"
        });
        text[0].addEventListener("click", this.completeErrand);

        $("<label>", {
            "class": "done",
        })
        .append(checkbox[0])
        .append(text[0])
        .appendTo(errandBox[0]);

        $("<div>", {
            "class": "date",
            html: date
        }).appendTo(errandBox[0]);

        $("<div>", {
            "class": "time",
            html: time
        }).appendTo(errandBox[0]);

        $("<div>", {
            "class": "name",
            html: name
        }).appendTo(errandBox[0]);

        $("<div>", {
            "class": "description",
            html: description
        }).appendTo(errandBox[0]);

        currentSession.activeErrands.push(errandBox[0]);
        currentSession.sortAndPrint();
    }

    /*Lets the user edit existing errands*/
    errandEditor() {
        let clickedErrandId = null;

        /*Opens and adds the "text values" of the clicked errand to the edit popup*/
        for (let errand of $(".errand")) {
            errand.onclick = function (event) {

                if (event.currentTarget.parentNode.id == "errandArchive") {
                    return;
                }

                $("#edit-date").val(event.currentTarget.getElementsByTagName("div")[1].innerHTML);
                $("#edit-time").val(event.currentTarget.getElementsByTagName("div")[2].innerHTML);
                $("#nameChanger").val(event.currentTarget.getElementsByTagName("div")[3].innerHTML);
                $("#edit-desc").val(event.currentTarget.getElementsByTagName("div")[4].innerHTML);
                clickedErrandId = event.currentTarget.id;
                $("#popup-background").removeClass("hidden");
                $("#editErrandPopup").removeClass("hidden");
            };
        }

        /*Adds the edited inputs to the errand*/
        $("#edit-addButton").on("click", function (event) {
            event.preventDefault();

            for (let errand of $(".errand")) {
                if (errand.id == clickedErrandId) {
                    errand.getElementsByTagName("div")[1].innerHTML = $("#edit-date").val();
                    errand.getElementsByTagName("div")[2].innerHTML = $("#edit-time").val();
                    errand.getElementsByTagName("div")[3].innerHTML = $("#nameChanger").val();
                    errand.getElementsByTagName("div")[4].innerHTML = $("#edit-desc").val();
                }
            }

            $("#popup-background").addClass("hidden");
            $("#editErrandPopup").addClass("hidden");
            currentSession.sortAndPrint();
        });

        /*Closes the popup without making any changes*/
        $("#edit-closeButton").on("click", function (event) {
            event.preventDefault();
            $("#popup-background").addClass("hidden");
            $("#editErrandPopup").addClass("hidden");
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
$(function () {
    currentSession = new ErrandManegement();

    /*Creates fake errands with data from api*/
    $.ajax({
        url: "https://5db0cc7e8087400014d38308.mockapi.io/tasks/errand",
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                $("#namePicker").append("<option value='" + data[i].name + "'>" + data[i].name + "</option>");
                $("#nameChanger").append("<option value='" + data[i].name + "'>" + data[i].name + "</option>");
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

    $("#deskAddErrand").on("click", function () {
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
        new Errands(currentSession.errandId, $("#date").val(), $("#time").val(), $("#namePicker").val(), $("#desc").val());
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
        $("#deskErrands").addClass("selected");
        $("#showArchive").removeClass("selected");
        $("#deskArchive").removeClass("selected");
        $("#errandArchive").addClass("hidden");
        $("#errandContainer").removeClass("hidden");
        $("#openAddErrand").removeClass("hidden");
    });

    $("#deskErrands").on("click", function (event) {
        $(event.currentTarget).addClass("selected");
        $("#showErrands").addClass("selected");
        $("#showArchive").removeClass("selected");
        $("#deskArchive").removeClass("selected");
        $("#errandArchive").addClass("hidden");
        $("#errandContainer").removeClass("hidden");
        $("#openAddErrand").removeClass("hidden");
    });

    /*Displays errands archive*/
    $("#showArchive").on("click", function (event) {
        $(event.currentTarget).addClass("selected");
        $("#deskArchive").addClass("selected");
        $("#showErrands").removeClass("selected");
        $("#deskErrands").removeClass("selected");
        currentSession.printArchive();
        $("#errandContainer").addClass("hidden");
        $("#errandArchive").removeClass("hidden");
        $("#openAddErrand").addClass("hidden");
    });

    $("#deskArchive").on("click", function (event) {
        $(event.currentTarget).addClass("selected");
        $("#showArchive").addClass("selected");
        $("#showErrands").removeClass("selected");
        $("#deskErrands").removeClass("selected");
        currentSession.printArchive();
        $("#errandContainer").addClass("hidden");
        $("#errandArchive").removeClass("hidden");
        $("#openAddErrand").addClass("hidden");
    });
});
