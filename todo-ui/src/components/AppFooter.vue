<template>
  <v-footer height="40" app>
    <div class="h-100 d-flex align-center justify-space-between text-medium-emphasis">
    <span class="d-md-flex gap-x-4 d-none">
      &copy;
      {{ new Date().getFullYear() }}
      Antoni Król
    </span>
  </div>
  </v-footer>
</template>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
