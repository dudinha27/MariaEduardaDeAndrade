const express = require('express');
const admin = require('firebase-admin');


const serviceAccount = require('https://console.firebase.google.com/u/0/project/mariaeduardadeandrade-35000/overview');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const porta = 3000;

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const usuarioRef = db.collection('usuarios').doc(userId);
    const usuarioSnapshot = await usuarioRef.get();

    if (!usuarioSnapshot.exists) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }


    await usuarioRef.delete();

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
