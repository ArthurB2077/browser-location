const localize = async () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const timestamp = position.timestamp

      console.log(position)

      document.getElementById("longitude").value = `${Math.round(latitude)}`
      document.getElementById("latitude").value = `${Math.round(longitude)}`
      document.getElementById("timestamp").value = `${new Date(timestamp).toLocaleString()}`

      const requestOptions = {
        method: 'GET',
      };

      try {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=f4d4902ed8664537a855beda88ffec88`, requestOptions)
        const result = await response.json()
        const location = result.features[0].properties

        console.log(location)

        document.getElementById("housenumber").value = `${location["housenumber"]}`
        document.getElementById("street").value = `${location["street"]}`
        document.getElementById("zipcode").value = `${location["postcode"]}`
        document.getElementById("city").value = `${location["city"]}`
        document.getElementById("country").value = `${location["country"]}`

      } catch (err) {
        console.error(err)
      }
    },
    (error) => {
      console.error(error)
    },
    {
      enableHighAccuracy: true,
    }
  );
};

document.getElementById("submitButton").addEventListener("click", async () => {
  await localize()
})