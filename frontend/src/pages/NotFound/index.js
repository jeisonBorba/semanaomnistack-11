import React from 'react';
import { Link } from 'react-router-dom';
import { MdSentimentVeryDissatisfied } from 'react-icons/md';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

export default function NotFound() {
  return (
		<div className="not-found-container">
			<div className="content">
				<section>
					<h1>404 - Not Found!</h1>
					<MdSentimentVeryDissatisfied size={60} color="#e02041" />
				</section>
			
				<Link to="/" className="back-link">
					<FiArrowLeft size={36} color="#e02041" />
					Página Inicial
				</Link>
			</div>
		</div>
	)
}