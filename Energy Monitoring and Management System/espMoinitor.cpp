#include <WiFi.h>
#include <FirebaseESP32.h>
#include <esp_wifi.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>

#define WIFI_SSID "Automation"           // input your home or public wifi name 
#define WIFI_PASSWORD "123456789"

#define FIREBASE_HOST ""
#define FIREBASE_Authorization_key ""

FirebaseData firebaseData;
FirebaseData recieveData;
FirebaseJson json;

String currentValue = "0.0";
String voltageValue = "0.0";
String pf  = "0.0";
String kw = "0.0";
String hour = "0";
String minute  = "0";
String second = "0";
String kwh = "0.0";
String overVolt = "0";

long timer;
long millisecond;
float secondAcc;
char incomingByte;
int count = 0;
String data1 = "";
bool condArr[8] = {};
// const char *serverName = "";
// const char *API_KEY = "";

// prepare json document
// StaticJsonDocument<220> doc;

String get_wifi_status(int status){
  switch(status){
    case WL_IDLE_STATUS:
      return "WL_IDLE_STATUS";
    case WL_SCAN_COMPLETED:
        return "WL_SCAN_COMPLETED";
    case WL_NO_SSID_AVAIL:
        return "WL_NO_SSID_AVAIL";
    case WL_CONNECT_FAILED:
        return "WL_CONNECT_FAILED";
    case WL_CONNECTION_LOST:
        return "WL_CONNECTION_LOST";
    case WL_CONNECTED:
        return "WL_CONNECTED";
    case WL_DISCONNECTED:
        return "WL_DISCONNECTED";
  }
}

void reconnect_ESP() {
  if (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    int x = 0;
    while (x < 10) {
      // delay(500);
      Serial.print(".");
      x++;
    }
    Firebase.begin(FIREBASE_HOST, FIREBASE_Authorization_key);
    Serial.println(" ");
    delay(100);

    if (WiFi.status() == WL_CONNECTED) {
      Serial.print("Connected with IP: ");
      Serial.println(WiFi.localIP());
    }
  }
}

// void uploadMongo()
// {
//   doc["dataSource"] = "AtlasCluster";
//   doc["database"] = "EMMS";
//   doc["collection"] = "data";

//   JsonObject document = doc.createNestedObject("document");
//   document["Current"] = currentValue;
//   document["Voltage"] = voltageValue;
//   document["Power Factor"] = pf;
//   document["Power"] = kw;
//   document["Hour"] = hour;
//   document["minute"] = minute;
//   document["second"] = second;
//   document["kwh"] = kwh;
//   document["overVolt"] = overVolt;
//   delay(100);

//   Serial.println("Uploading data... ");

// }

// void POSTData()
// {
//     if (WiFi.status() == WL_CONNECTED)
//     {
//         HTTPClient http;

//         http.begin(serverName);
//         http.addHeader("Content-Type", "application/json");
//         http.addHeader("Access-Control-Request-Headers","*");
//         http.addHeader("api-key",API_KEY);

//         Serial.println(json);
//         // serialize JSON document
//         String json;
//         serializeJson(doc, json);

//         Serial.println(json);
//         int httpResponseCode = http.POST(json);
//         Serial.println(httpResponseCode);

//         if (httpResponseCode == 201)
//         {
//             Serial.println("Data uploaded successfully");
//             delay(200);
//         }
//         else
//         {
//             Serial.println("ERROR: Couldn't upload data");
//             delay(200);
//         }
//     }
//     else if (WiFi.status() != WL_CONNECTED)
//     {
//         WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//         int x = 0;
//         while (WiFi.status() != WL_CONNECTED and x < 5)
//         {
//             delay(500);
//             x++;
//         }
//     }
// }

void setup() {
  // put your setup code here, to run once:
  
  Serial.begin(9600);
  delay(1000);
  int status = WL_IDLE_STATUS;
  Serial.println("\nConnecting");
  Serial.println(get_wifi_status(status));
  // WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  int timeout_counter=0;
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.print(".");
    status = WiFi.status();
    Serial.println(get_wifi_status(status));
    timeout_counter++;

    if(timeout_counter >= 10)
    {
      ESP.restart();
    }
  }
  Serial.println(WiFi.status());

  Firebase.begin(FIREBASE_HOST, FIREBASE_Authorization_key);
  timer = millis();
}

void loop() {
  // put your main code here, to run repeatedly:

  if (Serial.available()) {
    while (Serial.available()) {
      delay(10);
      char c = Serial.read();
      if (c == ',') {
        if (count == 1) {
          currentValue = data1;
        }
        if (count == 2) {
          voltageValue = data1;
        }
        if (count == 3) {
          pf = data1;
        }
        if (count == 4) {
          kw = data1;
        }
        if (count == 5) {
          hour = data1;
        }
        if (count == 6) {
          minute = data1;
        }
        if (count == 7) {
          second = data1;
        }
        if (count == 8) {
          kwh = data1;
        }
        if (count == 9) {
          overVolt = data1;
        }
        count++;
        data1 = "";
      }
      else {
        data1 += c;
      }
    }
    count = 0;

   Serial.print("Current = ");
   Serial.println(currentValue);
   Serial.print("Voltage = ");
   Serial.println(voltageValue);
   Serial.print("Power Factor = ");
   Serial.println(pf);
   Serial.print("Power Unit (KW) = ");
   Serial.println(kw);
   Serial.print("Time = ");
   Serial.println(hour);
   Serial.print(":");
   Serial.println(minute);
   Serial.print(":");
   Serial.println(second);
   Serial.print("Energy(kwh) = ");
   Serial.println(kwh);
   Serial.print("overVolt = ");
   Serial.println(overVolt);

  }

  if (WiFi.status() == WL_CONNECTED) {
    Firebase.begin(FIREBASE_HOST, FIREBASE_Authorization_key);
    // delay(100);
    Firebase.setString(firebaseData, "RoqeebMonitor/current", currentValue);
    Firebase.setString(firebaseData, "RoqeebMonitor/voltage", voltageValue);
    Firebase.setString(firebaseData, "RoqeebMonitor/pf", pf);
    Firebase.setString(firebaseData, "RoqeebMonitor/kw", kw);
    Firebase.setString(firebaseData, "RoqeebMonitor/hour", hour);
    Firebase.setString(firebaseData, "RoqeebMonitor/minute", minute);
    Firebase.setString(firebaseData, "RoqeebMonitor/second", second);
    Firebase.setString(firebaseData, "RoqeebMonitor/kwh", kwh);
    Firebase.setString(firebaseData, "RoqeebMonitor/overVolt", overVolt);
    // delay(1000);


    Firebase.getString(recieveData, "RoqeebMonitor/sysOff");
    String sysOff = recieveData.stringData();

    if (sysOff == "1") {
      Serial.println("*sysOff#");
    }
    else if (sysOff == "0") {
      Serial.println("*onSys#");
    }
    // millisecond = millis() - timer;
    // secondAcc = millisecond / 1000;

    // if (secondAcc > 60)
    // {
    // uploadMongo();
    // delay(500);    
    // POSTData();
    // timer = millis();
    // }   
    // Serial.println(timer);
  }
  else if (WiFi.status() != WL_CONNECTED) {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    int x = 0;
    while (WiFi.status() != WL_CONNECTED and x < 5) {
      // delay(500);
      x++;
    }
    Firebase.begin(FIREBASE_HOST, FIREBASE_Authorization_key);
  }
}

