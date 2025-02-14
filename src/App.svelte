<script>
  import { city, weatherData, unit } from './lib/stores/weatherStore'
  import SearchBar from './lib/components/SearchBar.svelte'
  import Map from './lib/components/Map.svelte'
  import { fetchWeather } from './lib/api/fetchWeather'

  let isLoading = false

  $: {
    if ($city) {
      isLoading = true
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
        .finally(() => {
          isLoading = false
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

  {#if isLoading}
    <div class="loading-overlay">
      <div class="loading-text">Carregando...</div>
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

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .loading-text {
    color: white;
    font-size: 1.5em;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px 40px;
    border-radius: 8px;
  }
</style>
