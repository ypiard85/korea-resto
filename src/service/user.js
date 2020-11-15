import {db} from '../firebaseConfig'

const data = db.collection('favories')
const comdata = db.collection('commentaires')

export const userService = {

    async getFavories(name, user, city){
        const favRef = await data.where('name', '==', name, 'AND', 'user', '==', user, 'AND', 'city', '==', city).get()
        const fav = favRef.docs.map(f => Object.create({...f.data(), id: f.id}))
        return fav
    },

    async getFavoriesByUser(user){
        const favRef = await data.where('user', '==', user).get()
        const fav = favRef.docs.map(f => Object.create({...f.data(), id: f.id}))
        return fav
    },

    deleteFavorie(views){
        const result = data.doc(views.id)
        result.delete()
    },

   async addFavorie(user, name, city){
        const add = await data.add({
            name: name,
            city: city,
            user: user
        })
        return add
    },

    async getComs(resto, city){
        const cref = await comdata.where('resto', '==', resto , 'AND', 'city', '==', city).orderBy('publish_date', 'desc').get()
        const result =  cref.docs.map(f => Object.create({...f.data(), id: f.id}))
        return result
    },

    async sendCom(name, user, city, date, text){
        const add = await comdata.add({
            city: city,
            content: text,
            publish_date: date,
            user: user,
            resto: name,            
        })
        return add
    },

    
}

