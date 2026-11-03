<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import VPFeature from 'vitepress/dist/client/theme-default/components/VPFeature.vue'
const { frontmatter: fm } = useData();

const props = defineProps({
  features: {
    type: Array,
    required: true,
  }
})
const grid = computed(() => {
  if (fm.value.column > 0) {
    return `grid-${fm.value.column}`
  }
  const length = props.features.length
  if (!length) {
    return
  } else if (length === 2) {
    return 'grid-2'
  } else if (length === 3) {
    return 'grid-3'
  } else if (length % 3 === 0) {
    return 'grid-6'
  } else if (length > 3) {
    return 'grid-4'
  }
})
</script>

<template>
  <div v-if="features" class="VPFeatures">
    <div class="container">
      <ul class="items">
        <li v-for="feature in features" :key="feature.title" class="item" :class="[grid]">
          <VPFeature :icon="feature.icon" :title="feature.title" :details="feature.details" :link="feature.link" :link-text="feature.linkText" :rel="feature.rel" :target="feature.target" />
        </li>
      </ul>
    </div>
  </div>
</template>
