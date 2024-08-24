const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
const port = 3000;

// Substitua pela URL e chave do seu projeto Supabase
const supabaseUrl = 'https://begixyijzomcvujqfagv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ2l4eWlqem9tY3Z1anFmYWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0NjYwOTQsImV4cCI6MjA0MDA0MjA5NH0.z6PhSZ_seSgLqwDCBPyxFxVQm5JUon9BGtK84ormbwQ';
const supabase = createClient(supabaseUrl, supabaseKey);

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear o corpo das requisições JSON
app.use(express.json());

// Endpoint para obter o valor da tabela
// Rota para obter o valor da tabela valor_bar
app.get('/valor', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('valor_bar')
        .select('valor')
        .eq('id', 1)
        .single();
  
      if (error) throw error;
  
      res.json({ valor: data.valor });
    } catch (error) {
      console.error('Erro ao obter valor:', error);
      res.status(500).json({ error: 'Erro ao obter valor' });
    }
  });
  

// Endpoint para atualizar o valor da tabela
app.post('/update', async (req, res) => {
  const { novoValor } = req.body;

  try {
    const { data, error } = await supabase
      .from('valor_bar')
      .update({ valor: novoValor })
      .eq('id', 1);

    if (error) {
      throw error;
    }

    res.json({ message: 'Valor atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    res.status(500).json({ error: 'Erro ao atualizar dados' });
  }
});

// Serve a página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
