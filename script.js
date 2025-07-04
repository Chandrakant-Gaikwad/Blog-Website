// ===== Live Clock =====
function updateClock() {
  const now = new Date();
  const opts = { weekday:'short', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit' };
  document.getElementById('live-clock').textContent = now.toLocaleString('en-IN', opts);
}
setInterval(updateClock, 1000);
updateClock();

// ===== Simple Routing =====
function hideAllViews() {
  document.querySelectorAll('.view-container').forEach(v => v.classList.add('d-none'));
}
function navigate(to) {
  hideAllViews();
  document.getElementById('view-' + to).classList.remove('d-none');
}
window.addEventListener('hashchange', () => navigate(location.hash.substring(1) || 'home'));
navigate(location.hash.substring(1) || 'home');

// ===== Posts Data =====
const allPosts = [
    { id: 1, img: 'Tech-india.jpeg', title: 'Emerging Tech in India', desc: 'AI startups in Bengaluru and beyond.', category: 'Tech' },
    { id: 2, img: 'spiritual-india.jpeg', title: 'Spiritual Journey', desc: 'Temples & traditions in Varanasi.', category: 'Culture' },
    { id: 3, img: 'indian-cuisine.jpeg', title: 'Culinary Wonders', desc: 'Street food across India.', category: 'Culture' },
    { id: 4, img: 'monsoon-travel.jpeg', title: 'Monsoon Travel Tips', desc: 'Kerala in the rains.', category: 'Travel' },
    { id: 5, img: 'bollywood.jpeg', title: 'Behind Bollywood', desc: 'Inside the film industry.', category: 'Culture' },
    { id: 6, img: 'warli-art.jpeg', title: 'Art Heritage', desc: 'Warli painting traditions.', category: 'Art' },
    { id: 7, img: 'startup-india.jpeg', title: 'Startup Ecosystem', desc: 'How entrepreneurs thrive.', category: 'Tech' },
  // ... extend posts to 15+
];

// ===== Populate Categories =====
const categories = [...new Set(allPosts.map(p => p.category))];
const catSelect = document.getElementById('category-select');
categories.forEach(c => {
  const opt = document.createElement('option');
  opt.value = c; opt.text = c;
  catSelect.append(opt);
});

// ===== Pagination =====
let currentPage = 1, postsPerPage = 6;
function filterPosts() {
  let filtered = allPosts;
  const key = document.getElementById('search-input').value.toLowerCase();
  if (key) filtered = filtered.filter(p => p.title.toLowerCase().includes(key) || p.desc.toLowerCase().includes(key));
  const cat = document.getElementById('category-select').value;
  if (cat) filtered = filtered.filter(p => p.category === cat);
  return filtered;
}
function renderPage() {
  const grid = document.getElementById('posts-grid');
  grid.innerHTML = '';
  const data = filterPosts();
  const start = (currentPage - 1) * postsPerPage;
  const subset = data.slice(start, start + postsPerPage);

  subset.forEach(post => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card">
        <img src="${post.img}" class="card-img-top" alt="${post.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.desc}</p>
          <a href="#" class="btn btn-primary mt-auto">Read More</a>
        </div>
      </div>`;
    grid.append(col);
  });

  // Pagination button state
  document.getElementById('btn-prev').disabled = currentPage === 1;
  document.getElementById('btn-next').disabled = start + postsPerPage >= filterPosts().length;
}

// ===== Event Listeners =====
document.getElementById('search-input').addEventListener('input', () => { currentPage = 1; renderPage(); });
document.getElementById('category-select').addEventListener('change', () => { currentPage = 1; renderPage(); });
document.getElementById('btn-prev').addEventListener('click', () => { currentPage--; renderPage(); });
document.getElementById('btn-next').addEventListener('click', () => { currentPage++; renderPage(); });

// ===== Initial Render =====
renderPage();
