<template>
	<router-view/>
</template>

<script setup>
import './style/index.scss'
import './style/reset.css'
import './fonts/fonts.css'
import { useStore } from 'vuex'
const store = useStore()
store.commit('checkUser')

</script>
