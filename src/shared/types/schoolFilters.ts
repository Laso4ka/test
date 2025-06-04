import {SchoolType} from "../enums/SchoolType.ts";

export interface SchoolFilters {
    region: string;
    type: SchoolType | '';
    isActive: string;
}