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
			styleFrame(myTag);
		}
	}
	create("section", null);
	create("button", "Go !!!");
	document.getElementsByTagName("button")[0].onclick = function(){
		create("iframe", "./Ds/index.html");
		this.style.border = 0;
		this.style.cursor = "auto";
		this.onclick = function(){};
	}
	function styleFrame(myFrame){
		var frameLeft = myFrame.offsetLeft;
		var m = 100;
		while(m > 0){
			var leftTime = function(m){
				setTimeout(function(){
					myFrame.style.marginLeft = 100 - m + "%";
					if(m === 100){
						mHeight();
					}
				},m * 15);
			}
			leftTime(m);
			m--;
		}
		function mHeight(){
			for(m = 0; m <= 60; m++){
				var heightTime = function(m){
					setTimeout(function(){
						myFrame.style.height = m + "%";
					},m * 30);
				}
				heightTime(m);
			}
		}
	}
});