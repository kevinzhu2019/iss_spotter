/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  // console.log("wea re here");
  request('https://api.ipify.org?format=json',  (error, response, body) => {
    if (error) {
      // console.log("ip error", error);
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      // console.log("http error");
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    const ip = JSON.parse(body)["ip"];
    // console.log("htere is ip", ip);
    callback(null, ip);
  
  });
  // console.log("here.");

};

// fetchMyIP();

const fetchCoordsByIP = (ip, callback) => {
  console.log("ip:", ip)
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching Coordinators for IP: ${body}`, null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data; //deconstructing
    console.log("latitude:", latitude);
    console.log("longitude:", longitude);


    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  //adding error handling if coords are not numbers
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords["latitude"]}&lon=${coords["longitude"]}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching Coordinators for IP: ${body}`, null);
      return;
    }
    const result = body["response"];
    callback(null, result);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
