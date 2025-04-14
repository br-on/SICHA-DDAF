document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('chamadoForm');

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const solicitante = document.getElementById('solicitante').value;
            const us = document.getElementById('us').value;
            const tipo_us = document.getElementById('tipo_us').value;
            const tipo_demanda = document.getElementById('tipo_demanda').value;
            const desc_demanda = document.getElementById('desc_demanda').value;
            const dt_demanda = document.getElementById('dt_demanda').value;
            // Gera número aleatório com 7 dígitos
            const n_demanda = Math.floor(1000000 + Math.random() * 9000000);

            const data = {
                n_demanda,
                solicitante,
                us,
                tipo_us,
                tipo_demanda,
                desc_demanda,
                dt_demanda
            };

            console.log(data);

            try {
                // Altere a URL para a rota do Vercel
                const response = await fetch('/api/chamados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();
                console.log(result);
                if (response.ok) {
                    const numeroDemanda = result.data?.[0]?.n_demanda || n_demanda; // Usa o da resposta, ou o que foi gerado
                    alert(`Demanda registrada com sucesso!\nNúmero da demanda: ${numeroDemanda}`);
                    form.reset(); // Limpar o formulário após o envio
                } else {
                    alert('Erro ao registrar demanda.');
                }
            } catch (error) {
                console.error('Erro no envio:', error);
            }
        });
    } else {
        console.log("Formulário não encontrado.");
    }
});

const btnAbrir = document.getElementById("btnAbrirChamado");
const btnVer = document.getElementById("btnVerChamado");

btnAbrir.addEventListener("click", () => {
    document.querySelector(".container").style.display = "block";
    document.querySelector(".container-ver-chamado").style.display = "none";

    // Atualiza classes
    btnAbrir.classList.add("botao-ativado");
    btnVer.classList.remove("botao-ativado");
});

btnVer.addEventListener("click", () => {
    document.querySelector(".container").style.display = "none";
    document.querySelector(".container-ver-chamado").style.display = "block";

    // Atualiza classes
    btnVer.classList.add("botao-ativado");
    btnAbrir.classList.remove("botao-ativado");
});

// Função de buscar chamado
document.getElementById("btnBuscarDemanda").addEventListener("click", async () => {
    const nDemanda = document.getElementById("buscar-demanda").value.trim();

    if (!nDemanda) {
        alert("Digite um número de demanda.");
        return;
    }

    try {
        const response = await fetch(`https://chamado-dsiv.vercel.app/api/chamados/${nDemanda}`);
        if (!response.ok) throw new Error("Erro ao buscar o chamado.");

        const chamado = await response.json();
        console.log(chamado);

        if (!chamado || chamado.length === 0) {
            document.getElementById("resultadoDemanda").innerHTML = "<p>Nenhum chamado encontrado com esse número.</p>";
            return;
        }
        
        const c = chamado[0];
        
        const html = `
            <<table border="1" cellpadding="8">
                <tr><th>Nº Demanda</th><td>${c.n_demanda}</td></tr>
                <tr><th>Solicitante</th><td>${c.solicitante}</td></tr>
                <tr><th>Unidade</th><td>${c.us}</td></tr>
                <tr><th>Tipo de Demanda</th><td>${c.tipo_demanda}</td></tr>
                <tr><th>Descrição</th><td>${c.desc_demanda}</td></tr>
                <tr><th>Data da Demanda</th><td>${c.dt_demanda}</td></tr>
                <tr><th>Andamento</th><td>${c.andamento || "-"}</td></tr>
                <tr><th>Status</th><td>${c.status || "-"}</td></tr>
                <tr><th>Observação</th><td>${c.observacao || "-"}</td></tr>
                <tr><th>Data de Atualização</th><td>${c.dt_atualizacao || "-"}</td></tr>
            </table>

        `;

        document.getElementById("resultadoDemanda").innerHTML = html;
    } catch (err) {
        console.error("Erro:", err);
        document.getElementById("resultadoDemanda").innerHTML = "<p>Erro ao buscar o chamado.</p>";
    }
});
