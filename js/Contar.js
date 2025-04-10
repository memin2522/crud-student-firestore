import { FirestoreQuery } from '../modules/firestore_query.js';


const firestore = new FirestoreQuery("creditCard");

const displayResults = (docs) => {
    const resultsEl = document.getElementById("container_data");
    if (!docs || docs.length === 0) {
        resultsEl.textContent = "No documents found.";
        return;
    }
    resultsEl.innerHTML = "";

    docs.forEach(doc => {
        const infoImportant = `
        <div class="card2">
        <h4> Expiry Date: ${doc.expiryDate} </h4>
        <h4> User card: ${doc.nameUser} </h4>
        <h4> Number Card: ${doc.numberCard} </h4>
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


document.getElementById("orderLimitQueryBtn").addEventListener("click", async () => {
    const column = document.getElementById("orderColumn").value.trim();
    const direction = document.getElementById("orderDir").value;
    const limitNum = parseInt(document.getElementById("limitNum").value, 10);

    const docs = await firestore.combinedQuery([], { column, direction }, limitNum);
    docs.forEach(doc => {
        for (const key in doc) {
            doc[key] = isNaN(doc[key]) ? doc[key] : Number(doc[key]);
        }
    });
    displayResults(docs);
});

document.getElementById("prefixQueryBtn").addEventListener("click", async () => {
    const column = document.getElementById("prefixColumn").value.trim();
    const prefix = document.getElementById("prefixValue").value.trim();

    const docs = await firestore.prefixSearch(column, prefix);
    displayResults(docs);
});


        // Add fields to filter
        document.getElementById("addFilterBtn").addEventListener("click", () => {
            console.log("Add field clicked")
            const container = document.getElementById("filtersContainer");
            const div = document.createElement("div");
            div.classList.add("filter");

            div.innerHTML = `
                <input type="text" placeholder="Column" class="ContainerInput filterColumn">
                <input type="text" placeholder="Comparator (==, >, <, etc)" class="ContainerInput filterComparator">
                <input type="text" placeholder="Value" class="ContainerInput filterValue">
                `;

            container.appendChild(div);
        });

        // Multi query
        document.getElementById("multiWhereQueryBtn").addEventListener("click", async () => {
            const filterDivs = document.querySelectorAll("#filtersContainer .filter");
            const filters = [];

            filterDivs.forEach(div => {
            const column = div.querySelector(".filterColumn").value.trim();
            const comparison = div.querySelector(".filterComparator").value.trim();
            const valueRaw = div.querySelector(".filterValue").value.trim();

            if (column && comparison) {
                let value;
                if (!isNaN(valueRaw) && valueRaw !== "") {
                value = Number(valueRaw);
                } else {
                value = valueRaw;
                }
                filters.push({ column, comparison, value });

                
            }

            console.log(`Filter added: ${column} ${comparison} ${value}`);
            });


            const docs = await firestore.combinedQuery(filters);
            displayResults(docs);
        });

