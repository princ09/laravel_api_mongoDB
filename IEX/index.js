$("#checkAll").click(function () {
    $('input:checkbox').not(this).prop('checked', this.checked);
});

$('#save_value').click(function(){
    var $pagination = $('#pagination'),
    totalRecords = 0,
    mainRecord = [],
    records = [],
    displayRecords = [],
    recPerPage = 10,
    page = 1,
    totalPages = 0;
    var val = [];
    $(':checkbox:checked').each(function(i){
      val[i] = $(this).val();
    });
    txt="";
    $.each(val,function(idx,value){
        txt+="<th>"+value+"</th>"
    })
    console.log(val)
    $('#thead_tr').append(txt);
    $.ajax({
		url: "http://127.0.0.1:8000/api/iex/"+$('#schedule_date').val()+"T00:00:00.000000Z",
        async: true,
        type: "POST",
        data : {data : val},
        dataType:"json",
		success: function (data) {
            mainRecord = data;
			records = data[0];
            totalRecords = Object.keys(records.data).length
            totalPages = Math.ceil(totalRecords / recPerPage);
			apply_pagination();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            console.log(jqXHR)
        }
	});
    function generate_table() {
		txt = "";
        for(var i=0;i<displayRecords.length;i++){
            txt+="<tr><td>"+i+1+"</td><td>"+records.date.slice(0,10)+"</td><td>"+displayRecords[i]+"</td>";
            for(var j = 0;j<mainRecord.length;j++){
                
                txt+="<td>"+mainRecord[j].data[displayRecords[j]].price+"</td>"
            }
            txt+="</tr>"
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

