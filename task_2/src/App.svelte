<script>
  import { onMount } from 'svelte';
  import Select from "./lib/select.svelte";
  import Input from './lib/input.svelte';
  import currenciesOptions from './utils/currencies.ts';
  import { fetchExchangeRate } from './utils/api.ts';

  const exchangeInfo = {
    selectedFrom: "RUB",
    selectedTo: "USD",
    currentRate: 0,
    inputFrom: 100,
    inputTo: 0,
  };

  const setCurrentRate = () => {
    fetchExchangeRate(exchangeInfo.selectedFrom).then((res) => {
      exchangeInfo.currentRate = res.rates[exchangeInfo.selectedTo];
      exchangeInfo.inputTo = exchangeInfo.inputFrom * exchangeInfo.currentRate;
    });
  };

  onMount(() => {
    setCurrentRate();
  });

  const handleRateChange = async (e) => {
    const { name, value } = e.target;
    exchangeInfo[name] = value;
    await setCurrentRate();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isNaN(value)) {
      exchangeInfo[name] = exchangeInfo[name];
    } else {
      exchangeInfo[name] = Number(value);
    }
    if (name === "inputFrom") {
      exchangeInfo.inputTo = exchangeInfo.inputFrom * exchangeInfo.currentRate;
    }
    if (name === "inputTo") {
      exchangeInfo.inputFrom = exchangeInfo.inputTo / exchangeInfo.currentRate;
    }
  };
</script>

<main class="main">
  <div class="block">
    <Select
      title="У меня есть"
      value={exchangeInfo.selectedFrom}
      handleSelectChange="{handleRateChange}"
      name="selectedFrom"
      options={currenciesOptions}
    />
    <Input
      value={exchangeInfo.inputFrom}
      name="inputFrom"
      {handleInputChange}
    />
  </div>

  <div class="block">
    <Select
      title="Хочу приобрести"
      value={exchangeInfo.selectedTo}
      handleSelectChange="{handleRateChange}"
      name="selectedTo"
      options={currenciesOptions}
    />
    <Input value="{exchangeInfo.inputTo}" name="inputTo" {handleInputChange} />
  </div>
</main>

<style>
  .main {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }
  .block {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>