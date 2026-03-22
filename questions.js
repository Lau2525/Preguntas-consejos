const categories = [
    {
        id: "amor",
        es: "Amor y Relación",
        en: "Love & Relationship",
        questions: [
            { id: "q1", es: "¿Cuál creen que es el secreto más grande para mantener vivo un amor duradero?", en: "What do you think is the biggest secret to keeping lasting love alive?" },
            { id: "q2", es: "¿Qué detalle pequeño o hábito diario consideran indispensable en una pareja?", en: "What small detail or daily habit do you consider essential for a couple?" },
            { id: "q_ar3", es: "¿Cómo se cuida y construye la confianza?", en: "How is trust cared for and built?" },
            { id: "q_ar4", es: "¿Qué hace fuerte a una pareja?", en: "What makes a couple strong?" },
            { id: "q_ar5", es: "¿Qué es lo más importante en el matrimonio?", en: "What is the most important thing in marriage?" }
        ]
    },
    {
        id: "consejos",
        es: "Consejos para los esposos",
        en: "Advice for the newlyweds",
        questions: [
            { id: "q3", es: "¿Qué consejo práctico nos darían para nuestra vida juntos?", en: "What practical advice would you give us for our life together?" },
            { id: "q4", es: "¿Cómo debemos manejar las diferencias o los días difíciles?", en: "How should we handle disagreements or difficult days?" },
            { id: "q_ce3", es: "¿Qué no debemos olvidar nunca como pareja?", en: "What should we never forget as a couple?" }
        ]
    },
    {
        id: "reflexiones",
        es: "Reflexiones",
        en: "Reflections",
        questions: [
            { id: "q5", es: "Si tuvieran que resumir el matrimonio en tres palabras, ¿cuáles serían?", en: "If you had to summarize marriage in three words, what would they be?" },
            { id: "q6", es: "¿Qué es lo que más han valorado de su propia experiencia en pareja o de las parejas que admiran?", en: "What have you valued the most in your own relationship experience or in couples you admire?" },
            { id: "q_re3", es: "¿Qué aprendiste del amor con el tiempo?", en: "What have you learned about love over time?" },
            { id: "q_re4", es: "¿Qué hace especial compartir la vida con alguien?", en: "What makes sharing life with someone special?" },
            { id: "q_re5", es: "¿Qué valoras más en una relación?", en: "What do you value most in a relationship?" }
        ]
    },
    {
        id: "metaforicas",
        es: "Metafóricas",
        en: "Metaphorical",
        questions: [
            { id: "q7", es: "Si nuestro matrimonio fuera un viaje, ¿a qué lugar del mundo creen que se parecería y por qué?", en: "If our marriage were a journey, what place in the world do you think it would resemble and why?" },
            { id: "q8", es: "Si el amor fuera un color, ¿cuál sería el nuestro y por qué?", en: "If love were a color, what would ours be and why?" },
            { id: "q_me3", es: "¿A qué sabe el amor?... ¿Qué sabor crees que representaría el nuestro y por qué?", en: "What does love taste like?... What flavor do you think would represent ours and why?" }
        ]
    },
    {
        id: "futuro",
        es: "Nuestro futuro juntos",
        en: "Our future together",
        questions: [
            { id: "q9", es: "¿Cómo nos imaginan en 5 años?", en: "How do you imagine us in 5 years?" },
            { id: "q_fu2", es: "¿Qué aventuras crees que viviremos?", en: "What adventures do you think we will live?" },
            { id: "q10", es: "¿Qué meta creen que no debe faltar en nuestras vidas?", en: "What goal do you think shouldn't be missing from our lives?" }
        ]
    }
];

const translations = {
    es: {
        title: "Bienvenidos",
        welcomeP1: "Estamos muy felices de compartir este día tan especial con ustedes. Sus palabras son nuestro mayor regalo.",
        welcomeP2: "A continuación encontrarán algunas preguntas y reflexiones. Pueden ir contestando solo las que deseen. Asegúrense de <b>guardar</b> cada respuesta y al finalizar, den clic en el botón de enviar.",
        lblName: "Para empezar, por favor escribe tu nombre o el de tu familia:",
        plcName: "Ej. Familia García / Juan Pérez",
        btnStart: "Comenzar",
        greetingSub: "Selecciona los temas y responde las preguntas que gustes.",
        btnSave: "Guardar respuesta",
        btnSaved: "✓ Guardado",
        plcAnswer: "Escribe tu respuesta aquí...",
        btnSubmit: "Enviar todas mis respuestas",
        modalTitle: "¡Gracias!",
        modalDesc: "Tus respuestas nos han llegado al corazón. Han sido enviadas directamente y con éxito a los novios. ¡Apreciamos mucho tus hermosas palabras!",
        btnClose: "Cerrar",
        warningLeave: "¿Seguro que quieres salir? Tienes respuestas guardadas que no has enviado.",
        alertNoAnswers: "Aún no has guardado ninguna respuesta. ¡Anímate a contestar al menos una!"
    },
    en: {
        title: "Welcome",
        welcomeP1: "We are so happy to share this special day with you. Your words are our greatest gift.",
        welcomeP2: "Below you will find some questions and reflections. Feel free to answer only the ones you'd like. Be sure to <b>save</b> each answer, and when you are done, click the send button.",
        lblName: "To begin, please write your name or your family's name:",
        plcName: "e.g., The Smith Family / John Doe",
        btnStart: "Start",
        greetingSub: "Select the topics and answer the questions you like.",
        btnSave: "Save answer",
        btnSaved: "✓ Saved!",
        plcAnswer: "Write your answer here...",
        btnSubmit: "Send all my answers",
        modalTitle: "Thank you!",
        modalDesc: "Your answers have touched our hearts. They have been successfully sent directly to the couple. We deeply appreciate your beautiful words!",
        btnClose: "Close",
        warningLeave: "Are you sure you want to leave? You have saved answers that haven't been sent.",
        alertNoAnswers: "You haven't saved any answers yet. We'd love to read your thoughts on at least one!"
    }
};
