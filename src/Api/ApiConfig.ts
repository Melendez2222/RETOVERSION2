import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Base_Url } from "../route/route";
import { RootState } from "../Redux";

export const BaseApiConfigAuth = fetchBaseQuery({
    baseUrl:Base_Url,
    prepareHeaders:(headers,{getState})=>{
        headers.set('Accept','application/json');
        headers.set(
            'Authorization',
            `Bearer ${(getState() as RootState).token}`
        );
        return headers;
    },
    validateStatus:(resposne,_result)=>{
        return resposne.status===200;
    }
});
export const BaseApiConfig=fetchBaseQuery({
    baseUrl:Base_Url,
    prepareHeaders:(headers)=>{
        headers.set('Accept','application/json');
        return headers;
    },
    validateStatus:(resposne,_result)=>{
        return resposne.status===200;
    }
});