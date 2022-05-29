/*
	Top page...
	
	JavaScript
*/

document.addEventListener("DOMContentLoaded", function(e){
	
	var myBody = document.body;
	
	myBody.innerText = document.lastModified;
	
	function newTag(nameTag, idTag, classTag, contentTag){
		var tag = document.createElement(nameTag);
		myBody.appendChild(tag);
		tag.id = idTag;
	}
});