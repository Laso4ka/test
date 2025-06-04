import {SchoolType} from "../enums/SchoolType.ts";

export interface SchoolFormData {
    name: string;
    edrpou: string;
    region: string;
    type: SchoolType;
}