import { FirestoreQuery } from '../modules/firestore_query.js';


const firestore = new FirestoreQuery("creditCard");

const displayResults = (docs) => {
    const resultsEl = document.getElementById("container_data");
    if (!docs || docs.length === 0) {
        resultsEl.textContent = "No documents found.";
        return;
    }
    // Limpiar contenido anterior
    resultsEl.innerHTML = "";

    docs.forEach(doc => {
        const infoImportant = `
        <div class="card2">
        <h4> Expiry Date: ${doc.ExpiryDate} </h4>
        <h4> User card: ${doc.NameUser} </h4>
        <h4> Number Card: ${doc.NumberCard} </h4>
        </div>
        `;
        resultsEl.innerHTML += infoImportant;
    });
};

document.getElementById("OrderCVV").addEventListener("click", async () => {
    const column = document.getElementById("NameUser").value.trim();
    const comparator = document.getElementById("comparator").value.trim();
    const valueRaw = document.getElementById("value").value.trim();

    // Convert to number if it's numeric
    const value = isNaN(valueRaw) ? valueRaw : Number(valueRaw);

    const docs = await firestore.whereQuery(column, comparator, value);
    displayResults(docs);
});


