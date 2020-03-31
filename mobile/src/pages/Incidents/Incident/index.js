import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

import formatValueToBR from '../../../utils/currencyFormatter';

export default function Incident({ incident }) {
	const navigation = useNavigation();

	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident });  
	}

	return (
		<View style={styles.incident}>
			<Text style={styles.incidentProperty}>ONG:</Text>
			<Text style={styles.incidentValue}>{incident.name}</Text>

			<Text style={styles.incidentProperty}>CASO:</Text>
			<Text style={styles.incidentValue}>{incident.title}</Text>

			<Text style={styles.incidentProperty}>VALOR:</Text>
			<Text style={styles.incidentValue}>{formatValueToBR(incident.value)}</Text>

			<TouchableOpacity
				style={styles.incidentDetailsButton}
				onPress={() => navigateToDetail(incident)}	
			>
				<Text style={styles.incidentDetailsButtonText}>Ver mais detalhes</Text>
				<Feather name="arrow-right" size={16} color="#E02041" />
			</TouchableOpacity>
		</View>
	);
}
