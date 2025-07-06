let listings = [];

async function loadListings() {
  const res = await fetch('listings/sample-data.json');
  listings = await res.json();
  displayListings(listings);
}

function displayListings(data) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/300'}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p><strong>Agency:</strong> ${item.agency}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <a href="${item.link}" target="_blank">View Listing</a>
    `;

    resultsDiv.appendChild(card);
  });
}

function filterListings() {
  const keyword = document.getElementById('searchBox').value.toLowerCase();
  const agency = document.getElementById('agencyFilter').value;

  const filtered = listings.filter(item => {
    const matchesKeyword = item.title.toLowerCase().includes(keyword) || item.location.toLowerCase().includes(keyword);
    const matchesAgency = agency === 'all' || item.agency.toLowerCase() === agency;
    return matchesKeyword && matchesAgency;
  });

  displayListings(filtered);
}

loadListings();
