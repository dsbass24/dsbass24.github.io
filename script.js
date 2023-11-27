/*
	BassHome
	
	js
*/
document.addEventListener("DOMContentLoaded", function(e){

	var myBody = document.body;
	
	/*************************************************************************************/
	function create(nameTag, idTag, classTag, contentTag){
		var tag = document.createElement(nameTag);
		tag.id = idTag;
		tag.className = classTag;
		myBody.appendChild(tag);
		
		if(idTag === "preload"){
			//tag.innerText = contentTag;
			//console.log(preload.className);
		}
		if(nameTag === "a"){
			platform.appendChild(tag);
			tag.innerText = idTag;
			tag.href = contentTag;
			tag.id = "";
		}
		
	}
	
	/*************************************************************************************/
	create("div", "preload", "on", "");
	create("pre", "myTime", "", "");
	create("div", "platform", "", "");
	//create("", "", "", "");
	//create("", "", "", "");
	/*************************************************************************************/
	
	function getPages(){
		for(var i = 0; i < myLinks.length; i++){
			create("a", myLinks[i].name, "", myLinks[i].pagesLincs);
		}
	}
	getPages();
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	function time(){
		var date = new Date();
		var days = date.getDate();
		var mon = date.getMonth();
		var year = date.getFullYear();
		var hours = date.getHours();
		var min = date.getMinutes();
		var sec = date.getSeconds();
		if(days < 10){
			days = "0" + days;
		}
		if(mon < 10){
			mon = "0" + mon;
		}
		if(hours < 10){
			hours = "0" + hours;
		}
		if(min < 10){
			min = "0" + min;
		}
		if(sec < 10){
			sec = "0" + sec;
		}
		var myDate = days + "/" + mon + "/" + year + " " + hours + ":" + min + ":" + sec;
		myTime.innerText = myDate;
	}
	setInterval(time, 1000);
	
	/*************************************************************************************/
	// Заглушка прелоадера.
	window.onload = function(){

		if(document.readyState == "complete"){
			preload.className = "off";
			//console.log(preload.className);
		}
	}
	/*************************************************************************************/
	window.addEventListener("resize", function(eve){
		//console.log(eve);
		//console.log("innerHeight : " + window.innerHeight + " , innerWidth : " + window.innerWidth);
	});
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
	/*************************************************************************************/
});