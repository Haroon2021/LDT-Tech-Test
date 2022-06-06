fetch("./assets/data.json")
.then(response => {
   return response.json();
})
.then(jsondata => { 
    myArray = jsondata;
    buildTable(myArray);
});

// Function below filters the data based on the user input
// and updates the associated table
$('#search-input').on('keyup', function(){    
    var value = $(this).val();
    var filteredStartList = searchTable(value, myArray)    
    buildTable(filteredStartList)
    let totalRevenue = filteredStartList.reduce((acc,cur) => acc+cur.ticketPrice.value,0)
    document.getElementById("total Revenue").innerHTML = `Total Revenue is £${totalRevenue}`;
})

// The function below searches the table for the input given by the user
// It is filtered based on the Organiser Title name
function searchTable(value, filteredStartList){
    var filteredData = []
    for (var i = 0; i< filteredStartList.length; i++){
        value = value.toLowerCase();
        var name = filteredStartList[i].organiserTitle.toLowerCase();

        if(name.startsWith(value)) {    
            filteredData.push(filteredStartList[i])
        }
    }
    return filteredData
}

// This function builds a HTML table based on the filtered data
// which is output to the DOM
function buildTable(startList){

    var table = document.getElementById('myTable')
    table.innerHTML = ''

    for (var i = 0; i < startList.length; i++){
        var row = `<tr>
                        <td>${startList[i].firstName}</td>
                        <td>${startList[i].lastName}</td>
                        <td>${startList[i].organiserTitle}</td>
                        <td>${startList[i].ticketPrice.value}</td>
                        <td>${startList[i].status}</td>
                        <td>${startList[i].ticketTitle}</td>
                        <td>${startList[i].eventTitle}</td>  
                   </tr>`
        table.innerHTML += row
    }
}
