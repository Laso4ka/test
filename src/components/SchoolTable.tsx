import React from 'react';
import type {School} from '../types';
import styles from './SchoolForm.module.css'

interface SchoolTableProps {
    schools: School[];
    onDeactivate: (id: number) => void;
}

const SchoolTable: React.FC<SchoolTableProps> = ({schools, onDeactivate}) => {
    return (
        <table className={styles.schoolTable}> {/* Apply .schoolTable */}
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
                    <td className={styles.actionsCell}> {/* Apply .actionsCell */}
                        {school.is_active && (
                            <button
                                onClick={() => onDeactivate(school.id)}
                                className={styles.deactivateButton} /* Apply .deactivateButton */
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