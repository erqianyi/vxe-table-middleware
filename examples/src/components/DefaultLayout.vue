<template>
  <div class="app-page flex flex-column flex-column-fluid">
    <div class="app-header flex flex-row align-items-center">
      <div class="app-header-logo flex align-items-center justify-content-center">
        <img src="~@/assets/logo.png" alt="avatar" class="avatar" />
      </div>
      <div
        class="app-header-wrapper flex-row-fluid flex flex-row align-items-center justify-content-between"
      >
        <div class="flex flex-column justify-content-center">
          <h1>VxeTableMiddleware</h1>
          <span class="app-header-description">VxeTable 创建中间件应用案例</span>
        </div>
        <div class="flex align-items-center justify-content-center">
          <a
            class="app-header-link"
            href="http://2100.wang/vxe-table-middleware/docs/"
            target="_blank"
          >
            查看文档
          </a>
          <img
            src="~@/assets/svg/github.svg"
            alt="github"
            class="github-icon"
            @click="handleGithub"
          />
        </div>
      </div>
    </div>
    <div class="app-wrapper flex flex-column flex-row-fluid">
      <div class="app-sidebar">
        <!-- menu -->
        <div class="app-menu">
          <ul class="flex flex-column">
            <router-link
              v-for="item in routes"
              :key="`/${item.path}`"
              :to="item.path"
              custom
              v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
              <li
                :class="[
                  'app-menu-item flex align-items-center',
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active',
                ]"
              >
                <img src="~@/assets/svg/menu.svg" alt="icon" />
                <a :href="href" @click="navigate">{{ route.meta.title }}</a>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <div class="app-main flex flex-column flex-column-fluid">
        <transition name="fade-transform" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { constantRoutes } from '@/router';
export default {
  name: 'DefaultLayout',
  computed: {
    routes() {
      return constantRoutes[0].children || [];
    },
  },
  methods: {
    handleGithub() {
      window.open('https://github.com/erqianyi/vxe-table-middleware', '_blank');
    },
  },
};
</script>
