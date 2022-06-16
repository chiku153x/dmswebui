function getData(number){
    $.getJSON('http://localhost:8080/api/v1/document/related/' + number, {q:'yuilkjhgfdsfghjkuytresdcvbnjytrdfgbhjtyrfdvcbnjhtyrgfbvn'}, function (data, textStatus, jqXHR){
        var tbl = "<table class='table'><tr><th>No</th><th>Category</th><th>Subject</th><th>Document Name</th><th>Created Date</th><th>Actions</th></tr>";
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
    var path = "show.html?instance=" + doc['instance'] + "&screen=" + doc['screen'] + "&number=" + doc['number'] + "&docName=" + doc['docName'];
    window.location.href=path;
}


$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    getData(urlParams.get('number'));
});