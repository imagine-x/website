<template>

<div class="nominee-card">
    <h3 class="nominee-card__name">{{nominee.name}}</h3>
    <ul class="list--clean">
        <li>Current occupation: Boss</li>
        <li>Region or riding: Some place cool<li>
    </ul>
    <p class="why-block">{{nominee.why}}</p>
    <a href="#">More information ></a>
    <p></p>
    <div role="button" class="endorse" @click='endorse(nominee.name)'><i class="fa fa-thumbs-up thumbs-up"></i>Endorse</div>
    <div role="button" class="endorse is-endorsed"><i class="fa fa-thumbs-up thumbs-up"></i>Endorsed</div>
    <span>+{{nominee.support}}</span>
</div>

</template>


<script>

export default {
        props: ['nominee'],
        computed: {
            firstName(){
                return this.nominee.name.split(' ')[0]
            }
        },
}

</script>


<style lang="stylus" scoped>
@import "../../styles/main"

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

.why-block {
    margin-bottom: 1rem;
}
</style>
