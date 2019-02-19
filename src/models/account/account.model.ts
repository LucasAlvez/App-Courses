export interface AccountModel {
    id: string;
    name: string;
    email: string;
    image?: string;
    createDate: string;
    updateDate: string;

    address?: string;
    addressNumber?: string;
    cep?: string;
    city?: string;
    complement?: string;
    country?: string;
    neighborhood?: string;
    state?: string;

    cellPhoneNumber?: string;
    facebook?: string;
    phoneNumber?: string;
    skype?: string;
    twitter?: string;
}