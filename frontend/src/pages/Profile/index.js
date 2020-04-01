import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import { getToken } from '../../services/auth';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import Loading from '../Loading';
import Incident from './Incident';

export default function Profile() {
	const [incidents, setIncidents] = useState([]);
	const [loading, setLoading] = useState(false);

	const authToken = getToken();
	const ongName = localStorage.getItem('ongName');

	const history = useHistory();

	useEffect(() => {
		async function loadIncidents() {
			setLoading(true);

			try {
				const response = await api.get('/profiles', {
					headers: {
						Authorization: authToken,
					}
				});

				setIncidents(response.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				alert('Falha ao buscar casos.')
			}
		}

		loadIncidents();
	}, []);

	async function handleDeleteIncident(id) {
		setLoading(true);

		try {
			await api.delete(`/incidents/${id}`, {
				headers: {
					Authorization: authToken
				}
			});

			setIncidents(incidents.filter(incident => incident.id !== id));
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert('Erro ao delete caso');
		}
	}

	function handleLogout() {
		localStorage.clear();

		history.push('/');
	}

  return (
		<>
			<Loading loading={loading} />

			<div className="profile-container">
				<header>
					<div>
						<img src={logoImg} alt="Be The Hero"/>
						<span>Bem vinda, {ongName}</span>
					</div>

					<div>
						<Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
						<button type="button" onClick={handleLogout}>
							<FiPower size={18} color="#E02041" />
						</button>
					</div>
				</header>

				<h1>Casos cadastrados</h1>

				<ul>
					{incidents.map(incident => 
						<Incident 
							key={String(incident.id)} 
							incident={incident} 
							onDeleteIncident={handleDeleteIncident} 
							/>  
					)}						
				</ul>
			</div>
		</>
	);
}