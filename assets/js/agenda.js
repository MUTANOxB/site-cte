async function carregarAgenda() {

    const listaEventos =
        document.getElementById("lista-eventos");

    try {

        const resposta =
            await fetch("assets/data/agenda.json");

        const eventos =
            await resposta.json();

        eventos.sort(
            (a, b) => new Date(a.data) - new Date(b.data)
        );

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const proximos = [];
        const anteriores = [];

        eventos.forEach(evento => {

            const dataEvento = new Date(evento.data);
            dataEvento.setHours(0, 0, 0, 0);

            if (dataEvento >= hoje) {
                proximos.push(evento);
            } else {
                anteriores.push(evento);
            }

        });

        listaEventos.innerHTML = "";

        // PRÓXIMOS EVENTOS
        listaEventos.innerHTML += `
            <h3 class="titulo-agenda">
                Próximos Eventos
            </h3>
        `;

        if (proximos.length === 0) {

            listaEventos.innerHTML += `
                <div class="sobre-box sem-eventos">
                    <h3>
                        <i class="fa-regular fa-calendar"></i>
                        Sem eventos futuros
                    </h3>

                    <p>
                        Não há eventos agendados no momento.
                    </p>
                </div>
            `;

        } else {

            proximos.forEach(evento => {

                const dataEvento =
                    new Date(evento.data);

                const diferencaDias =
                    Math.ceil(
                        (dataEvento - hoje)
                        / (1000 * 60 * 60 * 24)
                    );

                listaEventos.innerHTML += `
                    <div class="evento-card ${
                        diferencaDias <= 7
                        ? "evento-proximo"
                        : ""
                    }">

                        <div class="evento-topo">
                            <h3>${evento.titulo}</h3>

                            ${
                                diferencaDias <= 7
                                ? '<span class="badge-evento">Próximo</span>'
                                : ''
                            }
                        </div>

                        <p><strong>Data:</strong> ${dataEvento.toLocaleDateString('pt-BR')}</p>
                        <p><strong>Horário:</strong> ${evento.horario}</p>
                        <p><strong>Local:</strong> ${evento.local}</p>

                    </div>
                `;
            });

        }

        // EVENTOS ANTERIORES
        if (anteriores.length > 0) {

            listaEventos.innerHTML += `
                <h3 class="titulo-agenda titulo-anteriores">
                    Eventos Anteriores
                </h3>
            `;

            anteriores.reverse().forEach(evento => {

                const dataEvento =
                    new Date(evento.data);

                listaEventos.innerHTML += `
                    <div class="evento-card evento-anterior">

                        <div class="evento-topo">
                            <h3>${evento.titulo}</h3>
                        </div>

                        <p><strong>Data:</strong> ${dataEvento.toLocaleDateString('pt-BR')}</p>
                        <p><strong>Horário:</strong> ${evento.horario}</p>
                        <p><strong>Local:</strong> ${evento.local}</p>

                    </div>
                `;
            });

        }

    } catch (erro) {

        listaEventos.innerHTML = `
            <div class="sobre-box">
                <p>Não foi possível carregar os eventos.</p>
            </div>
        `;

        console.error(erro);
    }
}
carregarAgenda();