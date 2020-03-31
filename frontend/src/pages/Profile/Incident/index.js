import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import './styles.css';

import formatValueToBR from '../../../utils/currencyFormater';

export default function Incident({ incident, onDeleteIncident }) {
  return (
		<li key={String(incident.id)}>
			<strong>CASO:</strong>
			<p>{incident.title}</p>

			<strong>DESCRIÇÃO:</strong>
			<p>{incident.description}</p>

			<strong>VALOR:</strong>
			<p>{formatValueToBR(incident.value)}</p>

			<button type="button" onClick={() => onDeleteIncident(incident.id)}>
				<FiTrash2 size={20} color="#a8a8b3" />
			</button>
		</li>
	);
}