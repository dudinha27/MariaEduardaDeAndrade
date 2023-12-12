const admin = require('firebase-admin');
const firebaseConfig = require('firebaseconfig.js'); 
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
const app = firebase.initializeApp(firebaseconfig);

const serviceAccount = require('https://console.firebase.google.com/u/0/project/mariaeduardadeandrade-35000/overview');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const porta = 3000;


(firebase.initializeApp(firebaseConfig)).get('/usuarios', async (req, res) => {
  try {
    const usuariosRef = await db.collection('usuarios').get();
    const usuarios = [];
    usuariosRef.forEach((doc) => {
      usuarios.push(doc.data());
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

