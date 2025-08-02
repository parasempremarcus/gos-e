// Glasgow Outcome Scale-Extended - JavaScript Logic Completo

let currentQuestion = 'intro';
let totalQuestions = 8;
let answeredQuestions = 0;

// Definições dos resultados GOS-E
const gosResults = {
    1: {
        category: "Morte",
        description: "O paciente faleceu em decorrência da lesão cerebral.",
        details: "Categoria 1 da GOS-E representa o pior resultado possível.",
        outcome: "Desfavorável"
    },
    2: {
        category: "Estado Vegetativo (VS)",
        description: "O paciente está consciente mas não responsivo. Não consegue obedecer comandos simples ou comunicar-se.",
        details: "O paciente pode abrir os olhos e ter ciclos de sono-vigília, mas não demonstra consciência do ambiente ou capacidade de interação significativa.",
        outcome: "Desfavorável"
    },
    3: {
        category: "Incapacidade Grave Inferior (Lower SD)",
        description: "O paciente está consciente mas requer assistência diária para atividades básicas da vida diária.",
        details: "Necessita de cuidados constantes e supervisão. Não consegue ficar sozinho por períodos prolongados. Requer assistência para higiene pessoal, alimentação e atividades domésticas básicas.",
        outcome: "Desfavorável"
    },
    4: {
        category: "Incapacidade Grave Superior (Upper SD)",
        description: "O paciente pode ficar sozinho em casa por períodos limitados, mas ainda necessita assistência significativa.",
        details: "Pode cuidar de si mesmo por até 8 horas durante o dia, mas precisa de supervisão e assistência para atividades mais complexas. Não consegue sair de casa independentemente.",
        outcome: "Desfavorável"
    },
    5: {
        category: "Incapacidade Moderada Inferior (Lower MD)",
        description: "O paciente é independente em casa mas tem limitações significativas fora de casa e no trabalho.",
        details: "Consegue cuidar de si mesmo em casa, mas tem dificuldades para trabalhar, viajar independentemente ou participar de atividades sociais. Pode ter problemas comportamentais ou cognitivos que afetam relacionamentos.",
        outcome: "Favorável"
    },
    6: {
        category: "Incapacidade Moderada Superior (Upper MD)",
        description: "O paciente é independente fora de casa mas tem capacidade de trabalho reduzida ou problemas sociais moderados.",
        details: "Pode viajar e fazer compras independentemente, mas tem limitações no trabalho ou nas atividades sociais. Pode trabalhar com capacidade reduzida ou ter problemas ocasionais nos relacionamentos.",
        outcome: "Favorável"
    },
    7: {
        category: "Boa Recuperação Inferior (Lower GR)",
        description: "O paciente retomou a maioria das atividades normais, mas ainda tem alguns problemas menores relacionados à lesão.",
        details: "Trabalha com capacidade normal ou quase normal, participa de atividades sociais, mas pode ter sintomas residuais como dores de cabeça ocasionais, problemas leves de memória ou mudanças mínimas de personalidade.",
        outcome: "Favorável"
    },
    8: {
        category: "Boa Recuperação Superior (Upper GR)",
        description: "O paciente teve recuperação completa ou quase completa, retornando ao nível de funcionamento anterior à lesão.",
        details: "Não há problemas significativos relacionados à lesão que afetem a vida diária. O paciente retomou todas as atividades de trabalho, sociais e familiares no mesmo nível anterior à lesão.",
        outcome: "Favorável"
    }
};

function startAssessment() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('progressBar').style.display = 'block';
    showQuestion('q1');
    updateProgress();
}

function showQuestion(questionId) {
    // Esconder todas as perguntas
    const questions = document.querySelectorAll('.question-container');
    questions.forEach(q => {
        q.classList.remove('active');
    });
    
    // Mostrar a pergunta atual
    const currentQ = document.getElementById(questionId);
    if (currentQ) {
        currentQ.classList.add('active');
        currentQuestion = questionId;
    }
}

function nextQuestion(nextId) {
    answeredQuestions++;
    updateProgress();
    
    if (typeof nextId === 'string') {
        showQuestion(nextId);
    } else {
        showQuestion('q' + nextId);
    }
}

