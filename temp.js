const a = {
  "message": "success", 
  "request": {
    "altitude": 100, 
    "datetime": 1575583863, 
    "latitude": 43.6383, 
    "longitude": -79.4301, 
    "passes": 5
  }, 
  "response": [
    {
      "duration": 626, 
      "risetime": 1575586130
    }, 
    {
      "duration": 653, 
      "risetime": 1575591937
    }, 
    {
      "duration": 519, 
      "risetime": 1575597777
    }, 
    {
      "duration": 579, 
      "risetime": 1575652169
    }, 
    {
      "duration": 650, 
      "risetime": 1575657919
    }
  ]
};

console.log(JSON.parse(a));