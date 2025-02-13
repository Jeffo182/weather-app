<script>
  import { city } from '../stores/weatherStore'

  let searchTerm = ''

  function handleSearch() {
    $city = searchTerm
    searchTerm = ''
  }
</script>

<div class="search-bar">
  <input
    bind:value={searchTerm}
    placeholder="Digite uma cidade"
    on:keydown={(e) => e.key === 'Enter' && handleSearch()}
  />
  <button on:click={handleSearch}>Buscar</button>
</div>

<style>
  :global(:root) {
    --primary-color: #1976d2;
    --primary-hover-color: #1565c0;
    --text-color: #fff;
    --input-border-color: #ccc;
    --input-focus-border-color: #1976d2;
  }

  .search-bar {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 10px;
    border: 1px solid var(--input-border-color);
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
  }

  input:focus {
    border-color: var(--input-focus-border-color);
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2); /* Sombra sutil ao focar */
  }

  button {
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: var(--text-color);
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--primary-hover-color);
  }

  button:active {
    background-color: #0d47a1; /* Azul mais escuro para o clique */
  }
</style>
