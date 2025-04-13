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
                    alert('Demanda registrada com sucesso!\nNúmero da demanda: ${numeroDemanda}');
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
