$('body').append(`<div id="pw-control-panel" style="pointer-events:auto;padding:10px;width:360px;position:absolute;right:50px;bottom:80px;background-color:#f8f8f8;z-index:9997;">
	<style>
		.pw-button {
			background-color: white;
			color: black;
			border: 2px solid #555555;
			transition-duration: 0.4s;
		}
		
		.pw-button:hover {
			background-color: #555555;
			color: white;
		}
		
		.pw-control-button {
			padding: 0;
			appearance: none;
			border: 0;
			border-radius: .125rem;
			background: transparent;
			font-size: .875rem;
			line-height: 30px;
		}
	</style>
	
	<div style="width:100%;">
		<div style="float:left;width:10%;text-align:left;">
			<button class="pw-control-button mover" style="font-size:20px;line-height:30px;cursor:move;" title="Move StudySmarter Slides Exporter">&boxbox;</button>
		</div>
		<div style="float:left;width:80%;text-align:center;">
			<span style="font-size:15px;line-height:30px;">StudySmarter Slides Exporter</span>
		</div>
		<div style="float:right;width:10%;text-align:right;">
			<button class="pw-control-button" style="font-size:30px;line-height:30px;cursor:pointer;" title="Close StudySmarter Slides Exporter" onclick="$(\'#pw-wrapper\').remove();$(\'#pw-control-panel\').remove();">&times;</button>
		</div>
	</div>
	<table style="margin-bottom:3px;width:100%;font-size:11px;">
		<tr id="pw-courses" style="background-color:#fff;">
			<th><p style="margin-bottom:5px;">Verfügbare Fächer</p></th>
			<th><p style="margin-bottom:5px;">Optionen</p></th>
		</tr>
	</table>
	<div id="pw-status" style="width:100%;color:red;background-color:white;font-size:12px;">Status: </div>
	<span style="font-size:10px;">Programmed by <a target="_blank" href="https://www.piuswalter.de/">Pius Walter</a> (<a target="_blank" href="https://github.com/piuswalter/StudySmarter-Slides-Exporter/">GitHub repo</a>)</span>
</div>
<div id="pw-wrapper" style="margin:0;padding:0;width:100vw;height:100vh;position:absolute;overflow:hidden;display:block;z-index:9998;left:0;top:0;pointer-events:none;"></div>
`);

var wrapper = document.querySelector('#pw-wrapper'),
controlPanel = document.querySelector('#pw-control-panel'),
mover = document.querySelector('.mover'),
x = 0,
y = 0,
mousedown = false;
var timeoutID = null;
var emojiID = 0;

mover.addEventListener('mousedown', function (e) {
	mousedown = true;
	x = controlPanel.offsetLeft - e.clientX;
	y = controlPanel.offsetTop - e.clientY;
	$('.move-index').css('z-index', '9996');
	$('#pw-wrapper').css('pointer-events','auto');
}, true);

wrapper.addEventListener('mouseup', function (e) {
	mousedown = false;
	$('.move-index').css('z-index', '9999');
	$('#pw-wrapper').css('pointer-events','none');
}, true);

wrapper.addEventListener('mousemove', function (e) {
	if (mousedown) {
		controlPanel.style.left = e.clientX + x + 'px';
		controlPanel.style.top = e.clientY + y + 'px';
	}
}, true);


var courses = [];
for (let i = 0; i <  $('.left .title').length; i++) {
   courses[i] = $('.left .title').eq(i).text();
}
var cardJSON = '';
var coursesInjectionCode = '';
for (let i = 0; i < courses.length; i++) {
	coursesInjectionCode += '<tr style="background-color:#fff;"><td>' + courses[i] + '</td><td><button onclick="gotoCourse(' + i + ');">Load</button><button onclick="download();">Download</button></td></tr>'
}
$('#pw-courses').after(coursesInjectionCode);

var controlPanelHeight = $('#pw-control-panel').height();
controlPanel.style.height = (controlPanelHeight + 15) + 'px';

function gotoCourse(course) {
	setStatus('Loading ... Please wait!', 'red')
	$.when( $('.left .title').eq(course).click() )
		.then( $('.title-wrapper').eq(courses.length + 2).click() )
		.then( setTimeout(loadSlides, 5000) );
}

var slidesContent;
function loadSlides() {
	if ($('.spinner-wrapper').length != 0) {
		$('.all-flashcards-wrapper.flashcard-tab-content.ng-star-inserted').scrollTop($('.all-flashcards-wrapper.flashcard-tab-content.ng-star-inserted')[0].scrollHeight);
		setTimeout(loadSlides, 1000);
	} else {
		slidesContent = saveSlides().replace(/&amp;/gi, '&');
		setStatus('Loading completed. Press download button now.', 'green')
	}
}

function saveSlides() {
	classListLength = $('.fr-view').length;
	var card = [];
	for (let i = 0; i < classListLength/2; i++) {
		card[i] = {};
		card[i].question = $('.fr-view').eq(i*2).html();
		card[i].answer = $('.fr-view').eq(i*2+1).html();
	}
	return JSON.stringify(card, null, '\t');
}

function download() {
	filename = 'studysmarter';

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(slidesContent));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);

	setStatus('Download finished. Ready for new load.', 'green');
}

function setStatus(message, messageColor) {
	$('#pw-status').text('Status: ' + message);
	$('#pw-status').css('color', messageColor);
}

setStatus('Loaded (Press Load to start).', 'green');
