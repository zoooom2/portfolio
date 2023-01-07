#include <ZMPT101B.h>
#include <ACS712.h>

#define relay 8
#define XORpin A2
#define volPin A1

const int currentPin = A0;
int sensitivity = 100;  //66-->>30A, 100-->>20A, 185-->>5A
int adcValue = 0;
int offsetVoltage = 2500;
double adcVoltage = 0;
double currentValue = 0;
int currSize = 20;
double currentArray[20];

int sampling = 300;
int vOffset = 512;
float amplitude = 411.00;
float realVac = 233.5;
int adcMax;
int adcMin;
int adcVpp;
float voltageValue = 0.0;
int maxVolt = 255;


int freq = 50;
float pf = 0.8;
float dt = 0.0;
float phi = 0.0;
float kw = 0.0;
float kwAcc = 0.00;
float kwh = 0.0;


long timer;
long millisecond;
int second = 0;
float secondAcc = 0;
int minute = 0;
int hour = 0;
bool overVolt = false;
bool sysOff = false;


void setup()
{
  pinMode(currentPin, INPUT);
  pinMode(volPin, INPUT);
  pinMode(XORpin, INPUT);
  pinMode(relay, OUTPUT);

  Serial.begin(9600);
  digitalWrite(relay, HIGH);
  timer = millis();

}

void loop()
{
  read_current();
  read_voltAC();
  read_ESP();

  dt = (pulseIn(XORpin, HIGH) / 1000);
  phi = freq * dt * 360;
   pf = cos(phi);
//   pf = 0.8;
 

  kw = voltageValue * currentValue * pf;
  // kw = kw/1000;
  kwAcc += kw;
  //  Serial.print("Power Unit = ");
  //  Serial.println(kw);

  millisecond = millis() - timer;
  timer = millis();
  second += (millisecond / 1000);
  secondAcc = millisecond / 1000;
  if (second >= 60) {
    minute ++;
    second = second - 60;
  }
  if (minute >= 60) {
    hour++;
    minute = minute - 60;
  }

  kwh += (kw * (secondAcc / 3600.0));
  secondAcc = 0;

  Serial.print(",");
  Serial.print(currentValue);
  Serial.print(",");
  Serial.print(voltageValue);
  Serial.print(",");
  Serial.print(pf);
  Serial.print(",");
  Serial.print(kw);
  Serial.print(",");
  Serial.print(hour);
  Serial.print(",");
  Serial.print(minute);
  Serial.print(",");
  Serial.print(second);
  Serial.print(",");
  Serial.print(kwh);
  Serial.print(",");
  Serial.print(overVolt);
  Serial.print(",");


//  delay(900);
  read_ESP();

}

void read_ESP() {
  String inputString;
  if (Serial.available()) {
    while (Serial.available()) {
      char incomingByte = Serial.read();
      inputString += incomingByte;
      delay(10);
    }

    inputString.toUpperCase();
    if (inputString.indexOf("SYSOFF") > -1) {
      sysOff = true;
      inputString = "";
    }

    if (inputString.indexOf("ONSYS") > -1) {
      sysOff = false;
      inputString = "";
    }

  }

  if (!sysOff) {
    if (voltageValue > maxVolt) {
      overVolt = true;
    }
    else if (voltageValue < maxVolt) {
      digitalWrite(relay, HIGH);
      overVolt = false;
    }
    else if(kwh > 0.05){
      digitalWrite(relay, LOW);
    }
  }
  else if (sysOff) {
    digitalWrite(relay, LOW);
  }
}
/*
   =================================================================================================================
*/
void read_voltAC() {
  adcMax = 0;
  adcMin = 1024;

  for (int x = 0; x < sampling; x++) {
    int adc = analogRead(volPin);

    if (adc > adcMax) {
      adcMax = adc;
    }
    if (adc < adcMin) {
      adcMin = adc;
    }
  }

  adcVpp = adcMax - adcMin;
  voltageValue = map(adcVpp, 0, amplitude, 0, realVac);
  voltageValue -= 17;

  if (voltageValue <= 20) {
    voltageValue = 0.00;
  }
}

void read_current(){
  for (int k = 0; k < currSize; k++) {
    double rawcurrentValue = 0;
    for (int i = 0; i < 1000; i++) {
      adcValue = analogRead(currentPin);
      adcVoltage = (adcValue / 1024.0) * 5000;
      double newCurrentValue = ((adcVoltage - offsetVoltage) / sensitivity);
      if (adcValue <= 515) {
        newCurrentValue = 0;
      }
      if (newCurrentValue > rawcurrentValue) {
        rawcurrentValue = newCurrentValue;
      }
    }

    currentArray[k] = rawcurrentValue;
  }

  currentValue = max_frequency(currentArray, currSize);
  }

double max_frequency(double sampleArray[], int arraySize) {
  double freqArray[2][arraySize];
  for(int i = 0; i < 2; i++){
    for(int j = 0; j<arraySize; j++){
      freqArray[i][j] = -1;
      }
    }
  bool check[arraySize];
  for (int i = 0; i < arraySize; i++) {
    check[i] = 0;
  }

  int indexCount = 1;
  for (int i = 0; i < arraySize; i++) {
    if (check[i] == 1) {
      continue;
    }
    int freqCount = 1;
    for (int j = i + 1; j < arraySize; j++){
      if (sampleArray[i] == sampleArray[j]) {
      check[j] = 1;
        freqCount++;
      }
  }

    freqArray[0][indexCount] = freqCount;
    freqArray[1][indexCount] = sampleArray[i];
    indexCount++;
  }


  //MAXIMUM FREQUENCY CALCULATION SECTOR
  double maxFreq = freqArray[0][0];
  int maxIndex;

  for (int j = 0; j < indexCount + 1; j++) {
    if (freqArray[0][j] > maxFreq) {
      maxFreq = freqArray[0][j];
      maxIndex = j;
    }
  }

  double sample = freqArray[1][maxIndex];
  return sample;
}
