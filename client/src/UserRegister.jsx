import React, { useEffect } from "react";
import {useForm} from 'react-hook-form';
import {gql,useMutation} from '@apollo/client';
import './UserRegister.css';
const CREATE_USER= gql`
mutation registerUser(
    $name:String
    $lastname:String
    $username:String
    $email:String
    $password:String
    $isMilitar:Boolean
    $isTemporal:Boolean
    ) {
        registerUser(registerInput:{
            name: $name
            lastname:$lastname
            username: $username
            email: $email
            password: $password
            isMilitar: $isMilitar
            isTemporal: $isTemporal
        }
      ){
        userID
      }
  }
`;
const CREATE_NAME_DOCUMENT= gql`
mutation registerNameDocument(
    $nameTypeDocument:String
    ) {
        registerNameDocument(nameDocumentInput:{
            nameTypeDocument:$nameTypeDocument
        }
      ){
        documentID
      }
  }
`;
const CREATE_DOCUMENT= gql`
mutation registerDocument(
    $userID:Int
    $document:String
    $placeExpedition:String
    $dateExpedition:Date
    ) {
        registerDocument(documentInput:{
            userID: $userID
            document:$document
            placeExpedition: $placeExpedition
            dateExpedition: $dateExpedition
        }
      ){
        userID
      }
  }
`;
const CREATE_COUNTRY_INFO = gql`
mutation registerCountryInfo(
    $countryName:String
    $countryCode:String
){
    registerCountryInfo(countryInput:{
        countryName:$countryName
        countryCode:$countryCode
    }){
        countryID
    }
}
`;
const CREATE_CONTACT_INFO = gql`
    mutation registerContactInfo(
        $userID:Int
        $address:String
        $countryID:Int
        $city: String
        $phone: String
        $celPhone:String
        $emergencyName:String
        $emergencyPhone:String
    ){
        registerContactInfo(contactInput:{
            userID:$userID
            address:$address
            countryID:$countryID
            city: $city
            phone: $phone
            celPhone:$celPhone
            emergencyName:$emergencyName
            emergencyPhone:$emergencyPhone
        }){
            userID
        }
    }
`;
export const UserRegister=()=>{
    const {register, handleSubmit, formState: {errors}} = useForm();

    const[registerDocument] =useMutation(CREATE_DOCUMENT);
    const[registerUser] =useMutation(CREATE_USER);
    const[registerNameDocument]=useMutation(CREATE_NAME_DOCUMENT);
    const[registerCountryInfo]=useMutation(CREATE_COUNTRY_INFO);
    const[registerContactInfo]=useMutation(CREATE_CONTACT_INFO);
    const onSubmit = async (data)=>{
        if(data.isMilitar==="true"){
            data.isMilitar=true;
        }else{
            data.isMilitar=false;
        }    
        if(data.isTemporal==="true"){
            data.isTemporal=true;
        }else{
            data.isTemporal=false;
        }
        const user = await registerUser({variables:{name:data.name,lastname:data.lastname,username:data.username,email:data.email,password:data.password,isMilitar:data.isMilitar,isTemporal:data.isTemporal}});
        console.log(user.data.registerUser.userID)
        const NameDocument = await registerNameDocument({variables:{nameTypeDocument:data.NameTypeDocument}});
        console.log('NameDocument',NameDocument.data.registerNameDocument.documentID);
        const Document = await registerDocument({variables:{userID: user.data.registerUser.userID,TypeDocumentID:NameDocument.data.registerNameDocument.documentID,document:data.document,placeExpedition:data.placeExpedition,dateExpedition:data.dateExpedition}});
        console.log(Document);
        const CountryInfo = await registerCountryInfo({variables:{countryName:data.countryName,countryCode:data.countryCode}});
        console.log(CountryInfo);
        const ContactInfo = await registerContactInfo({variables:{
            userID:user.data.registerUser.userID,
            address:data.address,
            countryID:CountryInfo.data.registerCountryInfo.countryID,
            city: data.city,
            phone: data.phone,
            celPhone:data.celPhone,
            emergencyName:data.emergencyName,
            emergencyPhone:data.emergencyPhone
        }})
        console.log('yeaaaaaaa',ContactInfo)
    }
    return (
        <div>
         <form onSubmit={handleSubmit(onSubmit)}>
            <h2>User Register</h2>
            
                <input placeholder="Name" type="text" {...register("name",{required:{value:true,message:"*"},maxLength:{value:20,message:"Please enter maximum 20 Characters"}})}/>
                <p>{errors.name?.message}</p>
                <input placeholder="LastName" {...register("lastname",{required:{value:true,message:"*"},maxLength:{value:20,message:"Please enter maximum 20 Characters"}})} />
                <p>{errors.lasName?.message}</p>
                <p>¿Are you Militar?</p>
                <select className="select-control" type="boolean" {...register("isMilitar", {required: "*"})}>
                                                       <option value="">Militar Statement</option>
                                                       <option value={true}>Si</option>
                                                       <option value={false}>No</option>
                </select>
                <p>{errors.isMilitar?.message}</p>
                <p>¿Are you Temporal?</p>
                <select className="select-control" type="number" {...register("isTemporal", {required: "*"})}>
                                                       <option value="">Temporal Statement</option>
                                                       <option value={true}>Si</option>
                                                       <option value={false}>No</option>
                </select>
                <p>{errors.isTemporal?.message}</p>
                <input placeholder="Username" type="text" {...register("username", {required: "*"})} />
                <p>{errors.username?.message}</p>
                <input placeholder="Password" type="password" {...register("password", {required: "*"})}/>
                <p>{errors.password?.message}</p>
                <input placeholder="email" type="email" {...register("email", {required: "*"})} />
                <p>{errors.email?.message}</p>


                <input placeholder="Document number" type="text" {...register("document", {required:{value:true,message:"*"},maxLength:{value:20,message:"Please enter maximum 20 Characters"}})}/>
                <p>{errors.document?.message}</p>
                <input placeholder="Type of Document" type="text" {...register("NameTypeDocument", {required:{value:true,message:"*"},maxLength:{value:50,message:"Please enter maximum 50 Characters"}})}/>
                <p>{errors.typeDocument?.message}</p>
                <input placeholder="Expedition Place" type="text" {...register("placeExpedition", {required:{value:true,message:"*"},maxLength:{value:60,message:"Please enter maximum 60 Characters"}})}/>
                <p>{errors.PlaceExpedition?.message}</p>
                <input placeholder="Expedition Date" type="date" {...register("dateExpedition", {required: "*"})}/>
                <p>{errors.DateExpedition?.message}</p>


                <h2>ContacInfo</h2>
                <input placeholder="address" type="text" {...register("address", {required:{value:true,message:"*"},maxLength:{value:60,message:"Please enter maximum 60 Characters"}})}/>
                <p>{errors.address?.message}</p>
                <input placeholder="Name of country" type="text" {...register("countryName", {required:{value:true,message:"*"},maxLength:{value:100,message:"Please enter maximum 100 Characters"}})}/>
                <p>{errors.countryName?.message}</p>
                <input placeholder="Postal Code" type="text" {...register("countryCode", {required:{value:true,message:"*"},maxLength:{value:4,message:"Please enter maximum 4 Characters"}})}/>
                <p>{errors.countryCode?.message}</p>
                <input placeholder="City" type="text" {...register("city", {required:{value:true,message:"*"},maxLength:{value:50,message:"Please enter maximum 50 Characters"}})}/>
                <p>{errors.city?.message}</p>
                <input placeholder="Phone" type="text" {...register("phone", {required:{value:true,message:"*"},maxLength:{value:20,message:"Please enter maximum 20 Characters"}})}/>
                <p>{errors.phone?.message}</p>
                <input placeholder="Celphone" type="text" {...register("Celphone", {required:{value:true,message:"*"},maxLength:{value:20,message:"Please enter maximum 20 Characters"}})}/>
                <p>{errors.Celphone?.message}</p>
                <input placeholder="Emergency Name" type="text" {...register("emergencyName", {required:{value:true,message:"*"},maxLength:{value:100,message:"Please enter maximum 100 Characters"}})}/>
                <p>{errors.emergencyName?.message}</p>
                <input placeholder="Emergency Number" type="text" {...register("emergencyNumber", {required:{value:true,message:"*"},maxLength:{value:20,message:"Please enter maximum 20 Characters"}})}/>
                <p>{errors.emergencyNumber?.message}</p>

                <button>Register</button>
            </form>
        </div>
    )
}
