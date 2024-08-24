const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const app = express();
const port = 3000;

// Substitua pela URL e chave do seu projeto Supabase
const supabaseUrl = 'https://begixyijzomcvujqfagv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlZ2l4eWlqem9tY3Z1anFmYWd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ0NjYwOTQsImV4cCI6MjA0MDA0MjA5NH0.z6PhSZ_seSgLqwDCBPyxFxVQm5JUon9BGtK84ormbwQ';
const supabase = createClient(supabaseUrl, supabaseKey);

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));
app.use(express.json()); // Para analisar JSON no corpo das requisições

// Endpoint para retornar dados do Supabase
app.get('/data', async (req, res) => {
    const { data, error } = await supabase
        .from('valor_bar') // Nome da tabela
        .select('*')
        .eq('id', 1); // Filtra pelo id = 1

    if (error) {
        return res.status(500).json({ error: 'Erro ao carregar dados' });
    }

    res.json(data);
});

// Endpoint para atualizar dados do Supabase
app.put('/data', async (req, res) => {
    const { valor } = req.body; // Obtém o novo valor do corpo da requisição

    const { data, error } = await supabase
        .from('valor_bar') // Nome da tabela
        .update({ valor }) // Atualiza o valor na coluna 'valor'
        .eq('id', 1); // Filtra pelo id = 1

    if (error) {
        return res.status(500).json({ error: 'Erro ao atualizar dados' });
    }

    res.json(data);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
