require("dotenv").config();  // Carrega as variáveis de ambiente do arquivo .env
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = 3000;

// Verifique se as variáveis estão sendo carregadas corretamente
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Erro: SUPABASE_URL ou SUPABASE_KEY não encontrados no .env");
    process.exit(1); // Sai do processo se as credenciais estiverem ausentes
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Rota para receber os dados do formulário
app.post("/chamados", async (req, res) => {
    console.log("Requisição recebida:", req.body);  // Exibir os dados enviados

    try {
        const { solicitante, us, tipo_us, tipo_demanda, desc_demanda, dt_demanda } = req.body;

        console.log("Dados extraídos:", {
            solicitante,
            us,
            tipo_us,
            tipo_demanda,
            desc_demanda,
            dt_demanda
        });

        const { data, error } = await supabase
            .from("ddaf-chamados")
            .insert([{ solicitante, us, tipo_us, tipo_demanda, desc_demanda, dt_demanda }]);

        if (error) {
            throw error;
        }

        console.log("Dados inseridos no Supabase:", data);
        res.status(201).json({ message: "Demanda enviada com sucesso!", data });
    } catch (error) {
        console.error("Erro ao inserir dados no Supabase:", error.message);
        res.status(500).json({ message: "Erro ao enviar a demanda." });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
