

let customerList = [];    //array to hold item entries locally
const $customer_Table = $('#tableappend');    //jquery to find table to append in html
let id = 1      //id start
const apiUrl = "https://62fd71deb9e38585cd51f570.mockapi.io/Grocery"   //api location


function emptyApiArray() {   //empties local array storage to keep in line with mockapis id structure
    if (customerList.length == 0) {
        id = 1;
        return id;
    }
}





const updateCustomerList = async () => {
    customerList = [];       //clears local storage of entries
    const response = await fetch("https://62fd71deb9e38585cd51f570.mockapi.io/Grocery")   //gets api info
    const data = await response.json();    //assigns data
    customerList = data;         //puts data in customerlist array
    console.log(customerList);  //testing log
    renderTable();    //rerenders DOM
    return customerList;
}



class Customer {       //customer class for each entry
    
    constructor(customerName, phoneNumber, customerDOB, Id) {
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.customerDOB = customerDOB;
        this.id = id;
    }
}

function createCustomer() {  //pushes created customer to local storage api
    const addedCustomer = new Customer($(`#customer_name`).val(), $(`#customer_phone`).val(), $(`#customer_birthdate`).val(), id);
    $.post(apiUrl, addedCustomer);   //pushes to api
    customerList.push(addedCustomer);  //pushes to local array storage
    id++                             //iterates ID
    };





function renderTable() {
    $customer_Table.empty();     //empties DOM
    for (let i = 0; i < customerList.length; i++) {   //iterates through local storage and appends to html table DOM
    $customer_Table.append(`
        $('<tr>')
        $('<td>${customerList[i].customerName}
        </td>
        ')
            <td>
            <button class="btn btn-danger" text="Delete" onClick="deleteCustomer(${customerList[i].id})">Delete</button>
            </td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-target="#edit-modal" onClick="updateCustomer(${customerList[i].id})" >
            Edit
            </button>
            </td>
        </tr>')`
    )
    }
    console.log(customerList);
}


function deleteCustomer(id) {    //finds entry by ID and clears from mock api
    const indexToDelete = customerList.findIndex(customer => customer.id===id)
    $.ajax({     //ajax to delete from api
        url: apiUrl + `/${id}` ,
        type: 'DELETE'
    });

    customerList.splice(indexToDelete, 1);   //clears from local array storage
    renderTable();    //renders info to DOM
    emptyApiArray();      //checks to make sure api ID and local ID are in line
}



function updateCustomer(id) {   
    const indexToUpdate = customerList.findIndex(customer => customer.id ===id)  
    customerList[indexToUpdate].customerName = $('#customer_name').val();
    $.ajax({  
        url: apiUrl + `/${id}`,
        type: 'PUT',
        data: {'customerName': $('#customer_name').val(),
                'phoneNumber': $('#customer_phone').val(),
                'customerDOB': $('#customer_birthdate').val()  }

    })
    renderTable();     
    console.log(customerList);   
}

updateCustomerList();


