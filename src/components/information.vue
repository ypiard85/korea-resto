<template>
    <div class="information">
        <h3>informations</h3>
        <div class="block" style="align-items: center;">
            <i class="material-icons">room</i>
            <p>{{ view.adress }}</p>
        </div>
        <div class="block">
            <i class="material-icons" style="position: relative">watch_later</i>
            <i v-if="!tableslide" class="material-icons slide_days" @click="slideAction">keyboard_arrow_down</i>                     
            <i v-else class="material-icons slide_days" @click="slideAction">keyboard_arrow_up</i>  
            <div class="days" :style="{ 'max-height': tableslide ? '' : '20px' }">
                <table style="margin-top: 3 px;" class="table_days">                                       
                    <tr style="position: relative;" v-for="(v,i) in view.open" :key="i" >
                        <td>{{ v.day }} :</td>
                        <td v-if="v.time.open == '' || v.time.open == null ">Fermer</td>                       
                        <td v-else>{{ v.time.open }} - {{ v.time.close }}</td>                                                                 
                    </tr>
                </table>
            </div>
            
        </div>
        <div class="block" style="align-items: center;">
            <i class="material-icons">food_bank</i>
            <p>Livraison : </p>
            <i style="color: orange;" class="material-icons" v-if="view.livraison == 'Y'">done</i>
            <i style="color: red;" class="material-icons" v-else>close</i>
        </div>
    </div>
</template>


<script>
    export default{
        props:['view'],

        data(){
            return{
                tableslide: false,
                days: ['mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
            }
        },

        methods:{
            slideAction(){
                this.tableslide = !this.tableslide
            }
        }
    }
</script>


<style>

    .ab_btn{
        position: absolute;
    }

    h3{
        margin: 10px 0;
        margin-top: 0;
        padding: 20px; 
        padding-bottom: 0;
    }
    .information{         
        background-color: white;
        
    }

    .block{
        border-bottom: 1px solid  rgba(128, 128, 128, 0.274);        
        padding: 10px 20px; 
        display: flex;
        position: relative;        
        z-index: 10;
        
    }

    .block:first-of-type{
        border-top: 1px solid  rgba(128, 128, 128, 0.274);
    }

    .block i:first-child{
        color: gray;
        margin-right: 10px;
    }

    .days{                         
        overflow: hidden;
        transition: 1s;    
    }

    table > tr > td:first-of-type{
        font-weight: bold;
    }

    .table_days{
        margin-left: 0px;
    }
  
    .slide_days{
        position: absolute;
        left: 0;
        cursor: pointer;
    }



</style>