/*const adicionarTarefa = () =>{
const inputTarefas = document.getElementById('input-tarefas');
const tarefa = inputTarefas.value.trim()

const mensagem = document.getElementById('mensagem');

if(tarefa == ''){
    //Mensagem de erro//
    let mensagemErro = 'Digite uma tarefa para adiciona-la a sua lista!'
    mensagem.textContent = mensagemErro;
    mensagem.style.color = "#ff0000";
}else{
    //Mensagem de sucesso//
    let mensagemSucesso = 'Tarefa adicionada com sucesso!'
    mensagem.textContent = mensagemSucesso;
    mensagem.style.color = "#00FF00"

    //Criar nova tarefa//
const listaTarefas = document.getElementById('listaTarefas')
const novaTarefa = document.createElement('li')
novaTarefa.textContent = tarefa;
listaTarefas.appendChild(novaTarefa)
}

// Criar botão "Apagar Tarefa"
const botaoApagar = document.createElement('button');
botaoApagar.textContent = 'Apagar';
botaoApagar.style.marginLeft = '10px';
botaoApagar.style.color = '#fff';
botaoApagar.style.backgroundColor = '#ff0000';
botaoApagar.style.border = 'none';
botaoApagar.style.cursor = 'pointer';
botaoApagar.style.padding = '5px';

// Evento para remover a tarefa
botaoApagar.onclick = () => {
    listaTarefas.removeChild(novaTarefa);
};

// Adicionar a tarefa e o botão ao elemento <li>
novaTarefa.textContent = tarefa;
novaTarefa.appendChild(botaoApagar);
listaTarefas.appendChild(novaTarefa);
}

// Limpar o input do usuário
inputTarefas.value = '';
};


//Limpar o input do usuário//
inputTarefas.value = '';
}*/

// Carregar tarefas salvas ao iniciar a página
window.onload = () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.forEach((tarefaObj) => {
        adicionarTarefaNaLista(tarefaObj.texto, tarefaObj.concluida);
    });

    // Adicionar evento para capturar a tecla Enter no input
    const inputTarefas = document.getElementById('input-tarefas');
    inputTarefas.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') {
            adicionarTarefa();
        }
    });
};

const adicionarTarefa = () => {
    const inputTarefas = document.getElementById('input-tarefas');
    const tarefa = inputTarefas.value.trim();

    const mensagem = document.getElementById('mensagem');

    if (tarefa === '') {
        // Mensagem de erro
        let mensagemErro = 'Digite uma tarefa para adicioná-la à sua lista!';
        mensagem.textContent = mensagemErro;
        mensagem.style.color = "#ff0000";
    } else {
        // Mensagem de sucesso
        let mensagemSucesso = 'Tarefa adicionada com sucesso!';
        mensagem.textContent = mensagemSucesso;
        mensagem.style.color = "#00FF00";

        // Adicionar a tarefa à lista e salvar no localStorage
        adicionarTarefaNaLista(tarefa, false);
        salvarTarefaNoLocalStorage(tarefa, false);
    }

    // Limpar o input do usuário
    inputTarefas.value = '';
};

const adicionarTarefaNaLista = (texto, concluida) => {
    const listaTarefas = document.getElementById('listaTarefas');
    const novaTarefa = document.createElement('li');

    // Criar checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.marginRight = '10px';
    checkbox.checked = concluida;

    // Evento para riscar o texto ao marcar o checkbox
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            novaTarefa.style.textDecoration = 'line-through';
            novaTarefa.style.color = '#808080';
        } else {
            novaTarefa.style.textDecoration = 'none';
            novaTarefa.style.color = '#000';
        }
        atualizarTarefaNoLocalStorage(texto, checkbox.checked);
    });

    // Criar botão "Apagar Tarefa"
    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = 'Apagar';
    botaoApagar.style.marginLeft = '10px';
    botaoApagar.style.color = '#fff';
    botaoApagar.style.backgroundColor = '#ff0000';
    botaoApagar.style.border = 'none';
    botaoApagar.style.cursor = 'pointer';
    botaoApagar.style.padding = '5px';

    // Evento para apagar a tarefa
    botaoApagar.onclick = () => {
        listaTarefas.removeChild(novaTarefa);
        removerTarefaDoLocalStorage(texto);
    };

    // Adicionar checkbox, texto da tarefa e botão ao elemento <li>
    novaTarefa.textContent = texto;
    novaTarefa.prepend(checkbox); // Adicionar o checkbox no início
    novaTarefa.appendChild(botaoApagar); // Adicionar o botão no final

    // Atualizar estilo se já estiver concluída
    if (concluida) {
        novaTarefa.style.textDecoration = 'line-through';
        novaTarefa.style.color = '#808080';
    }

    listaTarefas.appendChild(novaTarefa);
};

// Função para salvar tarefa no localStorage
const salvarTarefaNoLocalStorage = (texto, concluida) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push({ texto, concluida });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

// Função para atualizar tarefa no localStorage
const atualizarTarefaNoLocalStorage = (texto, concluida) => {
    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    const tarefaIndex = tarefas.findIndex((t) => t.texto === texto);
    if (tarefaIndex !== -1) {
        tarefas[tarefaIndex].concluida = concluida;
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }
};

// Função para remover tarefa do localStorage
const removerTarefaDoLocalStorage = (texto) => {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas = tarefas.filter((t) => t.texto !== texto);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
};

