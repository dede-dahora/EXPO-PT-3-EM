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

    // Quiz functionality with 5 questions
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
        },
        {
            question: "Qual é o impacto do derretimento das geleiras no nível do mar?",
            options: [
                "Redução do nível do mar",
                "Elevação do nível do mar",
                "Nenhum impacto",
                "Aumento da salinidade dos rios"
            ],
            correct: 1,
            explanation: "O derretimento das geleiras contribui significativamente para a elevação do nível dos oceanos, ameaçando comunidades costeiras."
        },
        {
            question: "Qual ação ajuda a preservar as geleiras?",
            options: [
                "Reduzir a pegada de carbono",
                "Aumentar o uso de combustíveis fósseis",
                "Desmatar áreas próximas",
                "Construir barragens em rios glaciais"
            ],
            correct: 0,
            explanation: "Reduzir a pegada de carbono diminui a emissão de gases de efeito estufa, ajudando a conter o aquecimento global e a preservação das geleiras."
        }
    ];

    const questionContainer = document.getElementById('questionContainer');
    const questionEl = document.getElementById('question');
    const optionsContainer = document.getElementById('optionsContainer');
    const explanationContainer = document.getElementById('explanationContainer');
    const resultIcon = document.getElementById('resultIcon');
    const resultText = document.getElementById('resultText');
    const explanationText = document.getElementById('explanationText');
    const nextButton = document.getElementById('nextButton');
    const quizResults = document.getElementById('quizResults');
    const finalScore = document.getElementById('finalScore');
    const scoreMessage = document.getElementById('scoreMessage');
    const restartButton = document.getElementById('restartButton');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const scoreDisplay = document.getElementById('score');

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function loadQuestion() {
        answered = false;
        explanationContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        quizResults.style.display = 'none';

        const currentData = quizData[currentQuestion];
        questionEl.textContent = currentData.question;
        optionsContainer.innerHTML = '';

        currentData.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            optionDiv.textContent = option;
            optionDiv.dataset.index = index;
            optionDiv.tabIndex = 0;

            optionDiv.addEventListener('click', () => selectOption(index));
            optionDiv.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectOption(index);
                }
            });

            optionsContainer.appendChild(optionDiv);
        });

        // Atualiza barra de progresso e texto
        const progressPercent = ((currentQuestion) / quizData.length) * 100;
        progressFill.style.width = `${progressPercent}%`;
        progressText.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
        scoreDisplay.textContent = score;
    }

    function selectOption(selectedIndex) {
        if (answered) return;
        answered = true;

        const currentData = quizData[currentQuestion];
        const options = optionsContainer.querySelectorAll('.option');

        options.forEach((optionEl, index) => {
            optionEl.classList.remove('correct', 'incorrect');
            optionEl.style.pointerEvents = 'none'; // desabilita clique após resposta
            if (index === currentData.correct) {
                optionEl.classList.add('correct');
            }
            if (index === selectedIndex && selectedIndex !== currentData.correct) {
                optionEl.classList.add('incorrect');
            }
        });

        if (selectedIndex === currentData.correct) {
            score++;
            resultIcon.className = 'fas fa-check-circle correct-icon';
            resultText.textContent = 'Resposta Correta!';
        } else {
            resultIcon.className = 'fas fa-times-circle correct-icon';
            resultText.textContent = 'Resposta Incorreta!';
        }

        explanationText.textContent = currentData.explanation;
        explanationContainer.style.display = 'block';
        scoreDisplay.textContent = score;
    }

    nextButton.addEventListener('click', () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    function showResults() {
        questionContainer.style.display = 'none';
        explanationContainer.style.display = 'none';
        quizResults.style.display = 'block';

        finalScore.textContent = `Sua pontuação: ${score} / ${quizData.length}`;

        let message = '';
        const percent = (score / quizData.length) * 100;
        if (percent === 100) {
            message = 'Parabéns! Você é um expert em preservação da água doce!';
        } else if (percent >= 60) {
            message = 'Muito bom! Continue aprendendo e ajudando a preservar.';
        } else {
            message = 'Continue estudando para melhorar seu conhecimento.';
        }
        scoreMessage.textContent = message;

        // Atualiza barra de progresso para 100%
        progressFill.style.width = '100%';
        progressText.textContent = `Quiz concluído`;
        scoreDisplay.textContent = score;
    }

    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        loadQuestion();
    });

    loadQuestion();

    // Função para o botão "Confirmar Presença"
    const confirmBtn = document.getElementById('confirmPresence');
    const confirmationBox = document.getElementById('confirmation-box');

    confirmBtn.addEventListener('click', () => {
        // Mostrar caixa de confirmação
        confirmationBox.classList.add('show');

        // Abrir link do formulário em nova aba
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSfRpvdOBxF-MW9BYIsaELgPjOp6fcZlYzwVJyGC00Wpbz7kMg/viewform?usp=dialog', '_blank');

        // Esconder após 3 segundos
        setTimeout(() => {
            confirmationBox.classList.remove('show');
        }, 3000);
    });

    // Neve animada no fundo
    const snowCanvas = document.getElementById('snow');
    if (snowCanvas) {
        const ctx = snowCanvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        snowCanvas.width = width;
        snowCanvas.height = height;

        function resizeSnowCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            snowCanvas.width = width;
            snowCanvas.height = height;
        }
        window.addEventListener('resize', resizeSnowCanvas);

        // Configuração dos flocos
        const snowflakes = [];
        const snowflakeCount = Math.floor(width / 10) + 40;

        function randomBetween(a, b) {
            return Math.random() * (b - a) + a;
        }

        for (let i = 0; i < snowflakeCount; i++) {
            snowflakes.push({
                x: randomBetween(0, width),
                y: randomBetween(0, height),
                r: randomBetween(1.5, 4.5),
                d: randomBetween(0.5, 1.5),
                speed: randomBetween(0.5, 2.5),
                angle: randomBetween(0, Math.PI * 2)
            });
        }

        function drawSnowflakes() {
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = '#fff';
            snowflakes.forEach(flake => {
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();
        }

        function updateSnowflakes() {
            snowflakes.forEach(flake => {
                flake.y += flake.speed * flake.d;
                flake.x += Math.sin(flake.angle) * 0.7;
                flake.angle += 0.01 * flake.d;
                if (flake.y > height + flake.r) {
                    flake.y = -flake.r;
                    flake.x = randomBetween(0, width);
                }
                if (flake.x > width + flake.r) {
                    flake.x = -flake.r;
                } else if (flake.x < -flake.r) {
                    flake.x = width + flake.r;
                }
            });
        }

        function animateSnow() {
            updateSnowflakes();
            drawSnowflakes();
            requestAnimationFrame(animateSnow);
        }
        animateSnow();
    }
});