function setLang(lang) {
	document.querySelectorAll('.lang-de, .lang-en').forEach(function(el) {
		el.hidden = !el.classList.contains('lang-' + lang);
	});
	var toggle = document.getElementById('lang-toggle');
	if (toggle) toggle.textContent = lang;
	document.documentElement.lang = lang;
	localStorage.setItem('lang', lang);
}

document.addEventListener('DOMContentLoaded', function() {
	var toggle = document.getElementById('lang-toggle');
	if (toggle) {
		toggle.addEventListener('click', function(e) {
			e.preventDefault();
			var current = localStorage.getItem('lang') || 'de';
			setLang(current === 'de' ? 'en' : 'de');
		});
	}
	var saved = localStorage.getItem('lang');
	var browserLang = (navigator.language || navigator.userLanguage || 'de').toLowerCase();
	setLang(saved || (browserLang.startsWith('de') ? 'de' : 'en'));
});

var body = document.getElementsByTagName("body")[0];
var vid = document.getElementById("showreel").childNodes[3];
var vidBtn = document.getElementById("vidBtn");

function isMobileDevice() {
	return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};

function enterFullscreen(element) {
	if(element.requestFullscreen) {
		element.requestFullscreen();
	} else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	} else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	} else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	}
};

function exitFullscreen() {
	if(document.exitFullscreen) {
		document.exitFullscreen();
	} else if(document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	} else if(document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	}
};


function playPause() {
	if (vid.paused) {
		vidBtn.style.visibility = "hidden";
		body.style.background = "black";
		console.log(isMobileDevice());
		if (isMobileDevice() == true) {
			enterFullscreen(vid);
			vid.play();
		} else {
			vid.play();
		};
	} else {
		vid.pause();
		vidBtn.style.visibility = "";
		body.style.background = "white";
		exitFullscreen();
	};
	vid.onended = function() {
		vidBtn.style.visibility = "";
		body.style.background = "white";
		this.currentTime = 0;
		exitFullscreen();
	};
};
