// Globala konstanter och variabler
var boardElem;			// Referens till div-element för "spelplanen"
const carImgs = ["car_up.png","car_right.png","car_down.png","car_left.png"];
						// Array med filnamn för bilderna med bilen
var carDir = 1;			// Riktning för bilen, index till carImgs
var carElem;			// Referens till img-element för bilen
const xStep = 5;		// Antal pixlar som bilen ska förflytta sig i x-led
const yStep = 5;		// eller y-led i varje steg
const timerStep = 20;	// Tid i ms mellan varje steg i förflyttningen
var timerRef = null;	// Referens till timern för bilens förflyttning
var startBtn;			// Referens till startknappen
var stopBtn;			// Referens till stoppknappen
/* === Tillägg i uppgiften === */
var pigImgs;
var pigElem;
var timerRefPig = null;
var pigHits = 0;
var numberOfPigs = 0;

// ------------------------------
// Initiera globala variabler och koppla funktion till knapp
function init() {
	// Referenser till element i gränssnittet
		boardElem = document.getElementById("board");
		carElem = document.getElementById("car");
		startBtn = document.getElementById("startBtn");
		stopBtn = document.getElementById("stopBtn");
		pigElem = document.getElementById("pig");
	// Lägg på händelsehanterare
		document.addEventListener("keydown",checkKey);
			// Känna av om användaren trycker på tangenter för att styra bilen
		startBtn.addEventListener("click",startGame);
		stopBtn.addEventListener("click",stopGame);
	// Aktivera/inaktivera knappar
		startBtn.disabled = false;
		stopBtn.disabled = true;
	/* === Tillägg i uppgiften === */
	

} // End init
window.addEventListener("load",init);
// ------------------------------
// Kontrollera tangenter och styr bilen
function checkKey(e) {
	let k = e.keyCode;
	switch (k) {
		case 37: // Pil vänster
		case 90: // Z
			carDir--; // Bilens riktning 90 grader åt vänster
			if (carDir < 0) carDir = 3;
			carElem.src = "img/" + carImgs[carDir];
			break;
		case 39:  // Pil höger
		case 173: // -
			carDir++; // Bilens riktning 90 grader åt höger
			if (carDir > 3) carDir = 0;
			carElem.src = "img/" + carImgs[carDir];
			break;
	}
} // End checkKey
// ------------------------------
// Initiera spelet och starta bilens rörelse
function startGame() {
	startBtn.disabled = true;
	stopBtn.disabled = false;
	carElem.style.left = "0px";
	carElem.style.top = "0px";
	carDir = 1;
	carElem.src = "img/" + carImgs[carDir];
	moveCar();
	/* === Tillägg i uppgiften === */
	pigHits = 0;
	numberOfPigs = 0;
	document.getElementById("hitCounter").innerHTML = pigHits;
	document.getElementById("pigNr").innerHTML = numberOfPigs;
	
	timeRefPig = setTimeout(pigSpawnIn, 2000);

} // End startGame
// ------------------------------
// Stoppa spelet
function stopGame() {
	if (timerRef != null) clearTimeout(timerRef);
	
	startBtn.disabled = false;
	stopBtn.disabled = true;
	/* === Tillägg i uppgiften === */	
	if (timerRefPig != null) clearTimeout(timerRefPig);
	pigElem.style.visibility = "hidden";

} // End stopGame
// ------------------------------
// Flytta bilen ett steg framåt i bilens riktning
function moveCar() {
	let xLimit = boardElem.offsetWidth - carElem.offsetWidth;
	let yLimit = boardElem.offsetHeight - carElem.offsetHeight;
	let x = parseInt(carElem.style.left);	// x-koordinat (left) för bilen
	let y = parseInt(carElem.style.top);	// y-koordinat (top) för bilen
	switch (carDir) {
		case 0: // Uppåt
			y -= yStep;
			if (y < 0) y = 0;
			break;
		case 1: // Höger
			x += xStep;
			if (x > xLimit) x = xLimit;
			break;
		case 2: // Nedåt
			y += yStep;
			if (y > yLimit) y = yLimit;
			break;
		case 3: // Vänster
			x -= xStep;
			if (x < 0) x = 0;
			break;
	}
	carElem.style.left = x + "px";
	carElem.style.top = y + "px";
	timerRef = setTimeout(moveCar,timerStep);
	/* === Tillägg i uppgiften === */
	collision(x, y);

} // End moveCar
// ------------------------------
/* === Tillägg av nya funktioner i uppgiften === */
function pigSpawnIn(){
	numberOfPigs++;

	if(numberOfPigs === 10){
		stopGame();
	}

	pigElem.src = "img/pig.png";
	let xLimitPig = boardElem.offsetWidth - pigElem.offsetWidth;
	let yLimitPig = boardElem.offsetHeight - pigElem.offsetHeight;
	let pigXCoordinates = Math.floor(Math.random() * xLimitPig);
	let pigYCoordinates = Math.floor(Math.random() * yLimitPig);

	pigElem.style.top = pigYCoordinates + "px";
	pigElem.style.left = pigXCoordinates + "px";
	pigElem.style.visibility = "visible";

	timeRefPig = setTimeout(pigSpawnIn, 5000);
	console.log(timeRefPig);

	document.getElementById("hitCounter").innerHTML = pigHits;
	document.getElementById("pigNr").innerHTML = numberOfPigs;	

	collision(pigXCoordinates, pigYCoordinates);
}

function collision(x, y, pigXCoordinates, pigYCoordinates){
	if(x > pigXCoordinates - 60 && x < pigXCoordinates + 30 && y > pigYCoordinates - 60 && y < pigYCoordinates + 30){
		pigElem.src = "img/smack.png";
		console.log("Träff!");
		pigHits++;
		console.log(pigHits);
	}
	/*if(x > pigXCoordinates - 60 && x < pigXCoordinates + 30 && y > pigYCoordinates - 60 && y < pigYCoordinates + 30 ){
		console.log("Krock!");
		pigHits++;
	}*/
}
