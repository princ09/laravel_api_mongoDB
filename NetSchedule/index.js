/*/$(document).ready(function() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/schedules"
    }).then(function(data) {
        var len = data.length;
        var txt = "";
        if(len > 0){
            var first_row = true
            for(var i=0;i<len;i++){
                txt+= "<tr><td rowspan='96'>"+i+"</td><td rowspan='96'>"+data[i].date+"</td>"
                $.each(data[i].data , function(key , value){
                    if(first_row){
                        txt+="<td>"+key+"</td><td>"+value.price+"</td></tr>"
                        first_row=false
                    }else{
                        txt+="<tr><td>"+key+"</td><td>"+value.price+"</td></tr>"
                    }
                    
                })
                first_row=true
            }
            
            $("#schedule").append(txt);
            
        }
    });
});  
$("#schedule_date").on('blur', function(){
    $.ajax({
        url: "http://127.0.0.1:8000/api/schedules/"+$('#schedule_date').val()+"T00:00:00.000000Z"
    }).then(function(data) {
        records = data.data;
        console.log(records);
        totalRecords = records.length;
        totalPages = Math.ceil(totalRecords / recPerPage);

        var len = data.length;
        var txt = "";
        if(len > 0){
            var first_row = true
            for(var i=0;i<len;i++){
                txt+= "<tr><td rowspan='96'>"+i+"</td><td rowspan='96'>"+data[i].date+"</td>"
                $.each(data[i].data , function(key , value){
                    if(first_row){
                        txt+="<td>"+key+"</td><td>"+value.price+"</td></tr>"
                        first_row=false
                    }else{
                        txt+="<tr><td>"+key+"</td><td>"+value.price+"</td></tr>"
                    }
                    
                })
                first_row=true
            }
            
            $("#schedule").append(txt);
            
        }
    });
  });  
  
*/



$("#schedule_date").on('blur', function(){
	var $pagination = $('#pagination'),
		totalRecords = 0,
		records = [],
		displayRecords = [],
		recPerPage = 10,
		page = 1,
		totalPages = 0;
           
	$.ajax({
		url: "http://127.0.0.1:8000/api/schedules/"+$('#schedule_date').val()+"T00:00:00.000000Z",
		async: true,
		dataType: 'json',
		success: function (data) {
			records = data[0];
			console.log(records);
            totalRecords = Object.keys(records.data).length
            totalPages = Math.ceil(totalRecords / recPerPage);
			apply_pagination();
		}
	});
	function generate_table() {
		txt = "";
        for(var i=0;i<displayRecords.length;i++){
            txt+="<tr><td>"+records.date.slice(0,10)+"</td><td>"+records.seller_id+"</td><td>"+displayRecords[i]+"</td><td>"+records.data[displayRecords[i]].price+"</td></tr>"
        }
        $("#schedule").html(txt);
	}
	function apply_pagination() {
		$pagination.twbsPagination({
			totalPages: totalPages,
			visiblePages: 6,
			onPageClick: function (event, page) {
				displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
				endRec = (displayRecordsIndex) + recPerPage;
				console.log(displayRecordsIndex + 'ssssssssss'+ endRec);
				displayRecords = Object.keys(records.data).slice(displayRecordsIndex, endRec);
                console.log(displayRecords)
                generate_table();
			}
		});
	}
  });