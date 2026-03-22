// Configuración del correo
const WEDDING_EMAIL = "galelau6@gmail.com";
// Variables de estado
let currentLang = 'es';
let guestName = '';
let savedAnswers = {};
let isDirty = false;
let hasSubmitted = false;

// Elementos del DOM
const langBtns = {
    es: document.getElementById('btn-es'),
    en: document.getElementById('btn-en')
};

const uiElements = {
    mainTitle: document.getElementById('main-title'),
    welcomeP1: document.getElementById('welcome-p1'),
    welcomeP2: document.getElementById('welcome-p2'),
    labelName: document.getElementById('label-name'),
    guestNameInput: document.getElementById('guest-name'),
    btnStart: document.getElementById('btn-start'),
    textStart: document.getElementById('text-start'),
    greetingSub: document.getElementById('greeting-sub'),
    textSubmit: document.getElementById('text-submit'),
    modalTitle: document.getElementById('modal-title'),
    modalDesc: document.getElementById('modal-desc'),
    btnCloseModal: document.getElementById('btn-close-modal')
};

const sections = {
    welcome: document.getElementById('welcome-section'),
    questions: document.getElementById('questions-section')
};

const displayName = document.getElementById('display-name');
const questionsContainer = document.getElementById('questions-container');
const btnSubmit = document.getElementById('btn-submit');
const successModal = document.getElementById('success-modal');

