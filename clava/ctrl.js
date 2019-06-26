/*
	ctrl
	
	Author: dsbass24
	e-mail: dsbass@rambler.ru
	Сделал для себя, ПОТОМУ ЧТО МЕДЛЕННО НАБИРАЛ ТЕКСТ НА КЛАВИАТУРЕ !!!
*/
document.addEventListener("DOMContentLoaded", function(e){
	var myBody = document.body;
	myBody.className = "myBody";
	function create(tag, id, cl, con){
		var myTag = document.createElement(tag);
		myTag.id = id;
		myTag.className = cl;
		myBody.appendChild(myTag);
		if(tag === "pre"){
			forTime.appendChild(myTag);
		}
		if(id === "point"){
			forTime.appendChild(myTag);
		}
		if(id === "kart"){
			myTag.addEventListener("click", clickKart);
		}
		if(tag === "section"){
			myTag.innerText = con;
			if(cl === "off"){
				len.appendChild(myTag);
			}
			if(cl === "out"){
				lookLen.appendChild(myTag);
			}
			/***********************************/
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
				textOut("Печатай!!!");
			}else{
				takeSWWord();
			}
		}
	}
	/***************************************************************************************************/
	// Общий набор тегов для загрузки и обновления представления
	function rBody(){
		myBody.innerHTML = "";
		create("div", "forTime", "");
		create("pre", "time", "date");
		create("div", "point", "");
		create("div", "kart", "Rs4b");
	}
	rBody();
	/***************************************************************************************************/
	// Для работы только с "words" массивом
	function takeWord(){
		create("div", "len", "");
		create("div", "lookLen", "");
		create("div", "left", "");
		create("input", "inp", "wordsInp");
		for(var i = 0; i < words.length; i++){
			var wTime = function(i){
				setTimeout(function(){
					create("section", i, "off", words[i].eng);
					create("section", "len" + i, "out", words[i].rus);
				}, i * 1);
			}
			wTime(i);
		}
		create("div", "right", "wordsRight");
	}
	/***************************************************************************************************/
	// Для работы только с "sw" массивом
	function take(){
		create("div", "len", "");
		create("div", "lookLen", "");
		create("div", "left", "");
		create("input", "inp", "swInp");
		create("div", "one", "");
		for(var i = 0; i < sw.length; i++){
			var lettTime = function(i){
				setTimeout(function(){
					create("section", i, "sw", sw[i].lett + " : " + sw[i].word.length);
				}, i * 10);
			}
			lettTime(i);
		}
		create("div", "right", "swRight");
	}
	function takeSWWord(){
		one.addEventListener("click", function(j){
			var look = j.toElement;
			if(look.className === "sw"){
				look.className = "swOff";
				wordLen(look.id);
				actLen();
			}else if(look.className === "swOff"){
				rBody();
				take();
			}
		});
		function wordLen(ob){
			for(var i = 0; i < sw[ob].word.length; i++){
				var swTime = function(i){
					setTimeout(function(){
						create("section", "sw" + ob + "-" + i, "off", sw[ob].word[i]);
						create("section", "len" + "sw" + ob + "-" + i, "out", sw[ob].word[i]);
						inf();
					}, i * 5);
				}
				swTime(i);
			}
		}
		function actLen(){
			if(inp.placeholder === ""){
				textOut("Печатай!!!");
			}else{
				askRight("Добавлено.");
			}
		}
	}
	/***************************************************************************************************/
	// Для выбора массива (набора слов), с которым хотим работать
	function clickKart(){
		if(kart.className === "Sliz"){
			rBody();
			take();
			kart.className = "Rs4b";
		}else if(kart.className === "Rs4b"){
			rBody();
			takeWord();
			kart.className = "Sliz";
		}else{
			rBody();
			takeWord();
			kart.className = "Sliz";
		}
	}
	/***************************************************************************************************/
	// Работает только с массивом "words"
	// Убирает выбранное количество слов
	function setStart(){
		len.addEventListener("click", function(see){
			var look = see.toElement;
			if(look.className === "off"){
				minWords(look.id);
			}
		});
		function minWords(t){
			var childOff = len.childNodes;
			for(var w = 0; w <= t; w++){
				var chTime = function(w){
					setTimeout(function(){
						childOff[w].className = "section";
						askRight("Убираю " + w + " слов...");
						askPoint(words[w].eng);
						sWork(w);
						sWork("len" + w);
						if(w == t){
							askRight("Было удалено " + t + " words!");
							out();
						}
					}, w * 40);
				}
				chTime(w);
			}
		}
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
				create("center", "over", "", "Класс !!! У-у-у ...!!!");
				create("div", "gif", "");
			}
		}else{
			tagOn.className = "section";
			if(right.className === "wordsRight"){
				//textOut(document.getElementById("len" + tagOn.id).textContent);
				textOut(words[tagOn.id].eng + " : " + words[tagOn.id].rus);
			}else{
				var wDone = document.getElementsByClassName("section").length;
				textOut(wDone + " введено...");
			}
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
			}, b * 66);
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
	document.body.addEventListener("mouseover", function(my){
		var mySome = my.toElement;
		if(mySome.id === "kart"){
			askPoint("Нажми для выбора набора слов");
		}else{
			if(mySome.className === "sw"){
				askRight("Добавить слова на букву " + sw[mySome.id].lett);
			}else if(mySome.className === "swOff"){
				askRight("Очистить...");
			}else if(mySome.className === "off"){
				askPoint(mySome.textContent);
			}else if(mySome.className === "out"){
				askPoint(mySome.textContent);
			}else{
				askPoint("");
				myTime();
			}
		}
	});
	function myTime(){
		setTimeout(function(){
			time.innerText = "Вводи слово точно так, как показано...";
		}, 6000);
	}
});
/*

*/
var words = [
	{
		eng : "say",
		rus : "[сэй] - сказать - said - said [сэд]"
	},
	{
		eng : "pay",
		rus : "[пэй] - платить - paid - paid [пэйд]"
	},
	{
		eng : "lay",
		rus : "[лэй] - класть - laid - laid [лэйд]"
	},
	{
		eng : "something",
		rus : "(самсин) - что-нубудь, в утверждении."
	},
	{
		eng : "anything",
		rus : "(энисин) - что-нубудь, в вопросе и отрицании. Do you have ANYthing? I do not have ANYthing."
	},
	{
		eng : "everything",
		rus : "(еврисин) - всё"
	},
	{
		eng : "what",
		rus : "(уот) – что, What will you drink? what + существительное - какой, What wine will you drink?"
	},
	{
		eng : "who",
		rus : "(ху) - кто"
	},
	{
		eng : "where",
		rus : "(уэa) – где, Where do you live? where + глагол движения – куда, Where will you go?"
	},
	{
		eng : "why",
		rus : "(уай) - почему"
	},
	{
		eng : "when",
		rus : "(уэн) - когда"
	},
	{
		eng : "how",
		rus : "(хау) - как"
	},
	{
		eng : "please",
		rus : "(плиз) - пожалуйста, прошу"
	},
	{
		eng : "sorry",
		rus : "(сори) - извините"
	},
	{
		eng : "you are welcome",
		rus : "(ю а вэлкам) - пожалуйста, не за что"
	},
	{
		eng : "goodbye",
		rus : "(гудбай) - до свидания, пока"
	},
	{
		eng : "see you",
		rus : "(cи ю) - увидимся"
	},
	{
		eng : "but",
		rus : "(бат) - но"
	},
	{
		eng : "because",
		rus : "(бикоз) - потому что"
	},
	{
		eng : "that",
		rus : "(зэт) – что"
	},
	{
		eng : "from",
		rus : "(фром) - из"
	},
	{
		eng : "with",
		rus : "(уиз) - с"
	},
	{
		eng : "without",
		rus : "(визаут) - без"
	},
	{
		eng : "before",
		rus : "(бифо) - до"
	},
	{
		eng : "after",
		rus : "(афтэ) – после"
	},
	{
		eng : "between",
		rus : "(битуин) - между"
	},
	{
		eng : "near",
		rus : "(ниэ) - возле"
	},
	{
		eng : "you",
		rus : "(ю) – ты; вы; Вы"
	},
	{
		eng : "he",
		rus : "(хи) - он"
	},
	{
		eng : "she",
		rus : "(ши) - она"
	},
	{
		eng : "it",
		rus : "(ит) - оно"
	},
	{
		eng : "we",
		rus : "(уи) - мы"
	},
	{
		eng : "they",
		rus : "(зэй) - они"
	},
	{
		eng : "your",
		rus : "(ё) – твой, ваш"
	},
	{
		eng : "his",
		rus : "(хиз) - его"
	},
	{
		eng : "her",
		rus : "(хё) – её"
	},
	{
		eng : "our",
		rus : "(ауэ) - наш"
	},
	{
		eng : "their",
		rus : "(зээ) – их"
	},
	{
		eng : "make",
		rus : "(мэйк) - делать, изготовлять, придумывать"
	},
	{
		eng : "live",
		rus : "(лив) - жить"
	},
	{
		eng : "come",
		rus : "(кам) - приходить, приезжать"
	},
	{
		eng : "can",
		rus : "(кэн) - мочь физически"
	},
	{
		eng : "may",
		rus : "(мэй) - мочь, иметь разрешение"
	},
	{
		eng : "be able",
		rus : "(би уйбл) - мочь, быть способным на сложное"
	},
	{
		eng : "must",
		rus : "(маст) - быть должным"
	},
	{
		eng : "should",
		rus : "(шуд) - быть должным в несколько раз слабее."
	},
	{
		eng : "show",
		rus : "(шоу) - показывать"
	},
	{
		eng : "ask",
		rus : "(аск) - спрашивать"
	},
	{
		eng : "hear",
		rus : "(хиэ) - слышать"
	},
	{
		eng : "question",
		rus : "(квэшн) - вопрос"
	},
	{
		eng : "answer",
		rus : "(ансэр) - отвечать, ответ"
	},
	{
		eng : "explain",
		rus : "(иксплэйн) - объяснять"
	},
	{
		eng : "meet",
		rus : "(мит) - встречать, знакомиться"
	},
	{
		eng : "give",
		rus : "(гив) - давать"
	},
	{
		eng : "take",
		rus : "(тэйк) - брать, забирать, уносить"
	},
	{
		eng : "bring",
		rus : "(бринг) - приносить, привозить"
	},
	{
		eng : "invite",
		rus : "(инвайт) - приглашать"
	},
	{
		eng : "stand",
		rus : "(стэнд) - стоять"
	},
	{
		eng : "tell",
		rus : "(тэл) - сказать кому-то что-то"
	},
	{
		eng : "speak",
		rus : "(спик) - разговаривать, говорить"
	},
	{
		eng : "talk",
		rus : "(ток) - говорить, более разговорное слово"
	},
	{
		eng : "here",
		rus : "(хиэ) – здесь; сюда"
	},
	{
		eng : "there",
		rus : "(зээ) – там; туда"
	},
	{
		eng : "already",
		rus : "(олрэди) - уже"
	},
	{
		eng : "still",
		rus : "(стил) – еще, в утверждении"
	},
	{
		eng : "yet",
		rus : "(йет) – еще (не), в отрицании"
	},
	{
		eng : "such",
		rus : "(сач) – такой"
	},
	{
		eng : "so",
		rus : "(соу) - так"
	},
	{
		eng : "every",
		rus : "(эври) - каждый"
	},
	{
		eng : "very",
		rus : "(вэри) - очень"
	},
	{
		eng : "many",
		rus : "(мэни) - много + слово во мн.числе"
	},
	{
		eng : "much",
		rus : "(мач) - много + слово в ед.числе"
	},
	{
		eng : "few",
		rus : "(фью) - мало + слово во мн.числе. few - несколько и недостаточно, мало. А few - несколько и достаточно."
	},
	{
		eng : "little",
		rus : "(литл) - мало + слово в ед.числе. little - немного и недостаточно, мало. А little - немного и достаточно."
	},
	{
		eng : "address",
		rus : "(эдрэс) - адрес"
	},
	{
		eng : "phone number",
		rus : "(фоун намбэр) - номер телефона"
	},
	{
		eng : "age",
		rus : "(эйдж) - возраст"
	},
	{
		eng : "married",
		rus : "(мэррид) - женатый, замужняя"
	},
	{
		eng : "letter",
		rus : "(лэттэр) - письмо"
	},
	{
		eng : "email",
		rus : "(имейл) - емейл"
	},
	{
		eng : "people",
		rus : "(пипл)- люди"
	},
	{
		eng : "man",
		rus : "(мэн)- мужчина"
	},
	{
		eng : "woman",
		rus : "(вумэн) – женщина"
	},
	{
		eng : "child",
		rus : "(чайлд) - ребенок"
	},
	{
		eng : "boy",
		rus : "(бой) - мальчик"
	},
	{
		eng : "girl",
		rus : "(гёрл)- девочка"
	},
	{
		eng : "friend",
		rus : "(фрэнд)- друг"
	},
	{
		eng : "job",
		rus : "(джоб) - работа оплачиваемая"
	},
	{
		eng : "work",
		rus : "(вёрк) - работа как занятость"
	},
	{
		eng : "teacher",
		rus : "(тичер) - учитель"
	},
	{
		eng : "driver",
		rus : "(драйвэр) - водитель"
	},
	{
		eng : "worker",
		rus : "(уоркер) - рабочий"
	},
	{
		eng : "engineer",
		rus : "(энджиниэр) - инженер"
	},
	{
		eng : "doctor",
		rus : "(доктор) - врач"
	},
	{
		eng : "nurse",
		rus : "(нёрс) - медсестра"
	},
	{
		eng : "shop assistant",
		rus : "(шоп эссистэнт) - продавец"
	},
	{
		eng : "accountant",
		rus : "(экаунтэнт) - бухгалтер"
	},
	{
		eng : "student",
		rus : "(стъюдент) – студент"
	},
	{
		eng : "pupil",
		rus : "(пъюпл) - школьник"
	},
	{
		eng : "have",
		rus : "(хэв) - иметь"
	},
	{
		eng : "will",
		rus : "(вил) - буду, будет"
	},
	{
		eng : "go",
		rus : "(гоу) – идти, ехать, уезжать"
	},
	{
		eng : "see",
		rus : "(си) - видеть"
	},
	{
		eng : "look",
		rus : "(лук) - смотреть"
	},
	{
		eng : "call",
		rus : "(кол) - звонить по телефону, звать"
	},
	{
		eng : "send",
		rus : "(сэнд) - посылать"
	},
	{
		eng : "get",
		rus : "(гэт) - получать, добираться"
	},
	{
		eng : "now",
		rus : "(нау) - сейчас, теперь"
	},
	{
		eng : "family",
		rus : "(фэмили) - семья"
	},
	{
		eng : "parents",
		rus : "(пээрэнтс) - родители"
	},
	{
		eng : "father",
		rus : "(фазер) - отец"
	},
	{
		eng : "mother",
		rus : "(мазер) - мать"
	},
	{
		eng : "husband",
		rus : "(хазбэнд) – муж"
	},
	{
		eng : "wife",
		rus : "(уайф) - жена"
	},
	{
		eng : "son",
		rus : "(сан) - сын"
	},
	{
		eng : "daughter",
		rus : "(дотэр) - дочь"
	},
	{
		eng : "brother",
		rus : "(бразер) - брат"
	},
	{
		eng : "sister",
		rus : "(систер) - сестра"
	},
	{
		eng : "grandfather",
		rus : "(грэндфазер) - дедушка"
	},
	{
		eng : "grandmother",
		rus : "(грэндмазер) - бабушка"
	},
	{
		eng : "uncle",
		rus : "(анкл) - дядя"
	},
	{
		eng : "aunt",
		rus : "(ант) - тетя"
	},
	{
		eng : "eat",
		rus : "(ит) - есть, кушать"
	},
	{
		eng : "drink",
		rus : "(дринк) - пить"
	},
	{
		eng : "cook",
		rus : "(кук) - варить; готовить"
	},
	{
		eng : "sell",
		rus : "(сэл) - продавать"
	},
	{
		eng : "buy",
		rus : "(бай) - покупать"
	},
	{
		eng : "price",
		rus : "(прайз) - цена"
	},
	{
		eng : "money",
		rus : "(мани) - деньги"
	},
	{
		eng : "try",
		rus : "(трай) - пытаться, пробовать"
	},
	{
		eng : "find",
		rus : "(файнд) - находить"
	},
	{
		eng : "fall",
		rus : "(фол) - падать"
	},
	{
		eng : "read",
		rus : "(рид) - читать"
	},
	{
		eng : "play",
		rus : "(плэй) - играть"
	},
	{
		eng : "think",
		rus : "(синк) - думать"
	},
	{
		eng : "want",
		rus : "(уонт) - хотеть"
	},
	{
		eng : "know",
		rus : "(ноу) - знать"
	},
	{
		eng : "feel",
		rus : "(фил) - чувствовать"
	},
	{
		eng : "be sure",
		rus : "(би шуэр) - быть уверенным"
	},
	{
		eng : "time",
		rus : "(тайм) – время"
	},
	{
		eng : "year",
		rus : "(йер) - год"
	},
	{
		eng : "week",
		rus : "(уик) - неделя"
	},
	{
		eng : "hour",
		rus : "(ауэр) - час"
	},
	{
		eng : "minute",
		rus : "(минит) – минута"
	},
	{
		eng : "yesterday",
		rus : "(йестэдэй) - вчера"
	},
	{
		eng : "today",
		rus : "(тудэй) – сегодня"
	},
	{
		eng : "tomorrow",
		rus : "(томорроу) - завтра"
	},
	{
		eng : "holiday",
		rus : "(холидэй) - праздник"
	},
	{
		eng : "morning",
		rus : "(морнинг) – утро"
	},
	{
		eng : "day",
		rus : "(дэй) - день"
	},
	{
		eng : "night",
		rus : "(найт) - ночь"
	},
	{
		eng : "Monday",
		rus : "(мандэй) - понедельник"
	},
	{
		eng : "Tuesday",
		rus : "(тъуздэй) - вторник"
	},
	{
		eng : "Wednesday",
		rus : "(уэнздэй) - среда"
	},
	{
		eng : "Thursday",
		rus : "(сёрздэй) - четверг"
	},
	{
		eng : "Friday",
		rus : "(фрайдэй) - пятница"
	},
	{
		eng : "Saturday",
		rus : "(сэтэрдэй) - суббота"
	},
	{
		eng : "Sunday",
		rus : "(сандэй) - воскресенье"
	},
	{
		eng : "month",
		rus : "(манс) - месяц"
	},
	{
		eng : "January",
		rus : "(джэньюэри)- январь"
	},
	{
		eng : "February",
		rus : "(фэбруэри) - февраль"
	},
	{
		eng : "March",
		rus : "(марч) - март"
	},
	{
		eng : "April",
		rus : "(эйприл) - апрель"
	},
	{
		eng : "May",
		rus : "(мэй) - май"
	},
	{
		eng : "June",
		rus : "(джун) - июнь"
	},
	{
		eng : "July",
		rus : "(джулай) - июль"
	},
	{
		eng : "August",
		rus : "(огэст) - август"
	},
	{
		eng : "September",
		rus : "(сэптэмбэр) - сентябрь"
	},
	{
		eng : "October",
		rus : "(октоубэр) - октябрь"
	},
	{
		eng : "November",
		rus : "(ноувэмбэр) - ноябрь"
	},
	{
		eng : "December",
		rus : "(дисэмбэр) - декабрь"
	},
	{
		eng : "sleep",
		rus : "(слип) - спать"
	},
	{
		eng : "wake",
		rus : "(уэйк) - будить"
	},
	{
		eng : "wash",
		rus : "(уош) - мыть, cтирать"
	},
	{
		eng : "try",
		rus : "(трай) - пытаться, пробовать"
	},
	{
		eng : "find",
		rus : "(файнд) - находить"
	},
	{
		eng : "bring",
		rus : "(бринг) - приносить, привозить"
	},
	{
		eng : "smile",
		rus : "(смайл) - улыбаться"
	},
	{
		eng : "cost",
		rus : "(кост) - стоить"
	},
	{
		eng : "learn",
		rus : "(лёрн) - учиться"
	},
	{
		eng : "teach",
		rus : "(тич) - обучать"
	},
	{
		eng : "write",
		rus : "(райт) - писать"
	},
	{
		eng : "change",
		rus : "(чэйндж) - (из)менять"
	},
	{
		eng : "close",
		rus : "(клоуз) - закрывать"
	},
	{
		eng : "open",
		rus : "(оупэн) - открывать"
	},
	{
		eng : "dance",
		rus : "(данс) - танцевать"
	},
	{
		eng : "collect",
		rus : "(коллект) - собирать"
	},
	{
		eng : "love",
		rus : "(лав) - любить"
	},
	{
		eng : "draw",
		rus : "(дро) – рисовать"
	},
	{
		eng : "choose",
		rus : "(чуз) - выбирать"
	},
	{
		eng : "thing",
		rus : "(синг) - вещь"
	},
	{
		eng : "pen",
		rus : "(пэн) – ручка"
	},
	{
		eng : "book",
		rus : "(бук) - книга"
	},
	{
		eng : "telephone",
		rus : "(тэлифоун) - телефон"
	},
	{
		eng : "TV-set",
		rus : "(тивисэт) - телевизор"
	},
	{
		eng : "bag",
		rus : "(бэг) - сумка"
	},
	{
		eng : "map",
		rus : "(мэп) – карта"
	},
	{
		eng : "card",
		rus : "(кард) - открытка"
	},
	{
		eng : "camera",
		rus : "(кэмэрэ) - фотоаппарат, камера"
	},
	{
		eng : "picture",
		rus : "(пикчэр) - картинка"
	},
	{
		eng : "paper",
		rus : "(пэйпэр) - бумага"
	},
	{
		eng : "newspaper",
		rus : "(ньюспэйпер) - газета"
	},
	{
		eng : "city",
		rus : "(сити) - город большой"
	},
	{
		eng : "town",
		rus : "(таун) - город маленький"
	},
	{
		eng : "flat",
		rus : "(флэт) - квартира"
	},
	{
		eng : "cafe",
		rus : "(кэфэй) - кафе"
	},
	{
		eng : "food",
		rus : "(фуд) - еда"
	},
	{
		eng : "school",
		rus : "(скул) - школа"
	},
	{
		eng : "square",
		rus : "(сквэар) - площадь"
	},
	{
		eng : "house",
		rus : "(хаус) - дом"
	},
	{
		eng : "river",
		rus : "(ривэр) - река"
	},
	{
		eng : "hotel",
		rus : "(хоутэл) - гостиница"
	},
	{
		eng : "park",
		rus : "(парк) - парк"
	},
	{
		eng : "bank",
		rus : "(бэнк) – банк"
	},
	{
		eng : "cinema",
		rus : "(синэмэ) - кинотеатр"
	},
	{
		eng : "hospital",
		rus : "(хоспитл) - больница"
	},
	{
		eng : "market",
		rus : "(маркит) - рынок"
	},
	{
		eng : "police",
		rus : "(полис) - полиция"
	},
	{
		eng : "station",
		rus : "(стэйшн) - станция, вокзал"
	},
	{
		eng : "centre",
		rus : "(сэнтэр) - центр"
	},
	{
		eng : "shop",
		rus : "(шоп) - магазин"
	},
	{
		eng : "surprise",
		rus : "(сёпрайз) – сюрприз"
	},
	{
		eng : "problem",
		rus : "(проблем) - проблема"
	},
	{
		eng : "street",
		rus : "(стрит) - улица; дорога"
	},
	{
		eng : "stop",
		rus : "(стоп) – остановка"
	},
	{
		eng : "crossing",
		rus : "(кроссинг) - перекрёсток"
	},
	{
		eng : "place",
		rus : "(плэйс) – место"
	},
	{
		eng : "car",
		rus : "(кар) - автомобиль"
	},
	{
		eng : "tram",
		rus : "(трэм) - трамвай"
	},
	{
		eng : "bus",
		rus : "(бас) - автобус"
	},
	{
		eng : "train",
		rus : "(трэйн) - поезд"
	},
	{
		eng : "plane",
		rus : "(плэйн) - самолет"
	},
	{
		eng : "ticket",
		rus : "(тикит) - билет"
	},
	{
		eng : "season",
		rus : "(сизн) - сезон, время года"
	},
	{
		eng : "spring",
		rus : "(спринг) - весна"
	},
	{
		eng : "summer",
		rus : "(саммэр) - лето"
	},
	{
		eng : "autumn",
		rus : "(отэм) - осень"
	},
	{
		eng : "winter",
		rus : "(уинтэр) - зима"
	},
	{
		eng : "weather",
		rus : "(уэзэр) - погода"
	},
	{
		eng : "rain",
		rus : "(рэйн) - дождь"
	},
	{
		eng : "wind",
		rus : "(уинд) - ветер"
	},
	{
		eng : "snow",
		rus : "(сноу) - снег"
	},
	{
		eng : "sky",
		rus : "(скай) - небо"
	},
	{
		eng : "sun",
		rus : "(сан) - солнце"
	},
	{
		eng : "colour",
		rus : "(калэ) - цвет"
	},
	{
		eng : "black",
		rus : "(блэк) - чёрный"
	},
	{
		eng : "blue",
		rus : "(блу) - голубой; синий"
	},
	{
		eng : "brown",
		rus : "(браун) - коричневый"
	},
	{
		eng : "green",
		rus : "(грин) - зелёный"
	},
	{
		eng : "grey",
		rus : "(грэй) - серый"
	},
	{
		eng : "red",
		rus : "(рэд) - красный"
	},
	{
		eng : "white",
		rus : "(уайт) - белый"
	},
	{
		eng : "yellow",
		rus : "(йеллоу) - жёлтый"
	},
	{
		eng : "quality",
		rus : "(кволити) - качество, свойство"
	},
	{
		eng : "old",
		rus : "(оулд) - старый"
	},
	{
		eng : "young",
		rus : "(янг) - молодой"
	},
	{
		eng : "new",
		rus : "(нью) - новый"
	},
	{
		eng : "big",
		rus : "(биг) - большой"
	},
	{
		eng : "small",
		rus : "(смол) - маленький"
	},
	{
		eng : "hungry",
		rus : "(хангри) - голодный"
	},
	{
		eng : "full",
		rus : "(фул) – сытый; полный"
	},
	{
		eng : "good",
		rus : "(гуд) - хороший"
	},
	{
		eng : "bad",
		rus : "(бэд) - плохой"
	},
	{
		eng : "early",
		rus : "(ёли) - ранний"
	},
	{
		eng : "late",
		rus : "(лэйт) - поздний"
	},
	{
		eng : "last",
		rus : "(ласт) - последний, прошлый"
	},
	{
		eng : "next",
		rus : "(нэкст) - следующий"
	},
	{
		eng : "free",
		rus : "(фри) – свободный; бесплатный"
	},
	{
		eng : "hot",
		rus : "(хот) - жаркий; горячий"
	},
	{
		eng : "warm",
		rus : "(уорм) - тёплый"
	},
	{
		eng : "cold",
		rus : "(коулд) - холодный"
	},
	{
		eng : "high",
		rus : "(хай) - высокий"
	},
	{
		eng : "tall",
		rus : "(тол) – высокий (о росте)"
	},
	{
		eng : "short",
		rus : "(шорт) – короткий; низкий"
	},
	{
		eng : "long",
		rus : "(лонг) – длинный; долгий"
	},
	{
		eng : "heavy",
		rus : "(хэви) - тяжёлый"
	},
	{
		eng : "light",
		rus : "(лайт) – лёгкий; светлый"
	},
	{
		eng : "dark",
		rus : "(дарк) - тёмный"
	},
	{
		eng : "expensive",
		rus : "(икспэнсив) - дорогой"
	},
	{
		eng : "cheap",
		rus : "(чип) - дешёвый"
	},
	{
		eng : "left",
		rus : "(лэфт) - cлева"
	},
	{
		eng : "right",
		rus : "(райт) – справа; правильный"
	},
	{
		eng : "fast",
		rus : "(фаст) - быстрый"
	},
	{
		eng : "slow",
		rus : "(слоу) - медленный"
	},
	{
		eng : "soft",
		rus : "(софт) - мягкий"
	},
	{
		eng : "hard",
		rus : "(хард) - твёрдый"
	},
	{
		eng : "beautiful",
		rus : "(бъютифул) – красивая"
	},
	{
		eng : "handsome",
		rus : "(хэнсэм) - красивый"
	},
	{
		eng : "careful",
		rus : "(кээфул) – внимательный"
	},
	{
		eng : "sad",
		rus : "(сэд) - печальный"
	},
	{
		eng : "glad",
		rus : "(глэд) - радостный"
	},
	{
		eng : "happy",
		rus : "(хэппи) - счастливый"
	},
	{
		eng : "ready",
		rus : "(рэди) - готовый"
	},
	{
		eng : "angry",
		rus : "(энгри) - сердитый"
	},
	{
		eng : "main",
		rus : "(мэйн) - основной, главный"
	},
	{
		eng : "number",
		rus : "(намбэр) - номер, число"
	},
	{
		eng : "figure",
		rus : "(фигэ) - цифра"
	},
	{
		eng : "one",
		rus : "(уан) - один"
	},
	{
		eng : "two",
		rus : "(ту) - два"
	},
	{
		eng : "three",
		rus : "(сри) - три"
	},
	{
		eng : "four",
		rus : "(фо) - четыре"
	},
	{
		eng : "five",
		rus : "(файв) - пять"
	},
	{
		eng : "six",
		rus : "(сикс) - шест"
	},
	{
		eng : "seven",
		rus : "(сэвэн) - семь"
	},
	{
		eng : "eight",
		rus : "(эйт) - восемь"
	},
	{
		eng : "nine",
		rus : "(найн) - девять"
	},
	{
		eng : "ten",
		rus : "(тэн) - десять"
	},
	{
		eng : "eleven",
		rus : "(илэвн) - одиннадцать"
	},
	{
		eng : "twelve",
		rus : "(туэлв) - двенадцать"
	},
	{
		eng : "thirteen",
		rus : "(сётин) - тринадцать"
	},
	{
		eng : "fourteen",
		rus : "(фотин) - четырнадцать"
	},
	{
		eng : "fifteen",
		rus : "(фифтин) - пятнадцать"
	},
	{
		eng : "sixteen",
		rus : "(сикстин) - шестнадцать"
	},
	{
		eng : "seventeen",
		rus : "(сэвнтин) - семнадцать"
	},
	{
		eng : "eighteen",
		rus : "(эйтин) - восемнадцать"
	},
	{
		eng : "nineteen",
		rus : "(найнтин) - девятнадцать"
	},
	{
		eng : "twenty",
		rus : "(туэнти) - двадцать"
	},
	{
		eng : "thirty",
		rus : "(сёти) - тридцать"
	},
	{
		eng : "forty",
		rus : "(фоти) - сорок"
	},
	{
		eng : "fifty",
		rus : "(фифти) - пятьдесят"
	},
	{
		eng : "sixty",
		rus : "(сиксти) - шестьдесят"
	},
	{
		eng : "seventy",
		rus : "(сэвнти) - семьдесят"
	},
	{
		eng : "eighty",
		rus : "(эйти) - восемьдесят"
	},
	{
		eng : "ninety",
		rus : "(найнти) - девяносто"
	},
	{
		eng : "hundred",
		rus : "(хандрэд) - сто"
	},
	{
		eng : "thousand",
		rus : "(саузэнд) - тысяча"
	}
];
var sw = [
	{
		lett: "A",
		word: [
			"aLink",
			"aLinkcolor",
			"abbr",
			"abort",
			"aborted",
			"above",
			"abs",
			"absolute",
			"acceleration",
			"accelerationIncludingGravity",
			"accept",
			"acceptCharset",
			"accessKey",
			"acos",
			"acosh",
			"action",
			"activated",
			"active",
			"activeCues",
			"activeElement",
			"activeSourceBuffers",
			"add",
			"addCue",
			"addEventListener",
			"addIceCandidate",
			"addModule",
			"addPath",
			"addRule",
			"addSourceBuffer",
			"addStream",
			"addTextTrack",
			"addTrack",
			"addTransceiver",
			"adoptNode",
			"adoptedStyleSheets",
			"after",
			"album",
			"alert",
			"align",
			"alignContent",
			"alignItems",
			"alignSelf",
			"alignmentBaseline",
			"alinkColor",
			"all",
			"allow",
			"allowFullscreen",
			"allowPaymentRequest",
			"allowedFeatures",
			"allowsFeature",
			"alpha",
			"alt",
			"altKey",
			"ancestorOrigins",
			"anchor",
			"anchors",
			"and",
			"angle",
			"animate",
			"animation",
			"animationDelay",
			"animationDirection",
			"animationDuration",
			"animationFillMode",
			"animationIterationCount",
			"animationName",
			"animationPlayState",
			"animationTimingFunction",
			"app",
			"appCodeName",
			"appCore",
			"appMinorVersion",
			"appName",
			"appVersion",
			"append",
			"appendChild",
			"appendData",
			"appendMedium",
			"applets",
			"applicationCache",
			"apply",
			"arc",
			"arcTo",
			"archive",
			"areas",
			"arguments",
			"arguments.callee",
			"arguments.caller",
			"arguments.length",
			"arity",
			"arrayBuffer",
			"artist",
			"artwork",
			"as",
			"asin",
			"asinh",
			"assert",
			"assign",
			"assignedSlot",
			"async",
			"atan",
			"atan2",
			"atanh",
			"atob",
			"attachEvent",
			"attachShadow",
			"attack",
			"attributeStyleMap",
			"attributes",
			"audioWorklet",
			"autocapitalize",
			"autocomplete",
			"autofocus",
			"automationRate",
			"autoplay",
			"availHeight",
			"availLeft",
			"availTop",
			"availWidth",
			"axis",
			"ABORT_ERR",
			"ANDROID",
			"APP_UPDATE",
			"ARM",
			"ATTRIBUTE_NODE",
			"AT_TARGET",
			"AbortController",
			"AbortSignal",
			"AbsoluteOrientationSensor",
			"Accelerometer",
			"AddSearchProvider",
			"AnalyserNode",
			"Anchor",
			"AnimationEvent",
			"Applet",
			"ApplicationCache",
			"ApplicationCacheErrorEvent",
			"Area",
			"Array",
			"ArrayBuffer",
			"Atomics",
			"Attr",
			"Audio",
			"AudioBuffer",
			"AudioBufferSourceNode",
			"AudioContext",
			"AudioDestinationNode",
			"AudioListener",
			"AudioNode",
			"AudioParam",
			"AudioParamMap",
			"AudioProcessingEvent",
			"AudioScheduledSourceNode",
			"AudioWorklet",
			"AudioWorkletNode",
			"AuthenticatorAssertionResponse",
			"AuthenticatorAttestationResponse",
			"AuthenticatorResponse"
		]
	},
	{
		lett: "B",
		word: [
			"back",
			"backfaceVisibility",
			"background",
			"backgroundAttachment",
			"backgroundBlendMode",
			"backgroundClip",
			"backgroundColor",
			"backgroundImage",
			"backgroundOrigin",
			"backgroundPosition",
			"backgroundPositionX",
			"backgroundPositionY",
			"backgroundRepeat",
			"backgroundRepeatX",
			"backgroundRepeatY",
			"backgroundSize",
			"badInput",
			"baseLatency",
			"baseURI",
			"baselineShift",
			"before",
			"behavior",
			"below",
			"beta",
			"bezierCurveTo",
			"bgColor",
			"big",
			"blink",
			"blob",
			"blockSize",
			"bluetooth",
			"blur",
			"body",
			"bodyUsed",
			"bold",
			"boolean",
			"border",
			"borderBlockEnd",
			"borderBlockEndColor",
			"borderBlockEndStyle",
			"borderBlockEndWidth",
			"borderBlockStart",
			"borderBlockStartColor",
			"borderBlockStartStyle",
			"borderBlockStartWidth",
			"borderBottom",
			"borderBottomColor",
			"borderBottomLeftRadius",
			"borderBottomRightRadius",
			"borderBottomStyle",
			"borderBottomWidth",
			"borderCollapse",
			"borderColor",
			"borderImage",
			"borderImageOutset",
			"borderImageRepeat",
			"borderImageSlice",
			"borderImageSource",
			"borderImageWidth",
			"borderInlineEnd",
			"borderInlineEndColor",
			"borderInlineEndStyle",
			"borderInlineEndWidth",
			"borderInlineStart",
			"borderInlineStartColor",
			"borderInlineStartStyle",
			"borderInlineStartWidth",
			"borderLeft",
			"borderLeftColor",
			"borderLeftStyle",
			"borderLeftWidth",
			"borderRadius",
			"borderRight",
			"borderRightColor",
			"borderRightStyle",
			"borderRightWidth",
			"borderSpacing",
			"borderStyle",
			"borderTop",
			"borderTopColor",
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderTopStyle",
			"borderTopWidth",
			"borderWidth",
			"borderWidths",
			"bottom",
			"boxShadow",
			"boxSizing",
			"break",
			"breakAfter",
			"breakBefore",
			"breakInside",
			"btoa",
			"bubbles",
			"buffer",
			"bufferDepth",
			"bufferSize",
			"buffered",
			"bufferedRendering",
			"button",
			"buttons",
			"byte",
			"byteLength",
			"byteOffset",
			"BUBBLING_PHASE",
			"BYTES_PER_ELEMENT",
			"BackgroundFetchManager",
			"BackgroundFetchRecord",
			"BackgroundFetchRegistration",
			"BarProp",
			"BaseAudioContext",
			"BatteryManager",
			"BeforeInstallPromptEvent",
			"BeforeUnloadEvent",
			"BigInt",
			"BigInt64Array",
			"BigUint64Array",
			"BiquadFilterNode",
			"Blob",
			"BlobEvent",
			"Bluetooth",
			"BluetoothCharacteristicProperties",
			"BluetoothDevice",
			"BluetoothRemoteGATTCharacteristic",
			"BluetoothRemoteGATTDescriptor",
			"BluetoothRemoteGATTServer",
			"BluetoothRemoteGATTService",
			"BluetoothUUID",
			"Boolean",
			"BroadcastChannel",
			"Button",
			"ByteLengthQueuingStrategy"
		]
	},
	{
		lett: "C",
		word: [
			"caches",
			"call",
			"canPlayType",
			"cancel",
			"cancelAndHoldAtTime",
			"cancelAnimationFrame",
			"cancelBubble",
			"cancelIdleCallback",
			"cancelScheduledValues",
			"cancelWatchAvailability",
			"cancelable",
			"caption",
			"captionSide",
			"captureEvents",
			"captureStream",
			"caretColor",
			"caretRangeFromPoint",
			"case",
			"catch",
			"cbrt",
			"ceil",
			"cellIndex",
			"cellPadding",
			"cellSpacing",
			"cells",
			"ch",
			"chOff",
			"channelCount",
			"channelCountMode",
			"channelInterpretation",
			"char",
			"charAt",
			"charCode",
			"charCodeAt",
			"characterSet",
			"charset",
			"check",
			"checkValidity",
			"checked",
			"childElementCount",
			"childNodes",
			"children",
			"chrome",
			"cite",
			"class",
			"classList",
			"className",
			"classes",
			"clear",
			"clearData",
			"clearInterval",
			"clearLiveSeekableRange",
			"clearMarks",
			"clearMeasures",
			"clearParameters",
			"clearResourceTimings",
			"clearTimeout",
			"clearWatch",
			"click",
			"clientHeight",
			"clientInformation",
			"clientLeft",
			"clientTop",
			"clientWidth",
			"clientX",
			"clientY",
			"clip",
			"clipPath",
			"clipRule",
			"clipboard",
			"clipboardData",
			"clone",
			"cloneContents",
			"cloneNode",
			"cloneRange",
			"close",
			"closePath",
			"closed",
			"closest",
			"clz32",
			"cmp",
			"code",
			"codeBase",
			"codePointAt",
			"codeType",
			"colSpan",
			"collapse",
			"collapsed",
			"color",
			"colorDepth",
			"colorInterpolation",
			"colorInterpolationFilters",
			"colorRendering",
			"cols",
			"columnCount",
			"columnFill",
			"columnGap",
			"columnRule",
			"columnRuleColor",
			"columnRuleStyle",
			"columnRuleWidth",
			"columnSpan",
			"columnWidth",
			"columns",
			"commonAncestorContainer",
			"compact",
			"compare",
			"compareBoundaryPoints",
			"compareDocumentPosition",
			"compareExchange",
			"comparePoint",
			"compatMode",
			"compile",
			"compileStreaming",
			"complete",
			"components",
			"composed",
			"composedPath",
			"computedStyleMap",
			"concat",
			"coneInnerAngle",
			"coneOuterAngle",
			"coneOuterGain",
			"confirm",
			"connect",
			"connectEnd",
			"connectStart",
			"connection",
			"connectionState",
			"console",
			"const",
			"construct",
			"constructor",
			"contain",
			"contains",
			"content",
			"contentDocument",
			"contentEditable",
			"contentType",
			"contentWindow",
			"context",
			"contextual",
			"continue",
			"control",
			"controller",
			"controllers",
			"controls",
			"controlsList",
			"cookie",
			"cookieEnabled",
			"coords",
			"copyWithin",
			"cos",
			"cosh",
			"count",
			"countReset",
			"counterIncrement",
			"counterReset",
			"cpuClass",
			"create",
			"createAnalyser",
			"createAnswer",
			"createAttribute",
			"createAttributeNS",
			"createBiquadFilter",
			"createBuffer",
			"createBufferSource",
			"createCDATASection",
			"createCaption",
			"createChannelMerger",
			"createChannelSplitter",
			"createComment",
			"createConstantSource",
			"createContextualFragment",
			"createConvolver",
			"createDTMFSender",
			"createDataChannel",
			"createDelay",
			"createDocument",
			"createDocumentFragment",
			"createDocumentType",
			"createDynamicsCompressor",
			"createElement",
			"createElementNS",
			"createEvent",
			"createEventObject",
			"createExpression",
			"createGain",
			"createHTMLDocument",
			"createIIRFilter",
			"createImageBitmap",
			"createMediaElementSource",
			"createMediaStreamDestination",
			"createMediaStreamSource",
			"createNSResolver",
			"createNodeIterator",
			"createObjectURL",
			"createOffer",
			"createOscillator",
			"createPanner",
			"createPeriodicWave",
			"createPopup",
			"createProcessingInstruction",
			"createRange",
			"createScriptProcessor",
			"createShadowRoot",
			"createStereoPanner",
			"createStyleSheet",
			"createTBody",
			"createTFoot",
			"createTHead",
			"createTextNode",
			"createTreeWalker",
			"createWaveShaper",
			"credentials",
			"crossOrigin",
			"crypto",
			"csi",
			"csp",
			"cssFloat",
			"cssRules",
			"cssText",
			"ctrlKey",
			"cues",
			"current",
			"currentLocalDescription",
			"currentRemoteDescription",
			"currentScript",
			"currentSrc",
			"currentTarget",
			"currentTime",
			"cursor",
			"curve",
			"customElements",
			"customError",
			"cx",
			"cy",
			"CANNOT_RUN",
			"CAPTURING_PHASE",
			"CDATASection",
			"CDATA_SECTION_NODE",
			"CHECKING",
			"CHROME_UPDATE",
			"COMMENT_NODE",
			"CROS",
			"CSS",
			"CSSConditionRule",
			"CSSFontFaceRule",
			"CSSGroupingRule",
			"CSSImageValue",
			"CSSImportRule",
			"CSSKeyframeRule",
			"CSSKeyframesRule",
			"CSSKeywordValue",
			"CSSMathInvert",
			"CSSMathMax",
			"CSSMathMin",
			"CSSMathNegate",
			"CSSMathProduct",
			"CSSMathSum",
			"CSSMathValue",
			"CSSMatrixComponent",
			"CSSMediaRule",
			"CSSNamespaceRule",
			"CSSNumericArray",
			"CSSNumericValue",
			"CSSPageRule",
			"CSSPerspective",
			"CSSPositionValue",
			"CSSRotate",
			"CSSRule",
			"CSSRuleList",
			"CSSScale",
			"CSSSkew",
			"CSSSkewX",
			"CSSSkewY",
			"CSSStyleDeclaration",
			"CSSStyleRule",
			"CSSStyleSheet",
			"CSSStyleValue",
			"CSSSupportsRule",
			"CSSTransformComponent",
			"CSSTransformValue",
			"CSSTranslate",
			"CSSUnitValue",
			"CSSUnparsedValue",
			"CSSVariableReferenceValue",
			"Cache",
			"CacheStorage",
			"CanvasCaptureMediaStreamTrack",
			"CanvasGradient",
			"CanvasPattern",
			"CanvasRenderingContext2D",
			"ChannelMergerNode",
			"ChannelSplitterNode",
			"CharacterData",
			"Checkbox",
			"Clipboard",
			"ClipboardEvent",
			"CloseEvent",
			"Collator",
			"Comment",
			"CompileError",
			"CompositionEvent",
			"ConstantSourceNode",
			"ConvolverNode",
			"CountQueuingStrategy",
			"Credential",
			"CredentialsContainer",
			"Crypto",
			"CryptoKey",
			"CustomElementRegistry",
			"CustomEvent"
		]
	},
	{
		lett: "D",
		word: [
			"data",
			"dataTransfer",
			"databases",
			"dataset",
			"dateTime",
			"debug",
			"debugger",
			"declare",
			"decode",
			"decodeAudioData",
			"decodeURI",
			"decodeURIComponent",
			"decoding",
			"decodingInfo",
			"decrypt",
			"default",
			"defaultCharset",
			"defaultChecked",
			"defaultMuted",
			"defaultPlaybackRate",
			"defaultPrevented",
			"defaultRequest",
			"defaultSelected",
			"defaultStatus",
			"defaultValue",
			"defaultView",
			"defaultstatus",
			"defer",
			"define",
			"defineProperty",
			"delayTime",
			"delegatesFocus",
			"delete",
			"deleteCaption",
			"deleteCell",
			"deleteContents",
			"deleteData",
			"deleteDatabase",
			"deleteMedium",
			"deleteProperty",
			"deleteRow",
			"deleteRule",
			"deleteTFoot",
			"deleteTHead",
			"deriveBits",
			"deriveKey",
			"description",
			"designMode",
			"destination",
			"detach",
			"detachEvent",
			"detail",
			"detune",
			"deviceMemory",
			"devicePixelRatio",
			"dialogArguments",
			"dialogHeight",
			"dialogLeft",
			"dialogTop",
			"dialogWidth",
			"digest",
			"dir",
			"dirName",
			"direction",
			"directories",
			"dirxml",
			"disableExternalCapture",
			"disablePictureInPicture",
			"disableRemotePlayback",
			"disabled",
			"disconnect",
			"dispatchEvent",
			"display",
			"distanceModel",
			"do",
			"doNotTrack",
			"doctype",
			"document",
			"documentElement",
			"documentURI",
			"domComplete",
			"domContentLoadedEventEnd",
			"domContentLoadedEventStart",
			"domInteractive",
			"domLoading",
			"domain",
			"domainLookupEnd",
			"domainLookupStart",
			"dominantBaseline",
			"dotAll",
			"double",
			"downlink",
			"download",
			"draggable",
			"dropEffect",
			"dump",
			"duration",
			"DATA_CLONE_ERR",
			"DISABLED",
			"DOCUMENT_FRAGMENT_NODE",
			"DOCUMENT_NODE",
			"DOCUMENT_POSITION_CONTAINED_BY",
			"DOCUMENT_POSITION_CONTAINS",
			"DOCUMENT_POSITION_DISCONNECTED",
			"DOCUMENT_POSITION_FOLLOWING",
			"DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",
			"DOCUMENT_POSITION_PRECEDING",
			"DOCUMENT_TYPE_NODE",
			"DOMError",
			"DOMException",
			"DOMImplementation",
			"DOMMatrix",
			"DOMMatrixReadOnly",
			"DOMParser",
			"DOMPoint",
			"DOMPointReadOnly",
			"DOMQuad",
			"DOMRect",
			"DOMRectList",
			"DOMRectReadOnly",
			"DOMSTRING_SIZE_ERR",
			"DOMStringList",
			"DOMStringMap",
			"DOMTokenList",
			"DOM_KEY_LOCATION_LEFT",
			"DOM_KEY_LOCATION_NUMPAD",
			"DOM_KEY_LOCATION_RIGHT",
			"DOM_KEY_LOCATION_STANDARD",
			"DONE",
			"DOWNLOADING",
			"DataTransfer",
			"DataTransferItem",
			"DataTransferItemList",
			"DataView",
			"Date",
			"DateTimeFormat",
			"DelayNode",
			"DeviceMotionEvent",
			"DeviceMotionEventAcceleration",
			"DeviceMotionEventRotationRate",
			"DeviceOrientationEvent",
			"Document",
			"DocumentFragment",
			"DocumentType",
			"DragEvent",
			"DynamicsCompressorNode"
		]
	},
	{
		lett: "E",
		word: [
			"effectAllowed",
			"effectiveType",
			"elementFromPoint",
			"elements",
			"elementsFromPoint",
			"ellipse",
			"else",
			"embeds",
			"emptyCells",
			"enableExternalCapture",
			"enabledPlugin",
			"encode",
			"encodeInto",
			"encodeURI",
			"encodeURIComponent",
			"encoding",
			"encrypt",
			"enctype",
			"end",
			"endContainer",
			"endOfStream",
			"endOffset",
			"ended",
			"endsWith",
			"entries",
			"enum",
			"enumerateDevices",
			"epubCaptionSide",
			"epubTextCombine",
			"epubTextEmphasis",
			"epubTextEmphasisColor",
			"epubTextEmphasisStyle",
			"epubTextOrientation",
			"epubTextTransform",
			"epubWordBreak",
			"epubWritingMode",
			"error",
			"escape",
			"estimate",
			"eval",
			"evaluate",
			"event",
			"eventPhase",
			"every",
			"exchange",
			"exec",
			"execCommand",
			"execScript",
			"exitFullscreen",
			"exitPictureInPicture",
			"exitPointerLock",
			"exp",
			"expand",
			"expando",
			"exponentialRampToValueAtTime",
			"export",
			"exportKey",
			"extends",
			"external",
			"extractContents",
			"ELEMENT_NODE",
			"EMPTY",
			"END_TO_END",
			"END_TO_START",
			"ENTITY_NODE",
			"ENTITY_REFERENCE_NODE",
			"ERROR",
			"Element",
			"EnterPictureInPictureEvent",
			"Error",
			"ErrorEvent",
			"EvalError",
			"Event",
			"EventSource",
			"EventTarget",
			"External"
		]
	},
	{
		lett: "F",
		word: [
			"face",
			"false",
			"fatal",
			"featurePolicy",
			"features",
			"fetch",
			"fetchStart",
			"fftSize",
			"fgColor",
			"fileCreatedDate",
			"fileModifiedDate",
			"fileSize",
			"fileUpdatedDate",
			"filename",
			"files",
			"fill",
			"fillOpacity",
			"fillRule",
			"filter",
			"final",
			"finally",
			"find",
			"findAll",
			"findIndex",
			"firesTouchEvents",
			"firstChild",
			"firstElementChild",
			"fixed",
			"flags",
			"flat",
			"flatMap",
			"flex",
			"flexBasis",
			"flexDirection",
			"flexFlow",
			"flexGrow",
			"flexShrink",
			"flexWrap",
			"flipX",
			"flipY",
			"float",
			"floodColor",
			"floodOpacity",
			"floor",
			"focus",
			"font",
			"fontDisplay",
			"fontFamily",
			"fontFeatureSettings",
			"fontKerning",
			"fontSize",
			"fontStretch",
			"fontStyle",
			"fontVariant",
			"fontVariantCaps",
			"fontVariantEastAsian",
			"fontVariantLigatures",
			"fontVariantNumeric",
			"fontVariationSettings",
			"fontWeight",
			"fontcolor",
			"fonts",
			"fontsize",
			"for",
			"forEach",
			"form",
			"formAction",
			"formData",
			"formEnctype",
			"formMethod",
			"formName",
			"formNoValidate",
			"formTarget",
			"format",
			"formatToParts",
			"forms",
			"forward",
			"forwardX",
			"forwardY",
			"forwardZ",
			"frame",
			"frameBorder",
			"frameElement",
			"frames",
			"frequency",
			"frequencyBinCount",
			"from",
			"fromCharCode",
			"fromElement",
			"fround",
			"fullscreen",
			"fullscreenElement",
			"fullscreenEnabled",
			"function",
			"FederatedCredential",
			"File",
			"FileList",
			"FileReader",
			"FileUpload",
			"Float32Array",
			"Float64Array",
			"FocusEvent",
			"FontFace",
			"FontFaceSetLoadEvent",
			"Form",
			"FormData",
			"Frame",
			"Function"
		]
	},
	{
		lett: "G",
		word: [
			"gain",
			"gamma",
			"gap",
			"generateKey",
			"geolocation",
			"get",
			"getAll",
			"getAllResponseHeaders",
			"getAllowlistForFeature",
			"getAttention",
			"getAttribute",
			"getAttributeNS",
			"getAttributeNames",
			"getAttributeNode",
			"getAttributeNodeNS",
			"getAudioTracks",
			"getBattery",
			"getBoundingClientRect",
			"getBounds",
			"getByteFrequencyData",
			"getByteTimeDomainData",
			"getCanonicalLocales",
			"getClientRects",
			"getComputedStyle",
			"getConfiguration",
			"getContext",
			"getCurrentPosition",
			"getData",
			"getDate",
			"getDay",
			"getDestinationInsertionPoints",
			"getDetails",
			"getDevices",
			"getDisplayMedia",
			"getDistributedNodes",
			"getElementById",
			"getElementsByClassName",
			"getElementsByName",
			"getElementsByTagName",
			"getElementsByTagNameNS",
			"getEntries",
			"getEntriesByName",
			"getEntriesByType",
			"getFloatFrequencyData",
			"getFloatTimeDomainData",
			"getFrequencyResponse",
			"getFullYear",
			"getGamepads",
			"getHours",
			"getIsInstalled",
			"getItem",
			"getLayoutMap",
			"getLocalStreams",
			"getMilliseconds",
			"getMinutes",
			"getModifierState",
			"getMonth",
			"getNamedItem",
			"getNamedItemNS",
			"getOutputTimestamp",
			"getOwnPropertyDescriptor",
			"getParameter",
			"getPropertyPriority",
			"getPropertyValue",
			"getPrototypeOf",
			"getRandomValues",
			"getReader",
			"getReceivers",
			"getRegistration",
			"getRegistrations",
			"getRemoteStreams",
			"getResponseHeader",
			"getRootNode",
			"getSVGDocument",
			"getSeconds",
			"getSelection",
			"getSenders",
			"getStats",
			"getSupportedConstraints",
			"getTime",
			"getTimezoneOffset",
			"getTrackById",
			"getTracks",
			"getTransceivers",
			"getUTCDate",
			"getUTCDay",
			"getUTCFullYear",
			"getUTCHours",
			"getUTCMilliseconds",
			"getUTCMinutes",
			"getUTCMonth",
			"getUTCSeconds",
			"getUserMedia",
			"getVideoTracks",
			"getVoices",
			"getWriter",
			"getYear",
			"global",
			"globalThis",
			"go",
			"goto",
			"grid",
			"gridArea",
			"gridAutoColumns",
			"gridAutoFlow",
			"gridAutoRows",
			"gridColumn",
			"gridColumnEnd",
			"gridColumnGap",
			"gridColumnStart",
			"gridGap",
			"gridRow",
			"gridRowEnd",
			"gridRowGap",
			"gridRowStart",
			"gridTemplate",
			"gridTemplateAreas",
			"gridTemplateColumns",
			"gridTemplateRows",
			"group",
			"groupCollapsed",
			"groupEnd",
			"GainNode",
			"Gamepad",
			"GamepadButton",
			"GamepadEvent",
			"GamepadHapticActuator",
			"Global",
			"Gyroscope"
		]
	},
	{
		lett: "H",
		word: [
			"handleEvent",
			"hardwareConcurrency",
			"has",
			"hasAttribute",
			"hasAttributeNS",
			"hasAttributes",
			"hasBeenActive",
			"hasChildNodes",
			"hasFeature",
			"hasFocus",
			"hasOwnProperty",
			"hasPointerCapture",
			"hasReading",
			"hash",
			"head",
			"headers",
			"height",
			"hidden",
			"high",
			"history",
			"home",
			"host",
			"hostname",
			"href",
			"hreflang",
			"hspace",
			"htmlFor",
			"httpEquiv",
			"hyphens",
			"hypot",
			"HAVE_CURRENT_DATA",
			"HAVE_ENOUGH_DATA",
			"HAVE_FUTURE_DATA",
			"HAVE_METADATA",
			"HAVE_NOTHING",
			"HEADERS_RECEIVED",
			"HIERARCHY_REQUEST_ERR",
			"HTMLAllCollection",
			"HTMLAnchorElement",
			"HTMLAreaElement",
			"HTMLAudioElement",
			"HTMLBRElement",
			"HTMLBaseElement",
			"HTMLBodyElement",
			"HTMLButtonElement",
			"HTMLCanvasElement",
			"HTMLCollection",
			"HTMLContentElement",
			"HTMLDListElement",
			"HTMLDataElement",
			"HTMLDataListElement",
			"HTMLDetailsElement",
			"HTMLDialogElement",
			"HTMLDirectoryElement",
			"HTMLDivElement",
			"HTMLDocument",
			"HTMLElement",
			"HTMLEmbedElement",
			"HTMLFieldSetElement",
			"HTMLFontElement",
			"HTMLFormControlsCollection",
			"HTMLFormElement",
			"HTMLFrameElement",
			"HTMLFrameSetElement",
			"HTMLHRElement",
			"HTMLHeadElement",
			"HTMLHeadingElement",
			"HTMLHtmlElement",
			"HTMLIFrameElement",
			"HTMLImageElement",
			"HTMLInputElement",
			"HTMLLIElement",
			"HTMLLabelElement",
			"HTMLLegendElement",
			"HTMLLinkElement",
			"HTMLMapElement",
			"HTMLMarqueeElement",
			"HTMLMediaElement",
			"HTMLMenuElement",
			"HTMLMetaElement",
			"HTMLMeterElement",
			"HTMLModElement",
			"HTMLOListElement",
			"HTMLObjectElement",
			"HTMLOptGroupElement",
			"HTMLOptionElement",
			"HTMLOptionsCollection",
			"HTMLOutputElement",
			"HTMLParagraphElement",
			"HTMLParamElement",
			"HTMLPictureElement",
			"HTMLPreElement",
			"HTMLProgressElement",
			"HTMLQuoteElement",
			"HTMLScriptElement",
			"HTMLSelectElement",
			"HTMLShadowElement",
			"HTMLSlotElement",
			"HTMLSourceElement",
			"HTMLSpanElement",
			"HTMLStyleElement",
			"HTMLTableCaptionElement",
			"HTMLTableCellElement",
			"HTMLTableColElement",
			"HTMLTableElement",
			"HTMLTableRowElement",
			"HTMLTableSectionElement",
			"HTMLTemplateElement",
			"HTMLTextAreaElement",
			"HTMLTimeElement",
			"HTMLTitleElement",
			"HTMLTrackElement",
			"HTMLUListElement",
			"HTMLUnknownElement",
			"HTMLVideoElement",
			"HashChangeEvent",
			"Headers",
			"Hidden",
			"History"
		]
	},
	{
		lett: "I",
		word: [
			"iceConnectionState",
			"iceGatheringState",
			"id",
			"ids",
			"if",
			"ignoreBOM",
			"ignoreCase",
			"imageRendering",
			"imageSizes",
			"imageSrcset",
			"images",
			"implementation",
			"implements",
			"import",
			"importKey",
			"importNode",
			"importStylesheet",
			"imul",
			"in",
			"includes",
			"incremental",
			"indeterminate",
			"index",
			"indexOf",
			"indexedDB",
			"info",
			"initCompositionEvent",
			"initCustomEvent",
			"initEvent",
			"initKeyboardEvent",
			"initMessageEvent",
			"initMouseEvent",
			"initStorageEvent",
			"initTextEvent",
			"initUIEvent",
			"inlineSize",
			"innerHTML",
			"innerHeight",
			"innerText",
			"innerWidth",
			"input",
			"inputEncoding",
			"inputMode",
			"insertAdjacentElement",
			"insertAdjacentHTML",
			"insertAdjacentText",
			"insertBefore",
			"insertCell",
			"insertData",
			"insertNode",
			"insertRow",
			"insertRule",
			"installState",
			"instanceof",
			"instantiate",
			"instantiateStreaming",
			"int",
			"integrity",
			"interface",
			"intersectsNode",
			"interval",
			"inverse",
			"invertSelf",
			"is2D",
			"isActive",
			"isComposing",
			"isConnected",
			"isContentEditable",
			"isDefaultNamespace",
			"isEqualNode",
			"isExtensible",
			"isFinite",
			"isIdentity",
			"isInstalled",
			"isLockFree",
			"isMap",
			"isNaN",
			"isPointInRange",
			"isPrototypeOf",
			"isSameNode",
			"isSecureContext",
			"isTrusted",
			"isolation",
			"italics",
			"item",
			"items",
			"IDBCursor",
			"IDBCursorWithValue",
			"IDBDatabase",
			"IDBFactory",
			"IDBIndex",
			"IDBKeyRange",
			"IDBObjectStore",
			"IDBOpenDBRequest",
			"IDBRequest",
			"IDBTransaction",
			"IDBVersionChangeEvent",
			"IDLE",
			"IIRFilterNode",
			"INDEX_SIZE_ERR",
			"INSTALL",
			"INSTALLED",
			"INUSE_ATTRIBUTE_ERR",
			"INVALID_ACCESS_ERR",
			"INVALID_CHARACTER_ERR",
			"INVALID_MODIFICATION_ERR",
			"INVALID_NODE_TYPE_ERR",
			"INVALID_STATE_ERR",
			"IdleDeadline",
			"Image",
			"ImageBitmap",
			"ImageBitmapRenderingContext",
			"ImageCapture",
			"ImageData",
			"Infinity",
			"InputDeviceCapabilities",
			"InputDeviceInfo",
			"InputEvent",
			"InstallState",
			"Instance",
			"Int16Array",
			"Int32Array",
			"Int8Array",
			"IntersectionObserver",
			"IntersectionObserverEntry",
			"Intl",
			"IsSearchProviderInstalled"
		]
	},
	{
		lett: "J",
		word: [
			"java",
			"javaEnabled",
			"join",
			"jsHeapSizeLimit",
			"json",
			"justifyContent",
			"justifyItems",
			"justifySelf",
			"JSON",
			"JavaArray",
			"JavaClass",
			"JavaObject",
			"JavaPackage"
		]
	},
	{
		lett: "K",
		word: [
			"key",
			"keyCode",
			"keyboard",
			"keys",
			"kind",
			"knee",
			"Keyboard",
			"KeyboardEvent",
			"KeyboardLayoutMap"
		]
	},
	{
		lett: "L",
		word: [
			"label",
			"labels",
			"lang",
			"language",
			"languages",
			"lastChild",
			"lastElementChild",
			"lastEventId",
			"lastIndex",
			"lastIndexOf",
			"lastMatch",
			"lastModified",
			"lastParen",
			"layerX",
			"layerY",
			"layers",
			"left",
			"leftContext",
			"length",
			"let",
			"letterSpacing",
			"lightingColor",
			"lineBreak",
			"lineHeight",
			"lineTo",
			"linearRampToValueAtTime",
			"link",
			"linkColor",
			"links",
			"list",
			"listStyle",
			"listStyleImage",
			"listStylePosition",
			"listStyleType",
			"listener",
			"load",
			"loadEventEnd",
			"loadEventStart",
			"loadTimes",
			"localDescription",
			"localName",
			"localStorage",
			"localeCompare",
			"location",
			"locationbar",
			"lock",
			"locked",
			"locks",
			"log",
			"log10",
			"log1p",
			"log2",
			"long",
			"longDesc",
			"lookupNamespaceURI",
			"lookupPrefix",
			"loop",
			"loopEnd",
			"loopStart",
			"low",
			"lowsrc",
			"LINUX",
			"LN10",
			"LN2",
			"LOADED",
			"LOADING",
			"LOG10E",
			"LOG2E",
			"Layer",
			"LinearAccelerationSensor",
			"Link",
			"LinkError",
			"ListFormat",
			"Locale",
			"Location",
			"Lock",
			"LockManager"
		]
	},
	{
		lett: "M",
		word: [
			"map",
			"margin",
			"marginBlockEnd",
			"marginBlockStart",
			"marginBottom",
			"marginHeight",
			"marginInlineEnd",
			"marginInlineStart",
			"marginLeft",
			"marginRight",
			"marginTop",
			"marginWidth",
			"margins",
			"mark",
			"marker",
			"markerEnd",
			"markerMid",
			"markerStart",
			"mask",
			"maskType",
			"match",
			"matchAll",
			"matchMedia",
			"matchMedium",
			"matches",
			"matchesSelector",
			"matrixTransform",
			"max",
			"maxBlockSize",
			"maxChannelCount",
			"maxDecibels",
			"maxDistance",
			"maxHeight",
			"maxInlineSize",
			"maxLength",
			"maxTouchPoints",
			"maxValue",
			"maxWidth",
			"maxZoom",
			"measure",
			"media",
			"mediaCapabilities",
			"mediaDevices",
			"mediaKeys",
			"mediaSession",
			"mediaText",
			"memory",
			"menubar",
			"mergeAttributes",
			"message",
			"metaKey",
			"metadata",
			"method",
			"mimeTypes",
			"min",
			"minBlockSize",
			"minDecibels",
			"minHeight",
			"minInlineSize",
			"minLength",
			"minValue",
			"minWidth",
			"minZoom",
			"mixBlendMode",
			"mode",
			"moveAbove",
			"moveBelow",
			"moveBy",
			"moveTo",
			"moveToAbsolute",
			"movementX",
			"movementY",
			"multiline",
			"multiple",
			"multiply",
			"multiplySelf",
			"muted",
			"MAC",
			"MAX_VALUE",
			"MIDIAccess",
			"MIDIConnectionEvent",
			"MIDIInput",
			"MIDIInputMap",
			"MIDIMessageEvent",
			"MIDIOutput",
			"MIDIOutputMap",
			"MIDIPort",
			"MIN_VALUE",
			"MIPS",
			"MIPS64",
			"Map",
			"Math",
			"MediaCapabilities",
			"MediaDeviceInfo",
			"MediaDevices",
			"MediaElementAudioSourceNode",
			"MediaEncryptedEvent",
			"MediaError",
			"MediaKeyMessageEvent",
			"MediaKeySession",
			"MediaKeyStatusMap",
			"MediaKeySystemAccess",
			"MediaKeys",
			"MediaList",
			"MediaMetadata",
			"MediaQueryList",
			"MediaQueryListEvent",
			"MediaRecorder",
			"MediaSession",
			"MediaSettingsRange",
			"MediaSource",
			"MediaStream",
			"MediaStreamAudioDestinationNode",
			"MediaStreamAudioSourceNode",
			"MediaStreamEvent",
			"MediaStreamTrack",
			"MediaStreamTrackEvent",
			"Memory",
			"MessageChannel",
			"MessageEvent",
			"MessagePort",
			"MimeType",
			"MimeTypeArray",
			"Module",
			"MouseEvent",
			"MutationEvent",
			"MutationObserver",
			"MutationRecord"
		]
	},
	{
		lett: "N",
		word: [
			"name",
			"nameProp",
			"namedItem",
			"namespaceURI",
			"namespaces",
			"native",
			"naturalHeight",
			"naturalWidth",
			"navigate",
			"navigation",
			"navigationStart",
			"navigator",
			"netscape",
			"networkState",
			"new",
			"newURL",
			"newValue",
			"next",
			"nextElementSibling",
			"nextSibling",
			"noHref",
			"noModule",
			"noResize",
			"noShade",
			"noValidate",
			"noWrap",
			"nodeName",
			"nodeType",
			"nodeValue",
			"nonce",
			"normalize",
			"notify",
			"now",
			"null",
			"numberOfInputs",
			"numberOfOutputs",
			"NAMESPACE_ERR",
			"NEGATIVE_INFINITY",
			"NETWORK_EMPTY",
			"NETWORK_ERR",
			"NETWORK_IDLE",
			"NETWORK_LOADING",
			"NETWORK_NO_SOURCE",
			"NONE",
			"NOTATION_NODE",
			"NOT_FOUND_ERR",
			"NOT_INSTALLED",
			"NOT_SUPPORTED_ERR",
			"NO_DATA_ALLOWED_ERR",
			"NO_MODIFICATION_ALLOWED_ERR",
			"NO_UPDATE",
			"NaN",
			"NamedNodeMap",
			"Native Client",
			"NavigationPreloadManager",
			"Navigator",
			"NetworkInformation",
			"Node",
			"NodeFilter",
			"NodeIterator",
			"NodeList",
			"Notification",
			"Number",
			"NumberFormat"
		]
	},
	{
		lett: "O",
		word: [
			"objectFit",
			"objectPosition",
			"of",
			"offscreenBuffering",
			"offset",
			"offsetDistance",
			"offsetHeight",
			"offsetLeft",
			"offsetParent",
			"offsetPath",
			"offsetRotate",
			"offsetTop",
			"offsetWidth",
			"offsetX",
			"offsetY",
			"ok",
			"oldURL",
			"oldValue",
			"onLine",
			"onabort",
			"onactivate",
			"onactive",
			"onaddsourcebuffer",
			"onaddstream",
			"onaddtrack",
			"onafterprint",
			"onafterupdate",
			"onanimationend",
			"onanimationiteration",
			"onanimationstart",
			"onappinstalled",
			"onaudioprocess",
			"onauxclick",
			"onbeforeactivate",
			"onbeforecopy",
			"onbeforecut",
			"onbeforedeactivate",
			"onbeforeeditfocus",
			"onbeforeinstallprompt",
			"onbeforepaste",
			"onbeforeprint",
			"onbeforeunload",
			"onbeforeupdate",
			"onblur",
			"onboundary",
			"oncached",
			"oncancel",
			"oncanplay",
			"oncanplaythrough",
			"oncellchange",
			"onchange",
			"onchecking",
			"onclick",
			"onclose",
			"onconnect",
			"onconnecting",
			"onconnectionstatechange",
			"oncontextmenu",
			"oncontrollerchange",
			"oncontrolselect",
			"oncopy",
			"oncuechange",
			"oncut",
			"ondataavailable",
			"ondatachannel",
			"ondatasetchanged",
			"ondatasetcomplete",
			"ondblclick",
			"ondeactivate",
			"ondevicechange",
			"ondevicemotion",
			"ondeviceorientation",
			"ondeviceorientationabsolute",
			"ondisconnect",
			"ondownloading",
			"ondrag",
			"ondragdrop",
			"ondragend",
			"ondragenter",
			"ondragleave",
			"ondragover",
			"ondragstart",
			"ondrop",
			"ondurationchange",
			"onemptied",
			"onencrypted",
			"onend",
			"onended",
			"onenterpictureinpicture",
			"onerror",
			"onerrorupdate",
			"onfocus",
			"onfreeze",
			"onfullscreenchange",
			"onfullscreenerror",
			"ongotpointercapture",
			"onhashchange",
			"onhelp",
			"onicecandidate",
			"oniceconnectionstatechange",
			"onicegatheringstatechange",
			"oninactive",
			"oninput",
			"oninvalid",
			"onkeydown",
			"onkeypress",
			"onkeyup",
			"onlanguagechange",
			"onleavepictureinpicture",
			"onload",
			"onloadeddata",
			"onloadedmetadata",
			"onloadend",
			"onloading",
			"onloadingdone",
			"onloadingerror",
			"onloadstart",
			"onlostpointercapture",
			"onmark",
			"onmessage",
			"onmessageerror",
			"onmousedown",
			"onmouseenter",
			"onmouseleave",
			"onmousemove",
			"onmouseout",
			"onmouseover",
			"onmouseup",
			"onmousewheel",
			"onnegotiationneeded",
			"onnoupdate",
			"onobsolete",
			"onoffline",
			"ononline",
			"onpagehide",
			"onpageshow",
			"onpaste",
			"onpause",
			"onplay",
			"onplaying",
			"onpointercancel",
			"onpointerdown",
			"onpointerenter",
			"onpointerleave",
			"onpointerlockchange",
			"onpointerlockerror",
			"onpointermove",
			"onpointerout",
			"onpointerover",
			"onpointerup",
			"onpopstate",
			"onprogress",
			"onpropertychange",
			"onratechange",
			"onreading",
			"onreadystatechange",
			"onrejectionhandled",
			"onremovesourcebuffer",
			"onremovestream",
			"onremovetrack",
			"onreset",
			"onresize",
			"onresizeend",
			"onresizestart",
			"onresourcetimingbufferfull",
			"onresume",
			"onrowenter",
			"onrowexit",
			"onrowsdelete",
			"onrowsinserted",
			"onscroll",
			"onsearch",
			"onseeked",
			"onseeking",
			"onselect",
			"onselectionchange",
			"onselectstart",
			"onsignalingstatechange",
			"onsourceclose",
			"onsourceended",
			"onsourceopen",
			"onstalled",
			"onstart",
			"onstatechange",
			"onstop",
			"onstorage",
			"onsubmit",
			"onsuspend",
			"ontimeout",
			"ontimeupdate",
			"ontoggle",
			"ontrack",
			"ontransitionend",
			"onunhandledrejection",
			"onunload",
			"onupdateready",
			"onvisibilitychange",
			"onvoiceschanged",
			"onvolumechange",
			"onwaiting",
			"onwaitingforkey",
			"onwebkitanimationend",
			"onwebkitanimationiteration",
			"onwebkitanimationstart",
			"onwebkitfullscreenchange",
			"onwebkitfullscreenerror",
			"onwebkittransitionend",
			"onwheel",
			"opacity",
			"open",
			"openDatabase",
			"opener",
			"opsProfile",
			"optimum",
			"options",
			"or",
			"order",
			"orientation",
			"orientationX",
			"orientationY",
			"orientationZ",
			"origin",
			"orphans",
			"oscpu",
			"outerHTML",
			"outerHeight",
			"outerText",
			"outerWidth",
			"outline",
			"outlineColor",
			"outlineOffset",
			"outlineStyle",
			"outlineWidth",
			"overflow",
			"overflowAnchor",
			"overflowWrap",
			"overflowX",
			"overflowY",
			"overrideMimeType",
			"oversample",
			"overscrollBehavior",
			"overscrollBehaviorX",
			"overscrollBehaviorY",
			"ownKeys",
			"ownerDocument",
			"ownerElement",
			"ownerNode",
			"ownerRule",
			"OBSOLETE",
			"OPENBSD",
			"OPENED",
			"OS_UPDATE",
			"Object",
			"OfflineAudioCompletionEvent",
			"OfflineAudioContext",
			"OffscreenCanvas",
			"OffscreenCanvasRenderingContext2D",
			"OnInstalledReason",
			"OnRestartRequiredReason",
			"Option",
			"OrientationSensor",
			"OscillatorNode",
			"OverconstrainedError"
		]
	},
	{
		lett: "P",
		word: [
			"package",
			"padEnd",
			"padStart",
			"padding",
			"paddingBlockEnd",
			"paddingBlockStart",
			"paddingBottom",
			"paddingInlineEnd",
			"paddingInlineStart",
			"paddingLeft",
			"paddingRight",
			"paddingTop",
			"paddings",
			"page",
			"pageBreakAfter",
			"pageBreakBefore",
			"pageBreakInside",
			"pageLeft",
			"pageTop",
			"pageX",
			"pageXOffset",
			"pageY",
			"pageYOffset",
			"paintOrder",
			"pan",
			"panningModel",
			"parent",
			"parentElement",
			"parentLayer",
			"parentNode",
			"parentRule",
			"parentStyleSheet",
			"parentWindow",
			"parse",
			"parseFloat",
			"parseFromString",
			"parseInt",
			"part",
			"password",
			"path",
			"pathname",
			"pattern",
			"patternMismatch",
			"pause",
			"paused",
			"pending",
			"pendingLocalDescription",
			"pendingRemoteDescription",
			"performance",
			"permissions",
			"persist",
			"persisted",
			"personalbar",
			"perspective",
			"perspectiveOrigin",
			"pictureInPictureElement",
			"pictureInPictureEnabled",
			"ping",
			"pipeThrough",
			"pipeTo",
			"pitch",
			"pixelDepth",
			"placeContent",
			"placeItems",
			"placeSelf",
			"placeholder",
			"platform",
			"play",
			"playbackRate",
			"playbackState",
			"played",
			"plugins",
			"plugins.refresh",
			"pointerEvents",
			"pointerLockElement",
			"pop",
			"populateMatrix",
			"port",
			"port1",
			"port2",
			"ports",
			"position",
			"positionX",
			"positionY",
			"positionZ",
			"postMessage",
			"poster",
			"pow",
			"preMultiplySelf",
			"preference",
			"prefix",
			"preload",
			"prepend",
			"presentation",
			"preventDefault",
			"preventExtensions",
			"preventSilentAccess",
			"previous",
			"previousElementSibling",
			"previousSibling",
			"print",
			"private",
			"product",
			"productSub",
			"profile",
			"profileEnd",
			"prompt",
			"prompter",
			"propertyIsEnumerable",
			"protected",
			"protocol",
			"prototype",
			"public",
			"publicId",
			"push",
			"pushState",
			"PERIODIC",
			"PERSISTENT",
			"PI",
			"POSITIVE_INFINITY",
			"PROCESSING_INSTRUCTION_NODE",
			"Packages",
			"PageTransitionEvent",
			"PannerNode",
			"Password",
			"PasswordCredential",
			"Path2D",
			"PaymentAddress",
			"PaymentInstruments",
			"PaymentManager",
			"PaymentRequest",
			"PaymentRequestUpdateEvent",
			"PaymentResponse",
			"Performance",
			"PerformanceEntry",
			"PerformanceLongTaskTiming",
			"PerformanceMark",
			"PerformanceMeasure",
			"PerformanceNavigation",
			"PerformanceNavigationTiming",
			"PerformanceObserver",
			"PerformanceObserverEntryList",
			"PerformancePaintTiming",
			"PerformanceResourceTiming",
			"PerformanceServerTiming",
			"PerformanceTiming",
			"PeriodicWave",
			"PermissionStatus",
			"Permissions",
			"PhotoCapabilities",
			"PictureInPictureWindow",
			"PlatformArch",
			"PlatformNaclArch",
			"PlatformOs",
			"Plugin",
			"PluginArray",
			"PluralRules",
			"PointerEvent",
			"PopStateEvent",
			"Presentation",
			"PresentationAvailability",
			"PresentationConnection",
			"PresentationConnectionAvailableEvent",
			"PresentationConnectionCloseEvent",
			"PresentationConnectionList",
			"PresentationReceiver",
			"PresentationRequest",
			"ProcessingInstruction",
			"ProgressEvent",
			"Promise",
			"PromiseRejectionEvent",
			"Proxy",
			"PublicKeyCredential",
			"PushManager",
			"PushSubscription",
			"PushSubscriptionOptions"
		]
	},
	{
		lett: "Q",
		word: [
			"quadraticCurveTo",
			"quaternion",
			"query",
			"queryCommandEnabled",
			"queryCommandIndeterm",
			"queryCommandState",
			"queryCommandSupported",
			"queryCommandValue",
			"querySelector",
			"querySelectorAll",
			"queryUsageAndQuota",
			"queueMicrotask",
			"quotes",
			"QUOTA_EXCEEDED_ERR"
		]
	},
	{
		lett: "R",
		word: [
			"random",
			"rangeOverflow",
			"rangeUnderflow",
			"rate",
			"ratio",
			"readAsArrayBuffer",
			"readAsBinaryString",
			"readAsDataURL",
			"readAsText",
			"readOnly",
			"readText",
			"readable",
			"ready",
			"readyState",
			"recalc",
			"receiver",
			"rect",
			"redirectCount",
			"redirectEnd",
			"redirectStart",
			"redirected",
			"reduce",
			"reduceRight",
			"reduction",
			"refDistance",
			"referrer",
			"referrerPolicy",
			"refresh",
			"register",
			"registerElement",
			"registerProtocolHandler",
			"rel",
			"relList",
			"relatedTarget",
			"release",
			"releaseCapture",
			"releaseEvents",
			"releasePointerCapture",
			"reload",
			"remote",
			"remoteDescription",
			"remove",
			"removeAttribute",
			"removeAttributeNS",
			"removeAttributeNode",
			"removeChild",
			"removeCue",
			"removeEventListener",
			"removeItem",
			"removeNamedItem",
			"removeNamedItemNS",
			"removeParameter",
			"removeProperty",
			"removeRule",
			"removeSourceBuffer",
			"removeStream",
			"removeTrack",
			"repeat",
			"replace",
			"replaceChild",
			"replaceData",
			"replaceState",
			"replaceSync",
			"replaceWith",
			"reportValidity",
			"request",
			"requestAnimationFrame",
			"requestDevice",
			"requestFullscreen",
			"requestIdleCallback",
			"requestMIDIAccess",
			"requestMediaKeySystemAccess",
			"requestPictureInPicture",
			"requestPointerLock",
			"requestQuota",
			"requestStart",
			"required",
			"reset",
			"resize",
			"resizeBy",
			"resizeTo",
			"resolvedOptions",
			"response",
			"responseEnd",
			"responseStart",
			"responseText",
			"responseType",
			"responseURL",
			"responseXML",
			"result",
			"resume",
			"return",
			"returnValue",
			"rev",
			"reverse",
			"reversed",
			"revokeObjectURL",
			"right",
			"rightContext",
			"rolloffFactor",
			"rootElement",
			"rotate",
			"rotateAxisAngle",
			"rotateAxisAngleSelf",
			"rotateFromVector",
			"rotateFromVectorSelf",
			"rotateSelf",
			"rotationRate",
			"round",
			"routeEvents",
			"rowGap",
			"rowIndex",
			"rowSpan",
			"rows",
			"rtt",
			"rules",
			"runningState",
			"runtime",
			"rx",
			"ry",
			"READY_TO_RUN",
			"RTCCertificate",
			"RTCDTMFSender",
			"RTCDTMFToneChangeEvent",
			"RTCDataChannel",
			"RTCDataChannelEvent",
			"RTCError",
			"RTCErrorEvent",
			"RTCIceCandidate",
			"RTCPeerConnection",
			"RTCPeerConnectionIceEvent",
			"RTCRtpReceiver",
			"RTCRtpSender",
			"RTCRtpTransceiver",
			"RTCSessionDescription",
			"RTCStatsReport",
			"RTCTrackEvent",
			"RUNNING",
			"Radio",
			"RadioNodeList",
			"Range",
			"RangeError",
			"ReadableStream",
			"ReferenceError",
			"Reflect",
			"RegExp",
			"RelativeOrientationSensor",
			"RelativeTimeFormat",
			"RemotePlayback",
			"ReportingObserver",
			"Request",
			"RequestUpdateCheckStatus",
			"Reset",
			"ResizeObserver",
			"ResizeObserverEntry",
			"Response",
			"RunningState",
			"RuntimeError"
		]
	},
	{
		lett: "S",
		word: [
			"sampleRate",
			"sandbox",
			"saveData",
			"savePreferences",
			"scale",
			"scale3d",
			"scale3dSelf",
			"scaleNonUniform",
			"scaleSelf",
			"scheme",
			"scope",
			"screen",
			"screenLeft",
			"screenTop",
			"screenX",
			"screenY",
			"scripts",
			"scroll",
			"scrollAmount",
			"scrollBehavior",
			"scrollBy",
			"scrollByLines",
			"scrollByPages",
			"scrollDelay",
			"scrollHeight",
			"scrollIntoView",
			"scrollIntoViewIfNeeded",
			"scrollLeft",
			"scrollMargin",
			"scrollMarginBlock",
			"scrollMarginBlockEnd",
			"scrollMarginBlockStart",
			"scrollMarginBottom",
			"scrollMarginInline",
			"scrollMarginInlineEnd",
			"scrollMarginInlineStart",
			"scrollMarginLeft",
			"scrollMarginRight",
			"scrollMarginTop",
			"scrollPadding",
			"scrollPaddingBlock",
			"scrollPaddingBlockEnd",
			"scrollPaddingBlockStart",
			"scrollPaddingBottom",
			"scrollPaddingInline",
			"scrollPaddingInlineEnd",
			"scrollPaddingInlineStart",
			"scrollPaddingLeft",
			"scrollPaddingRight",
			"scrollPaddingTop",
			"scrollRestoration",
			"scrollSnapAlign",
			"scrollSnapStop",
			"scrollSnapType",
			"scrollTo",
			"scrollTop",
			"scrollWidth",
			"scrollX",
			"scrollY",
			"scrollbars",
			"scrolling",
			"scrollingElement",
			"sdp",
			"search",
			"sectionRowIndex",
			"secureConnectionStart",
			"security",
			"securityPolicy",
			"seekable",
			"seeking",
			"select",
			"selectNode",
			"selectNodeContents",
			"selected",
			"selectedIndex",
			"selectedOptions",
			"selection",
			"selectionDirection",
			"selectionEnd",
			"selectionStart",
			"self",
			"send",
			"sendBeacon",
			"sendMessage",
			"serializeToString",
			"serviceWorker",
			"sessionStorage",
			"set",
			"setActionHandler",
			"setActive",
			"setAttribute",
			"setAttributeNS",
			"setAttributeNode",
			"setAttributeNodeNS",
			"setConfiguration",
			"setCursor",
			"setCustomValidity",
			"setData",
			"setDate",
			"setDragImage",
			"setEnd",
			"setEndAfter",
			"setEndBefore",
			"setFullYear",
			"setHotKeys",
			"setHours",
			"setInterval",
			"setItem",
			"setLiveSeekableRange",
			"setLocalDescription",
			"setMatrixValue",
			"setMediaKeys",
			"setMilliseconds",
			"setMinutes",
			"setMonth",
			"setNamedItem",
			"setNamedItemNS",
			"setOrientation",
			"setParameter",
			"setPeriodicWave",
			"setPointerCapture",
			"setPosition",
			"setProperty",
			"setPrototypeOf",
			"setRangeText",
			"setRemoteDescription",
			"setRequestHeader",
			"setResizable",
			"setResourceTimingBufferSize",
			"setSeconds",
			"setSelectionRange",
			"setSinkId",
			"setStart",
			"setStartAfter",
			"setStartBefore",
			"setTargetAtTime",
			"setTime",
			"setTimeout",
			"setUTCDate",
			"setUTCFullYear",
			"setUTCHours",
			"setUTCMilliseconds",
			"setUTCMinutes",
			"setUTCMonth",
			"setUTCSeconds",
			"setValueAtTime",
			"setValueCurveAtTime",
			"setYear",
			"setZOptions",
			"shadowRoot",
			"shape",
			"shapeImageThreshold",
			"shapeMargin",
			"shapeOutside",
			"shapeRendering",
			"sheet",
			"shift",
			"shiftKey",
			"short",
			"show",
			"showHelp",
			"showModal",
			"showModalDialog",
			"showModelessDialog",
			"siblingAbove",
			"siblingBelow",
			"sidebar",
			"sign",
			"signText",
			"signal",
			"signalingState",
			"sin",
			"sinh",
			"sinkId",
			"size",
			"sizeToContent",
			"sizes",
			"skewX",
			"skewXSelf",
			"skewY",
			"skewYSelf",
			"slice",
			"slot",
			"small",
			"smoothingTimeConstant",
			"some",
			"sort",
			"source",
			"sourceBuffers",
			"sourceCapabilities",
			"span",
			"speak",
			"speaking",
			"specified",
			"speechSynthesis",
			"spellcheck",
			"splice",
			"split",
			"splitText",
			"sqrt",
			"src",
			"srcElement",
			"srcObject",
			"srcdoc",
			"srclang",
			"srcset",
			"stack",
			"standby",
			"start",
			"startContainer",
			"startMessages",
			"startOffset",
			"startsWith",
			"state",
			"static",
			"status",
			"statusText",
			"statusbar",
			"step",
			"stepDown",
			"stepMismatch",
			"stepUp",
			"sticky",
			"stop",
			"stopColor",
			"stopImmediatePropagation",
			"stopOpacity",
			"stopPropagation",
			"storage",
			"storageArea",
			"store",
			"stream",
			"strike",
			"stringify",
			"stroke",
			"strokeDasharray",
			"strokeDashoffset",
			"strokeLinecap",
			"strokeLinejoin",
			"strokeMiterlimit",
			"strokeOpacity",
			"strokeWidth",
			"style",
			"styleMedia",
			"styleSheets",
			"sub",
			"subarray",
			"submit",
			"substr",
			"substring",
			"substringData",
			"subtle",
			"suffixes",
			"summary",
			"sun",
			"sup",
			"super",
			"supports",
			"surroundContents",
			"suspend",
			"swapCache",
			"switch",
			"synchronized",
			"systemId",
			"systemLanguage",
			"SECURITY_ERR",
			"SHARED_MODULE_UPDATE",
			"START_TO_END",
			"START_TO_START",
			"SVGAElement",
			"SVGAngle",
			"SVGAnimateElement",
			"SVGAnimateMotionElement",
			"SVGAnimateTransformElement",
			"SVGAnimatedAngle",
			"SVGAnimatedBoolean",
			"SVGAnimatedEnumeration",
			"SVGAnimatedInteger",
			"SVGAnimatedLength",
			"SVGAnimatedLengthList",
			"SVGAnimatedNumber",
			"SVGAnimatedNumberList",
			"SVGAnimatedPreserveAspectRatio",
			"SVGAnimatedRect",
			"SVGAnimatedString",
			"SVGAnimatedTransformList",
			"SVGAnimationElement",
			"SVGCircleElement",
			"SVGClipPathElement",
			"SVGComponentTransferFunctionElement",
			"SVGDefsElement",
			"SVGDescElement",
			"SVGDiscardElement",
			"SVGElement",
			"SVGEllipseElement",
			"SVGFEBlendElement",
			"SVGFEColorMatrixElement",
			"SVGFEComponentTransferElement",
			"SVGFECompositeElement",
			"SVGFEConvolveMatrixElement",
			"SVGFEDiffuseLightingElement",
			"SVGFEDisplacementMapElement",
			"SVGFEDistantLightElement",
			"SVGFEDropShadowElement",
			"SVGFEFloodElement",
			"SVGFEFuncAElement",
			"SVGFEFuncBElement",
			"SVGFEFuncGElement",
			"SVGFEFuncRElement",
			"SVGFEGaussianBlurElement",
			"SVGFEImageElement",
			"SVGFEMergeElement",
			"SVGFEMergeNodeElement",
			"SVGFEMorphologyElement",
			"SVGFEOffsetElement",
			"SVGFEPointLightElement",
			"SVGFESpecularLightingElement",
			"SVGFESpotLightElement",
			"SVGFETileElement",
			"SVGFETurbulenceElement",
			"SVGFilterElement",
			"SVGForeignObjectElement",
			"SVGGElement",
			"SVGGeometryElement",
			"SVGGradientElement",
			"SVGGraphicsElement",
			"SVGImageElement",
			"SVGLength",
			"SVGLengthList",
			"SVGLineElement",
			"SVGLinearGradientElement",
			"SVGMPathElement",
			"SVGMarkerElement",
			"SVGMaskElement",
			"SVGMatrix",
			"SVGMetadataElement",
			"SVGNumber",
			"SVGNumberList",
			"SVGPathElement",
			"SVGPatternElement",
			"SVGPoint",
			"SVGPointList",
			"SVGPolygonElement",
			"SVGPolylineElement",
			"SVGPreserveAspectRatio",
			"SVGRadialGradientElement",
			"SVGRect",
			"SVGRectElement",
			"SVGSVGElement",
			"SVGScriptElement",
			"SVGSetElement",
			"SVGStopElement",
			"SVGStringList",
			"SVGStyleElement",
			"SVGSwitchElement",
			"SVGSymbolElement",
			"SVGTSpanElement",
			"SVGTextContentElement",
			"SVGTextElement",
			"SVGTextPathElement",
			"SVGTextPositioningElement",
			"SVGTitleElement",
			"SVGTransform",
			"SVGTransformList",
			"SVGUnitTypes",
			"SVGUseElement",
			"SVGViewElement",
			"SYNTAX_ERR",
			"Screen",
			"ScreenOrientation",
			"ScriptProcessorNode",
			"SecurityPolicyViolationEvent",
			"Select",
			"Selection",
			"Sensor",
			"SensorErrorEvent",
			"ServiceWorker",
			"ServiceWorkerContainer",
			"ServiceWorkerRegistration",
			"Set",
			"ShadowRoot",
			"SharedArrayBuffer",
			"SharedWorker",
			"SourceBuffer",
			"SourceBufferList",
			"SpeechSynthesisErrorEvent",
			"SpeechSynthesisEvent",
			"SpeechSynthesisUtterance",
			"StaticRange",
			"StereoPannerNode",
			"Storage",
			"StorageEvent",
			"StorageManager",
			"String",
			"Style",
			"StylePropertyMap",
			"StylePropertyMapReadOnly",
			"StyleSheet",
			"StyleSheetList",
			"Submit",
			"SubtleCrypto",
			"Symbol",
			"SyncManager",
			"SyntaxError"
		]
	},
	{
		lett: "T",
		word: [
			"tBodies",
			"tFoot",
			"tHead",
			"tabIndex",
			"tabSize",
			"table",
			"tableLayout",
			"tagName",
			"tags",
			"taint",
			"taintEnabled",
			"tan",
			"tanh",
			"target",
			"tee",
			"test",
			"text",
			"textAlign",
			"textAlignLast",
			"textAnchor",
			"textCombineUpright",
			"textContent",
			"textDecoration",
			"textDecorationColor",
			"textDecorationLine",
			"textDecorationSkipInk",
			"textDecorationStyle",
			"textIndent",
			"textLength",
			"textOrientation",
			"textOverflow",
			"textRendering",
			"textShadow",
			"textSizeAdjust",
			"textTracks",
			"textTransform",
			"textUnderlinePosition",
			"then",
			"this",
			"threshold",
			"throw",
			"throws",
			"time",
			"timeEnd",
			"timeLog",
			"timeOrigin",
			"timeStamp",
			"timeout",
			"timestamp",
			"timing",
			"title",
			"toBlob",
			"toDataURL",
			"toDateString",
			"toElement",
			"toExponential",
			"toFixed",
			"toFloat32Array",
			"toFloat64Array",
			"toGMTString",
			"toISOString",
			"toJSON",
			"toLocaleDateString",
			"toLocaleLowerCase",
			"toLocaleString",
			"toLocaleTimeString",
			"toLocaleUpperCase",
			"toLowerCase",
			"toPrecision",
			"toSource",
			"toString",
			"toTimeString",
			"toUTCString",
			"toUpperCase",
			"toggle",
			"toggleAttribute",
			"tooLong",
			"tooShort",
			"toolbar",
			"top",
			"totalJSHeapSize",
			"touchAction",
			"trace",
			"track",
			"transferControlToOffscreen",
			"transform",
			"transformBox",
			"transformOrigin",
			"transformPoint",
			"transformStyle",
			"transformToDocument",
			"transformToFragment",
			"transient",
			"transition",
			"transitionDelay",
			"transitionDuration",
			"transitionProperty",
			"transitionTimingFunction",
			"translate",
			"translateSelf",
			"trim",
			"trimEnd",
			"trimLeft",
			"trimRight",
			"trimStart",
			"true",
			"trueSpeed",
			"trunc",
			"try",
			"type",
			"typeMismatch",
			"typeof",
			"types",
			"TEMPORARY",
			"TEXT_NODE",
			"THROTTLED",
			"TIMEOUT_ERR",
			"TYPE_BACK_FORWARD",
			"TYPE_MISMATCH_ERR",
			"TYPE_NAVIGATE",
			"TYPE_RELOAD",
			"TYPE_RESERVED",
			"Table",
			"TaskAttributionTiming",
			"Text",
			"TextDecoder",
			"TextDecoderStream",
			"TextEncoder",
			"TextEncoderStream",
			"TextEvent",
			"TextMetrics",
			"TextTrack",
			"TextTrackCue",
			"TextTrackCueList",
			"TextTrackList",
			"Textarea",
			"TimeRanges",
			"Touch",
			"TouchEvent",
			"TouchList",
			"TrackEvent",
			"TransformStream",
			"TransitionEvent",
			"TreeWalker",
			"TypeError"
		]
	},
	{
		lett: "U",
		word: [
			"undefined",
			"unescape",
			"unicode",
			"unicodeBidi",
			"unicodeRange",
			"uniqueID",
			"unloadEventEnd",
			"unloadEventStart",
			"unlock",
			"unregisterProtocolHandler",
			"unshift",
			"untaint",
			"unwatch",
			"unwrapKey",
			"upX",
			"upY",
			"upZ",
			"update",
			"updateCommands",
			"updateInterval",
			"upgrade",
			"upload",
			"url",
			"usb",
			"useMap",
			"usedJSHeapSize",
			"userActivation",
			"userAgent",
			"userLanguage",
			"userProfile",
			"userSelect",
			"userZoom",
			"username",
			"UIEvent",
			"UNCACHED",
			"UNSENT",
			"UPDATE",
			"UPDATEREADY",
			"UPDATE_AVAILABLE",
			"URIError",
			"URL",
			"URLSearchParams",
			"URLUnencoded",
			"URL_MISMATCH_ERR",
			"USB",
			"USBAlternateInterface",
			"USBConfiguration",
			"USBConnectionEvent",
			"USBDevice",
			"USBEndpoint",
			"USBInTransferResult",
			"USBInterface",
			"USBIsochronousInTransferPacket",
			"USBIsochronousInTransferResult",
			"USBIsochronousOutTransferPacket",
			"USBIsochronousOutTransferResult",
			"USBOutTransferResult",
			"UTC",
			"Uint16Array",
			"Uint32Array",
			"Uint8Array",
			"Uint8ClampedArray",
			"UserActivation"
		]
	},
	{
		lett: "V",
		word: [
			"vAlign",
			"vLink",
			"vLinkcolor",
			"valid",
			"validate",
			"validationMessage",
			"validity",
			"value",
			"valueAsDate",
			"valueAsNumber",
			"valueMissing",
			"valueOf",
			"valueType",
			"values",
			"var",
			"vectorEffect",
			"vendor",
			"vendorSub",
			"verify",
			"version",
			"verticalAlign",
			"vibrate",
			"videoHeight",
			"videoWidth",
			"view",
			"visibility",
			"visibilityState",
			"visible",
			"visualViewport",
			"vlinkColor",
			"voice",
			"void",
			"volatile",
			"volume",
			"vspace",
			"VALIDATION_ERR",
			"VTTCue",
			"ValidityState",
			"VisualViewport"
		]
	},
	{
		lett: "W",
		word: [
			"wait",
			"wake",
			"warn",
			"wasDiscarded",
			"watch",
			"watchAvailability",
			"watchPosition",
			"webkitAlignContent",
			"webkitAlignItems",
			"webkitAlignSelf",
			"webkitAnimation",
			"webkitAnimationDelay",
			"webkitAnimationDirection",
			"webkitAnimationDuration",
			"webkitAnimationFillMode",
			"webkitAnimationIterationCount",
			"webkitAnimationName",
			"webkitAnimationPlayState",
			"webkitAnimationTimingFunction",
			"webkitAppRegion",
			"webkitAppearance",
			"webkitAudioDecodedByteCount",
			"webkitBackfaceVisibility",
			"webkitBackgroundClip",
			"webkitBackgroundOrigin",
			"webkitBackgroundSize",
			"webkitBorderAfter",
			"webkitBorderAfterColor",
			"webkitBorderAfterStyle",
			"webkitBorderAfterWidth",
			"webkitBorderBefore",
			"webkitBorderBeforeColor",
			"webkitBorderBeforeStyle",
			"webkitBorderBeforeWidth",
			"webkitBorderBottomLeftRadius",
			"webkitBorderBottomRightRadius",
			"webkitBorderEnd",
			"webkitBorderEndColor",
			"webkitBorderEndStyle",
			"webkitBorderEndWidth",
			"webkitBorderHorizontalSpacing",
			"webkitBorderImage",
			"webkitBorderRadius",
			"webkitBorderStart",
			"webkitBorderStartColor",
			"webkitBorderStartStyle",
			"webkitBorderStartWidth",
			"webkitBorderTopLeftRadius",
			"webkitBorderTopRightRadius",
			"webkitBorderVerticalSpacing",
			"webkitBoxAlign",
			"webkitBoxDecorationBreak",
			"webkitBoxDirection",
			"webkitBoxFlex",
			"webkitBoxOrdinalGroup",
			"webkitBoxOrient",
			"webkitBoxPack",
			"webkitBoxReflect",
			"webkitBoxShadow",
			"webkitBoxSizing",
			"webkitCancelAnimationFrame",
			"webkitCancelFullScreen",
			"webkitClipPath",
			"webkitColumnBreakAfter",
			"webkitColumnBreakBefore",
			"webkitColumnBreakInside",
			"webkitColumnCount",
			"webkitColumnGap",
			"webkitColumnRule",
			"webkitColumnRuleColor",
			"webkitColumnRuleStyle",
			"webkitColumnRuleWidth",
			"webkitColumnSpan",
			"webkitColumnWidth",
			"webkitColumns",
			"webkitCurrentFullScreenElement",
			"webkitDecodedFrameCount",
			"webkitDisplayingFullscreen",
			"webkitDroppedFrameCount",
			"webkitEnterFullScreen",
			"webkitEnterFullscreen",
			"webkitEntries",
			"webkitExitFullScreen",
			"webkitExitFullscreen",
			"webkitFilter",
			"webkitFlex",
			"webkitFlexBasis",
			"webkitFlexDirection",
			"webkitFlexFlow",
			"webkitFlexGrow",
			"webkitFlexShrink",
			"webkitFlexWrap",
			"webkitFontFeatureSettings",
			"webkitFontSizeDelta",
			"webkitFontSmoothing",
			"webkitFullscreenElement",
			"webkitFullscreenEnabled",
			"webkitGetUserMedia",
			"webkitHidden",
			"webkitHighlight",
			"webkitHyphenateCharacter",
			"webkitIsFullScreen",
			"webkitJustifyContent",
			"webkitLineBreak",
			"webkitLineClamp",
			"webkitLocale",
			"webkitLogicalHeight",
			"webkitLogicalWidth",
			"webkitMarginAfter",
			"webkitMarginAfterCollapse",
			"webkitMarginBefore",
			"webkitMarginBeforeCollapse",
			"webkitMarginBottomCollapse",
			"webkitMarginCollapse",
			"webkitMarginEnd",
			"webkitMarginStart",
			"webkitMarginTopCollapse",
			"webkitMask",
			"webkitMaskBoxImage",
			"webkitMaskBoxImageOutset",
			"webkitMaskBoxImageRepeat",
			"webkitMaskBoxImageSlice",
			"webkitMaskBoxImageSource",
			"webkitMaskBoxImageWidth",
			"webkitMaskClip",
			"webkitMaskComposite",
			"webkitMaskImage",
			"webkitMaskOrigin",
			"webkitMaskPosition",
			"webkitMaskPositionX",
			"webkitMaskPositionY",
			"webkitMaskRepeat",
			"webkitMaskRepeatX",
			"webkitMaskRepeatY",
			"webkitMaskSize",
			"webkitMatchesSelector",
			"webkitMaxLogicalHeight",
			"webkitMaxLogicalWidth",
			"webkitMediaStream",
			"webkitMinLogicalHeight",
			"webkitMinLogicalWidth",
			"webkitOpacity",
			"webkitOrder",
			"webkitPaddingAfter",
			"webkitPaddingBefore",
			"webkitPaddingEnd",
			"webkitPaddingStart",
			"webkitPersistentStorage",
			"webkitPerspective",
			"webkitPerspectiveOrigin",
			"webkitPerspectiveOriginX",
			"webkitPerspectiveOriginY",
			"webkitPrintColorAdjust",
			"webkitRTCPeerConnection",
			"webkitRequestAnimationFrame",
			"webkitRequestFileSystem",
			"webkitRequestFullScreen",
			"webkitRequestFullscreen",
			"webkitResolveLocalFileSystemURL",
			"webkitRtlOrdering",
			"webkitRubyPosition",
			"webkitShapeImageThreshold",
			"webkitShapeMargin",
			"webkitShapeOutside",
			"webkitSpeechGrammar",
			"webkitSpeechGrammarList",
			"webkitSpeechRecognition",
			"webkitSpeechRecognitionError",
			"webkitSpeechRecognitionEvent",
			"webkitStorageInfo",
			"webkitSupportsFullscreen",
			"webkitTapHighlightColor",
			"webkitTemporaryStorage",
			"webkitTextCombine",
			"webkitTextDecorationsInEffect",
			"webkitTextEmphasis",
			"webkitTextEmphasisColor",
			"webkitTextEmphasisPosition",
			"webkitTextEmphasisStyle",
			"webkitTextFillColor",
			"webkitTextOrientation",
			"webkitTextSecurity",
			"webkitTextSizeAdjust",
			"webkitTextStroke",
			"webkitTextStrokeColor",
			"webkitTextStrokeWidth",
			"webkitTransform",
			"webkitTransformOrigin",
			"webkitTransformOriginX",
			"webkitTransformOriginY",
			"webkitTransformOriginZ",
			"webkitTransformStyle",
			"webkitTransition",
			"webkitTransitionDelay",
			"webkitTransitionDuration",
			"webkitTransitionProperty",
			"webkitTransitionTimingFunction",
			"webkitURL",
			"webkitUserDrag",
			"webkitUserModify",
			"webkitUserSelect",
			"webkitVideoDecodedByteCount",
			"webkitVisibilityState",
			"webkitWritingMode",
			"webkitdirectory",
			"whenDefined",
			"which",
			"while",
			"whiteSpace",
			"wholeText",
			"widows",
			"width",
			"willChange",
			"willValidate",
			"window",
			"with",
			"withCredentials",
			"wordBreak",
			"wordSpacing",
			"wordWrap",
			"wrap",
			"wrapKey",
			"writable",
			"write",
			"writeText",
			"writeln",
			"writingMode",
			"WIN",
			"WRONG_DOCUMENT_ERR",
			"WaveShaperNode",
			"WeakMap",
			"WeakSet",
			"WebAssembly",
			"WebGL2RenderingContext",
			"WebGLActiveInfo",
			"WebGLBuffer",
			"WebGLContextEvent",
			"WebGLFramebuffer",
			"WebGLProgram",
			"WebGLQuery",
			"WebGLRenderbuffer",
			"WebGLRenderingContext",
			"WebGLSampler",
			"WebGLShader",
			"WebGLShaderPrecisionFormat",
			"WebGLSync",
			"WebGLTexture",
			"WebGLTransformFeedback",
			"WebGLUniformLocation",
			"WebGLVertexArrayObject",
			"WebKitCSSMatrix",
			"WebKitMutationObserver",
			"WebSocket",
			"WheelEvent",
			"Window",
			"Worker",
			"Worklet",
			"WritableStream"
		]
	},
	{
		lett: "X, Y, Z",
		word: [
			"xmlEncoding",
			"xmlStandalone",
			"xmlVersion",
			"xor",
			"XMLDocument",
			"XMLHttpRequest",
			"XMLHttpRequestEventTarget",
			"XMLHttpRequestUpload",
			"XMLSerializer",
			"XPathEvaluator",
			"XPathExpression",
			"XPathResult",
			"XSLDocument",
			"XSLTProcessor",
			"y",
			"zIndex",
			"zoom"
		]
	}
];