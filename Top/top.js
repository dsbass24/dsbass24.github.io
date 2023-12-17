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
		if(idTag === "pre2"){
			s2.appendChild(tag);
			tt(tag, "mouse off");
		}
		if(idTag === "checkMouse"){
			s2.appendChild(tag);
			tag.type = "checkbox";
			//Включаем или выключаем информационный курсор.
			tag.addEventListener("change", function(){
				if(tag.checked){
					tag.value = "on";
					tt(pre2, "mouse on");
					tt(myText, "on");
					myBody.addEventListener("mouseover", who);
				}
				else{
					tag.value = "off";
					tt(pre2, "mouse off");
					tt(myText, "off");
					myBody.removeEventListener("mouseover", who);
				}
			});
		}
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
	newTag("section", "s2", "section");
	newTag("pre", "pre2");
	newTag("input", "checkMouse");
	
	newTag("div", "myText");
	newTag("button", "upBut");
	newTag("button", "downBut");

	//newTag("", "", "");
	//newTag("", "", "");

	//===================================================================================================
	
	function who(getInf){
		var inf = getInf.target;
		//tt(myText, "outerWidth : " + window.outerWidth);
		tt(myText, inf.outerHTML);
	}
	
	//===================================================================================================
	
	upBut.onclick = function(){
		tt(myText, "innerWidth : " + window.innerWidth);
	}
	downBut.onclick = function(){
		tt(myText, "innerHeight : " + window.innerHeight);
	}
	
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
	//===================================================================================================
});