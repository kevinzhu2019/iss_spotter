const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP: ', ip);
  fetchCoordsByIP(ip, (error, coords) => {
    if (error) {
      console.log("it didn't work!", error);
      return;
    }
    console.log('It worked! Return Coords: ', coords);

    fetchISSFlyOverTimes(coords, (error, passNumber) => {
      if (error) {
        console.log("It did not work!", error);
        return;
      }

      console.log("It worked! Return times: ", passNumber);

      nextISSTimesForMyLocation((error, passNumber) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        // success, print out the deets!
        console.log(passNumber);
        const printPassTimes = function(passNumber) {
          for (const pass of passNumber) {
            const datetime = new Date(0);
            datetime.setUTCSeconds(pass.risetime);
            const duration = pass.duration;
            console.log(`Next pass at ${datetime} for ${duration} seconds!`);
          }
        };
        
      });

    });
  });
});