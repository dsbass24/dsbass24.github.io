/*
	ctrl Z
*/
var box = [];
var xi;
var newSw = [];
var swLen;
document.addEventListener("DOMContentLoaded", function(e){
	var myBody = document.body;
	getBox();
	/* Основа для создания елементов ***********************************************************************************************/
	function create(tag, id, cl, con){
		var myTag = document.createElement(tag);
		myBody.appendChild(myTag);
		myTag.id = id;
		myTag.className = cl;
		if(id === "time"){
			forTime.appendChild(myTag);
		}
		if(id === "point"){
			forTime.appendChild(myTag);
			myTag.innerText = con;
		}
		if(id === "kart"){
			myTag.addEventListener("click", clickKart);
		}
		if(id === "boxButt"){
			myTag.innerText = con;
			myTag.addEventListener("click", backWordsBox);
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
				// Для управления клавишами: "вниз", "вверх", "ввод"
				myTag.tabIndex = id + 1;
				myTag.addEventListener("focus", mouse);
				myTag.addEventListener("keydown", function(k){
					var myKey = k.keyCode;
					var nex = k.srcElement;
					if(myKey === 40){
						if(this !== one.lastChild){
							nex.nextSibling.focus();
						}else{
							one.childNodes[0].focus();
						}
					}
					if(myKey === 38){
						if(this !== one.firstChild){
							nex.previousSibling.focus();
						}else{
							one.lastChild.focus();
						}
					}
					if(myKey === 13){
						this.click();
					}
				});
			}
		}
		if(tag === "input"){
			left.appendChild(myTag);
			myTag.autocomplete = "off";
			myTag.autofocus = "true";
		}
		if(tag === "center"){
			myTag.innerText = con;
		}
		if(id === "right"){
			if(right.className === "wordsRight"){
				setStart();
			}else{
				takeSWWord();
			}
		}
		if(tag === "span"){
			right.appendChild(myTag);
			myTag.innerText = con;
		}
	}
	/* Общий набор тегов ***********************************************************************************************************/
	function rBody(classKart){
		myBody.innerHTML = "";
		create("div", "nott", "");
		create("div", "forTime", "");
		create("pre", "time", "");
		create("pre", "point", "", "...");
		create("button", "kart", classKart);
	}
	rBody("");
	/* Для работы только с "words" массивом ****************************************************************************************/
	function takeWord(){
		rBody("Rs4b");
		create("div", "len", "");
		create("div", "lookLen", "");
		for(var i = 0; i < words.length; i++){
			create("section", i, "off", words[i].eng);
			create("section", "len" + i, "out", words[i].rus);
		}
		create("div", "left", "");
		create("input", "inp", "wordsInp");
		create("div", "place", "wordsInp");
		create("button", "boxButt", "", "Очистить...");
		create("div", "right", "wordsRight");
	}
	/* Исключает повторное введение слов после обновления или перезагрузки */
	function setStart(){
		if(localStorage.box != undefined){
			if(localStorage.box == 0){
				textOut("Печатай!!!");
				len.onclick = function(see){
					var look = see.toElement;
					if(inp.placeholder != ""){
						if(look !== len.lastChild && look.className === "off"){
							clickOver();
							minWords(look.id);
						}
					}
				}
			}else{
				doneWords(localStorage.box);
				textOut("Продолжай!!!");
			}
		}else{
			localStorage.setItem("box", 0);
			setStart();
		}
	}
	/* Возврат к начальному количеству слов */
	function backWordsBox(){
		if(inp.placeholder != "" && (localStorage.box != 0)){
			localStorage.setItem("box", 0);
			takeWord();
		}
	}
	/* Убирает выбранное количество слов */
	function minWords(t){
		localStorage.setItem("box", t);
		for(var q = 0; q < t; q++){
			len.childNodes[q].className = "section";
			tt(len.childNodes[q], "");
			chTime(q);
		}
		function chTime(u){
			setTimeout(function(){
				tt(point, u + " к ловкости...");
				sWork(u, "len" + u);
				if(t - 1 == u){
					boxButt.className = "";
					kart.className = "Rs4b";
					tt(point, t + " к ловкости...");
					out();
				}
			}, u * 40);
		}
	}
	/* Предотвращает нажатия во время выполнения функции minWords() */
	function clickOver(){
		inp.placeholder = "";
		inp.value = "";
		tt(place, "");
		len.onclick = function(){
			tt(time, "В следующий раз...");
		}
		kart.className = "hidd";
		boxButt.className = "hidd";
	}
	/* Для работы только с "sw" массивом *******************************************************************************************/
	function takeSWWord(){
		one.onclick = function(j){
			var look = j.toElement;
			if(look.className === "sw"){
				wordLen(look.id);
				look.className = "swOff";
			}else if(look.className === "swOff"){
				takeNew();
				butt();
				textOut("Тренируйся!!!");
			}else{
				box.splice(0, box.length);
				take();
			}
		}
	}
	/* Набор тегов для создания списка доступных массивов */
	function take(){
		rBody("Sliz");
		create("div", "len", "");
		create("div", "one", "onedone");
		for(var i = 0; i < sw.length; i++){
			create("section", i, "sw", sw[i].lett + " : " + sw[i].word.length);
		}
		create("div", "left", "");
		create("input", "inp", "swInp");
		create("button", "resort", "hidd", "Перетасовать");
		create("div", "right", "swRight");
	}
	/* Предпросмотр компилируемого массива */
	function wordLen(ob){
		one.onclick = function(){};
		kart.className = "hidd";
		newSw = [sw[ob].word.length];
		for(var i = 0; i < sw[ob].word.length; i++){
			newSw[i] = {"eng":sw[ob].word[i],"rus":swTrans[ob].word[i]};
			//newSw[i] = {"eng":sw[ob].word[i],"rus":sw[ob].word[i].length};
			box.push(newSw[i]);
			setTimeout(function(){
				create("section", "", "off", box[len.childElementCount].eng);
				maximum();
				offColor(len.childElementCount);
				tt(time, "Количество символов : " + len.textContent.length);
				if(box.length === len.childElementCount){
					tt(right, len.childElementCount + " пунктов добавлено...\nНажми ещё раз, чтобы сохранить список и начать тренировку");
					takeSWWord();
				}
			}, i * 15);
		}
		function offColor(n){
			var elOff = len.childNodes[n - 1];
			elOff.style.backgroundColor = "hsla(" + [248 - n] + ", 100%, 50%, 0.3)";
		}
		/* Лимит добавляемых пунктов (до 266) */
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
	/* Для основной работы ... */
	function takeNew(){
		rBody("Sliz");
		create("div", "len", "");
		create("div", "lookLen", "");
		create("div", "one", "");
		for(var i = 0; i < box.length; i++){
			create("section", "sw" + i, "off", box[i].eng);
			create("section", "lensw" + i, "out", box[i].rus);
		}
		localStorage.setItem("sto", JSON.stringify(box));
		create("div", "left", "");
		create("input", "inp", "swInp");
		create("div", "place", "swInp");
		create("button", "swBox", "swBox", "Заново...");
		create("button", "resort", "", "Перетасовать");
		create("div", "right", "swRight");
		swBox.onclick = function(){
			if(inp.placeholder !== ""){
				restartSW();
			}
		}
	}
	/* Сброс */
	function restartSW(){
		box.splice(0, box.length);
		localStorage.setItem("sto", JSON.stringify(box));
		localStorage.setItem("swLen", 0);
		getBox();
		take();
	}
	/* Работа с localStorage */
	function getBox(){
		var sto = localStorage.getItem("sto");
		if(!sto){
			localStorage.setItem("sto", JSON.stringify(box));
			localStorage.setItem("swLen", 0);
		}else{
			box = JSON.parse(sto);
			swLen = localStorage.swLen;
		}
	}
	/* Кнопка для сортировки элементов массива в *случайном порядке */
	function butt(){
		resort.onclick = function(){
			localStorage.setItem("swLen", 0);
			luckySort(box);
			takeNew();
			textOut("Слова перемешаны!!!");
			resort.className = "hidd";
		}
		function luckySort(someArr){
			someArr.sort(function(){
				return Math.random() - 0.5;
			});
		}
	}
	/* Кнопка играет роль главного переключателя ***********************************************************************************/
	function clickKart(){
		kart.removeEventListener("click", clickKart);
		if(kart.className === ""){
			takeWord();
		}else if(kart.className === "Rs4b"){
			if(box.length != 0){
				takeNew();
				resort.className = "hidd";
				doneWords(localStorage.swLen);
				textOut("Печатай!!!");
			}else{
				take();
			}
		}else if(kart.className === "Sliz"){
			takeWord();
		}
	}
	/* Востановим позицию по данным из локального хранилища ************************************************************************/
	function doneWords(locX){
		for(var i = 0; i < locX; i++){
			len.childNodes[i].className = "section";
			tt(len.childNodes[i], "");
			len.childNodes[i].style.top = "34px";
			lookLen.childNodes[i].style.top = "0px";
		}
	}
	/* Для работы с инпутом и его плейс-холдером ***********************************************************************************/
	function inpOut(say){
		inp.placeholder = say;
		tt(place, inp.placeholder);
		inp.size = inp.placeholder.length;
		inf();
		inp.oninput = function(){
			inputcolor();
			if(inp.value === inp.placeholder && inp.value.length !== 0 && inp.placeholder !== ""){
				inp.placeholder = "";
				inp.value = "";
				inputcolor();
				inp.blur();
				out();
			}
			return false;
		}
		inp.onblur = function(){
			inp.style.opacity = 1;
		}
		inp.onfocus = function(){
			inputcolor();
		}
		function inputcolor(){
			if(inp.value.length != 0){
				place.className = "hidd";
				inp.style.opacity = 1;
			}else{
				inp.style.opacity = 0;
				place.className = inp.className;
			}
		}
	}
	/* Полный цикл работы = 3-м фазам проверочных вызовов: *********************************************/
	/* 1-й вызов ищет елемент с классом "on". Не обнаружив, берем "off" и меняем имя класса на "on" ****/
	/* 2-й вызов полюбому находит "on" и меняет это имя класса на "section" ****************************/
	/* 3-й вызов тупо не обнаружив нужные классы, заменяет всю хрень приятным сообщением "Ура!" :) *****/
	function out(){
		var tagOn = document.getElementsByClassName("on")[0];
		if(tagOn === undefined){
			var tagOff = document.getElementsByClassName("off")[0];
			if(tagOff !== undefined){
				inpOut(tagOff.textContent);
				inp.focus();
				tagOff.className = "on";
			}else{
				if(right.className === "wordsRight"){
					localStorage.setItem("box", 0);
				}else{
					localStorage.setItem("swLen", 0);
					box.splice(0, box.length);
					localStorage.setItem("sto", JSON.stringify(box));
				}
				rBody("");
				create("center", "over", "", "Твой опыт " + localStorage.tot + " нажатий");
				create("div", "gif", "");
				kart.className = "";
				forTime.className = "hidd";
			}
		}else{
			right.innerHTML = "";
			totalMem(tagOn.textContent.length);
			sWork(tagOn.id, "len" + tagOn.id);
			combText(tagOn.textContent, document.getElementById("len" + tagOn.id).textContent);
			tt(tagOn, "");
			tagOn.className = "section";
			wDone();
		}
	}
	function wDone(){
		var d = document.getElementsByClassName("section").length;
		if(right.className === "wordsRight"){
			localStorage.setItem("box", d);
		}else if(right.className === "swRight"){
			localStorage.setItem("swLen", d);
		}
	}
	function combText(tA, tB){
		if(tA !== tB){
			textOut(tA + " : " + tB);
		}else{
			textOut(tA);
		}
	}
	/* Визуальный счетчик **********************************************************************************************************/
	function sWork(idA, idB){
		document.getElementById(idA).style.top = "34px";
		document.getElementById(idB).style.top = "0px";
	}
	/* Подсказка по колличеству оставшихся слов ************************************************************************************/
	function inf(){
		var place = inp.placeholder;
		var ofOff = document.getElementsByClassName("off").length;
		if(ofOff - 1 !== 0){
			tt(time, "Осталось " + ofOff + " пунктов, содержащих " + len.textContent.length + " символов.");
		}else{
			tt(time, "Осталось ввести ‹" + place + "›, и всё.");
		}
	}
	/* Подсказки *******************************************************************************************************************/
	myBody.addEventListener("mouseover", mouse);
	function mouse(curr){
		if(curr.target.id === "kart"){
			tt(time, "Нажми для выбора набора слов");
		}else if(curr.target.id === "point"){
			tt(point, "Здесь будут подсказки...");
			tt(time, "Там будут подсказки...");
		}else if(curr.target.id === "time"){
			tt(time, "Здесь будут подсказки...");
			tt(point, "Там будут подсказки...");
		}else if(curr.target.id === "forTime"){
			tt(time, "Здесь будут подсказки...");
			tt(point, "И здесь...");
		}else if(curr.target.id === "resort"){
			tt(time, "Кнопка для перемешивания слов...");
		}else if(curr.target.id === "inp"){
			if(inp.placeholder !== ""){
				tt(time, "Для ввода...");
				inp.focus();
			}
		}else if(curr.target.id === "boxButt"){
			tt(time, "Начать заново...");
		}else if(curr.target.id === "len"){
			tt(time, "Содержит список еще не введенных слов...");
		}else if(curr.target.id === "lookLen"){
			tt(time, "Содержит список уже введенных слов...");
		}else{
			if(curr.target.className === "sw"){
				tt(time, "Добавить список...");
				tt(right, "Добавить в список слова на букву " + "'" + sw[curr.target.id].lett + "'");
			}else if(curr.target.className === "swOff"){
				tt(time, "Нажми ещё раз, чтобы сохранить список и начать тренировку...");
				tt(right, "Сохранить...");
			}else if(curr.target.className === "swMax"){
				tt(time, "Превышает допустимый лимит...");
				tt(right, "Отменить...");
			}else if(curr.target.className === "swBox"){
				tt(time, "Очистить...");
			}else if(curr.target.className === "off"){
				tt(time, curr.target.textContent);
				tt(point, "Не отвлекайся!!!");
			}else if(curr.target.className === "out"){
				tt(time, "Не отвлекайся!!!");
				tt(point, curr.target.textContent);
			}
		}
	}
	/* Для вывода текста указанным елементом ***************************************************************************************/
	function tt(x, con){
		x.innerText = con;
	}
	/* Общая статистика ************************************************************************************************************/
	function totalMem(doneThis){
		if(localStorage.tot != undefined){
			xi = parseInt(doneThis) + parseInt(localStorage.tot);
			localStorage.setItem("tot", xi);
			visual(doneThis);
		}else{
			localStorage.setItem("tot", doneThis);
		}
		function visual(a){
			for(var d = 0; d <= a; d++){
				var dTime = function(d){
					setTimeout(function(){
						tt(point, (xi - a) + d);
						if(point.outerText !== localStorage.tot){
							point.className = "onpoint";
						}else{
							point.className = "";
						}
					}, d * 36);
				}
				dTime(d);
			}
		}
	}
	/* Для вывода основного текста с небольшой задержкой ***************************************************************************/
	function textOut(c){
		function tagTime(b){
			var validTag = document.getElementById("symb" + b);
			setTimeout(function(){
				if(validTag.className != undefined && validTag.className === "hidd"){
					validTag.className = "onspan";
					if(right.childNodes[c.length - 1] === right.lastChild && right.childNodes[c.length - 1].className === "onspan"){
						out();
					}
				}
			}, b * 40);
		}
		for(var s = 0; s < c.length; s++){
			create("span", "symb" + s, "hidd", c[s]);
			tagTime(s);
		}
	}
	console.log(document.lastModified);
});