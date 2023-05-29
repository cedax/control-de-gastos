import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
require('dotenv').config();

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Servidor iniciado en el puerto ${port}`);
});

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID
};

const appDb = initializeApp(firebaseConfig);
const db = getFirestore(appDb);

async function getCities(db) {
	const citiesCol = collection(db, 'cities');
	const citySnapshot = await getDocs(citiesCol);
	const cityList = citySnapshot.docs.map(doc => doc.data());
	return cityList;
}

getCities(db).then(cityList => {
	console.log(cityList);
});