document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('open');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('open')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });
    
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    function checkScroll() {
        const sections = document.querySelectorAll('section');
        const listItems = document.querySelectorAll('.problem-list li');
        const cards = document.querySelectorAll('.impact-card');
        const galleryItems = document.querySelectorAll('.project-gallery-item');
        const solutionItems = document.querySelectorAll('.solution-item');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
        
        listItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.85) {
                item.classList.add('visible');
            }
        });
        
        cards.forEach((card) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (cardTop < windowHeight * 0.85) {
                card.classList.add('visible');
            }
        });
        
        galleryItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.85) {
                item.classList.add('visible');
            }
        });
        
        solutionItems.forEach((item) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (itemTop < windowHeight * 0.85) {
                item.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Initialize animations on page load
    setTimeout(checkScroll, 100);

    // Quiz functionality
    const quizData = [
        {
            question: "Qual percentual da água do planeta é doce e acessível para consumo humano?",
            options: ["2,5%", "10%", "25%", "Menos de 1%"],
            correct: 3,
            explanation: "Apenas 2,5% da água do planeta é doce, mas menos de 1% está acessível para consumo humano, pois a maior parte está congelada em geleiras ou em aquíferos profundos."
        },
        {
            question: "Qual é a principal causa do recuo das geleiras no mundo?",
            options: [
                "Poluição dos oceanos",
                "Aquecimento global",
                "Exploração mineral",
                "Turismo excessivo"
            ],
            correct: 1,
            explanation: "O aquecimento global, causado principalmente pela emissão de gases de efeito estufa, é a principal responsável pelo derretimento acelerado das geleiras em todo o mundo."
        },
        {
            question: "Quantas pessoas vivem em países com estresse hídrico elevado?",
            options: [
                "Mais de 2 bilhões",
                "Menos de 500 milhões",
                "Cerca de 1 bilhão",
                "Apenas alguns milhões"
            ],
            correct: 0,
            explanation: "Mais de 2 bilhões de pessoas vivem em países com estresse hídrico elevado, enfrentando dificuldades para acessar água potável suficiente."
        }
    ];

    const quizContainer = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
    const submitButton = document.getElementById('submitQuiz');

    function loadQuiz() {
        quizData.forEach((item, index) => {
            const div = document.createElement('div');
            div.classList.add('quiz-item');
            div.innerHTML = `
                <p>${item.question}</p>
                <ul>
                    ${item.options.map((option, i) => `
                        <li>
                            <label>
                                <input type="radio" name="question${index}" value="${i}">
                                ${option}
                            </label>
                        </li>
                    `).join('')}
                </ul>
                <p class="explanation" style="display:none;">${item.explanation}</p>
            `;
            quizContainer.appendChild(div);
        });
    }

    function showResults() {
        let score = 0;
        const total = quizData.length;
        quizData.forEach((item, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) === item.correct) {
                score++;
            }
        });
        resultContainer.innerHTML = `Você acertou ${score} de ${total} perguntas.`;
        resultContainer.style.display = 'block';
        const explanations = document.querySelectorAll('.explanation');
        explanations.forEach((explanation, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value) !== quizData[index].correct) {
                explanation.style.display = 'block';
            } else {
                explanation.style.display = 'none';
            }
        });
    }

    loadQuiz();

    submitButton.addEventListener('click', showResults);
});
