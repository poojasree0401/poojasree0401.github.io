/* ================================================
   POOJASREE PORTFOLIO — Main JavaScript 2026
   ================================================ */

// ===== CURSOR GLOW =====
(function() {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;
  document.addEventListener('mousemove', function(e) {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
})();

// ===== NAVBAR =====
(function() {
  const nav     = document.getElementById('topnav');
  const menu    = document.getElementById('navMenu');
  const scrollTopBtn = document.getElementById('scroll-top');

  // hamburger toggle
  if (menu && nav) {
    menu.addEventListener('click', function() {
      nav.classList.toggle('open');
    });
  }

  // close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (nav) nav.classList.remove('open');
    });
  });

  window.addEventListener('scroll', function() {
    // scrolled class for navbar
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    }

    // scroll-top button
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('active', window.scrollY > 400);
    }

    // nav link active highlight (scroll spy)
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 120;
    sections.forEach(function(sec) {
      const top    = sec.offsetTop;
      const height = sec.offsetHeight;
      const id     = sec.getAttribute('id');
      const link   = document.querySelector('.nav-links a[href="#' + id + '"]');
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          document.querySelectorAll('.nav-links a').forEach(function(a) { a.classList.remove('active'); });
          link.classList.add('active');
        }
      }
    });
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ===== SCROLL REVEAL =====
(function() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function(el) { obs.observe(el); });
})();

// ===== TYPED.JS =====
(function() {
  if (typeof Typed === 'undefined') return;
  new Typed('.typing-text', {
    strings: ['agentic AI systems', 'RAG pipelines', 'Python automation', 'LangChain applications', 'generative AI solutions'],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 1200,
  });
})();

// ===== DATA FETCH =====
async function fetchData(type) {
  const url  = type === 'projects' ? './projects/projects.json' : './skills.json';
  const resp = await fetch(url);
  return resp.json();
}

// ===== SKILLS MARQUEE =====
function showSkills(skills) {
  const row1 = document.getElementById('skillsRow1');
  const row2 = document.getElementById('skillsRow2');
  if (!row1 || !row2) return;

  const half  = Math.ceil(skills.length / 2);
  const set1  = skills.slice(0, half);
  const set2  = skills.slice(half);

  function makePill(name) {
    return '<span class="skill-pill"><span class="skill-dot"></span>' + name + '</span>';
  }

  // duplicate for seamless infinite scroll
  row1.innerHTML = [...set1, ...set1].map(function(s) { return makePill(s.name); }).join('');
  row2.innerHTML = [...set2, ...set2].map(function(s) { return makePill(s.name); }).join('');
}

// ===== PROJECTS GRID =====
function showProjects(projects) {
  const container = document.getElementById('workContainer');
  if (!container) return;

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
    'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)',
    'linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)',
    'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  ];

  const catMap = {
    ai:         '&#129504; AI System',
    automation: '&#9889; Automation',
    ml:         '&#128202; ML / Deep Learning',
    android:    '&#128241; Mobile App',
  };

  const html = projects.slice(0, 6).map(function(proj, i) {
    const cat   = catMap[proj.category] || '&#128187; Project';
    const title = proj.name.split('—')[0].trim();
    const grad  = gradients[i % gradients.length];

    const liveLink = (proj.links && proj.links.view && proj.links.view !== '#')
      ? '<a href="' + proj.links.view + '" target="_blank" rel="noopener" class="proj-link">Live <i class="fas fa-external-link-alt"></i></a>'
      : '';
    const codeLink = (proj.links && proj.links.code && proj.links.code !== '#')
      ? '<a href="' + proj.links.code + '" target="_blank" rel="noopener" class="proj-link">Code <i class="fab fa-github"></i></a>'
      : '';
    const wipTag = (!liveLink && !codeLink)
      ? '<span class="proj-wip">In Development</span>'
      : '';

    return '<div class="proj-card reveal">' +
      '<div class="proj-header" style="background:' + grad + '">' +
        '<span class="proj-cat">' + cat + '</span>' +
        '<h3>' + title + '</h3>' +
      '</div>' +
      '<div class="proj-body"><p>' + proj.desc + '</p></div>' +
      '<div class="proj-footer">' + liveLink + codeLink + wipTag + '</div>' +
    '</div>';
  }).join('');

  container.innerHTML = html || '<p style="color:var(--text2);text-align:center;padding:3rem;">No projects yet.</p>';

  // re-run reveal observer for newly added cards
  const newCards = container.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  newCards.forEach(function(el) { obs.observe(el); });
}

// ===== INIT =====
fetchData('skills').then(showSkills).catch(function() {});
fetchData('projects').then(showProjects).catch(function() {});

// ===== TAB VISIBILITY =====
document.addEventListener('visibilitychange', function() {
  document.title = document.visibilityState === 'visible'
    ? 'PoojaSree Abbavathini — AI Engineer'
    : 'Come Back 👋';
});

// ===== DISABLE DEVTOOLS SHORTCUTS =====
document.addEventListener('keydown', function(e) {
  if (e.keyCode === 123) return false;
  if (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) return false;
  if (e.ctrlKey && e.keyCode === 85) return false;
});
