$(function () {

    alert("Version 2.1");

    function printTiquete(num) {
        /*var StringTiquete = '<style type="text/css"> *{font-size: 20px; font-family: "arial";}body,html{margin:0}td,th,tr,table{border-top: 1px solid black; border-collapse: collapse;}td,th,.ticket{width: 240px; max-width: 240px;}.centered{text-align: center; align-content: center;}.title{font-weight: bold}.fontNoBold{font-weight: normal}.classNum{font-size:30px; font-weight: bold; margin:10px}@media print{.hidden-print, .hidden-print *{display: none !important;}}</style> <div class="ticket"><p class="centered title">LA CAROLINA<br><span class="fontNoBold">Transfer Villa Carolina</span></p><table><thead><tr><th>TIQUETE NUMERO</th></tr></thead><tbody><tr><td></td></tr></tbody></table> <p class="centered classNum">'+num+'</p><p class="centered">Gracias por usar nuestros servicios! <br>lacarolina.com.co</p></div><br><br><br></body></html>';
        newWin = window.open("");
        newWin.document.write(StringTiquete);
        newWin.print();
        newWin.close();
		cordova.plugins.printer.print(StringTiquete, 'Document.html', function () {
		    alert('printing finished or canceled')
		});*/

        var type = "text/html";
        var title = "test.html";
        var fileContent = "<html>Phonegap Print Plugin</html>";
        window.plugins.PrintPlugin.print(fileContent,function(){console.log('success')},function(){console.log('fail')},"",type,title);

    }

 	$("#btnPrint").click(function(){
        printTiquete($("#inpNumTiquete").val());
 	});

    document.addEventListener('deviceready', function () {
        cordova.plugins.printer.print('<h1>Hello World!</h1>');
    }, false);

});
