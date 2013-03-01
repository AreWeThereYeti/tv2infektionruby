function readCSV(callback) {
	$.get('/all.txt', function(data) {
		data=data.split('n');
		data.pop();
		for(var i=0;i<data.length;i++){
			data[i]=data[i].replace(/(\s+)?.$/, '');
			data[i]=data[i].split(',');
			data[i][1]=data[i][1].split(';')
			if(data[i][1][data[i][1].length-1]==''){
				data[i][1].pop();
			}
			for(var j=0;j<data[i][1].length;j++){
				data[i][1][j]=data[i][1][j].split('-');
			}
		}
		callback(data);
	});
}