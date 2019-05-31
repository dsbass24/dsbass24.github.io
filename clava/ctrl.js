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
				}, i * 20);
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
			}, b * 65);
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
			"above",
			"abs",
			"acos",
			"action",
			"addEventListener",
			"alert",
			"align",
			"aLinkcolor",
			"all",
			"Anchor",
			"anchor",
			"anchors",
			"appCodeName",
			"appCore",
			"appendChild",
			"Applet",
			"applets",
			"apply",
			"appMinorVersion",
			"appName",
			"appVersion",
			"Area",
			"arguments",
			"arguments.callee",
			"arguments.caller",
			"arguments.length",
			"arity",
			"Array",
			"asin",
			"atan",
			"atan2",
			"atob",
			"attachEvent",
			"attributes",
			"availHeight",
			"availLeft",
			"availTop",
			"availWidth"
		]
	},
	{
		lett: "B",
		word: [
			"back",
			"background",
			"backgroundColor",
			"backgroundImage",
			"below",
			"bgColor",
			"big",
			"blink",
			"blob",
			"blur",
			"body",
			"bold",
			"boolean",
			"Boolean",
			"border",
			"borderBottomWidth",
			"borderColor",
			"borderLeftWidth",
			"borderRightWidth",
			"borderStyle",
			"borderTopWidth",
			"borderWidths",
			"bottom",
			"break",
			"btoa",
			"bufferDepth",
			"Button",
			"byte"
		]
	},
	{
		lett: "C",
		word: [
			"call",
			"captureEvents",
			"case",
			"catch",
			"ceil",
			"char",
			"characterSet",
			"charAt",
			"charCodeAt",
			"Checkbox",
			"checked",
			"childElementCount",
			"childNodes",
			"class",
			"classList",
			"classes",
			"className",
			"clear",
			"clearInterval",
			"clearTimeout",
			"click",
			"clientInformation",
			"clip",
			"clipboardData",
			"close",
			"closed",
			"codePointAt",
			"colorDepth",
			"compile",
			"complete",
			"components",
			"concat",
			"confirm",
			"console",
			"const",
			"constructor",
			"contains",
			"contextual",
			"continue",
			"controllers",
			"cookie",
			"cookieEnabled",
			"cos",
			"cpuClass",
			"createElement",
			"createEventObject",
			"createObjectURL",
			"createPopup",
			"createStyleSheet",
			"createTextNode",
			"crypto",
			"current"
		]
	},
	{
		lett: "D",
		word: [
			"data",
			"Date",
			"debugger",
			"default",
			"defaultCharset",
			"defaultChecked",
			"defaultStatus",
			"defaultValue",
			"defaultView",
			"delete",
			"description",
			"detachEvent",
			"dialogArguments",
			"dialogHeight",
			"dialogLeft",
			"dialogTop",
			"dialogWidth",
			"dir",
			"directories",
			"disableExternalCapture",
			"dispatchEvent",
			"display",
			"do",
			"doctype",
			"document",
			"documentElement",
			"domain",
			"double",
			"dump"
		]
	},
	{
		lett: "E",
		word: [
			"elementFromPoint",
			"elements",
			"else",
			"embeds",
			"enabledPlugin",
			"enableExternalCapture",
			"encoding",
			"enum",
			"escape",
			"eval",
			"event",
			"exec",
			"execCommand",
			"execScript",
			"exp",
			"expando",
			"export",
			"extends",
			"external"
		]
	},
	{
		lett: "F",
		word: [
			"false",
			"fetch",
			"fgColor",
			"fileCreatedDate",
			"fileModifiedDate",
			"filename",
			"fileSize",
			"fileUpdatedDate",
			"FileUpload",
			"final",
			"finally",
			"find",
			"findAll",
			"firstChild",
			"fixed",
			"float",
			"floor",
			"focus",
			"fontcolor",
			"fontFamily",
			"fontsize",
			"fontSize",
			"fontWeight",
			"for",
			"Form",
			"form",
			"formName",
			"forms",
			"forward",
			"Frame",
			"frameElement",
			"frames",
			"from",
			"fromCharCode",
			"Function",
			"function"
		]
	},
	{
		lett: "G",
		word: [
			"getAttention",
			"getAttribute",
			"getAttributeNS",
			"getAttributeNode",
			"getAttributeNodeNS",
			"getBoundingClientRect",
			"getClientRects",
			"getComputedStyle",
			"getDate",
			"getDay",
			"getElementById",
			"getElementsByClassName",
			"getElementsByName",
			"getElementsByTagName",
			"getElementsByTagNameNS",
			"getFullYear",
			"getHours",
			"getMilliseconds",
			"getMinutes",
			"getMonth",
			"getSeconds",
			"getSelection",
			"getTime",
			"getTimezoneOffset",
			"getUTCDate",
			"getUTCDay",
			"getUTCFullYear",
			"getUTCHours",
			"getUTCMilliseconds",
			"getUTCMinutes",
			"getUTCMonth",
			"getUTCSeconds",
			"getYear",
			"global",
			"go",
			"goto"
		]
	},
	{
		lett: "H",
		word: [
			"handleEvent",
			"hasAttribute",
			"hasAttributeNS",
			"hasAttributes",
			"hasFocus",
			"hash",
			"height",
			"Hidden",
			"history",
			"History",
			"home",
			"host",
			"hostname",
			"href",
			"hspace"
		]
	},
	{
		lett: "I",
		word: [
			"ids",
			"if",
			"ignoreCase",
			"Image",
			"images",
			"implementation",
			"implements",
			"import",
			"in",
			"index",
			"indexOf",
			"Infinity",
			"innerHTML",
			"innerHeight",
			"innerText",
			"innerWidth",
			"input",
			"instanceof",
			"int",
			"interface",
			"isFinite",
			"isNaN",
			"italics"
		]
	},
	{
		lett: "J",
		word: [
			"java",
			"JavaArray",
			"JavaClass",
			"javaEnabled",
			"JavaObject",
			"JavaPackage",
			"join"
		]
	},
	{
		lett: "L",
		word: [
			"language",
			"lastChild",
			"lastElementChild",
			"lastIndex",
			"lastIndexOf",
			"lastMatch",
			"lastModified",
			"lastParen",
			"Layer",
			"layers",
			"layerX",
			"left",
			"leftContext",
			"length",
			"let",
			"lineHeight",
			"link",
			"Link",
			"linkColor",
			"links",
			"listStyleType",
			"LN10",
			"LN2",
			"load",
			"localName",
			"Location",
			"location",
			"locationbar",
			"log",
			"LOG10E",
			"LOG2E",
			"long",
			"lowsrc"
		]
	},
	{
		lett: "M",
		word: [
			"marginBottom",
			"marginLeft",
			"marginRight",
			"margins",
			"marginTop",
			"match",
			"matches",
			"matchesSelector",
			"Math",
			"max",
			"MAX_VALUE",
			"media",
			"menubar",
			"mergeAttributes",
			"method",
			"MimeType",
			"mimeTypes",
			"min",
			"MIN_VALUE",
			"moveAbove",
			"moveBelow",
			"moveBy",
			"moveTo",
			"moveToAbsolute",
			"multiline"
		]
	},
	{
		lett: "N",
		word: [
			"name",
			"nameProp",
			"namespaces",
			"namespaceURI",
			"NaN",
			"native",
			"navigate",
			"navigator",
			"NEGATIVE_INFINITY",
			"netscape",
			"new",
			"next",
			"nextSibling",
			"nodeName",
			"nodeType",
			"nodeValue",
			"null",
			"Number"
		]
	},
	{
		lett: "O",
		word: [
			"Object",
			"of",
			"offscreenBuffering",
			"onabort",
			"onactivate",
			"onafterprint",
			"onafterupdate",
			"onbeforeactivate",
			"onbeforecut",
			"onbeforedeactivate",
			"onbeforeeditfocus",
			"onbeforepaste",
			"onbeforeprint",
			"onbeforeunload",
			"onbeforeupdate",
			"onblur",
			"oncellchange",
			"onchange",
			"onclick",
			"onclose",
			"oncontextmenu",
			"oncontrolselect",
			"oncut",
			"ondataavailable",
			"ondatasetchanged",
			"ondatasetcomplete",
			"ondblclick",
			"ondeactivate",
			"ondrag",
			"ondragdrop",
			"ondragend",
			"ondragenter",
			"ondragleave",
			"ondragover",
			"ondragstart",
			"ondrop",
			"onerror",
			"onerrorupdate",
			"onfocus",
			"onhelp",
			"onkeydown",
			"onkeypress",
			"onkeyup",
			"onLine",
			"onload",
			"onmousedown",
			"onmousemove",
			"onmouseout",
			"onmouseover",
			"onmouseup",
			"onpaste",
			"onpropertychange",
			"onreadystatechange",
			"onreset",
			"onresize",
			"onresizeend",
			"onresizestart",
			"onrowenter",
			"onrowexit",
			"onrowsdelete",
			"onrowsinserted",
			"onscroll",
			"onselect",
			"onselectionchange",
			"onselectstart",
			"onstop",
			"onsubmit",
			"onunload",
			"open",
			"opener",
			"opsProfile",
			"Option",
			"options",
			"oscpu",
			"outerHTML",
			"outerHeight",
			"outerWidth",
			"ownerDocument"
		]
	},
	{
		lett: "P",
		word: [
			"package",
			"Packages",
			"paddingBottom",
			"paddingLeft",
			"paddingRight",
			"paddings",
			"paddingTop",
			"pageX",
			"pageXOffset",
			"pageY",
			"pageYOffset",
			"parent",
			"parentLayer",
			"parentNode",
			"parentWindow",
			"parse",
			"parseFloat",
			"parseInt",
			"Password",
			"pathname",
			"personalbar",
			"PI",
			"pixelDepth",
			"pkcs11",
			"platform",
			"Plugin",
			"plugins",
			"plugins.refresh",
			"pop",
			"port",
			"POSITIVE_INFINITY",
			"pow",
			"preference",
			"prefix",
			"previous",
			"previousSibling",
			"print",
			"private",
			"product",
			"productSub",
			"prompt",
			"prompter",
			"protected",
			"protocol",
			"prototype",
			"public",
			"push"
		]
	},
	{
		lett: "Q",
		word: [
			"queryCommandEnabled",
			"queryCommandIndeterm",
			"queryCommandState",
			"queryCommandValue",
			"querySelector",
			"querySelectorAll"
		]
	},
	{
		lett: "R",
		word: [
			"Radio",
			"random",
			"readyState",
			"recalc",
			"referrer",
			"RegExp",
			"releaseCapture",
			"releaseEvents",
			"reload",
			"removeAttribute",
			"removeAttributeNS",
			"removeAttributeNode",
			"removeEventListener",
			"replace",
			"Reset",
			"reset",
			"resizeBy",
			"resizeTo",
			"response",
			"responseType",
			"return",
			"returnValue",
			"reverse",
			"revokeObjectURL",
			"right",
			"rightContext",
			"round",
			"routeEvents"
		]
	},
	{
		lett: "S",
		word: [
			"savePreferences",
			"screen",
			"screenLeft",
			"screenTop",
			"screenX",
			"screenY",
			"scripts",
			"scroll",
			"scrollbars",
			"scrollBy",
			"scrollByLines",
			"scrollByPages",
			"scrollHeight",
			"scrollLeft",
			"scrollTop",
			"scrollTo",
			"scrollWidth",
			"scrollX",
			"scrollY",
			"search",
			"security",
			"securityPolicy",
			"Select",
			"select",
			"selected",
			"selectedIndex",
			"selection",
			"self",
			"Set",
			"setActive",
			"setAttribute",
			"setAttributeNS",
			"setAttributeNode",
			"setAttributeNodeNS",
			"setCursor",
			"setDate",
			"setFullYear",
			"setHotKeys",
			"setHours",
			"setInterval",
			"setMilliseconds",
			"setMinutes",
			"setMonth",
			"setResizable",
			"setSeconds",
			"setTime",
			"setTimeout",
			"setUTCDate",
			"setUTCFullYear",
			"setUTCHours",
			"setUTCMilliseconds",
			"setUTCMinutes",
			"setUTCMonth",
			"setUTCSeconds",
			"setYear",
			"setZOptions",
			"shift",
			"short",
			"showHelp",
			"showModalDialog",
			"showModelessDialog",
			"siblingAbove",
			"siblingBelow",
			"sidebar",
			"signText",
			"sin",
			"sizeToContent",
			"slice",
			"small",
			"sort",
			"source",
			"splice",
			"split",
			"sqrt",
			"SQRT1_2",
			"SQRT2",
			"src",
			"static",
			"status",
			"statusbar",
			"stop",
			"strike",
			"String",
			"Style",
			"styleSheets",
			"sub",
			"Submit",
			"submit",
			"substr",
			"substring",
			"suffixes",
			"sun",
			"sup",
			"super",
			"switch",
			"synchronized",
			"systemLanguage"
		]
	},
	{
		lett: "T",
		word: [
			"tags",
			"taint",
			"taintEnabled",
			"tan",
			"target",
			"test",
			"Text",
			"text",
			"textAlign",
			"Textarea",
			"textDecoration",
			"textIndent",
			"textTransform",
			"then",
			"this",
			"throw",
			"throws",
			"title",
			"toGMTString",
			"toLocaleString",
			"toLowerCase",
			"toolbar",
			"top",
			"toSource",
			"toString",
			"toUpperCase",
			"toUTCString",
			"transient",
			"true",
			"try",
			"type",
			"typeof"
		]
	},
	{
		lett: "U",
		word: [
			"undefined",
			"unescape",
			"uniqueID",
			"unshift",
			"untaint",
			"unwatch",
			"updateCommands",
			"updateInterval",
			"URL",
			"URLUnencoded",
			"userAgent",
			"userLanguage",
			"userProfile",
			"UTC"
		]
	},
	{
		lett: "V",
		word: [
			"value",
			"valueOf",
			"var",
			"vendor",
			"vendorSub",
			"visibility",
			"vLinkcolor",
			"void",
			"volatile",
			"vspace"
		]
	},
	{
		lett: "W",
		word: [
			"watch",
			"while",
			"whiteSpace",
			"width",
			"window",
			"with",
			"write",
			"writeln"
		]
	},
	{
		lett: "X, Y, Z",
		word: [
			"x",
			"XMLDocument",
			"XMLHttpRequest",
			"XSLDocument",
			"y",
			"zIndex"
		]
	}
];