
//JSON.parse(data).bal*0.001
var number = 1;
var inicio = number;
var reset  = number;
var timer  = 1000;
var tamanho_grafico = 200;

var html5  = 457;
var hcc    = 632;
var doge   = 11;
var htc    = 656;
var spc    = 285;
var usdc   = 1427;
var dice   = 1528;

var token  = $('#csrf_token').val();

var acertos = 0;
var erros = 0;

var ganho    = 0;
var anterior = 0;
var sequencia = 0;



var $tabela = [['QNT', 'Preço']];








/*
$.getScript( "https://www.gstatic.com/charts/loader.js", function( data, textStatus, jqxhr ) {
  console.log( data ); // Data returned
  console.log( textStatus ); // Success
  console.log( jqxhr.status ); // 200
  console.log( "Load was performed." );
});
*/

$('body').html(`<div id="console"></div>
	<script src="https://code.highcharts.com/highcharts.js"></script>
	<script src="https://code.highcharts.com/modules/series-label.js"></script>
	<script src="https://code.highcharts.com/modules/exporting.js"></script>
	<script src="https://code.highcharts.com/modules/export-data.js"></script>
	<script src="https://code.highcharts.com/modules/accessibility.js"></script>
	`);



function send(num,tipe){
	sequencia++;
	$.post( "https://yobit.net/ajax/system_dice.php", { locale:'en',type:tipe,csrf_token:token,bet: num, currency: dice, method: "dice_play" } ).done(function( data ) {

		var reset = (JSON.parse(data).bal-0)*0.0001;
	    
	    console.log(JSON.parse(data));
	    if(JSON.parse(data).win){	 

	    	number = inicio;
	    	acertos++;
	    	erros = 0;
	    	setTimeout(function(){ send(number,'1'); }, timer);
	    	inicio = reset;

	    	ganho = (JSON.parse(data).bal-anterior);

	    }else{
	    	number = number*1.350;
	    	inicio = number*1.150;
	    	erros++;
	    	acertos = 0;
	    	setTimeout(function(){ send(number,'1'); }, timer);
	    	;
	    }

	    anterior = JSON.parse(data).bal;

	    if(JSON.parse(data).bal){


	    	if(sequencia>=tamanho_grafico){
	    		$tabela.splice(1, 1);;
	    		//console.log($tabela);
	    	}
		    //	$('body').prepend('<div>>	'+sequencia+'	)	'+ganho.toFixed(4)+'	|	'+number.toFixed(4)+'	|	'+JSON.parse(data).win+'	|	'+JSON.parse(data).bal+'	|	sequencia = '+(acertos+erros)+'</div>');
		    
		    $tabela.push([(sequencia-0),JSON.parse(data).bal-0]);






				Highcharts.chart('container', {

				  title: {
				    text: 'Solar Employment Growth by Sector, 2010-2016'
				  },

				  subtitle: {
				    text: 'Source: thesolarfoundation.com'
				  },

				  yAxis: {
				    title: {
				      text: 'Number of Employees'
				    }
				  },

				  xAxis: {
				    accessibility: {
				      rangeDescription: 'Range: 2010 to 2017'
				    }
				  },

				  legend: {
				    layout: 'vertical',
				    align: 'right',
				    verticalAlign: 'middle'
				  },

				  plotOptions: {
				    series: {
				      label: {
				        connectorAllowed: false
				      },
				      pointStart: 2010
				    }
				  },

				  series: [{
				    name: 'Installation',
				    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175, 154175]
				  }],

				  responsive: {
				    rules: [{
				      condition: {
				        maxWidth: 500
				      },
				      chartOptions: {
				        legend: {
				          layout: 'horizontal',
				          align: 'center',
				          verticalAlign: 'bottom'
				        }
				      }
				    }]
				  }

				});











	    }

	    
	});;
}
setTimeout(function(){ 
/*
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable($tabela);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }

*/

}, 300);

$('body').append(`

<figure class="highcharts-figure">
  <div id="container"></div>
  <p class="highcharts-description">
    Basic line chart showing trends in a dataset. This chart includes the
    <code>series-label</code> module, which adds a label to each line for
    enhanced readability.
  </p>
</figure>



	`);
send(number,'0');

