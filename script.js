document.addEventListener('DOMContentLoaded', () => {
  const servicesGrid = document.getElementById('servicesGrid');
  const reqModal = document.getElementById('reqModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalReqsList = document.getElementById('modalReqsList');
  const closeBtn = document.querySelector('.close-btn');

  // Render services
  if (window.servicesData) {
    servicesGrid.innerHTML = ''; // Clear existing
    
    window.servicesData.forEach((srv, index) => {
      const card = document.createElement('div');
      card.className = 'price-card';
      card.innerHTML = `
        <div class="card-platform-badge">${srv.platform}</div>
        <div class="price-icon"><img src="${srv.icon}" alt="أيقونة ${srv.platform}"></div>
        <h3 class="price-name">${srv.name}</h3>
        <p class="price-desc">${srv.desc}</p>
        <button class="req-btn" data-index="${index}">المتطلبات والشروط</button>
        <div class="price-box">
          <span class="price-current">${srv.price}</span>
        </div>
        <a href="https://wa.me/966564557748" class="price-btn">اطلب الآن</a>
      `;
      servicesGrid.appendChild(card);
    });
  }

  // Modal Functionality
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('req-btn')) {
      const index = e.target.getAttribute('data-index');
      const srv = window.servicesData[index];
      
      modalTitle.textContent = `متطلبات خدمة: ${srv.name}`;
      modalReqsList.innerHTML = '';
      
      if (srv.reqs && srv.reqs.length > 0) {
        srv.reqs.forEach(req => {
          const li = document.createElement('li');
          li.textContent = req;
          modalReqsList.appendChild(li);
        });
      } else {
        const li = document.createElement('li');
        li.textContent = 'لا توجد متطلبات محددة لهذه الخدمة حالياً، يُرجى التواصل لمزيد من التفاصيل.';
        modalReqsList.appendChild(li);
      }
      
      reqModal.style.display = 'flex';
      setTimeout(() => reqModal.classList.add('show'), 10);
    }
  });

  function closeModal() {
    reqModal.classList.remove('show');
    setTimeout(() => {
      reqModal.style.display = 'none';
    }, 300);
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  window.addEventListener('click', (e) => {
    if (e.target === reqModal) {
      closeModal();
    }
  });

  // Smooth Scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
