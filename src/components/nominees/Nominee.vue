<template>

<div class="nominee-card">

    <h3 class="nominee-card__name">
        <div v-if="nominee.official" class="official-mark-container u-inline-block" title="Official nominee with Elections BC">
          <i class="fa fa-check-circle official-mark"></i>
        </div>
        {{nominee.name}}
        <div class="top-endorse">
          <span>+{{support}}</span>
          <endorse-btn :name="nominee.name"></endorse-btn>
        </div>
    </h3>
    <ul class="list--clean nominee-card__list">
        <li v-if="nominee.occupation"><b>Current occupation:</b> {{nominee.occupation}}</li>
        <li v-if="nominee.location"><b>Region:</b> {{nominee.location}}<li>
        <li v-if="nominee.riding"><b>Riding:</b> {{nominee.riding}}<li>
    </ul>
    <p v-if="nominee.why" class="why-block">{{nominee.why}}</p>
    <a v-if="nominee.link" v-bind:href="nominee.link" target="_blank">More information ></a>
    <p></p>

</div>

</template>


<script>
import EndorseBtn from './EndorseBtn'

export default {
        props: ['nominee'],
        components: {
          EndorseBtn
        },
        computed: {
            support(){
                if(this.nominee.supporters){
                    return this.nominee.supporters.length
                }
                return '0'
            }
        }
}

</script>


<style lang="stylus" scoped>
@import "../../styles/main"

.top-endorse
    float:right

.endorse {
    display: inline-block;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
    padding: 0.65rem 1.2rem;
    border: 1px solid black;
    line-height: 1.2;
    margin-right: 0.5rem;
    cursor: pointer;
}

.endorse:hover {
    color: white;
    background-color: black;
}

.endorse.is-endorsed {
    color: gray;
    background-color: lightgray;
    border: lightgray;
    cursor: initial;
}

.thumbs-up {
    margin-left: 0;
    margin-right: 0.5rem;
}

.nominee-card {
    padding: 4rem 0;
    border-bottom: 1px solid black;
}

.nominee-card:first {
    border-top: 1px solid black;
}

.nominee-card:last-child {
    border-bottom: 0;
    padding-bottom: 0;
}

.nominee-card__name {
    margin-bottom: 0.75rem;
}

.nominee-card__list {
    margin-bottom: 1.5rem;
}

.why-block {
    margin-bottom: 1rem;
}
</style>
