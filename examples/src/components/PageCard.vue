<template>
  <div class="page-card flex flex-column">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageCard',
};
</script>

<style scoped>
.page-card {
  padding: 20px;
  height: 100%;
  background-color: #fff;
  border: 1px solid #f1f1f4;
  border-radius: 12px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.03);
}
</style>
