import type {SchoolFormData} from "../types/schoolFormData.ts";
import type {School} from "../types/school.ts";
import type {SchoolFilters} from "../types/schoolFilters.ts";

const API_BASE_URL = import.meta.env.API_URL;

const getErrorMessage = async (response: Response, defaultMessage: string): Promise<string> => {
    try {
        const errorData = await response.json();
        return errorData.message || errorData.detail || defaultMessage;
    } catch (e) {
        return `${defaultMessage} (status: ${response.status} ${response.statusText})`;
    }
};

export const schoolService = {
    async getSchools(filters: SchoolFilters): Promise<School[]> {
        const queryParams = new URLSearchParams();
        if (filters.region) queryParams.append('region', filters.region);
        if (filters.type) queryParams.append('type', filters.type);
        if (filters.isActive !== '') queryParams.append('active', filters.isActive);

        const response = await fetch(`${API_BASE_URL}/schools?${queryParams.toString()}`);

        if (!response.ok) {
            const message = await getErrorMessage(response, 'Failed to fetch schools');
            throw new Error(message);
        }
        return response.json();
    },

    async createSchool(schoolData: SchoolFormData): Promise<School> {
        const response = await fetch(`${API_BASE_URL}/schools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(schoolData),
        });

        if (!response.ok) {
            const message = await getErrorMessage(response, 'Failed to create school');
            throw new Error(message);
        }
        return response.json();
    },

    async deactivateSchool(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/schools/${id}/deactivate`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            const message = await getErrorMessage(response, 'Failed to deactivate school');
            throw new Error(message);
        }
    }
};