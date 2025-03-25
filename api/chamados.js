import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Erro: SUPABASE_URL ou SUPABASE_KEY não encontrados no .env");
    process.exit(1); // Sai do processo se as credenciais estiverem ausentes
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Função handler para ser chamada pelo Vercel
export default async function handler(req, res) {
    if (req.method === "POST") {
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
    } else {
        // Apenas aceita POST
        res.status(405).json({ message: "Método não permitido" });
    }
}
