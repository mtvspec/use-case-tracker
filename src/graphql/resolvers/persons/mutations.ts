import { PersonsService } from './../../../services'
import {
  ICreateContact,
  IUpdateContact,
  IDeleteContact
} from './../../../models/contact.model'
const mutations = {
  createPerson: async (root, data, context) => {
    const _data = {
      iin: data.input.iin,
      firstName: data.input.firstName,
      middleName: data.input.middleName,
      lastName: data.input.lastName,
      dob: data.input.dob,
      genderID: data.input.genderID,
      user: {
        id: context.session.userID
      }
    }
    const response = await PersonsService.createPerson(_data)
    return Object.assign(response)
  },
  updatePerson: async (root, data, context) => {
    const _data = {
      id: data.id,
      iin: data.input.iin,
      firstName: data.input.firstName,
      middleName: data.input.middleName,
      lastName: data.input.lastName,
      dob: data.input.dob,
      genderID: data.input.genderID,
      user: {
        id: context.session.userID
      }
    }
    const response = await PersonsService.updatePerson(_data)
    return Object.assign(response)
  },
  deletePerson: async (root, data, context) => {
    const _data = {
      id: data.id,
      user: {
        id: context.session.userID
      }
    }
    const response = await PersonsService.deletePerson(_data)
    return Object.assign(response);
  },
  createContact: async (root, data, context) => {
    const _data: ICreateContact = {
      personID: data.personID,
      contactTypeID: data.params.contactTypeID,
      contact: data.params.contact,
      user: {
        id: context.session.userID
      }
    }
    const response = await PersonsService.createContact(_data)
    return Object.assign(response)
  },
  updateContact: async (root, data, context) => {
    const _data: IUpdateContact = {
      id: data.id,
      contactTypeID: data.params.contactTypeID,
      contact: data.params.contact,
      user: {
        id: context.session.userID
      }
    }
    const response = await PersonsService.updateContact(_data)
    return Object.assign(response)
  },
  deleteContact: async (root, data, context) => {
    const _data: IDeleteContact = {
      id: data.id,
      user: {
        id: context.session.userID
      }
    }
    const response = await PersonsService.deleteContact(_data)
    return Object.assign(response)
  }
}

export default mutations