$(function () {

    var last_numero = 0;
    var size_codigo = 3;
    var delay_timer_local = 5000;

    function createTicket(vehiculo) {
        $.ajax({
            url : 'http://anubis.lmsoluciones.co/gema_lacarolina/index.php/cxt_request/createTicketTransfer?vehiculo=' + vehiculo,
            type : 'GET',
            dataType : 'jsonp',
            crossOrigin: true,
            crossDomain: true,
            success: function(res) {
                if(res.resultado == true){
                    alert(res.message);
                    printTiquete(res.numero);
                }else{
                    if(res.resultado == "valid"){
                        alert(res.message);
                    }else{
                        saveLocal(vehiculo);
                        printTiquete(parseInt(last_numero)+1);
                    }
                }
            },
            error: function(res) {  
                saveLocal(vehiculo);
                printTiquete(parseInt(last_numero)+1);
            }
        });
    }

    function createTicketLocal(vehiculo) {
        $.ajax({
            url : 'http://anubis.lmsoluciones.co/gema_lacarolina/index.php/cxt_request/createTicketTransfer?vehiculo=' + vehiculo,
            type : 'GET',
            dataType : 'jsonp',
            crossOrigin: true,
            crossDomain: true,
            success: function(res) {
                if(res.resultado == true){    
                    deleteVehiculoDataLocal(vehiculo);
                }
            }
        });
    }

    function getFechaHora(){
    	let today = new Date();
    	let day = (today.getDate() < 10) ? '0' + today.getDate() : today.getDate();
		let m = today.getMonth() + 1;
		let mes = (m < 10) ? '0' + m : m;
		let strDate = (day + '/' + mes + '/' + today.getFullYear());
		/* *********************** */
		let hours = today.getHours();
		let minutes = today.getMinutes();
		let ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12;
		minutes = minutes < 10 ? '0'+minutes : minutes;
		let strTime = hours + ':' + minutes + ' ' + ampm;
		return strDate+" "+strTime;
    }

    function printTiquete(num) {
        last_numero = num;
        var StringTiquete = '<!DOCTYPE html><html><head><meta charset="utf-8"/><style type="text/css"> *{font-size: 23px; font-family: "arial";}body,html{margin:0;-webkit-print-color-adjust: exact;}.centered{text-align: center; align-content: center;}.fontBold{font-weight: bold}.fontNoBold{font-weight: normal}.margin0{margin:0}</style></head><body><div><div class="centered"><img src="assets/img/logo.png" alt="LOGO" style="width:150px"></div><p class="centered margin0">Tiquete Transfer</p><div class="centered"><img src="https://chart.googleapis.com/chart?cht=qr&chl='+num+'&chs=220x220&choe=UTF-8&chld=L|2" alt="QR Code"><a href="https://es.qr-code-generator.com/a1/?ut_source=google_c&ut_medium=cpc&ut_campaign=spanish_top_kw&ut_content=qr_code_generator_exact&ut_term=generador%20de%20codigos%20qr_e&gclid=Cj0KCQiAhojzBRC3ARIsAGtNtHVR4ano96pNLLk4FQjQ0O9JCEqFI-rVivbV1YjDcmGSlzlLVQIS4McaApgaEALw_wcB" border="0" style="cursor:default" rel="nofollow"></a></div><p class="centered fontBold margin0" style="font-size:45px; margin-top: -20px">'+num+'</p><p class="centered" style="margin-top:10px; margin-bottom:0px; font-size:17px">'+getFechaHora()+'</p><p class="centered fontBold" style="margin-top:5px; margin-bottom:0px;"><span style="font-size:17px; background: black !important;border-radius: 15px;color: white !important;padding: 4px 15px;">VALIDO POR 1 HORA</span></p><p class="centered" style="margin-top:15px; font-size:17px">Gracias por usar nuestros servicios! <br>lacarolina.com.co</p></div><br><br></body></html>';
        /*newWin = window.open("");
	    newWin.document.write(StringTiquete);
	    newWin.document.close();
	    newWin.onload = function() {
            newWin.focus();
            newWin.print();
            newWin.close();
        };*/
        window.plugin.printer.print(StringTiquete);
    }

    function saveLocal(vehiculo){
        let data = localStorage.getItem("datalocal");
        data = (data == null || typeof data === "undefined" || data == ",")?"":data;
        data += (vehiculo + ",");
        localStorage.setItem("datalocal", data);
    }

    function sendDataLocal(){       
        let array = getArrayDataLocal();
        if(array.toString().length > 1){
            let timeAwait = delay_timer_local;
            $.each(array, function( index, value ) {
                if(value.length == size_codigo){
                    setTimeout(function(){
                        createTicketLocal(value);
                    }, timeAwait);
                    timeAwait = timeAwait + delay_timer_local;
                }
            });
        }
    }

    function getArrayDataLocal(){
        let data = localStorage.getItem("datalocal");
        data = data.substring(0, data.length - 1);
        let array = data.split(",");
        return array;
    }

    function deleteVehiculoDataLocal(vehiculo) {
        let array = getArrayDataLocal();
        $.each(array, function( index, value ) {
            if(value == vehiculo){
                array.splice(index, 1);
                return false;
            }
        });
        /* *********************** */
        let stringArray = array.toString();
        let newData = (stringArray.charAt(stringArray.length-1) == ",")?stringArray:(stringArray+",");
        localStorage.setItem("datalocal", newData);
    }

 	$("#btnPrint").click(function(){
        printTiquete($("#inpVehiculo").val());
 	});

    $("#btnLocal").click(function(){
        sendDataLocal();
    });
/*
    setTimeout(function(){
        sendDataLocal();
    }, 50000);
*/
});
