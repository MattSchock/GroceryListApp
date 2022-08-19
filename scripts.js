
let customerList = [];                  //array to hold List locally
const $customer_Table = $('#tableappend');    //jquery to target visual table of customers on html
let id = 1                                   //local ID to match mockapi id
const apiUrl = "https://62fd71deb9e38585cd51f570.mockapi.io/customers"        //mockapi url


function emptyApiArray() {                //if current array is empty resets ID. should keep api in sync
    if (customerList.length == 0) {
        id = 1;
        return id;
    }
}




const updateCustomerList = async () => {        //update function
    customerList = [];              //clears customer list
    const response = await fetch("https://62fd71deb9e38585cd51f570.mockapi.io/customers")   //grabs api
    let data = await response.json();      //dumps api data in variable
    data = Object.values(data);         //Honestly no idea, but it doesnt work without it.
    console.log('jsonparseworking?', data);   //testing log
    customerList = data;             //dumps data back into list
    console.log('data', data);      //testing log
    console.log('fetchcustomerlist', customerList);    //testing log
    renderTable();                  //calls function to render to DOM
    return customerList;
}



class Customer {             //customer object class
    constructor(customerName, phoneNumber, customerDOB, Id) {
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.customerDOB = customerDOB;
        this.id = id;
    }
}

function createCustomer() {                //creates a customer with values from html
    const addedCustomer = new Customer($(`#customer_name`).val(), $(`#customer_phone`).val(), $  (`#customer_birthdate`).val(), id);
    $.post(apiUrl, addedCustomer);   //pushes to api
    customerList.push(addedCustomer);   //pushes to local storage
    id++                                 //iterates ID
    }; 


console.log('customerlistlength', customerList.length)   //testing log


function renderTable() {             //render table 
    $customer_Table.empty();         //clears DOM
    for (let i = 0; i < customerList.length; i++) {    //iterates through customer list and appends to DOM with edit and update buttons
    $customer_Table.append(`                         
        $('<tr>')
        $('<td>${customerList[i].customerName}
        </td>
        <td>${customerList[i].phoneNumber}
        </td>
        <td>${customerList[i].customerDOB}
        </td>')
            <td>                                                             
            <button class="btn btn-danger" text="Delete" onClick="deleteCustomer(${customerList[i].id}">Delete</button>
            </td>
            <td>
            <button type="button" class="btn btn-primary" data-bs-target="#edit-modal" onClick="updateCustomer(${customerList[i].id})" >
            Edit
            </button>
            </td>
        </tr>')`
    )
    }
    console.log('rendercustomerlist', customerList);    //testing log
}


function deleteCustomer(id) {           //remove customer function
    const indexToDelete = customerList.findIndex(customer => customer.id===id)   //finds id
    $.ajax({                            //tells api to remove 
        url: apiUrl + `/${id}` ,
        type: 'DELETE'
    });
    customerList.splice(indexToDelete, 1);      //removes from local storage
    renderTable();                             //rerenders DOM
    emptyApiArray();                           //checks if local storage is empty to keep id in sync with api
}



function updateCustomer(id) {                   //update customer function
    const indexToUpdate = customerList.findIndex(customer => customer.id ===id)   //finds id
    customerList[indexToUpdate].customerName = $('#customer_name').val();          //updates values locally
    customerList[indexToUpdate].phoneNumber = $('#customer_phone').val();
    customerList[indexToUpdate].customerDOB = $('#customer_birthdate').val();
    $.ajax({                                                             //tells api of new values
        url: apiUrl + `/${id}`,
        type: 'PUT',
        data: {'customerName': $('#customer_name').val(),
                'phoneNumber': $('#customer_phone').val(),
                'customerDOB': $('#customer_birthdate').val()  }

    })
    renderTable();                                          //rerenders DOM
}

updateCustomerList();       //renders DOM on page load.
