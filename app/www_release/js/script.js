var d = new Date();
var date = d.getMonth() + "/" + d.getDay() + "/" +d.getFullYear();
var todayString = "Today is " + date + "\n";
window.document.getElementById("myText").innerText = todayString.repeat(10);