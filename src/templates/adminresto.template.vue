<template>
       <tr>
        <td>{{ r.name }}</td>
        <td>{{ r.city }}</td>
        <td><button @click="modifierresto(r)">Modifier</button></td>
        </tr>     
</template>

<script>
    export default {
        props:{
            r:{
                type:Object
            }
        },

        methods:{
            modifierresto(r){
                this.$emit('restoaction', r)
            }
        }
    }
</script>
