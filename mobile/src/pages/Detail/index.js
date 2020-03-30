import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
	SafeAreaView, 
	ScrollView,
	View, 
	TouchableOpacity, 
	Image, 
	Text, 
	Linking, 
	Dimensions 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';

import formatValueToBR from '../../utils/currencyFormatter';

export default function Detail() {
	const [screenHeight, setScreenHeight] = useState(0);

	const navigation = useNavigation();
	const route = useRoute();
	
	const { height } = Dimensions.get('window');
	const scrollEnabled = screenHeight > height;

	const { incident } = route.params;
	const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso
		"${incident.title}" com o valor de ${formatValueToBR(incident.value)}.`;

	function navigateBack() {
		navigation.goBack();
	}

	function sendMail() {
		MailComposer.composeAsync({
			subject: `Herói do caso: ${incident.title}`,
			recipients: [incident.email],
			body: message,
		});
	}

	function sendWhatsApp() {
		Linking.openURL(`whatsapp://send?phone=+55${incident.whatsapp}&text=${message}`);
	}

	function onContentSizeChange(contentWidth, contentHeight) {
		setScreenHeight(contentHeight);
	}

  return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				scrollEnabled={scrollEnabled}
				onContentSizeChange={onContentSizeChange}
				showsVerticalScrollIndicator={false}
			>

			<View style={styles.header}>
				<Image source={logoImg} />

				<TouchableOpacity style={styles.backButton} onPress={navigateBack}>
					<Feather name="arrow-left" size={16} color="#E82041" />
				</TouchableOpacity>
			</View>

			<View style={styles.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
				<Text style={styles.incidentValue}>{incident.name} - {incident.city}/{incident.uf}</Text>

				<Text style={styles.incidentProperty}>CASO:</Text>
				<Text style={styles.incidentValue}>{incident.title}</Text>

				<Text style={styles.incidentProperty}>DESCRIÇÃO:</Text>
				<Text style={styles.incidentValue}>{incident.description}</Text>

				<Text style={styles.incidentProperty}>VALOR:</Text>
				<Text style={styles.incidentValue}>
					{formatValueToBR(incident.value)}
				</Text>				
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Salve o dia!</Text>
				<Text style={styles.heroTitle}>Seja o herpoi desse caso.</Text>
				
				<Text style={styles.heroDescription}>Entre em contato:</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
						<Text style={styles.actiontext}>WhatsApp</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actiontext}>E-mail</Text>
					</TouchableOpacity>					
				</View>
			</View>

			</ScrollView>
		</SafeAreaView>
	)
}