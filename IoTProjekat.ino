#define LED11 D1
#define LED12 D2
#define LED13 D3

#define LED21 D4
#define LED22 D5
#define LED23 D6

#define LED31 D7
#define LED32 D8
#define LED33 D0

#include <ESP8266WiFi.h>
#include <Firebase.h>
#include <FirebaseArduino.h>
#include <FirebaseCloudMessaging.h>
#include <FirebaseError.h>
#include <FirebaseHttpClient.h>
#include <FirebaseObject.h>
#include <stdlib.h>
#define FIREBASE_HOST "binarnikalkulator-default-rtdb.europe-west1.firebasedatabase.app" //link bez http i / na kraju
#define FIREBASE_AUTH "7UOJrAjpzfsiRAldSCUNvfKgFVVKrlohnmYko9qj" //**
#define WIFI_SSID "83f212"                 // wifi name
#define WIFI_PASSWORD "330762643"  //wifi password
void setup()

{
Serial.begin(9600);  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
Serial.print("Connecting to Wi-Fi");
while (WiFi.status() != WL_CONNECTED){
  Serial.print(".");
  delay(300);
}
Serial.println();
Serial.print("Connected with IP: ");
Serial.println(WiFi.localIP());
Serial.println();
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  if (Firebase.failed()) {
    Serial.print(Firebase.error());
  } else {
    Serial.println("Firebase Connected");
  }

 pinMode(LED11,OUTPUT);
 pinMode(LED12,OUTPUT);
 pinMode(LED13,OUTPUT);

 pinMode(LED21,OUTPUT);
 pinMode(LED22,OUTPUT);
 pinMode(LED23,OUTPUT);
 
 pinMode(LED31,OUTPUT);
 pinMode(LED32,OUTPUT);
 pinMode(LED33,OUTPUT);

}

// the loop function runs over and over again forever



void loop()

{
  int prviBroj = Firebase.getInt("/prvi");
  if(!Firebase.success()){
    Serial.println("Neuspješno dobavljanje varijable...");
  }
  // handle error
  Serial.print("Prvi broj: ");
  Serial.println(prviBroj);

  if(prviBroj==0){
    digitalWrite(LED11,LOW);
    digitalWrite(LED12,LOW);
    digitalWrite(LED13,LOW);
  }
  if(prviBroj > 3){
    digitalWrite(LED11,HIGH);
    prviBroj-=4;
    Serial.print("1");
  }
  else{
    digitalWrite(LED11,LOW);
    Serial.print("0");
  }
  
  if(prviBroj>1){
    digitalWrite(LED12,HIGH);
    prviBroj-=2;
    Serial.print("1");
  }
  else{
    digitalWrite(LED12,LOW);
    Serial.print("0");
  }

  if(prviBroj>0){
    digitalWrite(LED13,HIGH);
    Serial.print("1\n");
  }
  else{
    digitalWrite(LED13,LOW);
    Serial.print("0\n");
  }




  int drugiBroj = Firebase.getInt("/drugi");
  if(!Firebase.success()){
    Serial.println("Neuspješno dobavljanje varijable...");
  }
  // handle error
  Serial.print("Drugi broj: ");
  Serial.println(drugiBroj);

  if(drugiBroj==0){
    digitalWrite(LED21,LOW);
    digitalWrite(LED22,LOW);
    digitalWrite(LED23,LOW);
  }
  if(drugiBroj > 3){
    digitalWrite(LED21,HIGH);
    drugiBroj-=4;
    Serial.print("1");
  }
  else{
    digitalWrite(LED21,LOW);
    Serial.print("0");
  }
  
  if(drugiBroj>1){
    digitalWrite(LED22,HIGH);
    drugiBroj-=2;
    Serial.print("1");
  }
  else{
    digitalWrite(LED22,LOW);
    Serial.print("0");
  }

  if(drugiBroj>0){
    digitalWrite(LED23,HIGH);
    Serial.print("1\n");
  }
  else{
    digitalWrite(LED23,LOW);
    Serial.print("0\n");
  }




  int rez = Firebase.getInt("/rez");
  if(!Firebase.success()){
    Serial.println("Neuspješno dobavljanje varijable...");
  }
  // handle error
  Serial.print("Rezultat: ");
  Serial.println(rez);

  if(rez==0){
    digitalWrite(LED31,LOW);
    digitalWrite(LED32,LOW);
    digitalWrite(LED33,LOW);
  }
  if(rez > 3){
    digitalWrite(LED31,HIGH);
    rez-=4;
    Serial.print("1");
  }
  else{
    digitalWrite(LED31,LOW);
    Serial.print("0");
  }
  
  if(rez>1){
    digitalWrite(LED32,HIGH);
    rez-=2;
    Serial.print("1");
  }
  else{
    digitalWrite(LED32,LOW);
    Serial.print("0");
  }

  if(rez>0){
    digitalWrite(LED33,HIGH);
    Serial.print("1\n");
  }
  else{
    digitalWrite(LED33,LOW);
    Serial.print("0\n");
  }
  
  delay(3000);

  
  // update value
  

}