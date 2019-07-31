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
			textOut("Печатай Ку-ку-ся!!!");
		}
	}
	/***************************************************************************************************/
	// Общий набор тегов для загрузки и обновления представления
	function rBody(){
		myBody.innerHTML = "";
		create("script", "scriptMary", "", 'maryWord.js');
		create("div", "forTime", "");
		create("pre", "time", "date");
		create("div", "point", "");
	}
	rBody();
	/***************************************************************************************************/
	// Для работы только с "maryWord" массивом
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
	// Для вывода текста интерактивно вне основного цикла программы. (короче - не мешает...)
	function askRight(what){
		right.innerText = what;
	}
	function askPoint(what){
		point.innerText = what;
	}
	/***************************************************************************************************/
	// Для работы с инпутом и его плейс-холдером
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
	// Полный цикл работы = 3-м фазам проверочных вызовов:
	// 1-й вызов ищет елемент с классом "on". Не обнаружив, берем "off" и меняем имя класса на "on"
	// 2-й вызов полюбому находит "on" и меняет это имя класса на "section"
	// 3-й вызов тупо не обнаружив нужные классы, заменяет всю хрень приятным сообщением "Ура!" :)
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
	// Для вывода основного текста с небольшой задержкой
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
	// Визуальный счетчик введенных слов
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
	// Подсказки
	function inf(){
		var place = inp.placeholder;
		var ofOff = document.getElementsByClassName("off").length;
		if(ofOff !== 0){
			askPoint("Осталось ввести " + (ofOff + 1));
		}else{
			askPoint("Осталось ввести ‹" + place + "›, и всё.");
		}
	}
	/***************************************************************************************************/
	function myTime(){
		setTimeout(function(){
			takeWord();
			time.innerText = "Вводи слово точно так, как сама написала...";
		}, 4000);
	}
	myTime();
	/***************************************************************************************************/
	function overV(){
		setTimeout(function(){
			create("center", "over", "", "У-у-у ...!!!");
			create("div", "gif", "");
		}, 2000);
	}
});