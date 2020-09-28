<template>
<div class="tab" :class="{active: isActive}" @click="isActiveSwitch">
	<h5>{{name}}</h5>
</div>
</template>
<script>
export default {
  name: "",
	props: {
		index: {
			type: Number
		},
		name: {
			type: String
		},
		value: {
			type: Number
		},
		isActive: {
			type: Boolean
		}
	},
  data: () => ({
  }),
	methods: {
	  isActiveSwitch() {
	    this.$emit('isActiveSwitchEvent', this.index)
	  }
	}
}
</script>
<style lang="scss" scoped>
.tab {
	margin: 0;
	// padding: 0;
	cursor: pointer;
	padding-top: 18px;
	padding-bottom: 20px;
	min-width: 100px;
	width: 20vw;
	background-color: #FFE782;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	color: #CCAE68;
	h5 {
		display: inline;
		font-size: 14px;
	}
}
.active {
	background-color: white;
	color: #2B2D33;
}
</style>
