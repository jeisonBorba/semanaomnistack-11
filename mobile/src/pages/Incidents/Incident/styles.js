import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	incident: {
		padding: 24,
		borderRadius: 8,
		backgroundColor: '#FFF',
		marginBottom: 16
	},

	incidentProperty: {
		fontSize: 14,
		color: '#41414d',
		fontWeight: 'bold'
	},

	incidentValue: {
		marginTop: 8,
		fontSize: 15,
		marginBottom: 24,
		color:'#737380'
	},

	incidentDetailsButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	incidentDetailsButtonText: {
		color: '#e02041',
		fontSize: 15,
		fontWeight: 'bold'
	},	
});