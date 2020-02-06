document.addEventListener('DOMContentLoaded', function (event) {
  let customerApi = getJSON('http://5daef40cf2946f001481d046.mockapi.io/user');
  let ListOfCustomer = document.getElementById("customers")
  let row;
  let table;

  createTable(customerApi); //calls the function with the api as an parameter
  function createTable(data) {
    table = document.getElementById("customers");
    for (let i = 0; i < data.length; i++) {

      row = `<tr id=${i}>
                  <td>${data[i].id}</td></a>     
                  <td>${data[i].companyName}</td>      
                  <td>${data[i].contact}</td>      
                  <td>${data[i].email}</td>      
                  <td>${data[i].number}</td>    
            </tr>`
      table.innerHTML += row

    }
  }
  let clickCustomer = ListOfCustomer.querySelectorAll("tr");//makes a select all tr in tbody("customers")
  clickCustomer.forEach(tr => {
    tr.addEventListener('click', function (event) {
      tr.id++;//start by adding 1 to id value of tr that starts initially with 0
      document.location.href = '/CRM/pages/customerprofile.html?id=' + tr.id;//makes every row clickable with specific id
    });
  });
});
