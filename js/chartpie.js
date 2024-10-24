import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-database.js';

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

let pieChart;

function loadStates() {
    const textsRef = ref(database, 'textos');
    onValue(textsRef, (snapshot) => {
        const texts = snapshot.val();
        if (texts) {
            const stateData = {
                'Andamento': 0,
                'Resolvido': 0
            };

            Object.keys(texts).forEach(key => {
                const text = texts[key];
                const state = text.state || 'Indefinido';
                if (stateData[state] !== undefined) {
                    stateData[state] += 1;
                }
            });

            renderPieChart(stateData);
        }
    });
}

function renderPieChart(stateData) {
    const ctx = document.getElementById('myPieChart').getContext('2d');
    const labels = Object.keys(stateData);
    const data = Object.values(stateData);

    if (pieChart) {
        pieChart.destroy();
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

document.addEventListener('DOMContentLoaded', loadStates);
