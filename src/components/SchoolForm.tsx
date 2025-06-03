import React, { useState } from 'react';
import {type SchoolFormData, SchoolTypeEnum } from '../types';
import styles from './SchoolForm.module.css'

interface SchoolFormProps {
    onCreate: (schoolData: SchoolFormData) => Promise<void>;
    onCancel: () => void;
    schoolTypes: SchoolTypeEnum[];
    isLoading?: boolean;
}

const SchoolForm: React.FC<SchoolFormProps> = ({ onCreate, onCancel, schoolTypes, isLoading }) => {
    const [formData, setFormData] = useState<SchoolFormData>({
        name: '',
        edrpou: '',
        region: '',
        type: schoolTypes[0] || SchoolTypeEnum.ZZSO, // Default type
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.edrpou || !formData.region || !formData.type) {
            alert('Будь ласка, заповніть всі обов\'язкові поля.');
            return;
        }
        await onCreate(formData);
        // Не очищуємо форму тут, App це зробить через re-fetch або можна додати успішне повідомлення
    };

    return (
        <form onSubmit={handleSubmit} className={styles.schoolForm}>
            <h2 className={styles.formTitle}>Створити нову школу</h2>
            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Назва:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="edrpou" className={styles.formLabel}>ЄДРПОУ:</label>
                <input
                    type="text"
                    id="edrpou"
                    name="edrpou"
                    value={formData.edrpou}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="region" className={styles.formLabel}>Область:</label>
                <input
                    type="text"
                    id="region"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={styles.formInput}
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="type" className={styles.formLabel}>Тип:</label>
                <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={styles.formSelect}
                >
                    {/* Add a default/placeholder option if necessary */}
                    {/* <option value="">Оберіть тип</option> */}
                    {schoolTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className={styles.formButtons}>
                <button type="submit" disabled={isLoading} className={styles.submitButton}>
                    {isLoading ? 'Створення...' : 'Створити'}
                </button>
                <button type="button" onClick={onCancel} disabled={isLoading} className={styles.cancelButton}>
                    Скасувати
                </button>
            </div>
        </form>
    );
};

export default SchoolForm;