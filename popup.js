window.onload = function() {
	document.getElementById("loading").style.display = 'none';
	document.getElementById("meaning").style.display = 'none';
	document.getElementById("Box").focus();
};
document.getElementById('form1').addEventListener('submit', function(evt){
    evt.preventDefault();
    findMeaning();
})
document.getElementById("SubmitBtn").addEventListener("click",findMeaning);
function findMeaning(){
	document.getElementById("meaning").style.display = 'none';
	document.getElementById("loading").style.display = 'block';
	var xmlhttp;
	var word = document.getElementById("Box").value;
	if (window.XMLHttpRequest){
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xhr=new XMLHttpRequest();
	}
	else{
		// code for IE6, IE5
		xhr=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhr.onreadystatechange=function(){
		if (xhr.readyState==4 && xhr.status==200){
			document.getElementById("loading").style.display = 'none';
			document.getElementById("meaning").style.display = 'block';
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
			var fl = xmlDoc.getElementsByTagName("fl")[0];
			if(fl!=undefined){
				var Label=fl.childNodes[0].nodeValue;
				var Meaning	=xmlDoc.getElementsByTagName("dt")[0].childNodes[0].nodeValue;
				var Examples="";
				var len=xmlDoc.getElementsByTagName("vi").length;
				for(i=0;(i<len && i<3);i++){
					Examples=Examples + xmlDoc.getElementsByTagName("vi")[i].textContent +"<br>";
				}
				document.getElementById("meaning").innerHTML=Label+"<br>"+Meaning+"<br>"+Examples;
			}
			else{
				document.getElementById("meaning").innerHTML="The word you have entered is not in the dictionary.";
			}
		}
	}
	xhr.open("GET", "http://www.dictionaryapi.com/api/v1/references/learners/xml/"+word+"?key=f46c56a3-000f-4057-bd99-90dc09fa4156", true);
	xhr.setRequestHeader('Content-Type', 'text/xml');
	xhr.send();
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
}
