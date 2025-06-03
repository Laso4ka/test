import React, { useState, useEffect, useCallback } from 'react';
import SchoolTable from './components/SchoolTable';
import SchoolForm from './components/SchoolForm';
import Filters from './components/Filters';
import {type School, type SchoolFormData, type SchoolFilters, SchoolTypeEnum } from './types';
import styles from './App.module.css';

const API_BASE_URL = 'http://localhost:8080'; // Або ваш URL

const App: React.FC = () => {
    const [schools, setSchools] = useState<School[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
    const [filters, setFilters] = useState<SchoolFilters>({
        region: '',
        type: '',
        isActive: ''
    });

    const schoolTypeOptions = Object.values(SchoolTypeEnum);

    const fetchSchools = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const queryParams = new URLSearchParams();
        if (filters.region) queryParams.append('region', filters.region);
        if (filters.type) queryParams.append('type', filters.type);
        if (filters.isActive !== '') queryParams.append('active', filters.isActive);

        try {
            const response = await fetch(`${API_BASE_URL}/schools?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: School[] = await response.json();
            setSchools(data);
        } catch (e: any) {
            setError(e.message || 'Unknown error occurred');
            setSchools([]);
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchSchools();
    }, [fetchSchools]);

    const handleCreateSchool = async (schoolData: SchoolFormData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/schools`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(schoolData),
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }
            setShowCreateForm(false);
            fetchSchools(); // Re-fetch to update the list
        } catch (e: any) {
            setError(e.message || 'Failed to create school');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeactivateSchool = async (id: number) => {
        if (window.confirm('Ви впевнені, що хочете деактивувати цей заклад?')) {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/schools/${id}/deactivate`, {
                    method: 'PATCH',
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchSchools(); // Re-fetch to update the list
            } catch (e: any) {
                setError(e.message || 'Failed to deactivate school');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleFilterChange = (filterName: keyof SchoolFilters, value: string | SchoolTypeEnum) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterName]: value
        }));
    };

    return (
        <div className="appContainer"> {/* Використання стилю */}
            <h1 className="appTitle">Реєстр шкільних закладів</h1>

            <button onClick={() => setShowCreateForm(!showCreateForm)} className={styles.toggleFormButton}>
                {showCreateForm ? 'Закрити форму' : 'Додати нову школу'}
            </button>

            {showCreateForm && (
                <SchoolForm
                    onCreate={handleCreateSchool}
                    onCancel={() => setShowCreateForm(false)}
                    schoolTypes={schoolTypeOptions}
                    isLoading={isLoading}
                />
            )}

            <Filters
                filters={filters}
                onFilterChange={handleFilterChange}
                schoolTypes={schoolTypeOptions}
            />

            {isLoading && <p className={styles.loadingText}>Завантаження...</p>}
            {error && <p className={styles.errorMessage}>Помилка: {error}</p>}

            {!isLoading && !error && schools.length === 0 && <p className={styles.noDataMessage}>Немає даних для відображення.</p>}
            {!isLoading && !error && schools.length > 0 && (
                <SchoolTable
                    schools={schools}
                    onDeactivate={handleDeactivateSchool}
                />
            )}
        </div>

    );
}

export default App;