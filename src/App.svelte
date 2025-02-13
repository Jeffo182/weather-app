<script>
  import { city, weatherData, unit } from './lib/stores/weatherStore'

  import SearchBar from './lib/components/SearchBar.svelte'
  import WeatherCard from './lib/components/WeatherCard.svelte'
  import { fetchWeather } from './lib/api/fetchWeather'

  // Atualiza os dados da previsão do tempo quando a cidade ou unidade muda
  $: {
    if ($city) {
      // Só faz a requisição se $city tiver um valor válido
      fetchWeather({ city: $city, unit: $unit }) // Passa um objeto com a propriedade `city`
        .then((data) => {
          if (data.cod === 200) {
            // Verifica se a requisição foi bem-sucedida
            weatherData.set(data)
          } else {
            console.error('Cidade não encontrada:', data.message)
            weatherData.set(null) // Limpa os dados em caso de erro
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar dados:', error)
          weatherData.set(null) // Limpa os dados em caso de erro
        })
    }
  }
</script>

<main>
  <h1>Previsão do Tempo</h1>
  <SearchBar />
  {#if $weatherData}
    <WeatherCard data={$weatherData} />
  {:else}
    <p>Digite uma cidade para ver a previsão do tempo.</p>
  {/if}
</main>
