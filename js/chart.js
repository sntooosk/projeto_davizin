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

let chart;

function loadClassifications() {
    const textsRef = ref(database, 'textos');
    onValue(textsRef, (snapshot) => {
        const texts = snapshot.val();
        if (texts) {
            const classificationData = {
                'Assédio': 0,
                'Cyberbullying': 0,
                'Racismo': 0,
                'Opção 4': 0,
                'Opção 5': 0
            };

            Object.keys(texts).forEach(key => {
                const text = texts[key];
                const classification = text.classification || 'Indefinido';
                if (classificationData[classification] !== undefined) {
                    classificationData[classification] += 1;
                }
            });

            renderChart(classificationData);
        }
    });
}

function renderChart(classificationData) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = Object.keys(classificationData);
    const data = Object.values(classificationData);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Quantidade',
                data: data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadClassifications);
