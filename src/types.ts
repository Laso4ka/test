export enum SchoolTypeEnum {
    GYMNASIUM = 'Гімназія',
    LYCEUM = 'Ліцей',
    ZZSO = 'ЗЗСО',
}

export interface School {
    id: number;
    name: string;
    edrpou: string;
    region: string;
    type: SchoolTypeEnum;
    is_active: boolean;
}

export interface SchoolFormData {
    name: string;
    edrpou: string;
    region: string;
    type: SchoolTypeEnum;
}

export interface SchoolFilters {
    region: string;
    type: SchoolTypeEnum | '';
    isActive: string;
}