<template lang="jade">

.application
  form
    label TAKE ACTION
    p Add your name to learn more.
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
    .checkbox-container
        input(type="checkbox", name="subscribe", id="subscribe")
        label.checkbox__label(for="subscribe") Yes, I’d like to receive updates
    button.btn.btn--full(@click.prevent='') Learn more

</template>

<script>
export default {
    props: ['content']
}
</script>

<style lang="stylus" scoped>
  @import "../../styles/main"
</style>
