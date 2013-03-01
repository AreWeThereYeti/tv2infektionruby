function getStartDate(){
	start_time=all_data[0][0]*1000;
	start_time=new Date(start_time).setHours(0);
	start_time=new Date(start_time).setMinutes(0);
	return new Date(start_time).setSeconds(0);
}

function getEndDate(){
	return all_data[all_data.length-1][0]*1000;
}

function get_time_row(t1,t2){
	for(var i=0;i<all_data.length;i++){
		if(all_data[i][0]>t1 && all_data[i][0]<t2){
			return [all_data[i][1],i];		//date, row
		}
	}
	return false;
}

function get_counter_val(row){
	//console.log('get_counter_val ran with row: ' + row);
	var count=0;
	for(var i=0;i<row+1;i++){
		for(var j=0;j<all_data[i][1].length;j++){
			if(all_data[i][1][j][2]){
				count+=parseInt(all_data[i][1][j][2]);
			}
		}
	}
	//console.log(count);
	return count;
}

function parseDBData(data){ 
	var p_data=[];
	for(var i=0;i<data.rows.length;i++){
		p_data[i]=[];
		p_data[i][0]=data.rows[i].time;
		p_data[i][1]=data.rows[i].geo.split(';')

		if(p_data[i][1][p_data[i][1].length-1]==''){
			p_data[i][1].pop();
		}
		for(var j=0;j<p_data[i][1].length;j++){
			p_data[i][1][j]=p_data[i][1][j].split('-');
			for(var k=0;k<p_data[i][1][j].length;k++){
				if (p_data[i][1][j][k]==''){
					p_data[i][1][j].splice(k,1);
				}
			}
		}
	}
	return p_data;
}

//[9][13]