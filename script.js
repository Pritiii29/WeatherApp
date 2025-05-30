const apiKey = "de4ef4213fa748e39b370935253005";

async function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!location) {
    resultDiv.innerHTML = "Please enter a location.";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather data not found");

    const data = await response.json();
    const temp = data.current.temp_c;
    const city = data.location.name;
    const condition = data.current.condition.text;

    resultDiv.innerHTML = `
      <p><strong>${city}</strong></p>
      <p>Temperature: ${temp}°C</p>
      <p>Condition: ${condition}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Unable to fetch weather. Please try again.";
  }
}
