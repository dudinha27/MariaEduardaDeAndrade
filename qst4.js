const express = require('express');
const admin = require('firebase-admin');


const serviceAccount = require('https://console.firebase.google.com/u/0/project/mariaeduardadeandrade-35000/overview');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const porta = 3000;

app.put('/usuarios/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { novoNome } = req.body;


    if (!novoNome) {
      return res.status(400).json({ error: 'O novo nome não foi fornecido' });
    }

    await db.collection('usuarios').doc(userId).update({ nome: novoNome });

    res.json({ message: 'Nome do usuário atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar nome do usuário:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});

