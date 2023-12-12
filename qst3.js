const express = require('express');
const admin = require('firebase-admin');


const serviceAccount = require('https://console.firebase.google.com/u/0/project/mariaeduardadeandrade-35000/overview');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const porta = 3000;

app.get('/usuarios/cpf/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    
    const usuariosRef = await db.collection('usuarios').where('cpf', '==', cpf).get();

    if (usuariosRef.empty) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const usuario = usuariosRef.docs[0].data();
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
