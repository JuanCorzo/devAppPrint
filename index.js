$(function () {

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
                        console.log("REENVIAR"); 
                    }
                }
            },
            error: function(res) {  
                console.log("REENVIAR");
            }
        });
    }

    function printTiquete(num) {
        var StringTiquete = '<style type="text/css"> *{font-size: 20px; font-family: "arial";}body,html{margin:0}td,th,tr,table{border-top: 1px solid black; border-collapse: collapse;}td,th,.ticket{width: 240px; max-width: 240px;}.centered{text-align: center; align-content: center;}.title{font-weight: bold}.fontNoBold{font-weight: normal}.classNum{font-size:30px; font-weight: bold; margin:10px}@media print{.hidden-print, .hidden-print *{display: none !important;}}</style> <div class="ticket"><p class="centered title">LA CAROLINA<br><span class="fontNoBold">Transfer Villa Carolina</span></p><table><thead><tr><th>TIQUETE NUMERO</th></tr></thead><tbody><tr><td></td></tr></tbody></table> <p class="centered classNum">'+num+'</p><p class="centered">Gracias por usar nuestros servicios! <br>lacarolina.com.co</p></div><br><br><br></body></html>';
        window.plugin.printer.print(StringTiquete);
    }

 	$("#btnPrint").click(function(){
        if($("#inpVehiculo").val() == "" || $("#inpVehiculo").val().length != 3){
            alert("Debe digitar un vehiculo valido");
            return false;
        }
        //createTicket($("#inpVehiculo").val());

        localStorage.setItem("lastname", "Smith");

        alert(localStorage.getItem("lastname"));
 	});


});
