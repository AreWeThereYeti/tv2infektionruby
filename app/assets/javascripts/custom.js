//var all_data;
var start_time;	// first recorded time 
var end_time;		// last recorded time
var diff;				// diff in days

var map;
var day_interval=1;				//frame jump in days
var time_interval=200;  //frame time in ms
var prev_scroll_val=0;
var plot_step;
var time_row;

var day=86400000;		//day i milliseconds

var play=false;
var marker_margin;
var current_day=0;

$(document).ready(function() {
	//obs!!! remember to update paper height, width on window resize!! (no need)
	window.paper = Raphael(0,0,$(window).width(),$(window).height());
  window.paper.canvas.id='svg-overlay';
	
	all_data=parseDBData(all_data);
	
	start_time=getStartDate();
	end_time=getEndDate();
	diff=Math.ceil(((end_time-start_time))/1000/60/60/24);
	
	plot_step=$('#plot').width()/diff;
	
	createMap();
	addEventListeners();


	/*getDB(function(data){

	});*/
});

function addEventListeners(){
	// setup slider functionality
	$("#slider").slider({
		min: 0,
		max: diff,
	  slide: function( event, ui ) {
			var val=ui.value;
			//console.log(val);
			$('#svg-overlay').show();
			if(play){
				play_pause();
			}
			var time=(val*day)+start_time;		//date time in milliseconds
			current_day=val;
			$('#line-container').css('margin-left',plot_step*val);
			
			var date=new Date(time);
			setDateTxt(date)
			
			//add to map
			queryAndAdd(time);
		}
	});
	
	$('#svg-overlay').mousedown(function(){
		$(this).hide();
	});
	$('#svg-overlay').mouseup(function(){
		$(this).show();
	});
	
	$('#play_pause_btn').click(function(){
		play_pause();
		return false;
	});
	
}

function play_pause(){
	if(play){
		$('#play_pause_btn').attr('src','img/play.png');
    $('#play_pause_btn').removeClass();
		$('#play_pause_btn').addClass("play");
		togglePlay($('#player').children('#pause'));
		clearInterval(window.anim);
		play=false;
	}else{
		t=current_day;
		window.anim=setInterval(function(){
			$('#play_pause_btn').attr('src','img/pause.png');
	    $('#play_pause_btn').removeClass();
			$('#play_pause_btn').addClass("pause");
			$('#svg-overlay').show();
			togglePlay($('#player').children('#play'));
			if(t<all_data.length-1){
				var time_mili=(t*day)+(start_time);
				current_day=t;
				setDateTxt(new Date(time_mili));
				current_time=time_mili;
				queryAndAdd(time_mili);
				t+=1;
				var new_margin=parseFloat($('#line-container').css('margin-left'))+plot_step;
				$('#line-container').css('margin-left',new_margin);
			}
			else{
				clearInterval(window.anim);
			}
			$( "#slider" ).slider( "value", t );
		},time_interval);
		play=true;
	}
  return false;
	

}

function queryAndAdd(t){
	// t is a date in milliseconds
	t2=t+day;
	t2=(t2-1000)/1000;
	t=t/1000;
	
	var data=get_time_row(t,t2);
	//console.log(data);
	if(data[1]!=false){
		time_row=data[1];
	}
	if(data[0]){
		setCounterVal(get_counter_val(time_row));
		addToMap(map,data[0]);
	}
	
}


function setDateTxt(date){
	$('#day-txt').html(date.getDate());
	var month=date.getMonth()+1;
	if(month=='1'){month='Jan';}
	else if(month=='1'){month='Jan';}
	else if(month=='2'){month='Feb';}
	else if(month=='3'){month='Mar';}
	else if(month=='4'){month='Apr';}
	else if(month=='5'){month='Maj';}
	else if(month=='6'){month='Jun';}
	else if(month=='7'){month='Juli';}
	else if(month=='8'){month='Aug';}
	else if(month=='9'){month='Sep';}
	else if(month=='10'){month='Okt';}
	else if(month=='11'){month='Nov';}
	else if(month=='12'){month='Dec';}
	$('#month-txt').html(month);
	$('#year-txt').html(date.getFullYear());
}

function setCounterVal(counter){
	$('#counter_val').html(counter);
}

function togglePlay($elem){
	$elem.stop().show().animate(
		{'marginTop':'-175px','marginLeft':'-175px','width':'300px','height':'300px','opacity':'0'},
		function(){
			$(this).css({'width':'100px','height':'100px','margin-left':'-50px','margin-top':'-50px','opacity':'1','display':'none'});
		}
	);
	$elem.parent().append($elem);
}

$(window).resize(function() {
	if($('#map').is(':visible')){
		$('#map').css("height",$(window).height()-$('#graphcontainer').height());
	}
});
