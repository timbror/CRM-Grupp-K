class Errand {
    constructor(id, time, name, description) {
        this.id = id;
        this.time = time;
        this.name = name;
        this.description = description;
        this.createErrand(this.id, this.time, this.name, this.description);
    }

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

$(function () {
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let today = new Date().toLocaleDateString('sv', options);
    $("#todayDate").html(today);

    $("#mailButton").on("click", function () {
        console.log("mail in progress");
    });

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
