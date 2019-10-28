
async function getCustomers(){
    try{
        const response = await fetch('https://5db73ad9e2c76f0014a53c6c.mockapi.io/testcompany/1')
        const json = await response.json();
        appendCustomerInfoToPage(json)
    }catch(e){
        const content = document.getElementById('content');
        const text = document.createTextNode('Error fetching data from API!');
        content.appendChild(text);
    };
}

function appendCustomerInfoToPage(company){
    const customerName = document.getElementById('customername');
    const customerNameText = document.createTextNode(company.CompanyName);
    customerName.appendChild(customerNameText)

    const note = document.getElementById('notes');
    const noteText = document.createTextNode(company.Note)
    note.appendChild(noteText)

    const phone = document.getElementById('phone');
    const phoneNumber = document.createTextNode(company.number)
    phone.appendChild(phoneNumber)

    const email = document.getElementById('mail');
    const emailAddr = document.createTextNode(company.email);
    email.appendChild(emailAddr)

    const business = document.getElementById('businessValue');
    const businessValue = document.createTextNode(company.businessValue);
    business.appendChild(businessValue);

    const lastContact = document.getElementById('lastContact');
    const lastContactValue = document.createTextNode(new Date(company.latestContact).toLocaleDateString());
    lastContact.appendChild(lastContactValue);

    const nextContact = document.getElementById('nextContact');
    const nextContactValue = document.createTextNode(new Date(company.FutureEvents).toLocaleDateString());
    nextContact.appendChild(nextContactValue);

    const ongoingEvent = document.getElementById('ongoingEvents');
    const ongoingEventText = document.createTextNode(company.ongoingEvent)
    ongoingEvent.appendChild(ongoingEventText)
}

async function addNoteToCustomer(id){
    const noteText = document.getElementById('notesubmit').value;
    const data = {
        Note: noteText
    };
    const submitNote = await fetch('http://5db73ad9e2c76f0014a53c6c.mockapi.io/testcompany/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
    
getCustomers();

document.getElementById("homeButton").addEventListener("click", function(){console.log("Hem in progress")});
document.getElementById("errandsButton").addEventListener("click", function(){console.log("Ärenden in progress...")});
document.getElementById("dealsButton").addEventListener("click", function(){console.log("Affärer in progress...")});
document.getElementById("customersButton").addEventListener("click", function(){console.log("Kontakter in progress..")});
document.getElementById("moreButton").addEventListener("click", function(){console.log("Mer in progress...")});