<script>
  export let title;
  export let options;
  export let value;
  export let name;
  export let handleSelectChange;
</script>

<p class='title'>{title}</p>
<select {name} bind:value on:change="{handleSelectChange}">
  {#each options as option}
  <option value="{option.code}">{option.name}</option>
  {/each}
</select>

<style>
  .title {
    margin: 0;
  }
</style>