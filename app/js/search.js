var dataTableObj;
function getData(number){
    $.getJSON(dmsRestUrl + '/api/v1/document/search/' + number, {q:'0987654321'}, function (data, textStatus, jqXHR){
        var tbl = "<tbody>";
        var i = 1;
        for(let x in data){
            var d = data[x];
            var j = JSON.stringify(d);
            tbl = tbl + "<tr><td>"+i+"</td><td>"+d['objectNumber']+"</td><td>"+d['screen']+"</td><td>"+d['category']+"</td><td>"+d['subject']+"</td><td>"+d['docName']+"</td><td>"+d['createdDate']+"</td><td class='custom-link' onClick='openDoc("+j+")'>view</td></tr>";
            console.log(d);
            i++;
        }
        $("#data").html(tbl);
    });
}


// function openDoc(obj){
//     console.log(obj);
//     var doc = obj;
//     var path = "";
//     if(obj['docType'] == "pdf"){
//         path = "show_doc.html?instance=" + doc['instance'] + "&screen=" + doc['screen'] + "&number=" + doc['number'] + "&docName=" + doc['docName'];
//     }else{
//         path = "show_image.html?instance=" + doc['instance'] + "&screen=" + doc['screen'] + "&number=" + doc['number'] + "&docName=" + doc['docName'];
//     }
    
//     window.location.href=path;
// }



// $('#goback').click(function(){
//     var urlParams = new URLSearchParams(window.location.search);
//     window.location.href = "index.html?instance=" + urlParams.get('instance') + "&screen=" + urlParams.get('screen') + "&number=" + urlParams.get('number') ;
// });


$('#btnSearch').click(function(){
    var searchText = $('#searchBox').val();
    if(searchText == ""){ searchText = "ALL";}
    dataTableObj.destroy();
    dataTableObj = $('#dataTable').DataTable(
        {
            ajax: dmsRestUrl + '/api/v1/document/search/' + searchText ,
            "oLanguage": {

                "sSearch": "Filter :"
                
                },
        }
    );
});

$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    //getData(urlParams.get('text'));
    dataTableObj = $('#dataTable').DataTable(
        {
            ajax: dmsRestUrl + '/api/v1/document/search/ALL' ,
            "oLanguage": {

                "sSearch": "Filter :"
                
                },
        }
    );
});



function docView(instance,screen,number,docName){           
    //var path =  dmsUIBaseUrl + "/doc/" + instance + "/" + screen + "/" + number + "/" + docName;
    var path = dmsFileSrvUrl + "/doc/" + instance + "/" + screen + "/" + number + "/" + docName;
    window.open(path);
}


function docDownload(instance,screen,number,docName){           
    var path =  dmsUIBaseUrl + "/doc/" + instance + "/" + screen + "/" + number + "/" + docName;
    var save = document.createElement('a');
        save.href = path;
        save.target = '_blank';
        save.download = docName || 'unknown';

        var evt = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        save.dispatchEvent(evt);

        (window.URL || window.webkitURL).revokeObjectURL(save.href);
}