//class MyDyedCalendar(){
//  constructor(){
//    this.currentDate = new Date();
//    this.tempOfMonths = [2.4, 3.6, 7.8, 13.1, 17.4, 20.3, 22.7, 22.9, 18, 12.8, 6.8, 3.2];
//  }


//Average maximum temperatures from 1990 to 2019
var tempOfMonths = [2.4, 3.6, 7.8, 13.1, 17.4, 20.3, 22.7, 22.9, 18, 12.8, 6.8, 3.2];
var months = ["", "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];

/**
 * 
 * @param {*} num 
 * @param {*} radius 
 * @param {*} offsetX 
 * @param {*} offsetY 
 * @param {*} className 
 */
function createCircleOfMonths(num, radius, offsetX, offsetY, className) {
  var x, y;
  for (var n = 0; n < num; n++) {
    x = radius * Math.cos(n / num * 2 * Math.PI);
    y = radius * Math.sin(n / num * 2 * Math.PI);
    var div = document.createElement("div");
    div.className = className;
    div.style.left = (x + offsetX) + "px";
    div.style.top = (y + offsetY) + "px";
    
    var month = n+1;
    month = (month > 10) ? month -10 : month +2;
    var color = getBackgroundColor(month);
    //div.style.backgroundColor = color;
    var onlickText = "";
    div.innerHTML = "<button title=\""+months[month]+"\"class=\"month-button\" style=\"width: 100px;height: 100px;border-radius: 50%;background-color:"+color+"\" onclick=\"updateMonthDiv("+month+", "+new Date().getFullYear()+", '"+color+"')\">"+month+"</button>";
    //btn.addEventListener("click", function(){
    //  alert(this.backgroundColor+" "+color+" "+month+" clicked!");
    //  updateMonthDiv(month, new Date().getFullYear(), color);
    //});
    //btn.addEventListener("click", updateMonthDiv(month, new Date().getFullYear(), color));
    //btn.innerHTML = "<a href=\"\" onclick=\"updateMonthDiv("+month+", new Date().getFullYear(), "+color+")\"><h1>" +(month)+ "</h1></a>";
    //div.addEventListener("click", setDaysOfMonth(month, new Date().getFullYear(), color))
    document.body.appendChild(div);
   }
}

function getBackgroundColor(month){
  
  //return "#0e4243";
  return temp2rgb(tempOfMonths[month-1]);
}

function temp2rgb(temp){
  //Maximalwert festlegen
  // Beispiel 25°C
  // Anzahl der Stufen / Maximalwert
  // = 1020 / 25
  // Faktor 40.8
  var farbe = Math.round(40.8 * temp); 
  //
  if (farbe < 1)
    farbe = 0;
  if (farbe > 1020)
    farbe = 1020;
  if (farbe <= 510)
  {
    var rot = 0;
    if (farbe <= 255)
    {
    var gruen = 0 + farbe;
    var blau = 255;
    }
    if (farbe > 255)
    {
      farbe = farbe - 255;
      blau = 255 - farbe;
      gruen = 255;
    }
    if (farbe > 255)
    {
      farbe = farbe - 255;
      blau = 255 - farbe;
      grun = 255;
    }
  }

  if (farbe > 510)
  {
    farbe = farbe - 510;
    blau = 0;
    if (farbe <= 255)
    {
      rot = 0 + farbe;
      gruen = 255;
    }
    if (farbe > 255)
    {
      farbe = farbe - 255;
      gruen = 255 - farbe;
      rot = 255;
    }
  }
  return rgbToHex(rot)+rgbToHex(gruen)+rgbToHex(blau);
}

function rgbToHex(rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
}

function updateMonthDiv(month, year, color){
  var daysOfMonth = new Date(year, month, 0).getDate();
  var monthDiv = document.getElementById("month");
  monthDiv.style.backgroundColor = color;
  var table = monthDiv.getElementsByTagName('tbody')[0];

  var rows = Math.round(daysOfMonth / 7);
  var restOfDays = daysOfMonth % 7;

  var date = new Date();
  var markDay = false;
  if(date.getMonth() == month-1 && date.getFullYear() == year)
  {
    markDay = true;
  }

  var content = "<tr><th>Mo</th><th>Di</th><th>Mi</th><th>Do</th><th>Fr</th><th>Sa</th><th>So</th></tr>";
  var days = 0;

  //Diese Schleife dient dazu die ersten 28 Tage eines Monats darzustellen
  for(var i = 0; i < rows;i++)
  {
    content += "<tr>";
    for(var j = 0; j<7; j++)
    {
      days++;
      if(date.getDate() == days){
        content += (markDay) ? "<td style=\"background-color:white\">"+days+"</td>" : "<td>"+days+"</td>";
      }
      else{
        content+= "<td>"+days+"</td>";
      }
    }
    content+= "</tr>";
  }
  //Falls der jeweilige Monat mehr als 28 Tage hat, werden die restlichen Tage hiermit dargestellt
  if(daysOfMonth > 28){
    content+= "<tr>";
    for(var i=29; i <= (28+restOfDays); i++)
    {
      days++
      if(date.getDate() == days){
      content += (markDay) ? "<td style=\"background-color:white\">"+days+"</td>" : "<td>"+days+"</td>";
      }
      else{
        content+= "<td>"+days+"</td>";
      }
    }
    content+= "</tr>";
  }
  document.getElementById("month-title").innerHTML = month+"."+year;
  table.innerHTML = content;
}