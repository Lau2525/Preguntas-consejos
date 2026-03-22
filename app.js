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

            const textarea = document.createElement('textarea');
            textarea.id = `input-${q.id}`;
            textarea.placeholder = t.plcAnswer;
            // Si ya hay algo guardado, rellenarlo
            if (savedAnswers[q.id]) {
                textarea.value = savedAnswers[q.id];
            } else {
                textarea.value = ''; // limpiar estado previo por re-renderizado
            }

            textarea.addEventListener('input', () => {
                isDirty = true;
                const btnSave = document.getElementById(`btn-save-${q.id}`);
                btnSave.innerText = btnSave.dataset.originalText;
                btnSave.classList.remove('saved');
            });

            const btnSaveWrap = document.createElement('div');
            btnSaveWrap.className = 'btn-save-wrap';

            const btnSave = document.createElement('button');
            btnSave.className = 'btn-save';
            btnSave.id = `btn-save-${q.id}`;
            btnSave.dataset.originalText = t.btnSave;
            btnSave.innerText = savedAnswers[q.id] ? t.btnSaved : t.btnSave;
            if (savedAnswers[q.id]) {
                btnSave.classList.add('saved');
            }

            btnSave.addEventListener('click', () => {
                const val = textarea.value.trim();
                if (val) {
                    savedAnswers[q.id] = val;
                    btnSave.innerText = t.btnSaved;
                    btnSave.classList.add('saved');
                    isDirty = false;
                }
            });

            btnSaveWrap.appendChild(btnSave);
            ansWrapper.appendChild(textarea);
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

    // Forzamos guardar aquellas cajas que tengan texto pero el usuario no haya dado "Guardar"
    categories.forEach(cat => {
        cat.questions.forEach(q => {
            const textarea = document.getElementById(`input-${q.id}`);
            if (textarea && textarea.value.trim().length > 0) {
                savedAnswers[q.id] = textarea.value.trim();
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
                catText += `R: ${savedAnswers[q.id]}\n\n`;
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
