import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import Incident from './Incident';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	async function loadIncidents() {
		if (loading) {
			return;
		}

		if (total > 0 && incidents.length === total) {
			return;
		}

		setLoading(true);

		try {
			const response = await api.get('incidents', {
				params: { page }
			});
			
			setIncidents([...incidents, ...response.data]);
			setTotal(response.headers['x-total-count']);
			setPage(page + 1);
		} catch (error) {
			
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadIncidents();
	}, []);

  return (
		<View style={styles.container}>

			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
				</Text>
			</View>

			<Text style={styles.title}>Bem-vindo!</Text>
			<Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

			<FlatList 
				style={styles.incidentsList}
				data={incidents}
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.8}
				renderItem={({ item: incident }) => <Incident incident={incident} />}
			/>
				
		</View>
	)
}