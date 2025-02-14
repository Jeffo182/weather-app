<script>
  import { onMount, afterUpdate } from 'svelte'
  import L from 'leaflet'
  import 'leaflet/dist/leaflet.css'

  export let coords = null
  export let weatherData = null

  let mapContainer
  let map
  let marker = null

  onMount(() => {
    map = L.map(mapContainer).setView([-23.5505, -46.6333], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
  })

  afterUpdate(() => {
    if (coords && map) {
      const { lat, lon } = coords

      if (marker) {
        map.removeLayer(marker)
      }

      // Define o ícone personalizado
      const customIcon = L.icon({
        iconUrl: '/vite.svg', // Caminho para o ícone na pasta public
        iconSize: [32, 32], // Tamanho do ícone
        iconAnchor: [16, 32], // Ponto de ancoragem do ícone
        popupAnchor: [0, -32], // Ponto de ancoragem do popup
      })

      // Adiciona o marcador com o ícone personalizado
      marker = L.marker([lat, lon], { icon: customIcon }).addTo(map)
      map.setView([lat, lon], 13)

      if (weatherData) {
        const { name, main, weather } = weatherData
        const temperature = main.temp
        const description = weather[0].description

        marker
          .bindPopup(
            `
          <div>
            <h3>${name}</h3>
            <p><strong>Temperatura:</strong> ${temperature}°C</p>
            <p><strong>Condição:</strong> ${description}</p>
          </div>
        `,
          )
          .openPopup()
      }
    }
  })
</script>

<div bind:this={mapContainer} class="map"></div>

<style>
  .map {
    width: 100%;
    height: 100%;
  }
</style>
