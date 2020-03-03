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
                        printTiquete(last_numero+1);
                    }
                }
            },
            error: function(res) {  
                saveLocal(vehiculo);
                printTiquete(last_numero+1);
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

    function printTiquete(num) {
        last_numero = num;
        var StringTiquete = '<style type="text/css"> *{font-size: 20px; font-family: "arial";}body,html{margin:0}td,th,tr,table{border-top: 1px solid black; border-collapse: collapse;}td,th,.ticket{width: 240px; max-width: 240px;}.centered{text-align: center; align-content: center;}.title{font-weight: bold}.fontNoBold{font-weight: normal}.classNum{font-size:30px; font-weight: bold; margin:10px}@media print{.hidden-print, .hidden-print *{display: none !important;}}</style> <div class="ticket"><p class="centered title">LA CAROLINA<br><span class="fontNoBold">Transfer Villa Carolina</span></p><table><thead><tr><th>TIQUETE NUMERO</th></tr></thead><tbody><tr><td></td></tr></tbody></table> <p class="centered classNum">'+num+'</p><p class="centered">Gracias por usar nuestros servicios! <br>lacarolina.com.co</p></div><br><br><br></body></html>';
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
        if($("#inpVehiculo").val() == "" || $("#inpVehiculo").val().length != size_codigo){
            alert("Debe digitar un vehiculo valido");
            return false;
        }
        createTicket($("#inpVehiculo").val());
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
