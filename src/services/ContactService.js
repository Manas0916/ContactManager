import axios from "axios";


export class ContactService {
    static serviceURL = `http://localhost:8080`;

    static getGroups(){
        let dataURL = `${this.serviceURL}/groups`;
        return axios.get(dataURL);
    }

    static getGroup(contact){
        let groupId = contact.groupId;
        let dataURL = `${this.serviceURL}/groups/${groupId}`;
        return axios.get(dataURL);
    }

    static getAllContacts(){
        let dataURL = `${this.serviceURL}/contacts`;
        return axios.get(dataURL);
    }

    static getContact(contactId){
        let dataURL = `${this.serviceURL}/contacts/${contactId}`;
        return axios.get(dataURL);
    }

    static createContact(contact){
        let dataURL = `${this.serviceURL}/contacts`;
        return axios.post(dataURL, contact);
    }

    static updateContact(contact, contactId){
        let dataURL = `${this.serviceURL}/contacts/${contactId}`;
        return axios.put(dataURL, contact);
    }
    static deleteContact(contactId){
        let dataURL = `${this.serviceURL}/contacts/${contactId}`;
        return axios.delete(dataURL);
    }
}