function setResult(score) {
    answeredQuestions++;
    updateProgress();
    showResult(score);
}

// Funções específicas para cada pergunta baseadas no fluxograma

// Q1: Consciência
function q1_no() {
    setResult(2); // Estado Vegetativo
}

function q1_yes() {
    nextQuestion('q2a');
}

// Q2a: Independência em casa - assistência essencial
function q2a_yes() {
    nextQuestion('q2c_dependent');
}

function q2a_no() {
    nextQuestion('q2b');
}

// Q2b: Precisa de ajuda frequente
function q2b_yes() {
    nextQuestion('q2c_help');
}

function q2b_no() {
    nextQuestion('q3a');
}

// Q2c: Era independente antes da lesão (para dependentes)
function q2c_dependent_no() {
    setResult(3); // Lower SD
}

function q2c_dependent_yes() {
    nextQuestion('q3a');
}

// Q2c: Era independente antes da lesão (para quem precisa de ajuda)
function q2c_help_no() {
    setResult(4); // Upper SD
}

function q2c_help_yes() {
    nextQuestion('q3a');
}

// Q3a: Consegue fazer compras
function q3a_no() {
    nextQuestion('q3b');
}

function q3a_yes() {
    nextQuestion('q4a');
}

// Q3b: Conseguia fazer compras antes da lesão
function q3b_no() {
    nextQuestion('q4a');
}

function q3b_yes() {
    setResult(4); // Upper SD
}

// Q4a: Consegue viajar localmente
function q4a_no() {
    nextQuestion('q4b');
}

function q4a_yes() {
    nextQuestion('q5a');
}

// Q4b: Conseguia viajar antes da lesão
function q4b_no() {
    nextQuestion('q5a');
}

function q4b_yes() {
    setResult(4); // Upper SD
}

// Q5a: Consegue trabalhar com capacidade anterior
function q5a_no() {
    nextQuestion('q5b');
}

function q5a_yes() {
    nextQuestion('q5c_working');
}

// Q5b: Nível de restrição no trabalho
function q5b_reduced() {
    nextQuestion('q5c_reduced');
}

function q5b_sheltered() {
    nextQuestion('q5c_sheltered');
}

// Q5c: Trabalhava antes da lesão (capacidade normal)
function q5c_working_no() {
    nextQuestion('q6a');
}

function q5c_working_yes() {
    nextQuestion('q6a');
}

// Q5c: Trabalhava antes da lesão (capacidade reduzida)
function q5c_reduced_no() {
    nextQuestion('q6a');
}

function q5c_reduced_yes() {
    setResult(6); // Upper MD
}

// Q5c: Trabalhava antes da lesão (trabalho protegido)
function q5c_sheltered_no() {
    nextQuestion('q6a');
}

function q5c_sheltered_yes() {
    setResult(5); // Lower MD
}

// Q6a: Consegue retomar atividades sociais
function q6a_no() {
    nextQuestion('q6b');
}

function q6a_yes() {
    nextQuestion('q6c');
}

// Q6b: Extensão da restrição nas atividades
function q6b_bit_less() {
    nextQuestion('q6c_bit_less');
}

function q6b_much_less() {
    nextQuestion('q6c_much_less');
}

function q6b_unable() {
    nextQuestion('q6c_unable');
}

// Q6c: Participava de atividades antes da lesão (sem restrição)
function q6c_no() {
    nextQuestion('q7a');
}

function q6c_yes() {
    nextQuestion('q7a');
}

// Q6c: Participava de atividades antes da lesão (um pouco menos)
function q6c_bit_less_no() {
    nextQuestion('q7a');
}

function q6c_bit_less_yes() {
    setResult(7); // Lower GR
}

// Q6c: Participava de atividades antes da lesão (muito menos)
function q6c_much_less_no() {
    nextQuestion('q7a');
}

function q6c_much_less_yes() {
    setResult(6); // Upper MD
}

// Q6c: Participava de atividades antes da lesão (incapaz)
function q6c_unable_no() {
    nextQuestion('q7a');
}

function q6c_unable_yes() {
    setResult(5); // Lower MD
}

// Q7a: Problemas psicológicos que afetam relacionamentos
function q7a_no() {
    nextQuestion('q7c');
}

function q7a_yes() {
    nextQuestion('q7b');
}

