/*Creates errands*/
class Errand {
    constructor(id, time, name, description) {
        this.id = id;
        this.time = time;
        this.name = name;
        this.description = description;
        this.createErrand(this.id, this.time, this.name, this.description);
    }

    /*Creates and appends errand elements*/
    createErrand(id, time, name, description) {
        $("<label>")
            .append("<input type='checkbox' class='checkbox'>")
            .append("<div>Klart</div>")
            .appendTo("#errand" + id);

        $("<div>", {
            html: time
        }).appendTo("#errand" + id);

        $("<div>", {
            html: name
        }).appendTo("#errand" + id);

        $("<div>", {
            html: description
        }).appendTo("#errand" + id);

        $(".checkbox").off().on("change", function (event) {
            event.currentTarget.disabled = true;
        });
    }
}

/*Instead of DOMContentLoaded*/
$(function () {
    /*Gets todays date*/
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let today = new Date().toLocaleDateString('sv', options);
    $("#todayDate").html(today);

    /*In progress, will open mail*/
    $("#mailButton").on("click", function () {
        console.log("mail in progress");
    });

    /*Creates errands with data from api*/
    $.ajax({
        url: "https://5db0cc7e8087400014d38308.mockapi.io/tasks/errand",
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (let i = 0; i < 3; i++) {
                new Errand(i + 1, data[i].time, data[i].name, data[i].description);
            }
        }
    });
});
