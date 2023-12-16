/*
	Top page...
	
	JavaScript
*/


document.addEventListener("DOMContentLoaded", function(e){

	var myBody = document.body;
	//Заглушка прелоадера.
	newTag("div", "preload", "on", "Top page loading...");
	window.onload = function(){
		if(document.readyState == "complete"){
			preload.className = "off";
			tt(myText, "outerWidth : " + window.outerWidth);
		}
	}
	//===================================================================================================
	function newTag(nameTag, idTag, classTag, contentTag){
		var tag = document.createElement(nameTag);
		myBody.appendChild(tag);
		tag.id = idTag;

		if(idTag === "preload"){
			tag.className = classTag;
			tt(tag, contentTag);
		}
		//===============================================================================================
		if(classTag === "section"){
			tag.className = classTag;
			navBox.appendChild(tag);
		}
		if(idTag === "pre"){
			s1.appendChild(tag);
		}
		if(idTag === "col"){
			s1.appendChild(tag);
			tag.type = "color";
			tt(pre, "# color");
			//Для вывода цветового значения.
			tag.oninput = function(){
				tt(pre, tag.value);
				pre.style.color = tag.value;
			}
		}
		//===============================================================================================
	}
	//===================================================================================================
	//Для вывода текста.
	function tt(t, con){
		t.innerText = con;
	}
	//===================================================================================================
	newTag("nav", "navBox");
	newTag("section", "s1", "section");
	newTag("pre", "pre");
	newTag("input", "col");
	newTag("div", "myText");
	newTag("button", "upBut");
	newTag("button", "downBut");

	//newTag("", "", "");
	//newTag("", "", "");

	//===================================================================================================

	myBody.addEventListener("mouseover", who);
	function who(getInf){
		var inf = getInf.target;
		//tt(myText, "outerWidth : " + window.outerWidth);
		tt(myText, inf.outerHTML);
	}
	
	//===================================================================================================
	
	
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
});