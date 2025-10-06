document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO TEMA (LIGHT/DARK) ---
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);


    // --- LÓGICA DE CARREGAMENTO DAS AULAS ---
    const lessonContainer = document.getElementById('lesson-list-container');
    const loadingMessage = document.getElementById('loading-message');

    /**
     * SIMULAÇÃO DE DADOS.
     * Em um ambiente real, você buscaria esses dados de um endpoint da API.
     * Exemplo: fetch('/api/aulas').then(res => res.json()).then(data => renderLessons(data));
     */
    const aulasSimuladas = [
        '01.form-login-introdução',
        '02.javascript-introdução'
    ];

    /**
     * Formata o nome da aula para exibição.
     * Ex: "01.nome-da-aula" -> "1. Nome Da Aula"
     * @param {string} folderName - O nome da pasta da aula.
     * @returns {object} - Um objeto com o número e o nome formatado.
     */
    function formatLessonName(folderName) {
        const parts = folderName.split('.');
        const number = parseInt(parts[0], 10);
        const nameSlug = parts[1];

        const formattedName = nameSlug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return { number, name: formattedName };
    }


    /**
     * Renderiza a lista de aulas no container.
     * @param {string[]} lessons - Array com os nomes das pastas das aulas.
     */
    function renderLessons(lessons) {
        console.log("Função renderLessons() chamada.");
        loadingMessage.style.display = 'none';
        lessonContainer.innerHTML = '';
        console.log("Mensagem de carregamento ocultada e container limpo.");

        if (lessons.length === 0) {
            lessonContainer.innerHTML = '<p class="col-12 text-center">Nenhuma aula encontrada.</p>';
            return;
        }

        lessons.forEach(lesson => {
            const { number, name } = formatLessonName(lesson);

            // ATUALIZAÇÃO: O link agora aponta para viewer.html com um parâmetro
            const lessonCardHTML = `
            <div class="col">
                <div class="lesson-card elevation-1">
                    <a href="viewer.html?lesson=${lesson}" class="lesson-card-link">
                        <div class="lesson-card-content">
                            <span class="material-symbols-outlined lesson-card-icon">play_lesson</span>
                            <div class="lesson-card-text">
                                <h5>Aula ${number}</h5>
                                <small>${name}</small>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `;
            lessonContainer.innerHTML += lessonCardHTML;
        });
        console.log("Renderização das aulas concluída com sucesso.");
    } 

    // Simula um pequeno atraso de carregamento para mostrar o spinner
    setTimeout(() => {
        renderLessons(aulasSimuladas);
    }, 1000);

});
