
var number = 0.00001;
var inicio = number;
var reset  = number;
var timer  = 1000;
var tamanho_grafico = 120;
var multiplicador = 2;
var hora_ini = relogio();
var seg_ini = mktime();
var seg_corrigo = mktime();

var html5  = 457;
var hcc    = 632;
var doge   = 11;
var htc    = 656;
var spc    = 285;
var usdc   = 1427;
var dice   = 1528;
var emb    = 780;
var atar   = 857;
var coin  = emb;

var token  = $('#csrf_token').val();

var acertos = 0;
var erros = 0;

var ganho    = 0;
var anterior = 0;
var sequencia = 0;

var saldo_inicial = 0;
var diferenca_saldo_inicial = 0;
var saldo_maximo = 0;
var saldo_minimo = 0;
var saldo_ganho = 0;
var saldo_anterior = 0;

var perca     = 0;
var perca_max = 0;

var ganho 	  = 0;
var ganho_max = 0;

var aposta_max = 0;

var acumulado = 0;

var contador = 0;

var $tabela = [['QNT', 'Preço']];



$.getScript( "https://www.gstatic.com/charts/loader.js", function( data, textStatus, jqxhr ) {
  console.log( data ); 
  console.log( textStatus ); 
  console.log( jqxhr.status ); 
  console.log( "Load was performed." );
});

$('body').html(`<div id="console"></div>
	<div id="curve_chart" style="width: 900px; height: 500px"></div>
	`);



function send(num,tipe){
	sequencia++;
	$.post( "https://yobit.net/ajax/system_dice.php", { locale:'en',type:tipe,csrf_token:token,bet: num, currency: coin, method: "dice_play" } ).done(function( data ) {

		var reset = (JSON.parse(data).bal-0)*0.0000005;

		contador++;

		seg_corrigo = ((mktime()-seg_ini)/60).toFixed(1);
		var media_ganho = (diferenca_saldo_inicial/seg_corrigo).toFixed(8);
		var Previsao_Hora = ((diferenca_saldo_inicial/seg_corrigo)*60).toFixed(8);
		var Previsao_Dia = (((diferenca_saldo_inicial/seg_corrigo)*60)*24).toFixed(8);
		var Previsao_mes = ((((diferenca_saldo_inicial/seg_corrigo)*60)*24)*12);


		//console.log(JSON.parse(data));

		console.log('===========================================');
		console.log('contador:'+contador);
		console.log('tempo...:'+seg_corrigo);

		console.log('hora_ini:'+hora_ini);
		console.log('hora....:'+relogio());
		console.log('===========================================');



		if(saldo_inicial==0){
			saldo_inicial=(JSON.parse(data).bal-0);
		}else{
			diferenca_saldo_inicial = ((JSON.parse(data).bal-0)-saldo_inicial)-0;
			if(diferenca_saldo_inicial >= saldo_maximo) saldo_maximo = diferenca_saldo_inicial;
			if(diferenca_saldo_inicial <= saldo_minimo) saldo_minimo = diferenca_saldo_inicial; 
			console.log('saldo_ganho:'+saldo_ganho);
			saldo_ganho = (JSON.parse(data).bal-0)-saldo_anterior;
			saldo_anterior = (JSON.parse(data).bal-0);
		}


	    console.log('media_ganho:'+media_ganho);
	    console.log('Previsao_Hora:'+Previsao_Hora);
	    console.log('Previsao_Dia:'+Previsao_Dia);
	    console.log('Previsao_mes:'+Previsao_mes);




	    if(JSON.parse(data).win==1){	

	    	ganho++;
			
			number = reset;

	    	setTimeout(function(){ send(number,'1'); }, timer);
	    	
	
	    	
	    	perca = 0;
	    	if(ganho>=ganho_max){
	    		ganho_max = ganho;
	    	}	    	
	    	

	    }
	    if(JSON.parse(data).win==0){
			
			perca++;

	    	number = (number*multiplicador);  	 

	    	
	    	ganho = 0;
	    	if(perca>=perca_max){
	    		perca_max = perca;
	    	}

	    	setTimeout(function(){ send(number,'1'); }, timer);


	    	
    	
	    	;
	    }

	    console.log('perca:'+perca);
	    console.log('perca_max:'+perca_max);
	    console.log('ganho:'+ganho);
	    console.log('ganho_max:'+ganho_max);


	 
	    console.log('Aposta:'+number);

	    if(number>=aposta_max){
	    	aposta_max = number;
	    }
	    console.log('aposta_max:'+aposta_max);

	    console.log('diferenca_saldo_inicial:'+diferenca_saldo_inicial);

	    console.log('Saldo:'+(JSON.parse(data).bal-0));


	    if(JSON.parse(data).bal){
	    	/*

	    	if(sequencia>=tamanho_grafico){
	    		$tabela.splice(1, 1);;
	    	}

		    $tabela.push(['['+sequencia+']',JSON.parse(data).bal-0]);


		      google.charts.load('current', {'packages':['corechart']});
		      google.charts.setOnLoadCallback(drawChart);

		      function drawChart() {
		        var data = google.visualization.arrayToDataTable($tabela);

		        var options = {
		          title: 'Performace do Robo, diferenca_saldo_inicial:'+diferenca_saldo_inicial,
		          curveType: 'function',
		          legend: { position: 'bottom' },
		          hAxis: {
		          	title: 'Year',  
		          	titleTextStyle: {color: '#333'},

		          },
		        };

		        var chart = new google.visualization.SteppedAreaChart(document.getElementById('curve_chart'));

		        chart.draw(data, options);
		      }

		     */


	    }

	    
	});;
}
setTimeout(function(){ 


}, 300);

$('body').append(`<div id="curve_chart" style="width: 900px; height: 500px"></div>`);
send(number,'0');


function relogio(){

  var novaHora = new Date();
    // getHours trará a hora
    // geMinutes trará os minutos
    // getSeconds trará os segundos
    var hora = novaHora.getHours();
    var minuto = novaHora.getMinutes();
    var segundo = novaHora.getSeconds();
    // Chamamos a função zero para que ela retorne a concatenação
    // com os minutos e segundos
    minuto = zero(minuto);
    segundo = zero(segundo);
    // Com o textContent, iremos inserir as horas, minutos e segundos
    // no nosso elemento HTML
    return hora+':'+minuto+':'+segundo;	
}

function zero(x) {
    if (x < 10) {
        x = '0' + x;
    } return x;
}

 function mktime(hour,minute,month,day,year){
   return (new Date()).getTime()/1000;
 }