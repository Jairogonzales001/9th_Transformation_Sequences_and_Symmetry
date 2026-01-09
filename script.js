// Transformation Sequences and Symmetry
// Compositions of Transformations and Mapping Figures
// Standard: MA.912.GR.2.3

// State management
let currentPhase = 1;
let exercisesCompleted = 0;
let independentScore = 0;
let independentAnswered = 0;
const totalIndependent = 20;

// Correct answers for independent practice
// Answer key:
// 1: 'no' - Two translations don't depend on order
// 2: 'yes' - Rotation then reflection depends on order
// 3: '4' - Square has 4 lines of symmetry
// 4: '90' - Square maps onto itself every 90°
// 5: 'congruent' - Reflection + Translation = congruent
// 6: 'tr' - Glide reflection = Translation + Reflection
// 7: '60' - Regular hexagon: 360°/6 = 60°
// 8: 'similar' - Dilation + rotation = similar
// 9: 'rotation' - Two reflections over intersecting lines = rotation
// 10: '8' - Regular octagon has 8 lines of symmetry
// Challenge Questions (11-20):
// 11: 'translation' - Two reflections over parallel lines = translation
// 12: '3' - Equilateral triangle has order 3 rotational symmetry (120°, 240°, 360°)
// 13: 'original' - 180° + 180° = 360° = back to original
// 14: 'circle' - Circle has infinite lines of symmetry
// 15: 'original' - Reflecting twice over same line = identity
// 16: 'congruent' - Any composition of rigid transformations = congruent
// 17: 'H' - H has both vertical/horizontal line symmetry AND 180° rotational symmetry
// 18: '90' - Two reflections = rotation of 2× the angle between lines (2×45°=90°)
// 19: '12' - Regular n-gon has n lines of symmetry
// 20: 'reflection' - The translations cancel out, leaving just the reflection
const independentAnswers = {
    1: 'no',
    2: 'yes',
    3: '4',
    4: '90',
    5: 'congruent',
    6: 'tr',
    7: '60',
    8: 'similar',
    9: 'rotation',
    10: '8',
    11: 'translation',
    12: '3',
    13: 'original',
    14: 'circle',
    15: 'original',
    16: 'congruent',
    17: 'H',
    18: '90',
    19: '12',
    20: 'reflection'
};

// Problem descriptions for print results
const problemDescriptions = {
    1: "Two translations - does order matter?",
    2: "Rotation then reflection - does order matter?",
    3: "Lines of symmetry in a square?",
    4: "Smallest rotation for square symmetry?",
    5: "Reflection + Translation produces?",
    6: "What is a glide reflection?",
    7: "Regular hexagon's smallest rotation symmetry?",
    8: "Dilation + rotation creates?",
    9: "Two reflections over intersecting lines?",
    10: "Lines of symmetry in regular octagon?",
    11: "Two reflections over parallel lines equals?",
    12: "Equilateral triangle's rotational symmetry order?",
    13: "A figure rotated 180° twice - net result?",
    14: "Which shape has infinite lines of symmetry?",
    15: "Reflecting twice over the same line?",
    16: "Composition of 3 rigid transformations produces?",
    17: "Which letter has both line AND rotational symmetry?",
    18: "Two reflections over lines meeting at 45°?",
    19: "Polygon with 12 lines of symmetry has how many sides?",
    20: "Translate right, reflect y-axis, translate right - net result?"
};

// Answer labels for printing
const answerLabels = {
    1: { yes: 'Yes', no: 'No' },
    2: { yes: 'Yes', no: 'No' },
    3: { '2': '2', '4': '4', '8': '8' },
    4: { '45': '45°', '90': '90°', '180': '180°' },
    5: { congruent: 'Congruent', similar: 'Similar' },
    6: { tr: 'Translation + Reflection', rr: 'Rotation + Reflection' },
    7: { '30': '30°', '60': '60°', '90': '90°' },
    8: { congruent: 'Congruent', similar: 'Similar' },
    9: { translation: 'Translation', rotation: 'Rotation' },
    10: { '4': '4', '8': '8', '16': '16' },
    11: { translation: 'Translation', rotation: 'Rotation', reflection: 'Reflection' },
    12: { '2': '2', '3': '3', '6': '6' },
    13: { original: 'Back to original', '180': 'Rotated 180°' },
    14: { square: 'Square', circle: 'Circle', hexagon: 'Hexagon' },
    15: { original: 'Original position', translated: 'Translated figure' },
    16: { congruent: 'Congruent figures', similar: 'Similar figures' },
    17: { A: 'A', H: 'H', N: 'N' },
    18: { '45': '45°', '90': '90°', '180': '180°' },
    19: { '6': '6', '12': '12', '24': '24' },
    20: { reflection: 'Reflection over y-axis', translation: 'Translation 5 units right' }
};

