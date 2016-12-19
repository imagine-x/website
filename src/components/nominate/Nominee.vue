<template>

<div class="nominee-card">
    <h3 class="nominee-card__name">
        {{nominee.name}}
        <div class="official-mark-container u-inline-block" title="Official nominee with Elections BC">
            <i class="fa fa-check-circle official-mark"></i>
        </div>
    </h3>
    <ul class="list--clean nominee-card__list">
        <li>Current occupation: Boss</li>
        <li>Region or riding: Some place cool<li>
    </ul>
    <p class="why-block">{{nominee.why}}</p>
    <a href="#" target="_blank">More information ></a>
    <p></p>
    <endorse-btn :_id="nominee._id"></endorse-btn>
    <span>+{{nominee.support}}</span>
</div>

</template>


<script>
import EndorseBtn from './EndorseBtn'

export default {
        props: ['nominee'],
        components: {
          EndorseBtn
        },
}

</script>


<style lang="stylus" scoped>
@import "../../styles/main"

.official-mark {
    font-size: 20px;
    color: #4CAF50;
}

.official-mark-container {
    width: 3rem;
    cursor: pointer;
}

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
