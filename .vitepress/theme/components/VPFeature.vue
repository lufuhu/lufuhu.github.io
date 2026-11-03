<script setup>
import VPImage from "vitepress/dist/client/theme-default/components/VPImage.vue";
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";
import VPNavMenuGroup from "vitepress/dist/client/theme-default/components/VPNavMenuGroup.vue";
defineProps({
	icon: {
		type: [String, Object],
		required: false
	},
	title: {
		type: String,
		required: true
	},
	details: {
		type: String,
		required: false
	},
	link: {
		type: String,
		required: false
	},
	linkText: {
		type: String,
		required: false
	},
	rel: {
		type: String,
		required: false
	},
	target: {
		type: String,
		required: false
	}
});
</script>

<template>
  <VPLink
    class="VPFeature"
    :href="link"
    :rel
    :target
    :no-icon="true"
    :tag="link ? 'a' : 'div'"
  >
    <article class="box" :class="`box-${typeof icon === 'object' ? icon.position || 'none' : 'none'}`">
      <div v-if="typeof icon === 'object' && icon.version" class="version-container">
          <VPNavMenuGroup :item="{text: icon.version.text, items: icon.version.items}"></VPNavMenuGroup>
      </div>
      <div v-if="typeof icon === 'object' && icon.html" class="icon" v-html="icon.html" :style="{fontSize: icon.size || '1.5rem'}"></div>
      <div v-else-if="typeof icon === 'object' && icon.wrap" class="icon">
        <VPImage
          :image="icon"
          :alt="icon.alt"
          :height="icon.height || 48"
          :width="icon.width || 48"
        />
      </div>
      <VPImage
        v-else-if="typeof icon === 'object'"
        :image="icon"
        :alt="icon.alt"
        :height="icon.height || 48"
        :width="icon.width || 48"
      />
      <div v-else-if="icon" class="icon" v-html="icon"></div>
      <div class="box-content">
        <h2 class="title" v-html="title"></h2>
        <ul v-if="Array.isArray(details)" class="details">
          <li v-for="item in details" :key="item" v-html="item"></li>
        </ul>
        <p v-else-if="details" class="details" v-html="details"></p>
        <div v-if="linkText" class="link-text">
          <p class="link-text-value">
            {{ linkText }} <span class="vpi-arrow-right link-text-icon" />
          </p>
        </div>
      </div>
    </article>
  </VPLink>
</template>
