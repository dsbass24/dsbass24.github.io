/*
	ctrl Z
*/
var box = [];
var xi;
document.addEventListener("DOMContentLoaded", function(e){
	var myBody = document.body;
	getBox();
	/* ������ ��� �������� ��������� *******************************************************************/
	function create(tag, id, cl, con){
		var myTag = document.createElement(tag);
		myBody.appendChild(myTag);
		myTag.id = id;
		myTag.className = cl;
		if(tag === "pre"){
			forTime.appendChild(myTag);
		}
		if(id === "point"){
			forTime.appendChild(myTag);
			myTag.innerText = con;
		}
		if(id === "kart"){
			setTimeout(function(){
				myTag.addEventListener("click", clickKart);
			}, 1000);
		}
		if(id === "boxButt"){
			myTag.innerText = con;
		}
		if(id === "resort"){
			myTag.innerText = con;
		}
		if(id === "swBox"){
			myTag.innerText = con;
		}
		if(tag === "section"){
			myTag.innerText = con;
			if(cl === "off"){
				len.appendChild(myTag);
			}
			if(cl === "out"){
				lookLen.appendChild(myTag);
			}
			if(cl === "sw"){
				one.appendChild(myTag);
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
			if(right.className === "wordsRight"){
				setStart();
			}else{
				takeSWWord();
			}
		}
	}
	/* ����� ����� ����� *******************************************************************************/
	function rBody(){
		myBody.innerHTML = "";
		create("div", "forTime", "");
		create("pre", "time", "");
		create("div", "point", "", "...");
		create("button", "kart", "Rs4b");
	}
	rBody();
	/* ��� ������ ������ � "words.eng/rus" �������� ****************************************************/
	function takeWord(){
		rBody();
		create("div", "len", "");
		create("div", "lookLen", "");
		for(var i = 0; i < words.length; i++){
			create("section", i, "off", words[i].eng);
			create("section", "len" + i, "out", words[i].rus);
		}
		create("div", "left", "");
		create("input", "inp", "wordsInp");
		create("div", "right", "wordsRight");
	}
	/* �������� ������ � �������� "words.eng/rus" */
	/* ��������� ��������� �������� ���� ����� ���������� ��� ������������ */
	function setStart(){
		setTimeout(function(){
			right.style.transform = "perspective(2000px) rotateY(0deg) rotateX(0deg)";
		}, 100);
		if(typeof localStorage === undefined){
			console.log("����");
		}else{
			if(localStorage.box === undefined){
				localStorage.setItem("box", []);
			}else{
				takeBox();
				if(localStorage.box != 0){
					textOut("���������!!!");
					doneWords();
				}else{
					textOut("�������!!!");
					len.onclick = function(see){
						var look = see.toElement;
						if(look !== len.lastChild){
							if(look.className === "off"){
								clickOver();
								minWords(look.id);
							}
						}
					}
				}
			}
		}
		/* ������ ������ ... */
		function takeBox(){
			create("div", "boxButt", "", "��������...");
			boxButt.onclick = function(){
				backWordsBox();
			}
		}
	}
	/* ���������� ������� �� ������ �� ���������� ��������� */
	function doneWords(){
		var locS = localStorage.box;
		for(var i = 0; i < locS; i++){
			len.childNodes[i].className = "section";
			len.childNodes[i].style.top = "100%";
			lookLen.childNodes[i].style.top = 0;
		}
	}
	/* ������� � ���������� ���������� ���� */
	function backWordsBox(){
		localStorage.setItem("box", []);
		takeWord();
		kart.className = "Sliz";
	}
	/* ������� ��������� ���������� ���� */
	function minWords(t){
		localStorage.setItem("box", t);
		var childOff = len.childNodes;
		for(var u = 0; u < t; u++){
			childOff[u].className = "section";
			var chTime = function(w){
				setTimeout(function(){
					tt(right, "-" + w + " � ��������...");
					sWork(w, "len" + w);
					if(w == t - 1){
						boxButt.className = "";
						kart.className = "Sliz";
						textOut("� ����� �� ����������!!!");
					}
				}, w * 20);
			}
			chTime(u);
		}
	}
	/* ������������� ������� �� ����� ���������� ������� minWords() */
	function clickOver(){
		inp.placeholder = "";
		inp.value = "";
		len.onclick = function(){
			tt(time, "� ��������� ���...");
		}
		kart.className = "hidd";
		boxButt.className = "hidd";
	}
	/* ��� ������ ������ � "sw.lett/word" �������� *****************************************************/
	/* ����� ����� ��� �������� ������ ��������� �������� */
	function takeSWWord(){
		setTimeout(function(){
			right.style = "transform:perspective(2000px) rotateY(0deg);";
		}, 100);
		one.onclick = function(j){
			var look = j.toElement;
			if(look.className === "sw"){
				look.className = "swOff";
				wordLen(look.id);
			}else if(look.className === "swOff"){
				takeNew();
				butt();
				textOut("�������� ��������!!!");
			}else{
				box.splice(0, box.length);
				localStorage.setItem("sto", JSON.stringify(box));
				take();
			}
		}
	}
	function take(){
		rBody();
		create("div", "len", "");
		create("div", "one", "onedone");
		for(var i = 0; i < sw.length; i++){
			create("section", i, "sw", sw[i].lett + " : " + sw[i].word.length);
		}
		create("div", "left", "");
		create("input", "inp", "swInp");
		create("button", "resort", "hidd", "������������");
		create("div", "right", "swRight");
	}
	/* ������������ �������������� ������� */
	function wordLen(ob){
		one.onclick = function(){}
		kart.className = "hidd";
		for(var i = 0; i < sw[ob].word.length; i++){
			box.push(sw[ob].word[i]);
			setTimeout(function(){
				create("section", "", "off", null);
				maximum();
				tt(right, "��������...\n" + len.childNodes.length);
				offColor(len.childNodes.length);
				if(box.length === len.childNodes.length){
					tt(right, "���������...\n " + len.childNodes.length);
					takeSWWord();
					butt();
				}
			}, i * 9);
		}
		function offColor(n){
			var elOff = len.childNodes[n - 1];
			elOff.style.backgroundColor = "hsla(" + [248 - n] + ", 100%, 50%, 0.18)";
		}
		/* ���������� � ������� ����������� ����������� ���� (�� 266) */
		function maximum(){
			var tagSize = document.getElementsByClassName("sw");
			var getCh = len.childNodes.length;
			for(var i = 0; i < tagSize.length; i++){
				var isw = sw[tagSize[i].id].word.length;
				if(isw + getCh >= 266){
					tagSize[i].className = "swMax";
					maximum();
				}
			}
		}
	}
	/* ��� �������� ������ ... */
	function takeNew(){
		rBody();
		create("div", "len", "");
		create("div", "lookLen", "");
		create("div", "one", "");
		for(var i = 0; i < box.length; i++){
			create("section", "sw" + i, "off", box[i]);
			create("section", "lensw" + i, "out", box[i].length);
		}
		localStorage.setItem("sto", JSON.stringify(box));
		create("div", "left", "");
		create("input", "inp", "swInp");
		create("button", "swBox", "swBox", "������...");
		create("button", "resort", "", "������������");
		create("div", "right", "swRight");
		swBox.onclick = function(){
			box.splice(0, box.length);
			localStorage.setItem("sto", JSON.stringify(box));
			take();
		}
	}
	/* ������ � localStorage */
	function getBox(){
		var sto = localStorage.getItem("sto");
		if(!sto){
			localStorage.setItem("sto", JSON.stringify(box));
		}else{
			box = JSON.parse(sto);
		}
	}
	/* ������ ��� ���������� ��������� ������� � *��������� ������� */
	function butt(){
		resort.onclick = function(){
			luckySort(box);
			takeNew();
			textOut("����� ���������������!!!");
			resort.className = "hidd";
		}
		function luckySort(someArr){
			someArr.sort(function(){
				return Math.random() - 0.5;
			});
		}
	}
	/* ������ ������ ���� �������� ������������� *******************************************************/
	function clickKart(){
		kart.removeEventListener("click", clickKart);
		if(kart.className !== "Rs4b"){
			if(box.length != 0){
				takeNew();
				textOut("�������!!!");
				resort.className = "hidd";
			}else{
				take();
			}
		}else{
			takeWord();
			kart.className = "Sliz";
		}
	}
	/* ��� ������ � ������� � ��� �����-�������� *******************************************************/
	function inpOut(say){
		inp.placeholder = say;
		inp.size = inp.placeholder.length;
		inf();
		inp.oninput = function(){
			//tt(point, say[inp.value.length]);
			if(inp.value === say){
				out();
				inp.placeholder = "";
			}
			return false;
		}
	}
	/* ������ ���� ������ = 3-� ����� ����������� �������: *********************************************/
	/* 1-� ����� ���� ������� � ������� "on". �� ���������, ����� "off" � ������ ��� ������ �� "on" ****/
	/* 2-� ����� �������� ������� "on" � ������ ��� ��� ������ �� "section" ****************************/
	/* 3-� ����� ���� �� ��������� ������ ������, �������� ��� ����� �������� ���������� "���!" :) *****/
	function out(){
		var tagOn = document.getElementsByClassName("on")[0];
		if(tagOn === undefined){
			var tagOff = document.getElementsByClassName("off")[0];
			if(tagOff !== undefined){
				inp.focus();
				inpOut(tagOff.textContent);
				tagOff.className = "on";
			}else{
				if(right.className === "wordsRight"){
					localStorage.setItem("box", []);
				}
				rBody();
				create("center", "over", "", "����� !!! �-�-� ...!!! " + localStorage.tot);
				create("div", "gif", "");
				kart.className = "Sliz";
				forTime.className = "hidd";
			}
		}else{
			sWork(tagOn.id, "len" + tagOn.id);
			totalMem(tagOn.textContent.length);
			tagOn.className = "section";
			var wDone = document.getElementsByClassName("section").length;
			if(right.className === "wordsRight"){
				localStorage.setItem("box", wDone);
				textOut(words[tagOn.id].eng + " : " + words[tagOn.id].rus);
			}else{
				box.shift();
				localStorage.setItem("sto", JSON.stringify(box));
				textOut(wDone + " �������...");
			}
		}
	}
	/* ��� ������ ��������� ������ � ��������� ��������� ***********************************************/
	function textOut(c){
		function tagTime(a, b){
			setTimeout(function(){
				tt(right, a);
				if(a === c){
					inp.value = "";
					out();
				}
			}, b * 36);
		}
		var symb = "";
		for(var s = 0; s < c.length; s++){
			symb = symb + c[s];
			tagTime(symb, s);
		}
	}
	/* ���������� ������� ******************************************************************************/
	function sWork(idA, idB){
		document.getElementById(idA).style.top = "100%";
		document.getElementById(idB).style.top = "0%";
	}
	/* ��������� �� ����������� ���������� ���� ********************************************************/
	function inf(){
		var place = inp.placeholder;
		var ofOff = document.getElementsByClassName("off").length;
		if(ofOff - 1 !== 0){
			tt(time, "�������� " + ofOff + " ...");
		}else{
			tt(point, "...");
			tt(time, "�������� ������ �" + place + "�, � ��.");
		}
	}
	/* ������� ��������� *******************************************************************************/
	document.body.addEventListener("mouseover", function(my){
		var mySome = my.toElement;
		if(mySome.id === "kart"){
			tt(time, "����� ��� ������ ������ ����");
		}else if(mySome.id === "point"){
			tt(point, "����� ����� ���������...");
			tt(time, "��� ����� ���������...");
		}else if(mySome.id === "time"){
			tt(time, "����� ����� ���������...");
			tt(point, "��� ����� ���������...");
		}else if(mySome.id === "forTime"){
			tt(time, "����� ����� ���������...");
			tt(point, "� �����...");
		}else if(mySome.id === "resort"){
			tt(time, "������ ��� ��������� ���������� ����...");
			if(inp.placeholder !== ""){
				tt(point, "����� �����������...");
			}else{
				tt(point, "����������� ������...");
			}
		}else if(mySome.id === "inp"){
			tt(time, "��� �����...");
			if(inp.placeholder === ""){
				tt(point, "...���� ������ �������");
			}else{
				inp.focus();
			}
		}else if(mySome.id === "boxButt"){
			tt(time, "������ ������...");
		}else if(mySome.id === "len"){
			tt(time, "�������� ������ ��� �� ��������� ����...");
		}else if(mySome.id === "lookLen"){
			tt(time, "�������� ������ ��� ��������� ����...");
		}else{
			if(mySome.className === "sw"){
				tt(time, "�������� ������...");
				tt(right, "������ ���� �� ����� " + "'" + sw[mySome.id].lett + "'");
			}else if(mySome.className === "swOff"){
				tt(time, "��������...");
				tt(right, "�����������...");
			}else if(mySome.className === "swMax"){
				tt(time, "��������� ���������� �����...");
				tt(right, "��������...");
			}else if(mySome.className === "swBox"){
				tt(time, "��������...");
				tt(point, "");
				tt(right, "");
			}else if(mySome.className === "off"){
				tt(time, mySome.textContent);
				tt(point, "�� ����������!!!");
			}else if(mySome.className === "out"){
				tt(time, "�� ����������!!!");
				tt(point, mySome.textContent);
			}else{
				tt(time, "");
				tt(point, "");
			}
		}
	});
	/* ��� ������ ������ ��������� ��������� ***********************************************************/
	function tt(x, con){
		x.innerText = con;
	}
	/* ����� ���������� ********************************************************************************/
	function totalMem(doneThis){
		if(localStorage.tot !== undefined){
			xi = parseInt(doneThis) + parseInt(localStorage.tot);
			localStorage.setItem("tot", xi);
			tt(point, localStorage.tot);
		}else{
			localStorage.setItem("tot", doneThis);
		}
	}
});
/*var iNumb = {
	0: "0.png",
	1: "1.png",
	2: "2.png",
	3: "3.png",
	4: "4.png",
	5: "5.png",
	6: "6.png",
	7: "7.png",
	8: "8.png",
	9: "9.png"
}*/