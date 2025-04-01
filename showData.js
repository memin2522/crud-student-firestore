import { FirestoreService } from './modules/firestore_service.js';

const firestore = new FirestoreService("creditCard");


document.getElementById("loadDataBtn").addEventListener("click", async () => {
    const docs = await firestore.getAllDocuments();
    console.log("Obtained Docs:", docs);
});

document.getElementById("addDocBtn").addEventListener("click", async () => {
    const NameUser = document.getElementById("NameUser").value.trim();
    const NumberCard = document.getElementById("NumberCard").value.trim();
    const ExpiryDate = document.getElementById("ExpiryDate").value.trim();
    const CVV = document.getElementById("CVV").value.trim();

    if (!NameUser || !NumberCard || !ExpiryDate || !CVV) {
        alert("Fill in the required fields: Name, Number Card, Expiry Date and CVV.");
        return;
    }

    const data = {
        NameUser,
        NumberCard,
        ExpiryDate,
    };

    await firestore.PostDocument(CVV, data);
});


document.getElementById("getDocBtn").addEventListener("click", async () => {
    const docId = document.getElementById("getDocId").value.trim();

    if (!docId) {
        alert("The student id is needed");
        return;
    }
    const doc = await firestore.getDocumentById(docId);
    console.log(doc);
});
