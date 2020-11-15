<template>
    <div>
        <div class="block">
            <div class="com_header">
                <h4 class="name">{{ com.user }}</h4>
                <p class="date">{{ com.publish_date }}</p>
            </div>
            <div class="com_containt">
                <p>{{ com.content }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            com:{
                type: Object,
                default: null
            }
        },
    }
</script>

<style scoped>
.date{
        font-size: 11px;
        font-style: italic;
    }

    .block{
        display: block;
        margin: 5px 0;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.205);
    }

    .com_header{
        margin-bottom: 20px;
        display: flex;
        align-items: center;
    }

    .com_header > p{
        margin-left: 10px;
    }

    .name{
        color: red;
    }
</style>