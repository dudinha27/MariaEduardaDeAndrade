const express = require('express');
const admin = require('firebase-admin');

const serviceAccount = require('https://console.firebase.google.com/u/0/project/mariaeduardadeandrade-35000/overview');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const porta = 3000;

app.get('/usuarios/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const usuarioRef = await db.collection('usuarios').doc(userId).get();

    if (!usuarioRef.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const usuario = usuarioRef.data();
    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
