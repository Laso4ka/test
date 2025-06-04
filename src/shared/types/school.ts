import {SchoolType} from "../enums/SchoolType.ts";

export interface School {
    id: number;
    name: string;
    edrpou: string;
    region: string;
    type: SchoolType;
    is_active: boolean;
}