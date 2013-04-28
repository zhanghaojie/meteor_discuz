
Template.tpl_test.rendered = function() {
	var canvas = document.getElementById("diagonal");
	var context = canvas.getContext("2d");
	context.save();
	context.translate(10, 10);
	context.lineWidth = 4;
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(70, 0);
	context.lineTo(70, 70);
	context.lineTo(0, 70);
	context.closePath();
	context.strokeStyle = "#6633FF";
	context.fillStyle = "#339900"
	//context.lineJoin = "round";
	context.fill();
	context.stroke();
	context.restore();

	context.save();
	context.translate(120, 10);
	context.beginPath();
	context.moveTo(0, 0);
	context.lineTo(70, 0);
	context.lineTo(70, 70);
	context.lineTo(0, 70);
	context.closePath();
	//context.fill();
	context.stroke();

	context.restore();

	var bark = new Image();
	bark.src = "/34_avatar_middle.jpg";
	bark.onload = function() {
		context.save();
		context.translate(120, 120);
		context.drawImage(bark, 0, 0, 120, 120);
		context.restore();
	}
	
}