<template lang="jade">

.application
  form
    label Help us get started.
    div
      input(
        type='text',
        placeholder='Your Name',
        name='Name',
      )
    div
      input(
        type='text',
        placeholder='Your Email',
        name='mail',
      )
    div
      input(
        type='text',
        placeholder='Postal Code',
        name='postal',
      )
    button(@click.prevent='') submit

</template>

<script>
export default {
    props: ['content']
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"

  .application
    padding-top:60px
    
  input
    width: 100%
    height: 50px
    border: 1px solid #dddddd
    margin-bottom: 12px
    padding: 10px
    font-size: 16px
    border-radius:0

  button
    color:black
    width: 100%
    height: 50px
    border-color: rgb(221, 221, 221)
    font-size: 16px
    background: #ff0
    font-family: Montserrat,Arial,sans-serif
    font-weight: bold

</style>