// Q7b: Extensão da perturbação
function q7b_occasional() {
    nextQuestion('q7c_occasional');
}

function q7b_frequent() {
    nextQuestion('q7c_frequent');
}

function q7b_constant() {
    nextQuestion('q7c_constant');
}

// Q7c: Havia problemas antes da lesão (sem problemas psicológicos)
function q7c_no() {
    nextQuestion('q8a');
}

function q7c_yes() {
    nextQuestion('q8a');
}

// Q7c: Havia problemas antes da lesão (ocasional)
function q7c_occasional_no() {
    setResult(7); // Lower GR
}

function q7c_occasional_yes() {
    nextQuestion('q8a');
}

// Q7c: Havia problemas antes da lesão (frequente)
function q7c_frequent_no() {
    setResult(6); // Upper MD
}

function q7c_frequent_yes() {
    nextQuestion('q8a');
}

// Q7c: Havia problemas antes da lesão (constante)
function q7c_constant_no() {
    setResult(5); // Lower MD
}

function q7c_constant_yes() {
    nextQuestion('q8a');
}

// Q8a: Outros problemas relacionados à lesão
function q8a_no() {
    nextQuestion('q8b_no');
}

function q8a_yes() {
    nextQuestion('q8b_yes');
}

// Q8b: Problemas similares antes da lesão (sem outros problemas)
function q8b_no_no() {
    setResult(8); // Upper GR
}

function q8b_no_yes() {
    setResult(8); // Upper GR
}

// Q8b: Problemas similares antes da lesão (com outros problemas)
function q8b_yes_no() {
    setResult(7); // Lower GR
}

function q8b_yes_yes() {
    setResult(8); // Upper GR
}

function showResult(score) {
    // Esconder todas as perguntas
    const questions = document.querySelectorAll('.question-container');
    questions.forEach(q => {
        q.classList.remove('active');
    });
    
    // Mostrar resultado
    const result = gosResults[score];
    document.getElementById('resultScore').textContent = `GOS-E: ${score}`;
    document.getElementById('resultCategory').textContent = result.category;
    document.getElementById('resultDescription').textContent = result.description;
    document.getElementById('resultDetails').innerHTML = `
        <strong>Detalhes:</strong><br>
        ${result.details}<br><br>
        <strong>Classificação:</strong> ${result.outcome}<br>
    `;
    
    document.getElementById('result').classList.add('show');
    
    // Completar barra de progresso
    document.getElementById('progressFill').style.width = '100%';
}

function updateProgress() {
    const progress = (answeredQuestions / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function restartAssessment() {
    // Reset variables
    currentQuestion = 'intro';
    answeredQuestions = 0;
    
    // Hide result
    document.getElementById('result').classList.remove('show');
    
    // Hide all questions
    const questions = document.querySelectorAll('.question-container');
    questions.forEach(q => {
        q.classList.remove('active');
    });
    
    // Hide progress bar
    document.getElementById('progressBar').style.display = 'none';
    document.getElementById('progressFill').style.width = '0%';
    
    // Show intro
    document.getElementById('intro').style.display = 'block';
}

// Adicionar animações suaves
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar efeito de hover nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Adicionar efeito de clique
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'translateY(0)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 100);
        });
    });
});

// Função para navegação por teclado (acessibilidade)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn')) {
            focusedElement.click();
        }
    }
});

// Adicionar suporte para navegação por setas
document.addEventListener('keydown', function(event) {
    const activeQuestion = document.querySelector('.question-container.active');
    if (activeQuestion) {
        const buttons = activeQuestion.querySelectorAll('.btn');
        const currentFocus = document.activeElement;
        const currentIndex = Array.from(buttons).indexOf(currentFocus);
        
        if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            buttons[prevIndex].focus();
        } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            const nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            buttons[nextIndex].focus();
        }
    }
});

// Adicionar confirmação antes de sair da página (se houver progresso)
window.addEventListener('beforeunload', function(event) {
    if (answeredQuestions > 0 && !document.getElementById('result').classList.contains('show')) {
        event.preventDefault();
        event.returnValue = 'Você tem uma avaliação em andamento. Tem certeza que deseja sair?';
        return event.returnValue;
    }
});