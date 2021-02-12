var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/11tQS39w9q9W1MERg3UhBjiJWv4SQz_Y361bJUtJV2Uk/pubhtml';

function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                    callback: showInfo,
                    wanted: ["Team Info", "Contribution Log"],
                    simpleSheet: true } )
}

function showInfo(data, tabletop) {
    console.log(data)
    var tr = document.createElement('tr');
    items = tabletop.sheets("Team Info").all();
    console.log(items)

    var myTableDiv = document.getElementById("TeamInfo");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    $("<th></th>").text("Name").appendTo(tableBody);
    $("<th></th>").text("Total Contribution Time").appendTo(tableBody);
    table.className = "vertical-table";
    table.style = "font-size:90%; margin-left:auto;margin-right:auto;"
    
    tabletop.sheets("Team Info").all().forEach(function(item, index, array) {
        addTable(tabletop, myTableDiv, table, tableBody, [item.Name, item["Total Contribution Time"]])
    })

    var myTableDiv = document.getElementById("ContributionTable");
    var table = document.createElement('TABLE');
    var tableBody = document.createElement('TBODY');
    table.className = "horizontal-table";
    table.style = "font-size:90%; margin-left:auto;margin-right:auto;"
    $("<th></th>").text("Date").appendTo(tableBody);
    $("<th></th>").text("Name").appendTo(tableBody);
    $("<th></th>").text("Contribution").appendTo(tableBody);
    $("<th colspan='2'></th>").text("Time Spent").appendTo(tableBody);
    tabletop.sheets("Contribution Log").all().forEach(function(item, index, array) {
        console.log(item)
        addTable(tabletop, myTableDiv, table, tableBody, [item.Timestamp, item.Name, item.Description, item["Approximate Time Spent"] +" "+ item["Specifications Website Draft"] ])
    })

}
 
function addTable(tabletop, myTableDiv, table, tableBody, items) {

    table.appendChild(tableBody);
      
    var tr = document.createElement('TR');
    tableBody.appendChild(tr);
    
    for(i=0; i<items.length; i++){
        var td = document.createElement('TD');
        td.style ="text-align:center"
        //td.width='500px'
        td.appendChild(document.createTextNode(items[i]));
        tr.appendChild(td);
    }
    
    myTableDiv.appendChild(table);
    
}
 

window.addEventListener('DOMContentLoaded', init)