document.addEventListener("DOMContentLoaded", function(e){
    let myChart = document.getElementById('myChart').getContext('2d');
    
    document.getElementById("M").addEventListener("click", getMonthChart);
    document.getElementById("D").addEventListener("click", getDayChart);
    document.getElementById("W").addEventListener("click", getWeekChart);
    document.getElementById("Y").addEventListener("click", getYearChart);
    document.getElementById("D").classList.add("active");
    
    let api = getJSON('http://5daef40cf2946f001481d046.mockapi.io/event');
    
    gradient = myChart.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(250,174,50,0.5)');   
    gradient.addColorStop(1, 'rgba(255,182,193,0.5)');

    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontColor = "#707070";

 
    let extraApi = api;
    let doubleApi = api.concat(extraApi);
    api = doubleApi;
    let tripleApi = api.concat(extraApi);
    api = tripleApi;

    function createEvents () {

        for(let i = 0; i < api.length; i++){
            let event = api[i].date;
            let myDate = new Date(event);
            let newDate = {
                //myDate.getDate()
                date: Math.floor((Math.random() * 31) + 1),
                //myDate.getMonth()
                month: Math.floor((Math.random() * 12) + 1),
                year: myDate.getFullYear(),
            };
            let testDate = `${newDate.year}-${newDate.month}-${newDate.date}`
            let myTestDate = new Date(testDate);

            newDate.day = myTestDate.getDay()+1;
            newDate.week = getWeekNumber(myTestDate);

            assignMonth(newDate.month);
            assignWeek(newDate.week, newDate);
            assignDay(newDate.day);
        }
    }


    let monthArray = [[],[],[],[],[],[],[],[],[],[],[],[],];
    let weekArray = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],];
    let dayArray = [[],[],[],[],[],[],[],]


    function assignMonth (month) {
        for(let i = 1; i <= 12; i++){
            if(month === i){
                monthArray[i-1].push(month);
            }
        }
    }

    function assignWeek (week, newDate) {
        for(let i = 1; i <= 52; i++){
            if(week === i){
                weekArray[i-1].push(newDate);
            }
        }
    }

    function assignDay (day) {
        for(let i = 1; i <= 7; i++){
            if(day === i){
                dayArray[i-1].push(day);
            }
        }
    }


    createEvents();


    function getWeekNumber(d) {
        // Copy date so don't modify original
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return weekNo;
    }

    function addActive (btn) {
        let list = document.getElementsByClassName("active");
        for (let element of list) {
          element.classList.remove("active");
        }
        document.getElementById(btn).classList.add("active")

        if(document.getElementById("D").classList[0] == "active"){
            document.getElementById("week").innerHTML = `week ${j}`;
        }else{
            document.getElementById("week").innerHTML = " ";
        };
    }

    
    function getMonthChart () {

        let jan = monthArray[0].length;
        let feb = monthArray[1].length;
        let mar = monthArray[2].length;
        let apr = monthArray[3].length;
        let may = monthArray[4].length;
        let june = monthArray[5].length;
        let july = monthArray[6].length;
        let aug = monthArray[7].length;
        let sep = monthArray[8].length;
        let oct = monthArray[9].length;
        let nov = monthArray[10].length;
        let dec = monthArray[11].length;

        addActive("M");

        let monthChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels:['J', 'F', 'M', 'A', 'M','J', 'J', 'A', 'S', 'O','N', 'D'],
                datasets:[{
                    label: 'Errands',
                    data: [
                        jan,
                        feb,
                        mar,
                        apr,
                        may,
                        june,
                        july,
                        aug,
                        sep,
                        oct,
                        nov,
                        dec,
                        0
                    ],
                    backgroundColor: "#7ADE68",
                    borderWidth: 1,
                    
                }]
            },
            options:{
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                events: []
            }
        });
        document.getElementById("sum").innerHTML = api.length;
    }


    let j = new Date;
    j = getWeekNumber(j);

    function getDayChart () {

        let mon = [];
        let tue = [];
        let wed = [];
        let thu = [];
        let fri = [];
        let sat = [];
        let sun = [];

        addActive("D");        

            for(let i = 0; i < weekArray[j].length; i++){
                if(weekArray[j][i].day === 1){
                    mon.push(weekArray[j][i].day);
                }
                else if(weekArray[j][i].day === 2){
                    tue.push(weekArray[j][i].day);
                }
                else if(weekArray[j][i].day === 3){
                    wed.push(weekArray[j][i].day);
                }
                else if(weekArray[j][i].day === 4){
                    thu.push(weekArray[j][i].day);
                }
                else if(weekArray[j][i].day === 5){
                    fri.push(weekArray[j][i].day);
                }
                else if(weekArray[j][i].day === 6){
                    sat.push(weekArray[j][i].day);
                }
                else if(weekArray[j][i].day === 7){
                    sun.push(weekArray[j][i].day);
                }

        }

        let dayChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels:['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                datasets:[{
                    label: 'Errands',
                    data: [
                        mon.length,
                        tue.length,
                        wed.length,
                        thu.length,
                        fri.length,
                        sat.length,
                        sun.length,
                        0,
                        5
                    ],
                    backgroundColor: "#7ADE68",
                }]
            },
            options:{
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                events: [],
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 5,
                            min: 0,
                            stepSize: 1
                        }
                    }]
                }
            }
        });
        document.getElementById("sum").innerHTML = (mon.length + tue.length + wed.length + thu.length + fri.length + sat.length + sun.length);
    }

    getDayChart();


    function getWeekChart () {

       addActive("W");

        let weekChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels:[j-4, j- 3, j-2, j-1, j],
                datasets:[{
                    label: 'Errands',
                    data: [
                        weekArray[j-5].length,
                        weekArray[j-4].length,
                        weekArray[j-3].length,
                        weekArray[j-2].length,
                        weekArray[j-1].length,
                    ],
                    backgroundColor: "#7ADE68",
                }]
            },
            options:{
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                events: [],
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            }
        });

        document.getElementById("sum").innerHTML = (weekArray[j-1].length + weekArray[j-2].length + weekArray[j-3].length + weekArray[j-4].length + weekArray[j-5].length);
    }

    function getYearChart () {

        addActive("Y");

        let yearChart = new Chart(myChart, {
            type: 'bar',
            data: {
                labels:[2019, 2020],
                datasets:[{
                    label: 'Errands',
                    data: [
                        api.length,
                        0,
                    ],
                    backgroundColor: "#7ADE68",
                }]
            },
            options:{
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                events: [],
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            }
        });

        document.getElementById("sum").innerHTML = api.length;
    }
    

});






//Tankar: Skapa CSS/SCSS-variabler som jag importerar via js och sedan modifierar