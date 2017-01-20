<template>

<div>
    <p v-if="showAll">
      {{ why }}
    </p>
    <p v-else>
      {{ beginWhy }}
      <span v-if="isLong" @click="toggleShowAll">
        ...show all
      </span>
    </p>
</div>



</template>

<script>
export default {
    props: ['why'],
    computed: {
        isLong(){
            return this.why.length > 160
        },
        beginWhy(){
            return this.why.slice(0,160)
        }
    },
    data(){
        return {
            showAll: false
        }
    },
    methods:{
        toggleShowAll(){
            this.showAll = !this.showAll
        }
    }
}

</script>

<style lang="stylus" scoped>

@import "../../styles/main"

span
    text-decoration: underline
    font-weight: bolder
    cursor: pointer


</style>