// Track student answers for printing
let studentAnswers = {};

// Track which independent problems have been answered
let answeredProblems = {};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateProgress();
});

// Navigation functions
function nextPhase() {
    if (currentPhase < 5) {
        document.getElementById(`phase${currentPhase}`).classList.remove('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.remove('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.add('completed');

        currentPhase++;

        document.getElementById(`phase${currentPhase}`).classList.add('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.add('active');

        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Update final scores when entering phase 5
        if (currentPhase === 5) {
            updateFinalScores();
        }
    }
}

function prevPhase() {
    if (currentPhase > 1) {
        document.getElementById(`phase${currentPhase}`).classList.remove('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.remove('active');

        currentPhase--;

        document.getElementById(`phase${currentPhase}`).classList.add('active');
        document.querySelector(`.phase-dot[data-phase="${currentPhase}"]`).classList.add('active');

        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = ((currentPhase - 1) / 4) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('progressText').textContent = `${Math.round(progress)}%`;
}

// ========== Exercise 1: Order of Transformations ==========
function checkStep1Ex1(answer) {
    const result = document.getElementById('ex1-result1');
    const step1 = document.getElementById('ex1-step1');
    const step2 = document.getElementById('ex1-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'far') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = 'After translation, the point is farther from origin, so rotation moves it differently!';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex1(answer) {
    const result = document.getElementById('ex1-result2');
    const step2 = document.getElementById('ex1-step2');
    const step3 = document.getElementById('ex1-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'no') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Different orders usually give different results!';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// ========== Exercise 2: Line Symmetry ==========
function checkStep1Ex2(answer) {
    const result = document.getElementById('ex2-result1');
    const step1 = document.getElementById('ex2-step1');
    const step2 = document.getElementById('ex2-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === '3') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = 'A triangle has 3 vertices (corners)!';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex2(answer) {
    const result = document.getElementById('ex2-result2');
    const step2 = document.getElementById('ex2-step2');
    const step3 = document.getElementById('ex2-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === '3') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Each vertex connects to a line of symmetry = 3 lines!';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// ========== Exercise 3: Rotational Symmetry ==========
function checkStep1Ex3(answer) {
    const result = document.getElementById('ex3-result1');
    const step1 = document.getElementById('ex3-step1');
    const step2 = document.getElementById('ex3-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === '72') {
        result.textContent = 'Correct! 360° ÷ 5 = 72°';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = '360° ÷ 5 = 72° (not 60°)';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex3(answer) {
    const result = document.getElementById('ex3-result2');
    const step2 = document.getElementById('ex3-step2');
    const step3 = document.getElementById('ex3-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === '4') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = '4 rotations less than 360°: 72°, 144°, 216°, 288°';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// ========== Exercise 4: Composition Result ==========
function checkStep1Ex4(answer) {
    const result = document.getElementById('ex4-result1');
    const step1 = document.getElementById('ex4-step1');
    const step2 = document.getElementById('ex4-step2');

    step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'rigid') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step1.classList.add('completed');
        step1.classList.remove('active');
        step2.classList.remove('hidden');
        step2.classList.add('visible', 'active');
    } else {
        result.textContent = 'Both reflection and translation preserve size and shape!';
        result.className = 'result-badge incorrect';
        step1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

function checkStep2Ex4(answer) {
    const result = document.getElementById('ex4-result2');
    const step2 = document.getElementById('ex4-step2');
    const step3 = document.getElementById('ex4-step3');

    step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    if (answer === 'congruent') {
        result.textContent = 'Correct!';
        result.className = 'result-badge correct';
        step2.classList.add('completed');
        step2.classList.remove('active');
        step3.classList.remove('hidden');
        step3.classList.add('visible', 'active');
    } else {
        result.textContent = 'Rigid transformations always produce congruent figures!';
        result.className = 'result-badge incorrect';
        step2.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }
}

// Complete exercise and move to next
function completeExercise(exerciseNum) {
    exercisesCompleted++;

    if (exerciseNum < 4) {
        document.getElementById(`exercise${exerciseNum}`).style.display = 'none';
        document.getElementById(`exercise${exerciseNum + 1}`).style.display = 'block';
    } else {
        // All exercises completed - enable continue button
        document.getElementById('phase3Next').disabled = false;
    }
}

// ========== Independent Practice ==========
function checkIndependent(problemNum, answer) {
    // Prevent answering twice
    if (answeredProblems[problemNum]) return;
    answeredProblems[problemNum] = true;

    const result = document.getElementById(`ind${problemNum}-result`);
    const correctAnswer = independentAnswers[problemNum];

    // Disable buttons for this problem
    const problemDiv = result.closest('.independent-problem');
    problemDiv.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = true);

    studentAnswers[problemNum] = {
        answer: answerLabels[problemNum][answer],
        correct: answer === correctAnswer,
        correctAnswer: answerLabels[problemNum][correctAnswer]
    };

    if (answer === correctAnswer) {
        result.textContent = '✓';
        result.style.color = '#10b981';
        independentScore++;
    } else {
        result.innerHTML = `✗ <span class="correct-answer">Correct: ${answerLabels[problemNum][correctAnswer]}</span>`;
        result.style.color = '#ef4444';
    }

    independentAnswered++;

    // Update score display
    document.getElementById('independentScore').textContent = independentScore;

    // Check if all problems are completed
    if (independentAnswered === totalIndependent) {
        showFinalScore();
    }
}

function showFinalScore() {
    const finalScoreDiv = document.getElementById('finalScore');
    const finalScoreNumber = document.getElementById('finalScoreNumber');

    finalScoreNumber.textContent = `${independentScore}/${totalIndependent}`;
    finalScoreDiv.style.display = 'block';
    document.getElementById('phase4Next').disabled = false;
}

function updateFinalScores() {
    document.getElementById('finalIndScore').textContent = `${independentScore}/${totalIndependent}`;
    const overallScore = 4 + independentScore;
    document.getElementById('overallScore').textContent = `${overallScore}/24`;
}

// ========== Print Functions ==========
function printWorksheet() {
    document.body.classList.add('printing-worksheet');
    window.print();
    document.body.classList.remove('printing-worksheet');
}

function printResults() {
    // Populate print results
    const resultsContainer = document.getElementById('printIndependentResults');
    resultsContainer.innerHTML = '';

    for (let i = 1; i <= totalIndependent; i++) {
        const answer = studentAnswers[i];
        const div = document.createElement('div');
        div.className = `result-item ${answer && answer.correct ? 'correct' : 'incorrect'}`;

        if (answer) {
            div.innerHTML = `
                <span>${i}. ${problemDescriptions[i]}</span>
                <span>Your answer: ${answer.answer} ${answer.correct ? '✓' : '✗ (Correct: ' + answer.correctAnswer + ')'}</span>
            `;
        } else {
            div.innerHTML = `
                <span>${i}. ${problemDescriptions[i]}</span>
                <span>Not answered</span>
            `;
        }

        resultsContainer.appendChild(div);
    }

    const overallScore = 4 + independentScore;
    const percentage = Math.round((overallScore / 24) * 100);

    document.getElementById('printFinalScore').textContent = `${overallScore}/24`;
    document.getElementById('printPercentage').textContent = `${percentage}%`;

    document.body.classList.remove('printing-worksheet');
    window.print();
}

function restartLesson() {
    // Reset state
    currentPhase = 1;
    exercisesCompleted = 0;
    independentScore = 0;
    independentAnswered = 0;
    studentAnswers = {};
    answeredProblems = {};

    // Reset UI - phases
    document.querySelectorAll('.content-card').forEach(card => card.classList.remove('active'));
    document.getElementById('phase1').classList.add('active');

    // Reset phase dots
    document.querySelectorAll('.phase-dot').forEach((dot, index) => {
        dot.classList.remove('active', 'completed');
        if (index === 0) dot.classList.add('active');
    });

    // Reset exercises
    for (let i = 1; i <= 4; i++) {
        const exercise = document.getElementById(`exercise${i}`);
        exercise.style.display = i === 1 ? 'block' : 'none';

        // Reset steps
        for (let j = 1; j <= 3; j++) {
            const step = document.getElementById(`ex${i}-step${j}`);
            if (step) {
                step.classList.remove('completed', 'active');
                if (j === 1) {
                    step.classList.remove('hidden');
                    step.classList.add('visible', 'active');
                } else {
                    step.classList.add('hidden');
                    step.classList.remove('visible');
                }
                // Re-enable buttons
                step.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
            }
        }

        // Reset result badges
        const result1 = document.getElementById(`ex${i}-result1`);
        const result2 = document.getElementById(`ex${i}-result2`);
        if (result1) { result1.textContent = ''; result1.className = 'result-badge'; }
        if (result2) { result2.textContent = ''; result2.className = 'result-badge'; }
    }

    // Reset independent practice
    for (let i = 1; i <= totalIndependent; i++) {
        const result = document.getElementById(`ind${i}-result`);
        const problemDiv = result.closest('.independent-problem');

        result.textContent = '';
        problemDiv.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    }

    // Reset scores and buttons
    document.getElementById('independentScore').textContent = '0';
    document.getElementById('finalScore').style.display = 'none';
    document.getElementById('phase3Next').disabled = true;
    document.getElementById('phase4Next').disabled = true;

    // Reset progress
    updateProgress();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
