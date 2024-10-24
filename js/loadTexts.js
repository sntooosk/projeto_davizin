import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getDatabase, ref, onValue, remove, set } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyBrRuiOk8rjxO6jH91v--LPuwwyIrZPiH8",
    authDomain: "bdreporttec.firebaseapp.com",
    databaseURL: "https://bdreporttec-default-rtdb.firebaseio.com",
    projectId: "bdreporttec",
    storageBucket: "bdreporttec.appspot.com",
    messagingSenderId: "153475202057",
    appId: "1:153475202057:web:2fa40b7f784e765b940cd8",
    measurementId: "G-LX51TDQBJM"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function deleteText(textId) {
    const textRef = ref(database, `textos/${textId}`);
    remove(textRef)
        .then(() => {
            loadTexts();
        })
        .catch((error) => {
            console.error('Erro ao excluir texto:', error);
        });
}

function saveAnnotation(textId) {
    const annotationText = document.getElementById(`textanotacao-${textId}`).value;
    const annotationRef = ref(database, `textos/${textId}/annotation`);
    
    set(annotationRef, annotationText)
        .then(() => {
            loadTexts();
        })
        .catch((error) => {
            console.error('Erro ao salvar anotação:', error);
        });
}

function saveClassification(textId, classification) {
    const classificationRef = ref(database, `textos/${textId}/classification`);
    set(classificationRef, classification)
        .catch((error) => {
            console.error('Erro ao salvar classificação:', error);
        });
}

function saveState(textId, state) {
    const stateRef = ref(database, `textos/${textId}/state`);
    set(stateRef, state)
        .catch((error) => {
            console.error('Erro ao salvar estado:', error);
        });
}

function loadTexts(startDate, endDate) {
    const textsRef = ref(database, 'textos');
    onValue(textsRef, (snapshot) => {
        const texts = snapshot.val();
        const textsContainer = document.getElementById('textsContainer');
        textsContainer.innerHTML = '';

        if (texts) {
            const keys = Object.keys(texts).reverse();
            keys.forEach(key => {
                const text = texts[key];

                const utcDate = new Date(text.timestamp);
                const brasiliaOffset = 0 * 60 * 60 * 1000;
                const brasiliaDate = new Date(utcDate.getTime() + brasiliaOffset);
                const formattedDate = brasiliaDate.toLocaleDateString('pt-BR');

                if (startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    if (brasiliaDate < start || brasiliaDate > end) {
                        return;
                    }
                }

                const textWrapper = document.createElement('div');
                textWrapper.classList.add('text-wrapper');
                textWrapper.innerHTML = `
                <div id="textsContainer">
                    <div class="box">
                        <div class="box-content">
                            <div class="text-item">
                                <h1>${formattedDate}</h1>
                                <p>
                                    ${text.texto}
                                </p>
                            </div>
                            <div class="comentario">
                                <textarea id="textanotacao-${key}" placeholder="Digite algo...">${text.annotation || ''}</textarea>
                                <div class="actions">
                                    <select id="classificacao-${key}" name="options" size="1">
                                        <option value="Assédio" ${text.classification === 'Assédio' ? 'selected' : ''}>Assédio</option>
                                        <option value="Cyberbullying" ${text.classification === 'Cyberbullying' ? 'selected' : ''}>Cyberbullying</option>
                                        <option value="Racismo" ${text.classification === 'Racismo' ? 'selected' : ''}>Racismo</option>
                                        <option value="Opção 4" ${text.classification === 'Opção 4' ? 'selected' : ''}>Opção 4</option>
                                        <option value="Opção 5" ${text.classification === 'Opção 5' ? 'selected' : ''}>Opção 5</option>
                                    </select>
                                    <select id="estado-${key}" name="options" size="1">
                                        <option value="Andamento" ${text.state === 'Andamento' ? 'selected' : ''}>Andamento</option>
                                        <option value="Resolvido" ${text.state === 'Resolvido' ? 'selected' : ''}>Resolvido</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="buttons">
                            <button class="btn-delete" data-id="${key}">Excluir</button>
                            <button class="btn-save" data-id="${key}">Salvar</button>
                        </div>
                    </div>
                </div> 
                `
                textsContainer.appendChild(textWrapper);
            });

            addActionListeners();
        } else {
            textsContainer.innerHTML = '<p>Nenhum texto encontrado.</p>';
        }
    });
}

document.getElementById('filterButton').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    loadTexts(startDate, endDate);
});

document.addEventListener('DOMContentLoaded', () => {
    loadTexts();
});
