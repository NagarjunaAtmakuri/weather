async function getWeather() {
  const apiKey = "6a51dc1ac8614609be622815251507"; // 🔐 Replace with your real API key
  const city = document.getElementById("cityInput").value;
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    resultDiv.innerHTML = `
      <p><strong>${data.location.name}, ${data.location.country}</strong></p>
      <img src="https:${icon}" alt="${condition}" />
      <p>🌡️ Temperature: <strong>${temp}°C</strong></p>
      <p>Condition: ${condition}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "❌ Error fetching weather. Try another city.";
  }
}
