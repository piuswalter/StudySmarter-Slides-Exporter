classListLength = $('.fr-view').length;
var card = [];
for (let i = 0; i < classListLength/2; i++) {
	card[i] = {};
	card[i].question = $('.fr-view').eq(i*2).html();
	card[i].answer = $('.fr-view').eq(i*2+1).html();
}
cardJSON = JSON.stringify(card, null, '\t');

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

download('studysmarter.json', cardJSON);
