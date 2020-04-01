import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import { login } from "../../services/auth";
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

import Loading from '../Loading';

export default function Logon() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	async function handleLogin(e) {
		e.preventDefault();

		if (!email || !password) {
			return alert('Favor e-mail e senha!');
		}

		setLoading(true);

		try {
			const response = await api.post('/sessions', { email, password });

			localStorage.setItem('ongName', response.data.ong.name);
			login(response.data.token);
			setLoading(false);

			history.push('/profile');
		} catch (error) {
			setLoading(false);
			alert('Falha no login. Favor realizar novamente');
		}
	}

	return (
		<>
			{loading && <Loading loading={loading} />}

			<div className="logon-container">
				<section className="form">
					<img src={logoImg} alt="Be The Hero"/>

					<form onSubmit={handleLogin}>
						<h1>Faça seu logon</h1>

						<input 
							type="text" 
							placeholder="E-mail"
							value={email}	
							onChange={e => setEmail(e.target.value)}
						/>
						<input 
							type="password" 
							placeholder="Senha"
							value={password}	
							onChange={e => setPassword(e.target.value)}
						/>						
						<button type="submit" className="button">Entrar</button>

						<Link to="/register" className="back-link">
							<FiLogIn size={16} color="#E02041" />
							Não tenho cadastro
						</Link>
					</form>
				</section>

				<img src={heroesImg} alt="Heroes"/>
			</div>
		</>
	);
}