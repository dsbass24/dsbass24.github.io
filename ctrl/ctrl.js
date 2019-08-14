/*
	ctrl Z
*/
var box = [];
var xi;
document.addEventListener("DOMContentLoaded", function(e){
	var myBody = document.body;
	getBox();
	/* Основа для создания елементов *******************************************************************/
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
			}, 1500);
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
	/* Общий набор тегов *******************************************************************************/
	function rBody(){
		myBody.innerHTML = "";
		create("div", "forTime", "");
		create("pre", "time", "");
		create("div", "point", "", "...");
		create("button", "kart", "Rs4b");
	}
	rBody();
	/* Для работы только с "words.eng/rus" массивом ****************************************************/
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
		create("div", "place", "wordsInp");
		create("div", "right", "wordsRight");
	}
	/* Работает только с массивом "words.eng/rus" */
	/* Исключает повторное введение слов после обновления или перезагрузки */
	function setStart(){
		setTimeout(function(){
			right.style.transform = "perspective(3000px) rotateY(0deg) rotateX(0deg)";
		}, 10);
		if(typeof localStorage === undefined){
			console.log("Нету");
		}else{
			if(localStorage.box === undefined){
				localStorage.setItem("box", []);
			}else{
				takeBox();
				if(localStorage.box != 0){
					doneWords();
					textOut("Продолжай!!!");
				}else{
					textOut("Печатай!!!");
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
		/* Кнопка сброса ... */
		function takeBox(){
			create("div", "boxButt", "", "Очистить...");
			boxButt.addEventListener("click", backWordsBox);
		}
	}
	/* Востановим позицию по данным из локального хранилища */
	function doneWords(){
		var locS = localStorage.box;
		for(var i = 0; i < locS; i++){
			len.childNodes[i].className = "section";
			len.childNodes[i].style.top = "100%";
			lookLen.childNodes[i].style.top = 0;
		}
	}
	/* Возврат к начальному количеству слов */
	function backWordsBox(){
		if(inp.placeholder !== "" && (localStorage.box != 0)){
			localStorage.setItem("box", []);
			takeWord();
			kart.className = "Sliz";
		}
	}
	/* Убирает выбранное количество слов */
	function minWords(t){
		localStorage.setItem("box", t);
		for(var u = 0; u < t; u++){
			len.childNodes[u].className = "section";
			var chTime = function(w){
				setTimeout(function(){
					sWork(w, "len" + w);
					tt(right, "-" + w + " к ловкости...");
					if(w == t - 1){
						tt(right, "-" + t + " к ловкости...");
						boxButt.className = "";
						kart.className = "Sliz";
						//textOut("И никто не догадается!!!");
						out();
					}
				}, w * 20);
			}
			chTime(u);
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
	/* Для работы только с "sw.lett/word" массивом *****************************************************/
	/* Набор тегов для создания списка доступных массивов */
	function takeSWWord(){
		setTimeout(function(){
			right.style.transform = "perspective(3000px) rotateY(0deg) rotateX(0deg)";
		}, 10);
		one.onclick = function(j){
			var look = j.toElement;
			if(look.className === "sw"){
				wordLen(look.id);
				look.className = "swOff";
			}else if(look.className === "swOff"){
				takeNew();
				butt();
				textOut("Тренируй пальчики!!!");
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
		create("button", "resort", "hidd", "Перетасовать");
		create("div", "right", "swRight");
	}
	/* Предпросмотр компилируемого массива */
	function wordLen(ob){
		one.onclick = function(){}
		kart.className = "hidd";
		for(var i = 0; i < sw[ob].word.length; i++){
			box.push(sw[ob].word[i]);
			setTimeout(function(){
				create("section", "", "off", null);
				maximum();
				tt(right, "Добавляю...\n" + len.childNodes.length);
				offColor(len.childNodes.length);
				if(box.length === len.childNodes.length){
					tt(right, "Добавлено...\n " + len.childNodes.length);
					takeSWWord();
					butt();
				}
			}, i * 10);
		}
		function offColor(n){
			var elOff = len.childNodes[n - 1];
			elOff.style.backgroundColor = "hsla(" + [248 - n] + ", 100%, 50%, 0.2)";
		}
		/* Компилятор с лимитом колличества добавляемых слов (до 266) */
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
		create("div", "place", "swInp");
		create("button", "swBox", "swBox", "Заново...");
		create("button", "resort", "", "Перетасовать");
		create("div", "right", "swRight");
		swBox.onclick = function(){
			if(inp.placeholder !== ""){
				box.splice(0, box.length);
				localStorage.setItem("sto", JSON.stringify(box));
				take();
			}
		}
	}
	/* Работа с localStorage */
	function getBox(){
		var sto = localStorage.getItem("sto");
		if(!sto){
			localStorage.setItem("sto", JSON.stringify(box));
		}else{
			box = JSON.parse(sto);
		}
	}
	/* Кнопка для сортировки элементов массива в *случайном порядке */
	function butt(){
		resort.onclick = function(){
			luckySort(box);
			takeNew();
			textOut("Слова отсортировалися!!!");
			resort.className = "hidd";
		}
		function luckySort(someArr){
			someArr.sort(function(){
				return Math.random() - 0.5;
			});
		}
	}
	/* Кнопка играет роль главного переключателя *******************************************************/
	function clickKart(){
		kart.removeEventListener("click", clickKart);
		if(kart.className !== "Rs4b"){
			if(box.length != 0){
				takeNew();
				textOut("Печатай!!!");
				resort.className = "hidd";
			}else{
				take();
			}
		}else{
			takeWord();
			kart.className = "Sliz";
		}
	}
	/* Для работы с инпутом и его плейс-холдером *******************************************************/
	function inpOut(say){
		inp.placeholder = say;
		tt(place, inp.placeholder);
		inp.size = inp.placeholder.length;
		inf();
		inputcolor();
		inp.oninput = function(){
			inputcolor();
			if(inp.value === inp.placeholder){
				out();
				inp.value = "";
				inputcolor();
				inp.placeholder = "";
			}
			return false;
		}
		inp.onblur = function(){
			inp.style.opacity = 1;
			inp.onfocus = function(){
				inputcolor();
			}
		}
		function inputcolor(){
			if(inp.value.length !== 0){
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
				inp.focus();
				inpOut(tagOff.textContent);
				tagOff.className = "on";
			}else{
				if(right.className === "wordsRight"){
					localStorage.setItem("box", []);
				}
				rBody();
				create("center", "over", "", "Класс !!! У-у-у ...!!! " + localStorage.tot);
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
				textOut(wDone + " введено...");
			}
		}
	}
	/* Для вывода основного текста с небольшой задержкой ***********************************************/
	function textOut(c){
		function tagTime(a, b){
			setTimeout(function(){
				tt(right, a);
				if(a === c){
					out();
				}
			}, b * 30);
		}
		var symb = "";
		for(var s = 0; s < c.length; s++){
			symb = symb + c[s];
			tagTime(symb, s);
		}
	}
	/* Визуальный счетчик ******************************************************************************/
	function sWork(idA, idB){
		document.getElementById(idA).style.top = "100%";
		document.getElementById(idB).style.top = "0%";
	}
	/* Подсказка по колличеству оставшихся слов ********************************************************/
	function inf(){
		var place = inp.placeholder;
		var ofOff = document.getElementsByClassName("off").length;
		if(ofOff - 1 !== 0){
			tt(time, "Осталось " + ofOff + " ...");
		}else{
			tt(point, "...");
			tt(time, "Осталось ввести ‹" + place + "›, и всё.");
		}
	}
	/* Мышиная подсказка *******************************************************************************/
	document.body.addEventListener("mouseover", function(my){
		var mySome = my.toElement;
		if(mySome.id === "kart"){
			tt(time, "Нажми для выбора набора слов");
		}else if(mySome.id === "point"){
			tt(point, "Здесь будут подсказки...");
			tt(time, "Там будут подсказки...");
		}else if(mySome.id === "time"){
			tt(time, "Здесь будут подсказки...");
			tt(point, "Там будут подсказки...");
		}else if(mySome.id === "forTime"){
			tt(time, "Здесь будут подсказки...");
			tt(point, "И здесь...");
		}else if(mySome.id === "resort"){
			tt(time, "Кнопка для случайной сортировки слов...");
			if(inp.placeholder !== ""){
				tt(point, "Можно сортировать...");
			}else{
				tt(point, "сортировать нечего...");
			}
		}else if(mySome.id === "inp"){
			tt(time, "Для ввода...");
			if(inp.placeholder === ""){
				tt(point, "...пока нечего вводить");
			}else{
				inp.focus();
			}
		}else if(mySome.id === "boxButt"){
			tt(time, "Начать заново...");
		}else if(mySome.id === "len"){
			tt(time, "Содержит список еще не введенных слов...");
		}else if(mySome.id === "lookLen"){
			tt(time, "Содержит список уже введенных слов...");
		}else{
			if(mySome.className === "sw"){
				tt(time, "Добавить список...");
				tt(right, "Список слов на букву " + "'" + sw[mySome.id].lett + "'");
			}else if(mySome.className === "swOff"){
				tt(time, "Добавлен...");
				tt(right, "Подтвердить...");
			}else if(mySome.className === "swMax"){
				tt(time, "Превышает допустимый лимит...");
				tt(right, "Отменить...");
			}else if(mySome.className === "swBox"){
				tt(time, "Очистить...");
				tt(point, "");
				tt(right, "");
			}else if(mySome.className === "off"){
				tt(time, mySome.textContent);
				tt(point, "Не отвлекайся!!!");
			}else if(mySome.className === "out"){
				tt(time, "Не отвлекайся!!!");
				tt(point, mySome.textContent);
			}else{
				tt(time, "");
				tt(point, "");
			}
		}
	});
	/* Для вывода текста указанным елементом ***********************************************************/
	function tt(x, con){
		x.innerText = con;
	}
	/* Общая статистика ********************************************************************************/
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