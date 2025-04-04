import { FirestoreService } from './modules/firestore_service.js';

const firestore = new FirestoreService("creditCard");


document.getElementById("loadDataBtn").addEventListener("click", async () => {
    const docs = await firestore.getAllDocuments();
    console.log("Obtained Docs:", docs);
});

document.getElementById("addDocBtn").addEventListener("click", async () => {
    const nameUser = document.getElementById("nameUser").value.trim();
    const numberCard = document.getElementById("numberCard").value.trim();
    const expiryDate = document.getElementById("expiryDate").value.trim();
    const cVV = document.getElementById("cVV").value.trim();

    if (!nameUser || !numberCard || !expiryDate || !cVV) {
        alert("Fill in the required fields: Name, Number Card, Expiry Date and cVV.");
        return;
    }

    const data = {
        nameUser,
        numberCard,
        expiryDate,
    };

    await firestore.PostDocument(cVV, data);
});

/// change

document.getElementById("reflectData").addEventListener("click", async () => {
    const container = document.getElementById("container_data");
    const docId = document.getElementById("getDocId").value.trim();
    
    try {
        // Aquí asumo que `docId` ya está definido en otro lugar
        const doc = await firestore.getDocumentById(docId);

        // Asegurarse de que el contenedor esté visible
        container.style.display = "block";
        
        console.log(doc)
        // Llenar el contenedor con la información del documento
        container.innerHTML = `
            <h4> Expiry Date: ${doc.ExpiryDate} </h4>
            <h4> User card: ${doc.UserCard} </h4>
            <h4> Number Card: ${doc.NumberCard} </h4>
        `;
    } catch (error) {
        console.error("Error al obtener el documento:", error);
        container.innerHTML = "<h4>No se pudo obtener el documento.</h4>";
        container.style.display = "block";
        
    }
});

