<template>    
    <div class="weather">
        <select name="city" id="city" @click="fetchData" v-model="city">          
            <option :value="o.name" v-for="o in options" :key="o.name">{{ o.name }}</option>
        </select>        
        <div v-if="typeof weather.main != 'undefined' && city != '' " >
            <h3>WEATHER</h3>            
            <p class="weather_name">{{ weather.name }}</p>
            <p class="weather_main">{{ statut_temp[0] }}</p>  
            <div class="info-flex">
                <div class="info_left">
                    <img :src="statut_temp[1]" alt="">
                    <p class="weather_temp">{{ Math.round(weather.main.temp)}} <span>°C</span> </p>
                </div>
                <div class="info_right">
                    <p class="weather_hum">Humidité: {{ weather.main.humidity + ' % ' }}</p>
                    <p class="weather_hum">Vent: {{ Math.round(weather.wind.speed) + ' km/h ' }}</p>
                </div>
            </div>               
        </div>
        <div v-else>            
            <h3>WEATHER</h3>            
            <p class="weather_name">{{ weather.name }}</p>
            <p class="weather_main">{{ statut_temp[0] }}</p>  
            <div class="info-flex">
                <div class="info_left">
                    <img :src="statut_temp[1]" alt="">
                    <p class="weather_temp">{{ Math.round(weather.main.temp)}} <span>°C</span> </p>
                </div>
                <div class="info_right">
                    <p class="weather_hum">Humidité: {{ weather.main.humidity + ' % ' }}</p>
                    <p class="weather_hum">Vent: {{ Math.round(weather.wind.speed) + ' km/h ' }}</p>
                </div>
            </div>               
            </div>        
    </div>   
</template>



<script>
    import axios from 'axios'
    import {RestoService} from '@/service/firebase'
    export default{

        data(){
            return{
                weather: null,
                apiKey: '2b1ec7a5b325cfbf7c1bc18b936df3f3',
                url: 'http://api.openweathermap.org/data/2.5/weather?q=',   
                options: null,               
                city: '',    
                statut_temp: ['', '']     
            }
        },


        async mounted(){

            this.options = await RestoService.getVille()            

            if(this.city == ''){
                await axios.get(this.url + 'seoul' + '&units=metric&appid=' + this.apiKey ).then(res => {
                    this.weather = res.data
                   if(this.weather.weather[0].main == 'Mist'){
                        this.statut_temp[0] = 'Brouillard'
                        this.statut_temp[1] = 'https://ssl.gstatic.com/onebox/weather/64/fog.png'
                    }else if(this.weather.weather[0].main == 'Clear'){
                        this.statut_temp[0] = 'Ensoleillé'
                        this.statut_temp[1] = 'https://ssl.gstatic.com/onebox/weather/64/sunny.png'
                    }else if(this.weather.weather[0].main == 'Rain'){
                        this.statut_temp[0] = 'Pluie'
                        this.statut_temp[1] = 'https://seeklogo.com/images/R/rainy-weather-symbol-logo-B77AF66DC1-seeklogo.com.gif'
                    }else if(this.weather.weather[0].main == 'Clouds'){
                        this.statut_temp[0] = 'Nuageux'
                        this.statut_temp[1] = 'https://vectorified.com/image/cloudy-vector-10.jpg'
                    }
             })
            }

            
        },

        methods:{
            fetchData(){  
                fetch(`${this.url}${this.city}&units=metric&appid=${this.apiKey}`)
                .then(res => {
                    return res.json();
                }).then(this.setResult);
            },
            setResult(result){
                this.weather = result;
            }
        }
}
</script>

<style scoped>
    .weather{
        width: 350px;
        padding: 10px;
        box-shadow: 0 0 5px black;
        position: relative;
        max-width: 100%;
        margin: 20px 0;
    }

    h3{
        position: absolute;
        top: 10px;
        right: 10px;
        box-shadow: -3px 3px 1px red;
        padding: 3px;
    }

    .weather_name{
        font-size: 2em;
        color: gray;
        margin-top: 10px;
    }

    .weather_temp{
        margin: 20px 0;
        font-size: 2.5em;
        margin-top: 10px;
    }

    .weather_temp > span{
        font-size: 0.5em;
        vertical-align: top;
        font-weight: initial;
    }

    .info-flex{
        display: flex;
        justify-content: space-between;
    }

    .info_left{
        display: flex;        
        font-weight: bold;
        vertical-align: top;
    }

    .info_left > img{        
        width: 67px;
        height: 67px;
    }

    .info_right{
        color: gray;
        text-shadow: -0.5px 0px gray;
    }

</style>