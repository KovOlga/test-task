<script>
  export let value;
  export let name;
  export let handleInputChange;
</script>

<input bind:value {name} on:input="{handleInputChange}" />