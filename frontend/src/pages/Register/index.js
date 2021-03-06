import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import swal from 'sweetalert';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

import Loading from '../Loading';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [uf, setUf] = useState('');
	const [loading, setLoading] = useState(false);

	const history = useHistory();

	async function hanldeRegister(e) {
		e.preventDefault();

		if (!name || !email || !password || !whatsapp || !city || !uf) {
			return swal({
				text: 'É preciso informar todos os campos para realizar o cadastro!',
				icon: 'error',
				closeOnClickOutside: false,
				closeOnEsc: false
			});
		}

		const data = {
			name,
			email,
			password,
			whatsapp,
			city,
			uf
		};

		setLoading(true);

		try {
			await api.post('/ongs', data);
			
			setLoading(false);

			history.push('/');
		} catch ({ response }) {
			setLoading(false);

			swal({
				text: response.data.message,
				icon: 'error',
				closeOnClickOutside: false,
				closeOnEsc: false
			});
		}
	}
	
	return (
		<>
			{loading && <Loading loading={loading} />}

			<div className="register-container">
				<div className="content">
					<section>
						<img src={logoImg} alt="Be The Hero"/>

						<h1>Cadastro</h1>
						<p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

						<Link to="/" className="back-link">
							<FiArrowLeft size={16} color="#E02041" />
							Voltar para login
						</Link>
					</section>

					<form onSubmit={hanldeRegister}>
						<input 
							type="text" 
							placeholder="Nome da ONG"
							value={name}
							onChange={e => setName(e.target.value)}
						/>

						<div className="input-group">
							<input 
								type="text" 
								placeholder="Cidade" 
								value={city}
								onChange={e => setCity(e.target.value)}
							/>
							<input 
								type="text" 
								placeholder="UF" 
								style={{ width: 80 }} 
								value={uf}
								onChange={e => setUf(e.target.value)}	
							/>
						</div>

						<input 
							type="text" 
							placeholder="WhatsApp" 
							value={whatsapp}
							onChange={e => setWhatsapp(e.target.value)}
						/>
						<input 
							type="email" 
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
						<small>Use oito ou mais caracteres</small>				
						
						<button type="submit" className="button">Cadastrar</button>
					</form>
				</div>
			</div>
		</>
	);
}