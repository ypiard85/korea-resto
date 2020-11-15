<template>
    <div class="resto">                                
            <div class="resto_image">
                <img :src="resto.photo" alt="resto.name">
            </div>
            <div class="resto_info">
                <div class="resto_name"><router-link :to=" '/restaurant/' + resto.name + '/' + resto.city">{{ resto.name }}</router-link></div>
                <div class="resto_adress"><i class="material-icons" style="color: gray;">room</i><p>{{ resto.adress }}</p></div>                
                <div class="rate">                    
                        <p v-for="(s,i) in f" :key="i" v-html="s"></p>                                                               
                </div> 
                <div class="resto_livraison">
                    <p>Livraison : </p>
                    <i style="color: orange;" class="material-icons" v-if="resto.livraison == 'Y'">done</i>
                    <i style="color: red;" class="material-icons" v-else>close</i>
                </div>
                <div class="resto_open"><p>Horraire : {{ resto.open[1].time.open }} - {{ resto.open[1].time.close }}</p></div>          
                <div class="resto_tel"><i class="material-icons" style="color: gray;">local_phone</i><a :href="'tel:' + resto.telephone">{{ resto.telephone }}</a></div>
            </div>
        </div>
</template>

<script>
    export default{
        props:['resto'],

        data(){
            return{
                rate: this.resto.rate,
                m: 1,
                f: [],
            }
        },   
        
        mounted(){
            while(this.m < this.rate){
                this.f.push(
                    '<i class="material-icons" style="color: yellow;" title="max = 5">grade</i>'
                )              
                this.m = this.m +1
                
            }
        }


    }
</script>


<style scoped>

.resto{
    display: flex;
    margin-bottom: 50px;
}

.resto_item{
    display: flex;
    margin: 20px;
    font-size: 15px;
    margin-bottom: 30px;
}

.resto_image > img{
    box-shadow: 0 0 5px black;
    width: 203px;
    max-width: 100%;
    height: 152px;
}

.resto_info > div{
    margin-left: 30px;
    margin-bottom: 4px;
}

.resto_info > div > p > i{
    font-size: 15px;
}

.resto_name{
    font-weight: bold;
}

.rate{
    display: flex;
}

.resto_adress, .resto_tel, .resto_livraison{
    display: flex;
    align-items: center;
}
.resto_tel > a, .resto_adress > p, .resto_livraison > i{
    margin-left: 5px;
}

@media screen and (max-width: 500px){
    .resto{
        flex-direction: column;
        width: 100%;
        
    }

    .resto_name{
        font-size: 24px;
        margin-top: 10px;
    }

    .resto_adress{
        margin-top: 10px;
    }

    .resto_image > img{
    width: 100%;
    }

    .resto_info > div{
    margin-left: 0px;
    margin-bottom: 4px;
}
}
</style>