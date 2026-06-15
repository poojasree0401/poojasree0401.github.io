/* Projects Page Script */

// scroll-top
window.addEventListener('scroll', function() {
  const btn = document.getElementById('scroll-top');
  if (btn) btn.classList.toggle('active', window.scrollY > 300);
});

// reveal
(function() {
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
})();

// filter
let allProjects = [];
const catMap = { ai: '&#129504; AI System', automation: '&#9889; Automation', ml: '&#128202; ML / Deep Learning', android: '&#128241; Mobile App' };
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
  'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
  'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)',
  'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
];

function renderProjects(projects) {
  const container = document.getElementById('projectsContainer');
  if (!container) return;
  container.innerHTML = projects.map(function(proj, i) {
    const cat   = catMap[proj.category] || '&#128187; Project';
    const title = proj.name.split('\u2014')[0].trim();
    const grad  = gradients[i % gradients.length];
    const live  = (proj.links && proj.links.view && proj.links.view !== '#') ? '<a href="' + proj.links.view + '" target="_blank" rel="noopener" class="proj-link">Live <i class="fas fa-external-link-alt"></i></a>' : '';
    const code  = (proj.links && proj.links.code && proj.links.code !== '#') ? '<a href="' + proj.links.code + '" target="_blank" rel="noopener" class="proj-link">Code <i class="fab fa-github"></i></a>' : '';
    const wip   = (!live && !code) ? '<span class="proj-wip">In Development</span>' : '';
    return '<div class="proj-card reveal" data-cat="' + proj.category + '">' +
      '<div class="proj-header" style="background:' + grad + '">' +
        '<span class="proj-cat">' + cat + '</span>' +
        '<h3>' + title + '</h3>' +
      '</div>' +
      '<div class="proj-body"><p>' + proj.desc + '</p></div>' +
      '<div class="proj-footer">' + live + code + wip + '</div>' +
    '</div>';
  }).join('') || '<p style="color:var(--text2);padding:3rem;text-align:center;grid-column:1/-1;">No projects found.</p>';

  // re-observe for reveal
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  container.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}

// filter buttons
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    this.classList.add('active');
    const filter = this.dataset.filter;
    const filtered = filter === 'all' ? allProjects : allProjects.filter(function(p) { return p.category === filter; });
    renderProjects(filtered);
  });
});

// load
fetch('./projects.json')
  .then(function(r) { return r.json(); })
  .then(function(data) { allProjects = data; renderProjects(data); })
  .catch(function() {});

document.addEventListener('visibilitychange', function() {
  document.title = document.visibilityState === 'visible' ? 'Projects - PoojaSree Abbavathini' : 'Come Back!';
});
