import axios from 'axios'
const manageItemAPI = 'https://tecfood.herokuapp.com/api/' +
    'restaurant/5f52e7ac97345cbcabcfc829/item'
const url = 'https://api.cloudinary.com/v1_1/dzuxehghe/image/upload';

export class ManageItemsService {

    async retrieveAllItems() {
        try{
            const data =  axios.get(manageItemAPI);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveItemById(id) {
        try{
            const data =  axios.get(`${manageItemAPI}/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async disableAvailability(id) {
        console.log( "disableAvailability")
        try{
            const data =  axios.put(`${manageItemAPI}/disable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async enableAvailability(id) {
        console.log( "enable")
        try{
            const data =  axios.put(`${manageItemAPI}/enable/${id}`);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async createNewItem(item) {
        console.log( "create new")
        try{
            const data =  axios.post(`${manageItemAPI}`, item);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updateItem(id, item) {
        console.log( "UPDATE FORM")
        try{
            const data =  axios.put(`${manageItemAPI}/${id}`, item);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async updloadImage(formData){
        try{
            const res = await axios.post(url, formData);
            const imageUrl = res.data.secure_url;
            return imageUrl;
        } catch (err){
            console.log(err);
            return err.message
        }
    }
};

export default new ManageItemsService();