import React from 'react';
import {type SchoolFilters, SchoolTypeEnum } from '../types';
import styles from './Filters.module.css';

interface FiltersProps {
    filters: SchoolFilters;
    onFilterChange: (filterName: keyof SchoolFilters, value: string | SchoolTypeEnum) => void;
    schoolTypes: SchoolTypeEnum[];
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, schoolTypes }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        onFilterChange(e.target.name as keyof SchoolFilters, e.target.value as SchoolTypeEnum | string);
    };

    return (
        <div className={styles.filtersContainer}>
            <h3 className={styles.filtersTitle}>Фільтри</h3>
            <div className={styles.filterGroup}>
                <label htmlFor="filter-region" className={styles.filterLabel}>Область:</label>
                <input
                    type="text"
                    id="filter-region"
                    name="region"
                    value={filters.region}
                    onChange={handleInputChange}
                    placeholder="Введіть область"
                    className={styles.filterInput}
                />
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="filter-type" className={styles.filterLabel}>Тип:</label>
                <select
                    id="filter-type"
                    name="type"
                    value={filters.type}
                    onChange={handleInputChange}
                    className={styles.filterSelect}
                >
                    <option value="">Всі типи</option>
                    {schoolTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className={styles.filterGroup}>
                <label htmlFor="filter-isActive" className={styles.filterLabel}>Активність:</label>
                <select
                    id="filter-isActive"
                    name="isActive"
                    value={filters.isActive}
                    onChange={handleInputChange}
                    className={styles.filterSelect}
                >
                    <option value="">Всі</option>
                    <option value="true">Активні</option>
                    <option value="false">Неактивні</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;