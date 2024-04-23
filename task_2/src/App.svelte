<script lang="ts">
	import { onMount } from 'svelte';
  import Select from "./lib/select.svelte";
  import Input from './lib/input.svelte';
  import currenciesOptions from './utils/currencies.ts';
  import {fetchExchangeRate} from './utils/api.ts';

  const exchangeInfo = {
   selectedFrom: 'RUB',
   selectedTo: 'USD',
   currentRate: 0,
   inputFrom: 1,
   inputTo: 0,
  }

  onMount(()=>{
    fetchExchangeRate(exchangeInfo.selectedFrom).then((res) => {
      exchangeInfo.currentRate = res.rates[exchangeInfo.selectedTo]
    });
  })

  const setCurrentRate = (e) => {
    const { name, value } = e.target;
    exchangeInfo[name] = value;
    fetchExchangeRate(value).then((res) => {
      exchangeInfo.currentRate = res.rates[name === 'selectedFrom' ? exchangeInfo.selectedTo : exchangeInfo.selectedFrom ]
    });
    console.log('exchangeInfo', exchangeInfo);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    console.log('exchangeInfo', exchangeInfo);
    if(name === "inputFrom"){
      exchangeInfo.inputFrom = value;
      exchangeInfo.inputTo = exchangeInfo.inputFrom * exchangeInfo.currentRate
    }
    if(name === "inputTo"){
      exchangeInfo.inputTo = value;
      exchangeInfo.inputFrom = exchangeInfo.inputFrom / exchangeInfo.currentRate
    }
  };

</script>

<main class="main">
  <div class="block">
    <Select
      title="У меня есть"
      value={exchangeInfo.selectedFrom}
      handleSelectChange="{setCurrentRate}"
      name="selectedFrom"
      options="{currenciesOptions}"
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
      handleSelectChange="{setCurrentRate}"
      name="selectedTo"
      options="{currenciesOptions}"
    />    
    <Input
      value={exchangeInfo.inputTo}
      name="inputTo"
      {handleInputChange}
    />
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