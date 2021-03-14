#define redLED 11
#define greenLED 5
#define blueLED 9 //none


void setup() {
  Serial.begin(9600);
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
}
void loop() {
  
  if (Serial.available()) {
    char c = Serial.read();
    if (c == '1') {
     analogWrite(redLED, 255);
    } else if (c == '0') {
      analogWrite(redLED, 0);
    }
    if (c == '2') {
      analogWrite(greenLED, 255);
    } else if (c == '3') {
      analogWrite(greenLED, 0);
    }
    return;
  }
}
