<script lang="ts">
  import { unit } from '../stores/weatherStore'
  export let data: any

  function toggleUnit() {
    $unit = $unit === 'metric' ? 'imperial' : 'metric'
  }
  $: currentTemperature = data.main.temp
  $: temperatureUnit = $unit === 'metric' ? '°C' : '°F'
</script>

<div class="weather-card">
  <h2>{data.name}</h2>
  <img
    src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
    alt={data.weather[0].description}
  />
  <p on:click={toggleUnit} class="temperature">
    {Math.round(currentTemperature)}{temperatureUnit}
  </p>
  <p>{data.weather[0].description}</p>
  <p>Umidade: {data.main.humidity}%</p>
  <p>Vento: {data.wind.speed} m/s</p>
</div>

<style>
  .weather-card {
    text-align: center;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    max-width: 300px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .temperature {
    cursor: pointer;
    color: var(--primary-color);
    font-weight: bold;
    transition: color 0.3s ease;
  }

  .temperature:hover {
    color: var(--primary-hover-color);
  }
</style>
