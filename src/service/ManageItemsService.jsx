import axios from 'axios'
const manageDeliveryAPI = 'https://tecfood.herokuapp.com/restaurant/5f52e7ac97345cbcabcfc829/item'

export class ManageItemsService {

    async retrieveAllItems() {
        try{
            const data =  axios.get(manageDeliveryAPI);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveItemById(id) {
        try{
            const data =  axios.get(`${manageDeliveryAPI}/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async disableAvailability(id) {
        console.log( "disableAvailability")
        try{
            const data =  axios.put(`${manageDeliveryAPI}/disable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async enableAvailability(id) {
        console.log( "enable")
        try{
            const data =  axios.put(`${manageDeliveryAPI}/enable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async createNewItem(item) {
        console.log( "create new")
        try{
            const data =  axios.post(`${manageDeliveryAPI}`, item);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updateItem(id, item) {
        console.log( "UPDATE FORM")
        try{
            const data =  axios.put(`${manageDeliveryAPI}/${id}`, item);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }
};

export default new ManageItemsService();