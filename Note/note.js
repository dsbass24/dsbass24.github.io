/*
	Note
	Created: 10/15/2019 02:06:54
	dsbass@rambler.ru
	dsbass24@gmail.com
*/
var loc = [];
document.addEventListener("DOMContentLoaded", function(e){
	
	var myBody = document.body;
	
	// Заглушка прелоадера. ****************************
	create("div", "preload", "on", "Note loading...");
	window.onload = function(){
		if(document.readyState == "complete"){
			preload.className = "off";
		}
	}
	//**************************************************
	
	function create(nametag, idtag, classtag, con){
		
		var tag = document.createElement(nametag);
		myBody.appendChild(tag);
		tag.id = idtag;
		
		if(idtag === "preload"){
			tag.className = classtag;
			tag.innerText = con;
		}
		
		if(idtag === "myText"){
			tag.placeholder = "... note ...";
			tag.addEventListener("focus", inpListen);
			//tag.focus();
		}
		if(idtag === "met"){
			platform.appendChild(tag);
			tag.type = "meter";
			tag.name = "meter";
			tag.step = 1;
			tag.min = 0;
		}
		if(nametag === "ul"){
			platform.appendChild(tag);
		}
		if(nametag === "li"){
			collist.appendChild(tag);
			tag.className = classtag;
			tag.innerText = con;
		}
		if(idtag === "add"){
			tag.innerText = "Add";
			tag.addEventListener("click", addText);
		}
		if(idtag === "del"){
			tag.innerText = "Delete";
			tag.addEventListener("click", delText);
		}
		if(idtag === "cor"){
			tag.innerText = "Change";
			tag.addEventListener("click", corText);
		}
		if(idtag === "up"){
			
			tag.src = con; // Адрес изображения
			
			tag.addEventListener("click", upText);
			tag.title = "up";
		}
		if(idtag === "dw"){
			
			tag.src = con; // Адрес изображения
			
			tag.addEventListener("click", dwText);
			tag.title = "down";
		}
		if(idtag === "fSize"){
			tag.addEventListener("input", newProp);
			tag.onmouseover = function(){
				tag.focus();
				tag.onmouseleave = function(){
					tag.blur();
				}
			}
			tag.type = "number";
			tag.step = 0.2;
			tag.min = 0;
			tag.value = 15;
			tag.title = con;
		}
	}
	/*======================================================================================*/
	
	create("textarea", "myText");
	create("div", "platform");
	create("meter", "met");
	create("ul", "collist");
	create("button", "add");
	create("button", "del");
	create("button", "cor");
	//create("button", "up");
	create("img", "up", "", "img/Up.ico");
	//create("button", "dw");
	create("img", "dw", "", "img/Down.ico");
	create("input", "fSize", "", "Text size");
	localReady();
	/*======================================================================================*/
	// Создает строку в списке при наличии в localStorage записей "basslist".
	// Для работы проэцируем в массив 'loc'.
	function localReady(){
		var basslist = localStorage.basslist;
		if(!basslist){
			localStorage.setItem("basslist", JSON.stringify(loc));
		}else{
			loc = JSON.parse(basslist);
			if(loc.length !== 0){
				for(var i = 0; i < loc.length; i++){
					if(loc[i] != null){
						create("li", i, "lib", loc[i][0]);
					}
				}
				puttext();
			}
		}
	}
	/*======================================================================================*/
	// Кнопка id="add" после нажатия - добавляет заметку сначала в массив 'loc',
	// а затем сохраняет весь массив в localStorage 'basslist'.
	function addText(){
		var val = myText.value;
		if(val.length !== 0){
			var date = new Date();
			var days = date.getDate();
			var mon = date.getMonth();
			var year = date.getFullYear();
			var hours = date.getHours();
			var min = date.getMinutes();
			var sec = date.getSeconds();
			if(days < 10){
				days = "0" + days;
			}
			if(mon < 10){
				mon = "0" + mon;
			}
			if(hours < 10){
				hours = "0" + hours;
			}
			if(min < 10){
				min = "0" + min;
			}
			if(sec < 10){
				sec = "0" + sec;
			}
			var myDate = days + "/" + mon + "/" + year + " " + hours + ":" + min + ":" + sec;
			val = myDate + "\n" + val;
			loc.unshift([val]);
			localStorage.setItem("basslist", JSON.stringify(loc));
			myText.value = "";
			collist.innerHTML = "";
			localReady();
			inpListen();
		}
	}
	/*======================================================================================*/
	// Определяет доступный интерфейс управления заметками.
	function selectFunc(){
		// Определяем выделеную заметку.
		var deltag = document.getElementsByClassName("dellist");
		// Если есть хотябы одна выделеная заметка.
		if(deltag[0] != undefined){
			// Кнопка для удаления заметок теперь доступна.
			del.style.bottom = "35%";
			// Если выделена только одна заметка.
			if(deltag.length === 1){
				// Доступна кнопка для редактирования заметки.
				cor.style.left = "4px";
				// Две кнопки для изменения очерёдности (порядкового номера заметки) в списке.
				// Кнопка для перемещения заметки "выше",
				up.style.right = "10px";
				// и кнопка для перемещения заметки "ниже".
				dw.style.right = "10px";
			}else{
				// Если выделеных заметок больше одной,
				// то кнопки для редактирования и перемещения заметок - недоступны.
				cor.style.left = "-100px";
				up.style.right = "-120px";
				dw.style.right = "-120px";
			}
		}else{
			// Если нихера не выделено!
			// Все кнопки управления заметками - недоступны.
			cor.style.left = "-100px";
			del.style.bottom = "-50px";
			up.style.right = "-120px";
			dw.style.right = "-120px";
		}
	}
	/*======================================================================================*/
	// Выделяем заметки, и делаем что задумали.
	function puttext(){
		collist.onclick = function(k){
			var mytag = k.target;
			if(mytag.className === "lib"){
				mytag.className = "dellist";
				selectFunc();
			}else if(mytag.className === "dellist"){
				mytag.className = "lib";
				selectFunc();
			}
		}
	}
	/*======================================================================================*/
	// Для визуального фокуса ввода.
	function inpListen(){
		if(myText.value.length === 0){
			add.style.left = "-90px";
		}else{
			platform.style.left = "75%";
			add.style.left = "4px";
			myText.style.top = "10%";
		}
		myText.oninput = function(){
			inpListen();
		}
	}
	/*======================================================================================*/
	// Удалить заметку.
	function delText(){
		var newloc = [];
		var deltag = document.getElementsByClassName("dellist")[0];
		if(deltag !== undefined){
			var savetag = document.getElementsByClassName("lib");
			if(savetag.length !== 0){
				for(var i = 0; i < savetag.length; i++){
					newloc.push(loc[savetag[i].id]);
				}
				localStorage.setItem("basslist", JSON.stringify(newloc));
				collist.innerHTML = "";
				localReady();
			}else{
				localStorage.setItem("basslist", JSON.stringify(newloc));
				loc.splice(0, loc.length);
				collist.innerHTML = "";
				localReady();
			}
		}
		selectFunc();
	}
	/*======================================================================================*/
	// Редактируем заметку в <textarea>.
	function corText(){
		myText.focus();
		var delCont = document.getElementsByClassName("dellist")[0];
		myText.value = delCont.innerText;
		inpListen();
	}
	/*======================================================================================*/
	// ... текст ...
	function newCon(tag, con){
		tag.innerText = con;
	}
	/*======================================================================================*/
	// Создаём структуру списка заметок после редактирования.
	function newColList(idClass){
		var newloc = [];
		var colCon = collist.childNodes;
		for(var i = 0; i < colCon.length; i++){
			newloc.push([colCon[i].outerText]);
		}
		localStorage.setItem("basslist", JSON.stringify(newloc));
		collist.innerHTML = "";
		localReady();
		colCon[idClass].scrollIntoView({ behavior: 'smooth' });
		colCon[idClass].className = "dellist";
	}
	/*======================================================================================*/
	// Перемещение заметки выше.
	function upText(){
		var el = document.getElementsByClassName("dellist");
		if(el[0] != undefined && el.length === 1){
			if(el[0].previousSibling != undefined){
				var prev = el[0].previousSibling;
				newCon(prev, loc[el[0].id]);
				newCon(el[0], loc[prev.id]);
				el[0].className = "lib";
				newColList(prev.id);
				this.blur();
			}
		}
	}
	// Перемещение заметки ниже.
	function dwText(){
		var el = document.getElementsByClassName("dellist");
		if(el[0] != undefined && el.length === 1){
			if(el[0].nextSibling != undefined){
				var nex = el[0].nextSibling;
				newCon(nex, loc[el[0].id]);
				newCon(el[0], loc[nex.id]);
				el[0].className = "lib";
				newColList(nex.id);
				this.blur();
			}
		}
	}
	/*======================================================================================*/
	// Это для скроллинга колесом мыши.
	collist.addEventListener("wheel", function(s){
		var idN = s.toElement;
		var d = s.deltaY;
		if(d > 0){
			if(idN.localName === "li"){
				p(1, 20, 15);
			}else{
				p(2, 100, 1.5);
			}
		}else{
			if(idN.localName === "li"){
				p(-1, 20, 15);
			}else{
				p(-2, 100, 1.5);
			}
		}
		function p(w, c, t){
			var iTime = function(){
				setTimeout(function(){
					window.scrollBy(0, w);
				}, i * t);
			}
			for(var i = 0; i < c; i++){
				iTime();
			}
		}
	});
	/*======================================================================================*/
	// Визуальное и практическое разделение функционала.
	// Установка приоритетности отображения для просмотра списка заметок,
	// и во время создания новой заметки.
	platform.addEventListener("click", function(c){
		var el = c.target;
		if(el.id === "collist" && myText.value.length === 0){
			if(platform.offsetLeft != 0){
				myText.style.top = "-50px";
				platform.style.left = "0px";
				inpListen();
			}else{
				platform.style.left = "75%";
				myText.style.top = "10%";
			}
		}
	});
	/*======================================================================================*/
	// Слушатель скроллинга страницы.
	this.addEventListener("scroll", contEl);
	// Функция визуально компенсирует отсутствие скроллбара.
	function contEl(){
		met.max = platform.offsetHeight - innerHeight;
		// Полоса прокрутки документа.
		met.value = scrollY;
		/*******************************************************************
		//fSize.style = "transform:rotate(-" + scrollY + "deg)";
		var topList = collist.childNodes;
		for(var t = 0; t < topList.length; t++){
			//console.log(topList[t].offsetTop, scrollY, innerHeight);
			if(topList[t].offsetTop - pageYOffset > 0){
				//topList[t].style = "transform:rotate3d(1, 0, 0, 360deg)";
			}else{
				//topList[t].style = "transform:rotate3d(1, 0, 0, 0deg)";
			}
		}
		*******************************************************************/
	}
	/*======================================================================================*/
	// Для быстрого листания клавишами клавиатуры.
	document.addEventListener("keydown", function(k){
		var myKey;
		if(k.target.id === "myText"){
			myKey = null;
		}else if(k.target.id === "fSize"){
			myKey = null;
		}else{
			myKey = k.keyCode;
			if(myKey === 40){
				//window.scrollBy(0, 100 * 4);
				window.scrollBy(0, innerHeight);
			}
			if(myKey === 38){
				//window.scrollBy(0, -100 * 4);
				window.scrollBy(0, -innerHeight);
			}
		}
	});
	/*======================================================================================*/
	// Для изменения размера текста заметок.
	function newProp(prop){
		platform.style.fontSize = this.value + "px";
	}
});