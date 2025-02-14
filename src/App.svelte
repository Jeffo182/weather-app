<script>
  import { city, weatherData, unit } from './lib/stores/weatherStore'
  import SearchBar from './lib/components/SearchBar.svelte'
  import Map from './lib/components/Map.svelte'
  import { fetchWeather } from './lib/api/fetchWeather'

  $: {
    if ($city) {
      fetchWeather({ city: $city, unit: $unit })
        .then((data) => {
          if (data.cod === 200) {
            weatherData.set(data)
          } else {
            console.error('Cidade não encontrada:', data.message)
            weatherData.set(null)
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error)
          weatherData.set(null)
        })
    }
  }
</script>

<main>
  <div class="search-container">
    <SearchBar />
  </div>
  {#if $weatherData}
    <div class="map-container">
      <Map coords={$weatherData.coord} weatherData={$weatherData} />
    </div>
  {:else}
    <div class="map-container">
      <Map />
    </div>
  {/if}
</main>

<style>
  .search-container {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    background-color: transparent;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .map-container {
    width: 100%;
    height: 100vh;
    position: relative;
  }
</style>