// Inicialización
function init() {
    renderQuestions();
    updateUIText();

    // Listeners Idioma
    langBtns.es.addEventListener('click', () => setLang('es'));
    langBtns.en.addEventListener('click', () => setLang('en'));

    // Input nombre
    uiElements.guestNameInput.addEventListener('input', (e) => {
        guestName = e.target.value.trim();
        uiElements.btnStart.disabled = guestName.length === 0;
    });

    // Botón comenzar
    uiElements.btnStart.addEventListener('click', () => {
        if (guestName.length > 0) {
            displayName.innerText = guestName;
            sections.welcome.classList.add('hidden');
            sections.questions.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Evento de submit
    btnSubmit.addEventListener('click', handleSubmit);

    // Botón cerrar modal
    uiElements.btnCloseModal.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });

    // Warning alert antes de cerrar (si no ha enviado)
    window.addEventListener('beforeunload', (e) => {
        if (!hasSubmitted && (Object.keys(savedAnswers).length > 0 || isDirty)) {
            const warningText = translations[currentLang].warningLeave;
            e.preventDefault();
            e.returnValue = warningText;
            return warningText;
        }
    });
}

// Configurar idioma
function setLang(lang) {
    currentLang = lang;

    // Actualizar botones
    if (lang === 'es') {
        langBtns.es.classList.add('active');
        langBtns.en.classList.remove('active');
    } else {
        langBtns.en.classList.add('active');
        langBtns.es.classList.remove('active');
    }

    updateUIText();
    renderQuestions(); // Re-renderizar para actualizar idioma de preguntas
}

function updateUIText() {
    const t = translations[currentLang];

    // Bienvenida
    uiElements.mainTitle.innerText = t.title;
    uiElements.welcomeP1.innerText = t.welcomeP1;
    uiElements.welcomeP2.innerHTML = t.welcomeP2; // innerHTML por el <b>
    uiElements.labelName.innerText = t.lblName;
    uiElements.guestNameInput.placeholder = t.plcName;
    uiElements.textStart.innerText = t.btnStart;

    // Preguntas
    uiElements.greetingSub.innerText = t.greetingSub;
    uiElements.textSubmit.innerText = t.btnSubmit;

    // Modal
    uiElements.modalTitle.innerText = t.modalTitle;
    uiElements.modalDesc.innerText = t.modalDesc;
    uiElements.btnCloseModal.innerText = t.btnClose;
}

// Renderizar preguntas según categorías
function renderQuestions() {
    questionsContainer.innerHTML = '';
    const t = translations[currentLang];

    categories.forEach(category => {
        // Envolver categoría
        const catDiv = document.createElement('div');
        catDiv.className = 'category';

        // Título de categoría
        const catTitle = document.createElement('h3');
        catTitle.className = 'category-title playfair';
        catTitle.innerText = category[currentLang];
        catDiv.appendChild(catTitle);

        category.questions.forEach(q => {
            const qCard = document.createElement('div');
            qCard.className = 'question-card';

            const qText = document.createElement('p');
            qText.className = 'question-text';
            qText.innerText = q[currentLang];

            const ansWrapper = document.createElement('div');
            ansWrapper.className = 'answer-wrapper';

            let textarea = null;

            if (q.type === 'multiple') {
                const multiContainer = document.createElement('div');
                multiContainer.className = 'multiple-choice-container';
                
                q.groups.forEach(group => {
                    const groupDiv = document.createElement('div');
                    groupDiv.className = 'radio-group';
                    const groupLabel = document.createElement('span');
                    groupLabel.className = 'radio-group-label';
                    groupLabel.innerText = group[currentLang];
                    groupDiv.appendChild(groupLabel);
                    
                    const optionsDiv = document.createElement('div');
                    optionsDiv.className = 'radio-options';
                    
                    group.options.forEach(opt => {
                        const optLabel = document.createElement('label');
                        optLabel.className = 'radio-label';
                        
                        const input = document.createElement('input');
                        input.type = 'radio';
                        input.name = `multi-${q.id}-${group.id}`;
                        input.value = opt.es;
                        
                        if (savedAnswers[q.id] && savedAnswers[q.id][group.id] === opt.es) {
                            input.checked = true;
                        }
                        
                        input.addEventListener('change', () => {
                            isDirty = true;
                            const btnSave = document.getElementById(`btn-save-${q.id}`);
                            btnSave.innerText = btnSave.dataset.originalText;
                            btnSave.classList.remove('saved');
                        });
                        
                        optLabel.appendChild(input);
                        optLabel.appendChild(document.createTextNode(' ' + opt[currentLang]));
                        optionsDiv.appendChild(optLabel);
                    });
                    groupDiv.appendChild(optionsDiv);
                    multiContainer.appendChild(groupDiv);
                });
                ansWrapper.appendChild(multiContainer);
            } else {
                textarea = document.createElement('textarea');
                textarea.id = `input-${q.id}`;
                textarea.placeholder = t.plcAnswer;
                if(savedAnswers[q.id] && typeof savedAnswers[q.id] === 'string') {
                    textarea.value = savedAnswers[q.id];
                } else {
                    textarea.value = ''; 
                }
                
                textarea.addEventListener('input', () => {
                    isDirty = true;
                    const btnSave = document.getElementById(`btn-save-${q.id}`);
                    btnSave.innerText = btnSave.dataset.originalText;
                    btnSave.classList.remove('saved');
                });
                ansWrapper.appendChild(textarea);
            }

            const btnSaveWrap = document.createElement('div');
            btnSaveWrap.className = 'btn-save-wrap';

            const btnSave = document.createElement('button');
            btnSave.className = 'btn-save';
            btnSave.id = `btn-save-${q.id}`;
            btnSave.dataset.originalText = t.btnSave;
            btnSave.innerText = savedAnswers[q.id] ? t.btnSaved : t.btnSave;
            if(savedAnswers[q.id]) {
                btnSave.classList.add('saved');
            }

            btnSave.addEventListener('click', () => {
                if (q.type === 'multiple') {
                    let hasSelection = false;
                    let result = {};
                    q.groups.forEach(g => {
                        const selected = document.querySelector(`input[name="multi-${q.id}-${g.id}"]:checked`);
                        if (selected) {
                            result[g.id] = selected.value;
                            hasSelection = true;
                        }
                    });
                    if (hasSelection) {
                        savedAnswers[q.id] = result;
                        btnSave.innerText = t.btnSaved;
                        btnSave.classList.add('saved');
                        isDirty = false;
                    }
                } else {
                    const val = textarea.value.trim();
                    if(val) {
                        savedAnswers[q.id] = val;
                        btnSave.innerText = t.btnSaved;
                        btnSave.classList.add('saved');
                        isDirty = false;
                    }
                }
            });

            btnSaveWrap.appendChild(btnSave);
            ansWrapper.appendChild(btnSaveWrap);

            qCard.appendChild(qText);
            qCard.appendChild(ansWrapper);
            catDiv.appendChild(qCard);
        });

        questionsContainer.appendChild(catDiv);
    });
}

// Manejar envío
function handleSubmit() {
    const t = translations[currentLang];

    // Forzamos guardar aquellas cajas que tengan algo seleccionado o escrito pero que no se hayan guardado explícitamente
    categories.forEach(cat => {
        cat.questions.forEach(q => {
            if (q.type === 'multiple') {
                let hasSelection = false;
                let result = {};
                q.groups.forEach(g => {
                    const selected = document.querySelector(`input[name="multi-${q.id}-${g.id}"]:checked`);
                    if (selected) {
                        result[g.id] = selected.value;
                        hasSelection = true;
                    }
                });
                if (hasSelection) savedAnswers[q.id] = result;
            } else {
                const textarea = document.getElementById(`input-${q.id}`);
                if (textarea && textarea.value.trim().length > 0) {
                    savedAnswers[q.id] = textarea.value.trim();
                }
            }
        });
    });

    const answerKeys = Object.keys(savedAnswers);
    if (answerKeys.length === 0) {
        alert(t.alertNoAnswers);
        return;
    }

    // Construir el cuerpo del correo
    let bodyText = `Hola, soy ${guestName} y estas son mis respuestas:\n\n`;

    categories.forEach(cat => {
        let catHasAnswers = false;
        let catText = `--- ${cat.es.toUpperCase()} ---\n`;

        cat.questions.forEach(q => {
            if (savedAnswers[q.id]) {
                catHasAnswers = true;
                catText += `P: ${q.es}\n`;
                
                if (typeof savedAnswers[q.id] === 'string') {
                    catText += `R: ${savedAnswers[q.id]}\n\n`;
                } else {
                    // Multiple choice formatting
                    let mcAns = [];
                    q.groups.forEach(g => {
                        if (savedAnswers[q.id][g.id]) {
                            mcAns.push(`  - ${g.es} ${savedAnswers[q.id][g.id]}`);
                        }
                    });
                    catText += `R:\n${mcAns.join('\n')}\n\n`;
                }
            }
        });

        if (catHasAnswers) {
            bodyText += catText;
        }
    });

    // Método de envío silencioso con FormSubmit (AJAX)
    // Cambiamos el texto del botón mientras se envía
    const originalBtnText = uiElements.textSubmit.innerText;
    uiElements.textSubmit.innerText = currentLang === 'es' ? "Enviando..." : "Sending...";
    btnSubmit.disabled = true;

    fetch(`https://formsubmit.co/ajax/${WEDDING_EMAIL}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            _subject: `Respuestas de boda: ${guestName}`,
            _template: "table",
            Invitado: guestName,
            Respuestas: bodyText
        })
    })
    .then(response => response.json())
    .then(data => {
        // Mostramos modal de exito
        hasSubmitted = true;
        successModal.classList.remove('hidden');
        uiElements.textSubmit.innerText = originalBtnText;
        btnSubmit.disabled = false;
    })
    .catch(error => {
        console.error(error);
        alert(currentLang === 'es' ? "Hubo un error enviando las respuestas. Por favor, intenta de nuevo." : "There was an error sending the answers. Please try again.");
        uiElements.textSubmit.innerText = originalBtnText;
        btnSubmit.disabled = false;
    });
}

// Arrancar App
document.addEventListener('DOMContentLoaded', init);
