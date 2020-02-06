async function getCustomers(){
    try{
        const response = await fetch('http://5daef40cf2946f001481d046.mockapi.io/user/'+ userId)//value of user id depends on customer
        const json = await response.json();
        appendCustomerInfoToPage(json)
    }catch(e){
        const content = document.getElementById('error');
        const text = document.createTextNode('Error fetching data from API!');
        content.appendChild(text);
    };
}
const urlParams = new URLSearchParams(window.location.search);//used for searching the url
const userId = urlParams.get('id');// searching after id and asigning it to userID

function appendCustomerInfoToPage(company){
    const customerName = document.getElementById('customername');
    const customerNameText = document.createTextNode(company.companyName);
    customerName.appendChild(customerNameText)

    const note = document.getElementById('notesValue');
    const noteText = document.createTextNode(company.note)
    note.appendChild(noteText)

    const phone = document.getElementById('phone');
    const phoneNumber = document.createTextNode(company.number)
    phone.appendChild(phoneNumber)

    const contact = document.getElementById('contact');
    const customerContact = document.createTextNode(company.contact)
    contact.appendChild(customerContact)

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
    const nextContactValue = document.createTextNode(new Date(company.futureEvents).toLocaleDateString());
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
    const submitNote = await fetch('http://5daef40cf2946f001481d046.mockapi.io/user' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

getCustomers();
