const categories = [
    {
        id: "metaforicas",
        es: "Metafóricas",
        en: "Metaphorical",
        questions: [
            { id: "q7", es: "Si nuestro matrimonio fuera un viaje, ¿a qué lugar del mundo creen que se parecería y por qué?", en: "If our marriage were a journey, what place in the world do you think it would resemble and why?" },
            { id: "q8", es: "Si el amor fuera un color, ¿cuál sería el nuestro y por qué?", en: "If love were a color, what would ours be and why?" },
            { id: "q_me3", es: "¿A qué sabe el amor?... ¿Qué sabor crees que representaría el nuestro y por qué?", en: "What does love taste like?... What flavor do you think would represent ours and why?" },
            { 
                id: "q_hijos", 
                type: "multiple",
                es: "Si tuviéramos hijos... ¿Cómo crees que serían?", 
                en: "If we had children... What do you think they would be like?",
                groups: [
                    { id: "parecido", es: "1. Se parecerán más a:", en: "1. They will look more like:", options: [ {es: "Mamá", en: "Mom"}, {es: "Papá", en: "Dad"}, {es: "Mezcla", en: "Mix"} ] },
                    { id: "ojos", es: "2. Ojos:", en: "2. Eyes:", options: [ {es: "Claros", en: "Light"}, {es: "Miel", en: "Hazel"}, {es: "Oscuros", en: "Dark"} ] },
                    { id: "piel", es: "3. Piel:", en: "3. Skin tone:", options: [ {es: "Clara", en: "Light"}, {es: "Intermedia", en: "Medium"}, {es: "Morena", en: "Dark"} ] },
                    { id: "cabello", es: "4. Cabello:", en: "4. Hair color:", options: [ {es: "Claro", en: "Light"}, {es: "Castaño", en: "Brown"}, {es: "Oscuro", en: "Dark"} ] },
                    { id: "textura", es: "5. Textura:", en: "5. Texture:", options: [ {es: "Lacio", en: "Straight"}, {es: "Ondulado", en: "Wavy"}, {es: "Rizado", en: "Curly"} ] }
                ]
            }
        ]
    },
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
        welcomeP1: "¡Qué emoción compartir este día increíble con ustedes! Sus palabras serán de los regalos más hermosos que nos llevemos.",
        welcomeP2: "A continuación encontrarán algunas preguntas súper divertidas y un par de reflexiones. ¡Tómense su tiempo! Contesten solo las que les nazca y diviértanse. Acuérdense de <b>guardar</b> cada respuesta y al final, ¡no olviden darle a enviar!",
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
        welcomeP1: "We are so thrilled to share this amazing day with you! Your words will be one of the best gifts we take home.",
        welcomeP2: "Below you'll find some super fun questions and a few reflections. Take your time! Answer only the ones you feel like and have fun. Remember to <b>save</b> each one, and when you're done, don't forget to hit send!",
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
