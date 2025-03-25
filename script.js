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

            const data = {
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
                    alert('Demanda registrada com sucesso!');
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
