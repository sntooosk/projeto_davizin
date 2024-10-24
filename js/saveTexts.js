import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getDatabase, ref, set, onValue } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

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

function sanitizePath(path) {
    return path.replace(/[.#$[\]]/g, '_');
}

function saveText() {
    const textInput = document.getElementById('textInput').value;

    if (textInput.length > 500) {
        alert('O texto não pode exceder 500 caracteres.');
        return;
    }

    const timestamp = new Date().toISOString();
    const sanitizedTimestamp = sanitizePath(timestamp);
    const newTextRef = ref(database, 'textos/' + sanitizedTimestamp);
    set(newTextRef, {
        texto: textInput,
        timestamp: timestamp
    }).then(() => {
        alert('Texto salvo com sucesso!');
        document.getElementById('textInput').value = '';
        loadTexts();
    }).catch((error) => {
        alert('Erro ao salvar texto: ' + error.message);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnsalvar').addEventListener('click', saveText);
});
