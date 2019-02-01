/*
	DSresume
*/
var myRes = [
	{
		id: 0,
		name: "������� ������� ����������",
		text: [
			"���� ��������: 6 ������� 1986 �.",
			"�������� ���������: �����.",
			"������������ ����� ������������: JavaScript, HTML.",
			"����������� �����: dsbass@rambler.ru",
			"���������� ����� ��������: +38-093-729-49-49",
			"����� ����������: �. ��������"
		],
		im: "img/IMG_20150711_103542a.jpg"
	},
	{
		id: 1,
		name: "�����������",
		text: [
			"2017 - ����� (����������� web-������)",
			'2002-2006 - ���������� �������� ������������� ������������ ������������ �� ������������� "������������ � ������ ��������-������������, ������������ � �������� ����� � ������������", ������� ������������ ������-��������.'
		],
		im: "img/mastEnd.JPG"
	},
	{
		id: 2,
		name: "���� ������",
		text: [
			"2014-2017 - ���������� ���. � ������������� �� ������������ � ������� �������������� ����������.",
			"2012-2013 - ���. � ������ ������� �� ���������� ���� �������� ���� ��������� ����� � ���������� �������. �����������, ��������� �� � ������ 2G-������� �����."
		],
		im: "img/IMG_20160728_142940.jpg"
	},
	{
		id: 3,
		name: "������ ��������",
		text: [
			"������������",
			"������������������",
			"���������� � �������� � �������� ������� ����������������"
		],
		im: "img/rad.jpg"
	},
	{
		id: 4,
		name: "�����",
		text: [
			"����� ������ - ������� � ���������. ��������� ����� �� ������.",
			"� 2016 ���� �� ������ ���������.",
			"����������� ������������� ������� � ����� �� ������������ ������������ ������������ ��������� ��������.",
			"������������ �������� � ������������� ���������, ��� ��������� ����, ���� �� ����� �� ������� ��������� ���������� ������������ ������."
		],
		im: "img/music.jpg"
	}
];
document.addEventListener("DOMContentLoaded", function(w){
	var myBody = document.body;
	var nav = document.createElement("nav");
	var infOut = document.createElement("div");
	nav.id = "nav";
	infOut.id = "out";
	myBody.appendChild(nav);
	myBody.appendChild(infOut);
	function create(tag, ind, cl, content){
		var myTag = document.createElement(tag);
		myTag.id = ind;
		myTag.className = cl;
		if(tag === "h4"){
			nav.appendChild(myTag);
			myTag.innerHTML = content;
			clickTag(myTag);
		}
		if(tag === "p"){
			myTag.innerHTML = content;
			getOut(myTag);
		}
		if(tag === "section"){
			myTag.appendChild(content);
			infOut.appendChild(myTag);
		}
	}
	for(var i = 0; i < myRes.length; i++){
		create("h4", i, "n", myRes[i].name);
		for(var t = 0; t < myRes[i].text.length; t++){
			create("p", "", i, myRes[i].text[t]);
		}
	}
	function getOut(con){
		create("section", "", "s" + con.className, con);
	}
	function clickTag(hand){
		if(hand.className === "n"){
			hand.style.padding = "1%";
			hand.className = "on";
		}
		var listenClickTag = hand.addEventListener("click", function(g){
			var look = g.target;
			pit(look);
		});
	}
	function pit(pitTag){
		if(pitTag.className === "on"){
			var off = document.getElementsByClassName("off")[0];
			if(off !== undefined){
				restyle(off, "-");
				off.className = "on";
			}
			restyle(pitTag, "+");
			pitTag.className = "off";
		}
	}
	// h4 : padding
	function restyle(orig, param){
		setTimeout(function(){
			outSect(orig, param);
		},300);
		for(var p = 1; p <= 70; ++p){
			var pTime = function(p){
				setTimeout(function(){
					if (param === "-"){
						orig.style.padding = 8 - (p / 10) + "%";
					}else{
						orig.style.padding = 1 + (p / 10) + "%";
					}
				},p * 4);
			}
			pTime(p);
		}
	}
	// section : left
	function outSect(myS, param){
		var elem = document.getElementsByClassName("s" + myS.id);
		for(var s = 0; s < elem.length; s++){
			if(param === "+"){
				for(var n = 0; n <= 900; ++n){
					var nTime = function(s, n){
						setTimeout(function(){
							elem[s].style.left = 90 - n / 10 + "%";
						},(s + n / 300) * 180);
					}
					nTime(s, n);
				}
				outSectTop(elem[s]);
			}else{
				for(n = 0; n <= 900; ++n){
					nTime = function(s, n){
						setTimeout(function(){
							elem[s].style.left = n / 10 + "%";
						},(s + n / 200) * 100);
					}
					nTime(s, n);
				}
				outSectHeight(elem[s]);
			}
		}
	}
	// section : height
	function outSectHeight(myH){
		var myHeight = myH.offsetHeight;
		for(var h = myHeight; h >= 0; --h){
			var hTime = function(myH, h){
				setTimeout(function(){
					myH.style.height = myHeight - h + "px";
				},(myH, h - 1 / 5) * 11);
			}
			hTime(myH, h);
		}
	}
	// section : height, top
	function outSectTop(myTop){
		var pHeight = myTop.childNodes[0].clientHeight;
		for(var p = 0; p <= pHeight; p++){
			var pTime = function(myTop, p){
				setTimeout(function(){
					myTop.style.height = p + "px";
				},(myTop, p / 20) * 300);
			}
			pTime(myTop, p);
		}
		var hTop = document.getElementsByClassName("off").offsetTop;
		for(var t = hTop; t >= 0; --t){
			var tTime = function(myTop, t){
				setTimeout(function(){
					myTop.style.top = hTop - t + "px";
				},(myTop, t / 10) * 80);
			}
			tTime(myTop, t);
		}
	}
});
