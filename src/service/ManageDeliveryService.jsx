import axios from 'axios'

const manageDeliveryAPI = 'https://tecfood.herokuapp.com/api/orders'
//const manageDeliveryAPI = 'http://localhost:3000/orders'


export class ManageDeliveryService {

    async retrieveAllOrders() {
        console.log( "COURSE DATA SERVICE : RETRIEVE ALL COURSES")
        try{
            const data =  axios.get(manageDeliveryAPI);
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async retrieveOrderById (id){
        console.log("RETRIEVE ORDER BY ID")
        try{
            const data = axios.get(`${manageDeliveryAPI}/${id}`)
            return data;
        }catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsMissed(id) {
        console.log("update order to missed")
        try{
            const data = axios.put(`${manageDeliveryAPI}/missed/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

    async setOrderAsDelivered (id) {
        console.log("update order to delivered")
        try{
            const data = axios.put(`${manageDeliveryAPI}/deliver/${id}`);
            return data;
        } catch (err) {
            console.log(err);
            return err.message
        }
    }

};

export default new ManageDeliveryService();