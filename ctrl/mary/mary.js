/*
	Mary
*/
document.addEventListener("DOMContentLoaded", function(e){
	var myBody = document.body;
	function create(tag, id, cl, con){
		var myTag = document.createElement(tag);
		myTag.id = id;
		myTag.className = cl;
		myBody.appendChild(myTag);
		if(tag === "script"){
			myTag.type = "text/javascript";
			myTag.src = con;
			document.head.appendChild(myTag);
		}
		if(tag === "pre"){
			forTime.appendChild(myTag);
		}
		if(id === "point"){
			forTime.appendChild(myTag);
		}
		if(tag === "section"){
			myTag.innerText = con;
			if(cl === "off"){
				len.appendChild(myTag);
			}
			if(cl === "out"){
				lookLen.appendChild(myTag);
			}
		}
		if(tag === "input"){
			left.appendChild(myTag);
			myTag.autocomplete = "off";
			myTag.autofocus = "true";
		}
		if(tag === "center"){
			// The end...
			myTag.innerText = con;
		}
		if(id === "right"){
			textOut("������� ��-��-��!!!");
		}
	}
	/***************************************************************************************************/
	// ����� ����� ����� ��� �������� � ���������� �������������
	function rBody(){
		myBody.innerHTML = "";
		create("script", "scriptMary", "", 'maryWord.js');
		create("div", "forTime", "");
		create("pre", "time", "date");
		create("div", "point", "");
	}
	rBody();
	/***************************************************************************************************/
	// ��� ������ ������ � "maryWord" ��������
	function takeWord(){
		create("div", "len", "");
		create("div", "lookLen", "");
		create("div", "left", "");
		create("input", "inp", "wordsInp");
		for(var i = 0; i < maryWord.length; i++){
			var wTime = function(i){
				setTimeout(function(){
					create("section", i, "off", maryWord[i].eng);
					create("section", "len" + i, "out", maryWord[i].rus);
				}, i * 1);
			}
			wTime(i);
		}
		create("div", "right", "wordsRight");
	}
	/***************************************************************************************************/
	// ��� ������ ������ ������������ ��� ��������� ����� ���������. (������ - �� ������...)
	function askRight(what){
		right.innerText = what;
	}
	function askPoint(what){
		point.innerText = what;
	}
	/***************************************************************************************************/
	// ��� ������ � ������� � ��� �����-��������
	function inpOut(say){
		inp.placeholder = say;
		inp.size = inp.placeholder.length;
		inf();
		inp.oninput = function(){
			askRight(say[inp.value.length]);
			if(inp.value === say){
				out();
				inp.placeholder = "";
				inp.value = "";
			}
			return false;
		}
	}
	/***************************************************************************************************/
	// ������ ���� ������ = 3-� ����� ����������� �������:
	// 1-� ����� ���� ������� � ������� "on". �� ���������, ����� "off" � ������ ��� ������ �� "on"
	// 2-� ����� �������� ������� "on" � ������ ��� ��� ������ �� "section"
	// 3-� ����� ���� �� ��������� ������ ������, �������� ��� ����� �������� ���������� "���!" :)
	function out(){
		var tagOn = document.getElementsByClassName("on")[0];
		if(tagOn === undefined){
			var tagOff = document.getElementsByClassName("off")[0];
			if(tagOff !== undefined){
				tagOff.className = "on";
				inpOut(tagOff.textContent);
			}else{
				rBody();
				overV();
			}
		}else{
			tagOn.className = "section";
			textOut(maryWord[tagOn.id].eng + " : " + maryWord[tagOn.id].rus);
			sWork(tagOn.id);
			sWork("len" + tagOn.id);
		}
	}
	/***************************************************************************************************/
	// ��� ������ ��������� ������ � ��������� ���������
	function textOut(c){
		function tagTime(a, b){
			setTimeout(function(){
				right.innerText = a;
				if(a === c){
					out();
				}
			}, b * 60);
		}
		var symb = "";
		for(var s = 0; s < c.length; s++){
			symb = symb + c[s];
			tagTime(symb, s);
		}
	}
	/***************************************************************************************************/
	// ���������� ������� ��������� ����
	function sWork(w){
		var se = document.getElementById(w);
		var seHei = se.offsetHeight;
		for(var b = 0; b <= seHei; b++){
			var seTime = function(b){
				setTimeout(function(){
					if(se.className !== "out"){
						se.style.top = b + "px";
					}else{
						se.style.top = -[seHei] + b + "px";
					}
				}, b * 10);
			}
			seTime(b);
		}
	}
	/***************************************************************************************************/
	// ���������
	function inf(){
		var place = inp.placeholder;
		var ofOff = document.getElementsByClassName("off").length;
		if(ofOff !== 0){
			askPoint("�������� ������ " + (ofOff + 1));
		}else{
			askPoint("�������� ������ �" + place + "�, � ��.");
		}
	}
	/***************************************************************************************************/
	function myTime(){
		setTimeout(function(){
			takeWord();
			time.innerText = "����� ����� ����� ���, ��� ���� ��������...";
		}, 4000);
	}
	myTime();
	/***************************************************************************************************/
	function overV(){
		setTimeout(function(){
			create("center", "over", "", "�-�-� ...!!!");
			create("div", "gif", "");
		}, 2000);
	}
});