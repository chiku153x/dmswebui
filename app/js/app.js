function getData(number,user,screen,instance){
    $.ajax(dmsRestUrl + '/api/v1/document/related/' + number , {
        data: JSON.stringify({'user':user,'screen':screen,'instance':instance}),
        contentType: 'application/json',
        type: 'POST',
        success: function (data){
            var tbl = "<table class='table'><tr class='head-row'><td id='forceRefresh'>No</td><td>Category</td><td>Subject</td><td>Document Name</td><td>Created Date</td><td>Keywords</td><td>Actions</td></tr>";
            var i = 1;
            for(let x in data){
                var d = data[x];
                var j = JSON.stringify(d);
                tbl = tbl + "<tr><td>"+i+"</td><td>"+d['category']+"</td><td>"+d['subject']+"</td><td>"+d['docName']+"</td><td>"+d['createdDate']+"</td><td>"+d['keywords']+"</td><td class='custom-link' onClick='openDoc("+j+")'>view</td></tr>";
                i++;
            }
            tbl = tbl + "</table>"
            $("#data").html(tbl);
        }
    }  );
}

function openDoc(obj){
    console.log(obj);
    var doc = obj;
    var path = "";
    path=dmsFileSrvUrl + "/" + doc['dir'] + "/" + doc['docName'];  
    window.location.href=path;
}



$('#goback').click(function(){
    var urlParams = new URLSearchParams(window.location.search);
    window.location.href = "index.html?instance=" + urlParams.get('instance') + "&screen=" + urlParams.get('screen') + "&number=" + urlParams.get('number') ;
});



$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    getData(urlParams.get('number'),urlParams.get('user'),urlParams.get('screen'),urlParams.get('instance'));
});


$('#forceRefresh').click(function(){
    location.reload(true);
});