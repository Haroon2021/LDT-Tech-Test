
fetch("./assets/data.json")
.then(response => {
   return response.json();
})
.then(jsondata => { 
    myArray = jsondata;
    buildTable(myArray);
});

$('#search-input').on('keyup', function(){    
    var value = $(this).val();
    var data = searchTable(value, myArray)    
    buildTable(data)
    let totalRevenue = data.reduce((acc,cur) => acc+cur.ticketPrice.value,0)
    document.getElementById("total Revenue").innerHTML = `Total Revenue is £${totalRevenue}`;
})


function searchTable(value, data){
    var filteredData = []
    for (var i = 0; i< data.length; i++){
        value = value.toLowerCase();
        var name = data[i].organiserTitle.toLowerCase();

        if(name.startsWith(value)) {    
            filteredData.push(data[i])
        }
    }
    return filteredData
}


function buildTable(data){

    var table = document.getElementById('myTable')
    table.innerHTML = ''

    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${data[i].firstName}</td>
                        <td>${data[i].lastName}</td>
                        <td>${data[i].organiserTitle}</td>
                        <td>${data[i].ticketPrice.value}</td>
                        <td>${data[i].status}</td>
                        <td>${data[i].ticketTitle}</td>
                        <td>${data[i].eventTitle}</td>  
                   </tr>`
        table.innerHTML += row
    }
}
