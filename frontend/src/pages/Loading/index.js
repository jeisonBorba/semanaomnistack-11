import React from 'react';
import { FaSpinner } from 'react-icons/fa';

import './styles.css';

export default function Loading({ loading }) {
  return loading ? (
		<div className="loading-container">
			<div className="content">
				<FaSpinner size={96} color="E02041" />
				<span className="message">Carregando...</span>
			</div>
		</div>
	) : null;
}