<template>    
    <div class="menu_container">                       
        <div v-for="(list, a) in menu.lists" :key="a">
            <div class="block" v-if="list.name != '' " >                
                    <a :href=" ' https://www.google.com/search?q=' 
                    + list.name + 
                    '&sxsrf=ALeKk02TgD_4yRiY6TkSXTkjtdBGu9FqbQ:1605390642745&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjO4fGXgoPtAhVU3IUKHUeEBToQ_AUoAXoECAQQAw&biw=1536&bih=722' 
                    " target="_blank" class="title_food">{{ list.name }}</a>                    
                    <p class="price_food">{{ list.price }} ₩</p>
                
                
            </div>                
        </div>
    </div>    
</template>

<script>
    export default{
        props:{
            menu: Object,
            default: null
        }
    }
</script>

<style scoped>
    .list_option{
        display: flex;
        flex-direction: column;  
    }

    .block{
        display: flex;
        justify-content: space-between;
    }

    .title_food{
        color: gray;
    }
    
    .price_food{
        font-weight: bold;
    }
</style>