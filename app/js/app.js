function getData(number){
    $.getJSON(dmsRestUrl + '/api/v1/document/related/' + number, {q:'0987654321'}, function (data, textStatus, jqXHR){
        var tbl = "<table class='table'><tr class='head-row'><td>No</td><td>Category</td><td>Subject</td><td>Document Name</td><td>Created Date</td><td>Actions</td></tr>";
        var i = 1;
        for(let x in data){
            var d = data[x];
            var j = JSON.stringify(d);
            tbl = tbl + "<tr><td>"+i+"</td><td>"+d['category']+"</td><td>"+d['subject']+"</td><td>"+d['docName']+"</td><td>"+d['createdDate']+"</td><td class='custom-link' onClick='openDoc("+j+")'>view</td></tr>";
            console.log(d);
            i++;
        }
        tbl = tbl + "</table>"
        $("#data").html(tbl);
    });
}


function openDoc(obj){
    console.log(obj);
    var doc = obj;
    var path = "";
    // if(obj['docType'] == "pdf"){
    //     path = "show_doc.html?instance=" + doc['instance'] + "&screen=" + doc['screen'] + "&number=" + doc['number'] + "&docName=" + doc['docName'];
    // }else{
    //     path = "show_image.html?instance=" + doc['instance'] + "&screen=" + doc['screen'] + "&number=" + doc['number'] + "&docName=" + doc['docName'];
    // }
    path=dmsFileSrvUrl + "/doc/" + doc['instance'] + "/" + doc['screen'] + "/" + doc['number'] + "/" + doc['docName'];
    
    window.location.href=path;
}



$('#goback').click(function(){
    var urlParams = new URLSearchParams(window.location.search);
    window.location.href = "index.html?instance=" + urlParams.get('instance') + "&screen=" + urlParams.get('screen') + "&number=" + urlParams.get('number') ;
});



$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    getData(urlParams.get('number'));
});