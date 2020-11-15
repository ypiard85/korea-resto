import {db} from '../firebaseConfig'
const v_data = db.collection('villes')
const r_data = db.collection('restaurants')
const m_data = db.collection('menus')

export const RestoService = {

    async getVille(){
        const villeref = await v_data.get()
        const villes = villeref.docs.map(ville => Object.create({...ville.data(), id: ville.id}))
        return villes
    },

    async getVilleByname(){
        const villeref = await v_data.orderBy('name', 'desc').get()
        const villes = villeref.docs.map(ville => Object.create({...ville.data(), name: ville.name}))
        return villes
    },

    async getRestoByVille(city){
        const villeref = await r_data.where('city' , '==', city).get()
        const ville = villeref.docs.map(ville => Object.create({...ville.data(), id: ville.id}))
        return ville
    },

    async getRestoOne(name, city){
        const villeref = await r_data.where('name', '==', name, 'AND', 'city', '==', city).get()
        const ville = villeref.docs.map(name => Object.create({...name.data(), id: name.id}))
        return ville
    },

    async getMenu(menu){
        const menuRef = await m_data.where('name', '==', menu).get()
        const menuName = menuRef.docs.map(menu => Object.create({...menu.data(), id: menu.id}))
        return menuName
    },

    async getMenuAll(){
        const m = await m_data.get()
        const menuName = m.docs.map(menu => Object.create({...menu.data(), id: menu.id}))
        return menuName
    }

}

