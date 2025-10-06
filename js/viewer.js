document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO TEMA (IDÊNTICA À ANTERIOR) ---
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

    // --- LÓGICA DO VISUALIZADOR DE AULAS ---

    const urlParams = new URLSearchParams(window.location.search);
    const lessonName = urlParams.get('lesson');
    const lessonTitle = document.getElementById('lesson-title');
    const fileList = document.getElementById('file-list');
    const contentFrame = document.getElementById('content-frame');
    const currentFileNameSpan = document.getElementById('current-file-name');
    const codeBlock = document.getElementById('code-block');

    if (!lessonName) {
        lessonTitle.textContent = "Aula não encontrada";
        fileList.innerHTML = '<li class="list-group-item text-danger">Nenhuma aula foi especificada na URL.</li>';
        return;
    }

    /**
     * SIMULAÇÃO DE DADOS DA AULA.
     * Em um projeto real, você buscaria esses dados de uma API.
     * O objeto 'files' contém a lista de arquivos.
     * O objeto 'content' mapeia o nome do arquivo ao seu conteúdo.
     */
    const lessonData = {
        '01.introducao-ao-curso': {
            files: ['index.html', 'style.css'],
            content: {
                'index.html': '<!DOCTYPE html>\n<html>\n<head>\n\t<title>Aula 1</title>\n</head>\n<body>\n\t<h1>Seja Bem-Vindo!</h1>\n\t<p>Este é o arquivo index.html da primeira aula.</p>\n</body>\n</html>',
                'style.css': 'body {\n\tfont-family: sans-serif;\n\tbackground-color: #f0f0f0;\n\tcolor: #333;\n}\n\nh1 {\n\tcolor: blue;\n}'
            }
        },
        '02.conceitos-basicos-de-javascript': {
            files: ['index.html', 'app.js'],
            content: {
                'index.html': '<!DOCTYPE html>\n<html>\n<head>\n\t<title>Aula 2</title>\n</head>\n<body>\n\t<h1>Conceitos Básicos</h1>\n\t<p>Abra o console para ver o resultado do script.</p>\n\t<script src="app.js"></script>\n</body>\n</html>',
                'app.js': '// Este é um comentário em JavaScript\n\nconsole.log("Olá, mundo!");\n\nlet mensagem = "Aprendendo JS";\nalert(mensagem);'
            }
        },
        '03.primeiros-passos-com-html': {
            files: ['index.html'],
            content: {
                'index.html': '<!DOCTYPE html>\n<html lang="pt-br">\n<head>\n\t<meta charset="UTF-8">\n\t<title>HTML Semântico</title>\n</head>\n<body>\n\t<header>\n\t\t<h1>Cabeçalho da Página</h1>\n\t</header>\n\t<main>\n\t\t<section>\n\t\t\t<h2>Seção Principal</h2>\n\t\t\t<p>Conteúdo da seção...</p>\n\t\t</section>\n\t</main>\n\t<footer>\n\t\t<p>Rodapé</p>\n\t</footer>\n</body>\n</html>'
            }
        }
        // Adicione mais aulas aqui seguindo o mesmo padrão
    };

    const data = lessonData[lessonName];

    if (!data) {
        lessonTitle.textContent = "Conteúdo não encontrado";
        fileList.innerHTML = `<li class="list-group-item text-danger">Não há dados simulados para a aula: <strong>${lessonName}</strong></li>`;
        return;
    }

    // Formata e define o título da página
    function formatLessonName(folderName) {
        const parts = folderName.split('.');
        const number = parseInt(parts[0], 10);
        const nameSlug = parts[1];
        const formattedName = nameSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        return { number, name: formattedName };
    }
    const { number, name } = formatLessonName(lessonName);
    lessonTitle.textContent = `Aula ${number}: ${name}`;

    // Renderiza a lista de arquivos
    data.files.forEach(file => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        const fileNameSpan = document.createElement('span');
        fileNameSpan.textContent = file;
        li.appendChild(fileNameSpan);

        const divButtons = document.createElement('div');
        
        // Botão "Ver Código"
        const viewCodeBtn = document.createElement('button');
        viewCodeBtn.className = 'btn btn-sm btn-outline-primary me-2';
        viewCodeBtn.innerHTML = '<span class="material-symbols-outlined align-middle">code</span> Código';
        viewCodeBtn.onclick = () => {
            codeBlock.textContent = data.content[file] || '// Conteúdo do arquivo não disponível na simulação.';
            codeBlock.className = `language-${getFileExtension(file)}`;
            Prism.highlightElement(codeBlock);
            new bootstrap.Modal(document.getElementById('codeModal')).show();
        };
        divButtons.appendChild(viewCodeBtn);

        // Botão "Executar" (só para index.html)
        if (file === 'index.html') {
            const runBtn = document.createElement('button');
            runBtn.className = 'btn btn-sm btn-success';
            runBtn.innerHTML = '<span class="material-symbols-outlined align-middle">play_arrow</span> Executar';
            runBtn.onclick = () => window.open(`aulas/${lessonName}/${file}`, '_blank');
            divButtons.appendChild(runBtn);
        }

        li.appendChild(divButtons);
        fileList.appendChild(li);

        // Adiciona o evento de clique para carregar o arquivo no iframe
        fileNameSpan.style.cursor = 'pointer';
        fileNameSpan.onclick = () => {
            contentFrame.src = `aulas/${lessonName}/${file}`;
            currentFileNameSpan.textContent = file;
        };
    });

    // Carrega o index.html por padrão no iframe
    if (data.files.includes('index.html')) {
        contentFrame.src = `aulas/${lessonName}/index.html`;
    } else {
        contentFrame.src = '';
        const doc = contentFrame.contentDocument || contentFrame.contentWindow.document;
        doc.body.innerHTML = '<div class="d-flex align-items-center justify-content-center h-100 text-muted">Selecione um arquivo para visualizar.</div>';
    }

    // Função auxiliar para obter a extensão do arquivo
    function getFileExtension(filename) {
        return filename.split('.').pop();
    }
});