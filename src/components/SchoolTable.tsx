import React from 'react';
import styles from './SchoolForm.module.css'
import type {School} from "../shared/types/school.ts";

interface SchoolTableProps {
    schools: School[];
    onDeactivate: (id: number) => void;
}

const SchoolTable: React.FC<SchoolTableProps> = ({schools, onDeactivate}) => {
    return (
        <table className={styles.schoolTable}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Назва</th>
                <th>ЄДРПОУ</th>
                <th>Область</th>
                <th>Тип</th>
                <th>Активний</th>
                <th>Дії</th>
            </tr>
            </thead>
            <tbody>
            {schools.map((school) => (
                <tr key={school.id}>
                    <td>{school.id}</td>
                    <td>{school.name}</td>
                    <td>{school.edrpou}</td>
                    <td>{school.region}</td>
                    <td>{school.type}</td>
                    <td>{school.is_active ? 'Так' : 'Ні'}</td>
                    <td className={styles.actionsCell}>
                        {school.is_active && (
                            <button
                                onClick={() => onDeactivate(school.id)}
                                className={styles.deactivateButton}
                            >
                                Деактивувати
                            </button>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default SchoolTable;