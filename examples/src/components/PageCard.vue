<template>
  <div class="page-card flex flex-column flex-column-fluid">
    <div class="page-card-header flex align-items-center">
      <slot name="header">
        <div class="page-card-title">{{ title }}</div>
      </slot>
    </div>
    <div class="page-card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCard',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
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
.page-card-header {
  padding: 0 10px;
  height: 50px;
}
.page-card-title {
  font-size: 16px;
  font-weight: bold;
}
.page-card-body {
  padding: 10px;
}
</style>
