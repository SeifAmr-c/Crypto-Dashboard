const tableBody = document.querySelector("#Crypto-table tbody");
const searchInput = document.getElementById("search");

let allCoins = []; 

async function fetchCryptoData() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    );
    const data = await res.json();
    allCoins = data; 
    renderTable(data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
  }
}

function renderTable(coins) {
  tableBody.innerHTML = "";

  if (coins.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5">No results found.</td></tr>`;
    return;
  }

  coins.forEach((coin) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${coin.image}" alt="${coin.name}" width="30" /></td>
      <td>${coin.name} (${coin.symbol.toUpperCase()})</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td style="color: ${
        coin.price_change_percentage_24h >= 0 ? "green" : "red"
      }">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>$${coin.market_cap.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = allCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(keyword) ||
      coin.symbol.toLowerCase().includes(keyword)
  );
  renderTable(filtered);
});

fetchCryptoData();
setInterval(fetchCryptoData, 60000);
