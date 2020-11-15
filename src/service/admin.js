import {db} from '../firebaseConfig'

const cityData = db.collection('villes') 
const restoData = db.collection('restaurants')

export const adminService = {

    async CityAdd(name, photo){
            const data = await cityData.add({
                name: name,
                image: photo,
            })
            return data
    },

    async restoAdd(adress, ville, livraison, location, name, open, photo, rate, tel ){
        const data = await restoData.add({
           adress: adress,
           city: ville,
           livraison: livraison,
           location: location,
           name: name,
           open: open,
           photo: photo,
           rate: rate,
           telephone: tel
        })
        return data
    },

    async getAllResto(){
        const data = await restoData.get()
        const d = data.docs.map(item => Object.create({...item.data(), id: item.id}))
        return d
    },
}




