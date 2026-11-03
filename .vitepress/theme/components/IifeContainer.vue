<script setup lang="ts">
import { PropType, reactive, onMounted, watch, ref } from 'vue'
import { useScriptTag } from '@vueuse/core'
import { useStyleLink } from '@/composables/useStyleLink.mts'
import { useData } from 'vitepress'

const props = defineProps({
  styles: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  scripts: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  load: {
    type: Function,
    default: (scope: Record<string, any>) => {},
  },
})

// load style
function loadStyle() {
  props.styles.forEach((link) => {
    useStyleLink({ href: link, attrs: { rel: 'stylesheet' } })
  })
}

const scope = reactive<Record<string, any>>({
  changeTheme: (dark: boolean) => {},
})
const { frontmatter, isDark } = useData()

watch(isDark, (dark) => {
  scope?.changeTheme(dark)
})

// load script
function loadScript() {
  const loads = props.scripts.map((s) => {
    const { load } = useScriptTag(s)
    return load()
  })
  Promise.all(loads).then(() => props.load(scope))
}

const isMaximized = ref(false)
// handle maximize
function handleMaximize() {
  isMaximized.value = !isMaximized.value
  scope.isMaximized = isMaximized.value
}

onMounted(() => {
  scope.window = window
  scope.isDark = isDark.value
  scope.isMaximized = isMaximized.value
  loadScript()
})
loadStyle()
</script>
<template>
  <div class="iife-container" :class="{ 'maximized px-5': isMaximized }">
    <div class="flex items-center h-16" :class="{ '-mt-10 px-1': !isMaximized }">
      <div v-if="frontmatter.title" class="text-lg font-bold">{{ frontmatter.title }}</div>
      <div v-if="frontmatter.description" class="text-sm text-muted-foreground flex-1 truncate px-2 mt-1">{{ frontmatter.description }}</div>
      <Button @click="handleMaximize" variant="ghost" size="icon-sm">
        <span v-if="isMaximized" class="icon-[doodle-icons--minimize] text-2xl"></span>
        <span v-else class="icon-[doodle-icons--maximize] text-2xl"></span>
      </Button>
    </div>
    <div class="iife-content">
      <slot :scope="scope"></slot>
    </div>
  </div>
</template>
