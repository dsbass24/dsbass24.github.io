document.addEventListener("DOMContentLoaded", function(e){
	function create(tag, content){
		var myTag = document.createElement(tag);
		myTag.id = tag;
		document.body.appendChild(myTag);
		myTag.innerHTML = content;
		var sec = document.getElementById("section");
		if(tag === "iframe"){
			myTag.src = content;
			sec.appendChild(myTag);
		}
	}
	create("section", null);
	create("button", "Go !!!");
	document.getElementsByTagName("button")[0].onclick = function(){
		create("iframe", "https://dsbass24.github.io/resume/index.html");
		this.onclick = function(){};
		//console.log(this.id);
	}
});