
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuvGXak6aQRjWB4XDgeOlw2AvulSNMADw",
  authDomain: "binarnikalkulator.firebaseapp.com",
  databaseURL: "https://binarnikalkulator-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "binarnikalkulator",
  storageBucket: "binarnikalkulator.appspot.com",
  messagingSenderId: "237492006640",
  appId: "1:237492006640:web:d34e6af02c897c25ad9c35"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function sendData(num1, num2, result){
  //varijable za bazu
  var prviRef = firebase.database().ref("prvi");
  var drugiRef = firebase.database().ref("drugi");
  var rezRef = firebase.database().ref("rez");
  
  //varijable za slanje
  var prviBr = parseFloat(num1);
  var drugiBr = parseFloat(num2);
  var rezBr = result;

  //setovanje vrijednosti
  prviRef.set(prviBr);
  drugiRef.set(drugiBr);
  rezRef.set(rezBr);
}

function decimalToBinary(decimal, bits) {
  var binary = decimal.toString(2);
  var length = binary.length;
  var padding = bits - length;
  for (var i = 0; i < padding; i++) {
     binary = "0" + binary;
 }
 return binary;
 }

function saberi() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var result = parseFloat(num1) + parseFloat(num2);
  if(result > 7 || num1 > 7 || num2 > 7){
  alert("3-bitni kalkulator ne radi sa vrijednostima većim od 7!");
  location.reload();
  sendData(0,0,0);
  return;
  }
  document.getElementById("result").innerHTML = result;
  document.getElementById("binary").innerHTML = decimalToBinary(parseFloat(num1),3) + " + " + decimalToBinary(parseFloat(num2),3) + " = " + decimalToBinary(parseFloat(result),3);
  sendData(num1, num2, result);
}
function oduzmi() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var result = parseFloat(num1) - parseFloat(num2);
  if(result > 7 || num1 > 7 || num2 > 7){
  alert("3-bitni kalkulator ne radi sa vrijednostima većim od 7!");
  location.reload();
  sendData(0,0,0);
  return;
  }
  if(result < 0){
  alert("Ovaj kalkulator radi samo sa pozitivnim vrijednostima!");
  location.reload();
  sendData(0,0,0);
  return;
  }
  document.getElementById("result").innerHTML = result;
  document.getElementById("binary").innerHTML = decimalToBinary(parseFloat(num1),3) + " - " + decimalToBinary(parseFloat(num2),3) + " = " + decimalToBinary(parseFloat(result),3);
  sendData(num1, num2, result);
}
function pomnozi() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var result = parseFloat(num1) * parseFloat(num2);
  if(result > 7 || num1 > 7 || num2 > 7){
  alert("3-bitni kalkulator ne radi sa vrijednostima većim od 7!");
  location.reload();
  sendData(0,0,0);
  return;
  }
  document.getElementById("result").innerHTML = result;
  document.getElementById("binary").innerHTML = decimalToBinary(parseFloat(num1),3) + " x " + decimalToBinary(parseFloat(num2),3) + " = " + decimalToBinary(parseFloat(result),3);
  sendData(num1, num2, result);
}
function podijeli() {
  var num1 = document.getElementById("num1").value;
  var num2 = document.getElementById("num2").value;
  var result = parseInt(parseFloat(num1) / parseFloat(num2));
  if(result > 7 || num1 > 7 || num2 > 7){
  alert("3-bitni kalkulator ne radi sa vrijednostima većim od 7!");
  location.reload();
  sendData(0,0,0);
  return;
  }
  if(num1 % num2 !== 0){
  alert("Brojevi nisu djeljivi!");
  location.reload();
  sendData(0,0,0);
  return;
  }
  document.getElementById("result").innerHTML = result;
  document.getElementById("binary").innerHTML = decimalToBinary(parseFloat(num1),3) + " / " + decimalToBinary(parseFloat(num2),3) + " = " + decimalToBinary(parseFloat(result),3);
  sendData(num1, num2, result);
}

function resetuj(){
  location.reload();
  sendData(0,0,0);
}

function dodaj(){
  var brojacRef = firebase.database().ref("binarni");
  var broj = document.getElementById("vrijednost");
  var brojuTekstu = broj.textContent;
  var brojZaSlanje = parseInt(brojuTekstu) + 1;
  brojacRef.set(brojZaSlanje);
  broj.textContent=brojZaSlanje;
}

function minus(){
  var brojacRef = firebase.database().ref("binarni");
  var broj = document.getElementById("vrijednost");
  var brojuTekstu = broj.textContent;
  var brojZaSlanje = parseInt(brojuTekstu) - 1;
  brojacRef.set(brojZaSlanje);
  broj.textContent=brojZaSlanje;
}

const saberiBtnRef = document.getElementById("saberiBtn");
saberiBtnRef.addEventListener('click',saberi);

const oduzmiBtnRef = document.getElementById("oduzmiBtn");
oduzmiBtnRef.addEventListener('click',oduzmi);

const pomnoziBtnRef = document.getElementById("pomnoziBtn");
pomnoziBtnRef.addEventListener('click',pomnozi);

const podijeliBtnRef = document.getElementById("podijeliBtn");
podijeliBtnRef.addEventListener('click',podijeli);

const resetBtnRef = document.getElementById("resetBtn");
resetBtnRef.addEventListener('click',resetuj);

const minusBtnRef = document.getElementById("minus");
minusBtnRef.addEventListener('click',minus);

const plusBtnRef = document.getElementById("plus");
plusBtnRef.addEventListener('click',dodaj);