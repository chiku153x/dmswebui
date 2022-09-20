var dataTableObj;
// function getData(number){
//     $.getJSON(dmsRestUrl + '/api/v1/document/search/' + number, {q:'0987654321'}, function (data, textStatus, jqXHR){
//         var tbl = "<tbody>";
//         var i = 1;
//         for(let x in data){
//             var d = data[x];
//             var j = JSON.stringify(d);
//             tbl = tbl + "<tr><td>"+i+"</td><td>"+d['objectNumber']+"</td><td>"+d['screen']+"</td><td>"+d['category']+"</td><td>"+d['subject']+"</td><td>"+d['docName']+"</td><td>"+d['createdDate']+"</td><td class='custom-link' onClick='openDoc("+j+")'>view</td></tr>";
//             console.log(d);
//             i++;
//         }
//         $("#data").html(tbl);
//     });
// }




$('#btnload').click(function(){
    var searchText = $('#screen').val() + "~" + $('#filename').val() + "~" + $('#filetype').val() + "~" + $('#objno').val() + "~" + $('#datefrom').val() + "~" + $('#dateto').val() + "~" + $('#category').val() + "~" + $('#subject').val() + "~" + $('#keywords').val() + "~END";
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
    $('#mandantName').text(dmsMandant);
    var urlParams = new URLSearchParams(window.location.search);
    $('#userName').text(urlParams.get('user'));
    dataTableObj = $('#dataTable').DataTable(
        {
            ajax: dmsRestUrl + '/api/v1/document/search/-1~~-1~~~~~~~~END' ,
            "oLanguage": {

                "sSearch": "Filter :"
                
                },
        }
    );

    $.getJSON(dmsRestUrl + '/api/v1/screen/get', {q:'0987654321'}, function (sdata, stextStatus, sjqXHR){
        
        $.getJSON(dmsRestUrl + '/api/v1/permission/get/' +urlParams.get('user'), {q:'0987654321'}, function (data, textStatus, jqXHR){
            var tbl = '<select id="screen" class="form-control" onChange="screenChange(this);"><option selected value="-1">Choose...</option>';
            var i = 1;
            for(let x in data){
                var d = data[x];
                tbl = tbl + '<option value="'+d['screen']+'">'+getScreenNameById(sdata,d['screen'])+'</option>';
                console.log(d);
                i++;
            }
            tbl = tbl + "</select>";
            $("#screen_pl").html(tbl);
        });
        
    });

    

});

function getScreenNameById(sdata, scrnNo){
    var scrnName = "N/A";
    sdata.forEach(function(a){
        if(a['screenNumber'] == scrnNo){
            scrnName =  a['screenName'];
        }
    });
    return scrnName;
}

function docView(dir,docName){           
    var path = dmsFileSrvUrl + "/" + dir + "/" + docName;
    window.open(path);
}


$('#btnclear').click(function(){
    $('#subject').val("");
    $('#objno').val("");
    $('#filename').val("");
    $('#keywords').val("");
    $("#screen").val("-1").change();
    $("#screen").val("-1").change();
    $("#category").val("-1").change();
    $("#filetype").val("-1").change();
    $('#datefrom').daterangepicker(
        {
            locale: {
              format: 'YYYY-MM-DD'
            },
            singleDatePicker: true,
            showDropdowns: true,
        }
     );
     $('#dateto').daterangepicker(
        {
            locale: {
              format: 'YYYY-MM-DD'
            },
            singleDatePicker: true,
            showDropdowns: true,
        }
     );
});


function screenChange(obj){
    $.getJSON(dmsRestUrl + '/api/v1/type/get/' , {q:'0987654321'}, function (tdata, ttextStatus, tjqXHR){
        var tbl = '<select id="category" class="form-control"><option selected value="-1">Choose...</option>';
        var i = 1;
        for(let x in tdata){
            var d = tdata[x];
            if(d['screenNo'] == obj.value){
                tbl = tbl + '<option value="'+d['itemNo']+'">'+d['itemText']+'</option>';
            }

            console.log(d);
            i++;
        }
        tbl = tbl + "</select>";
        $("#category_pl").html(tbl);
    });
  }