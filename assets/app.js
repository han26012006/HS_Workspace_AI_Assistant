/**
 * HS Workspace — Interactive Scripts & Bilingual Engine
 * Nhóm 8 · Học phần Dự án Trí tuệ Nhân tạo · UEH · v2.2.1
 * Features: Clean Scroll Reveal, Top Reading Progress, 6-Step Workflow SVG Progress, 3-Task Demo Image Switcher, Bilingual Switcher
 */

(function(){
  "use strict";

  var root = document.documentElement;

  // ==========================================
  // 1. SCROLL PROGRESS BAR (TOP OF PAGE)
  // ==========================================
  var progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.prepend(progressBar);
  }

  function updateScrollProgress() {
    var winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ==========================================
  // 2. THEME SWITCHER (DARK / LIGHT)
  // ==========================================
  try {
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      root.setAttribute('data-theme', savedTheme);
    }
  } catch(e){}

  var themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function(){
      var current = root.getAttribute('data-theme') || 
        (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch(e){}
    });
  }

  // ==========================================
  // 3. LANGUAGE INITIALIZATION (STANDARDIZED VIETNAMESE)
  // ==========================================
  root.setAttribute('lang', 'vi');
  try { localStorage.removeItem('hs_lang'); } catch(e){}

  // ==========================================
  // 4. MOBILE MENU TOGGLE
  // ==========================================
  var menuBtn = document.getElementById('menu-btn');
  var mainNav = document.getElementById('main-nav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function(){
      var isOpen = mainNav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', isOpen ? 'Đóng menu' : 'Mở menu');
    });
    mainNav.addEventListener('click', function(e){
      if (e.target.tagName === 'A') {
        mainNav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // 5. HEADER SCROLL SHADOW
  // ==========================================
  var header = document.querySelector('.site-header');
  if (header) {
    var checkHeaderScroll = function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', checkHeaderScroll, { passive: true });
    checkHeaderScroll();
  }

  // ==========================================
  // 6. QUY TRÌNH 6 BƯỚC CÓ ĐIỂM DỪNG AN TOÀN
  // Pin section until all 6 steps are scrolled through!
  // ==========================================
  var workflowSection = document.getElementById('workflow');
  var workflowPathFill = document.getElementById('workflow-path-fill');
  var processSteps = document.querySelectorAll('.process-step');

  if (workflowSection && processSteps.length > 0) {
    // Ensure all internal elements are revealed immediately
    workflowSection.querySelectorAll('.reveal').forEach(function(el){
      el.classList.add('revealed');
    });

    var pathTotalLen = 960;
    if (workflowPathFill && workflowPathFill.getTotalLength) {
      try { pathTotalLen = workflowPathFill.getTotalLength(); } catch(e){}
    }
    if (workflowPathFill) {
      workflowPathFill.style.strokeDasharray = pathTotalLen;
      workflowPathFill.style.strokeDashoffset = pathTotalLen;
    }

    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && window.innerWidth >= 900) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      window.ScrollTrigger.create({
        trigger: workflowSection,
        start: "top 75px",
        end: "+=1200",
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: function(self) {
          var progress = self.progress; // 0.0 to 1.0
          if (workflowPathFill) {
            workflowPathFill.style.strokeDashoffset = pathTotalLen * (1 - progress);
          }
          if (progress >= 0.98) {
            processSteps.forEach(function(step){
              step.classList.remove('step-active');
              step.classList.add('step-completed');
            });
            processSteps[processSteps.length - 1].classList.add('step-active');
            return;
          }
          var activeStepIndex = Math.min(Math.floor(progress * processSteps.length), processSteps.length - 1);
          processSteps.forEach(function(step, idx){
            if (idx === activeStepIndex) {
              step.classList.add('step-active');
              step.classList.remove('step-completed');
            } else if (idx < activeStepIndex) {
              step.classList.remove('step-active');
              step.classList.add('step-completed');
            } else {
              step.classList.remove('step-active', 'step-completed');
            }
          });
        }
      });
    } else {
      var updateWorkflowScroll = function(){
        var rect = workflowSection.getBoundingClientRect();
        var windowH = window.innerHeight;
        var startY = windowH * 0.75;
        var endY = windowH * 0.15;
        var totalDist = (rect.height + (startY - endY));
        var currentDist = (startY - rect.top);
        var progress = Math.min(Math.max(currentDist / totalDist, 0), 1);

        if (workflowPathFill) {
          workflowPathFill.style.strokeDashoffset = pathTotalLen * (1 - progress);
        }

        var activeStepIndex = Math.min(Math.floor(progress * processSteps.length), processSteps.length - 1);
        processSteps.forEach(function(step, idx){
          if (progress > 0.05 && idx <= activeStepIndex) {
            step.classList.add('step-active');
            if (idx < activeStepIndex) {
              step.classList.add('step-completed');
            } else {
              step.classList.remove('step-completed');
            }
          } else {
            step.classList.remove('step-active', 'step-completed');
          }
        });
      };

      window.addEventListener('scroll', updateWorkflowScroll, { passive: true });
      updateWorkflowScroll();
    }
  }

  // ==========================================
  // 7. KỊCH BẢN KIỂM CHỨNG TÁC VỤ (PRODUCT DEMO)
  // Pin section until all 3 tasks are scrolled through, switching images!
  // ==========================================
  var demoSection = document.getElementById('demo');
  var demoTaskCards = document.querySelectorAll('.demo-task-card');
  var demoIndicator = document.getElementById('demo-indicator');

  var taskMeta = {
    1: {
      imgId: 'demo-img-1',
      titleVi: 'Tác vụ 1: Nhập SKU & Bóc tách OCR',
      titleEn: 'Task 1: SKU Ingestion & OCR Attributes'
    },
    2: {
      imgId: 'demo-img-2',
      titleVi: 'Tác vụ 2: Tra cứu & Đối chiếu 2 mã cạnh tranh',
      titleEn: 'Task 2: Lookup & Compare 2 Competing Codes'
    },
    3: {
      imgId: 'demo-img-3',
      titleVi: 'Tác vụ 3: Phê duyệt độc lập & Khóa Snapshot',
      titleEn: 'Task 3: Independent Approval & SHA-256 Seal'
    }
  };

  function switchDemoTask(taskNum) {
    demoTaskCards.forEach(function(card){
      var t = card.getAttribute('data-task');
      if (parseInt(t, 10) === parseInt(taskNum, 10)) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    [1, 2, 3].forEach(function(num){
      var img = document.getElementById('demo-img-' + num);
      if (img) {
        if (num === parseInt(taskNum, 10)) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      }
    });

    if (demoIndicator && taskMeta[taskNum]) {
      demoIndicator.textContent = taskMeta[taskNum].titleVi;
    }
  }

  if (demoTaskCards.length > 0) {
    // Ensure all internal elements are revealed immediately
    if (demoSection) {
      demoSection.querySelectorAll('.reveal').forEach(function(el){
        el.classList.add('revealed');
      });
    }

    demoTaskCards.forEach(function(card){
      card.addEventListener('click', function(){
        var taskNum = this.getAttribute('data-task');
        if (taskNum) switchDemoTask(taskNum);
      });
      card.addEventListener('mouseenter', function(){
        var taskNum = this.getAttribute('data-task');
        if (taskNum) switchDemoTask(taskNum);
      });
    });

    if (typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined' && window.innerWidth >= 900) {
      window.gsap.registerPlugin(window.ScrollTrigger);

      window.ScrollTrigger.create({
        trigger: demoSection,
        start: "top 75px",
        end: "+=1000",
        pin: true,
        pinSpacing: true,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: function(self) {
          var p = self.progress; // 0.0 to 1.0
          var taskNum = 1;
          if (p < 0.33) {
            taskNum = 1;
          } else if (p < 0.67) {
            taskNum = 2;
          } else {
            taskNum = 3;
          }
          switchDemoTask(taskNum);
        }
      });
    } else if ('IntersectionObserver' in window) {
      var taskObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            var taskNum = entry.target.getAttribute('data-task');
            if (taskNum) {
              switchDemoTask(taskNum);
            }
          }
        });
      }, {
        threshold: 0.35,
        rootMargin: '-5% 0px -15% 0px'
      });

      demoTaskCards.forEach(function(card){
        taskObserver.observe(card);
      });
    }
  }

  // ==========================================
  // 8. CLEAN SCROLL REVEAL (NATURAL SCROLLING)
  // ==========================================
  var revealSelectors = [
    '.sec-head',
    '.card',
    '.stat-box',
    '.stat-card',
    '.process-step',
    '.timeline-card',
    '.canvas-cell',
    '.table-wrap',
    '.callout',
    '.quote-banner',
    '.bento-item'
  ];

  document.querySelectorAll(revealSelectors.join(', ')).forEach(function(el){
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
    }
  });

  // Staggered delay for sibling cards in grids
  var gridContainers = document.querySelectorAll('.card-grid-2, .card-grid-3, .card-grid-4, .process-grid, .timeline-editorial, .canvas-grid, .team-grid, .stats-strip');
  gridContainers.forEach(function(grid){
    var children = grid.children;
    for (var i = 0; i < children.length; i++) {
      var delayIdx = (i % 6) + 1;
      children[i].classList.add('stagger-' + delayIdx);
    }
  });

  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    var observer = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(function(el){
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function(el){
      el.classList.add('revealed');
    });
  }

  // ==========================================
  // 9. BACKLOG FILTER TABS
  // ==========================================
  document.querySelectorAll('.filter-bar').forEach(function(bar){
    var targetSelector = bar.getAttribute('data-target');
    if (!targetSelector) return;
    var container = document.querySelector(targetSelector);
    if (!container) return;
    var buttons = bar.querySelectorAll('.filter-btn');

    buttons.forEach(function(btn){
      btn.addEventListener('click', function(){
        buttons.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        var filterVal = btn.getAttribute('data-filter');
        var rows = container.querySelectorAll('[data-category]');
        rows.forEach(function(row){
          var cat = row.getAttribute('data-category');
          if (filterVal === 'all' || cat === filterVal || (cat && cat.indexOf(filterVal) !== -1)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  });

  // ==========================================
  // 10. PILOT REGISTRATION FORM SIMULATION
  // ==========================================
  var pilotForm = document.getElementById('pilot-form');
  var formResult = document.getElementById('pilot-form-result');
  if (pilotForm && formResult) {
    pilotForm.addEventListener('submit', function(e){
      e.preventDefault();
      var name = document.getElementById('pilot-name').value.trim();
      var org = document.getElementById('pilot-org').value.trim();
      var email = document.getElementById('pilot-email').value.trim();
      if (!name || !org || !email) {
        alert('Vui lòng điền đầy đủ họ tên, tên doanh nghiệp và email công việc.');
        return;
      }
      formResult.innerHTML = '<div class="callout mint" style="margin-top:20px;">' +
        '<strong>Đã tiếp nhận yêu cầu tham gia thử nghiệm có kiểm soát!</strong>' +
        'Cảm ơn <b>' + name + '</b> (' + org + '). Nhóm nghiên cứu HS Workspace sẽ gửi tài liệu thỏa thuận bảo mật dữ liệu (NDA) và giao thức thử nghiệm đến hòm thư <b>' + email + '</b> trong vòng 24 giờ làm việc.' +
        '</div>';
      pilotForm.reset();
    });
  }

  // ==========================================
  // 11. SCROLLTRIGGER REFRESH ON LOAD & RESIZE
  // ==========================================
  window.addEventListener('load', function(){
    if (typeof window.ScrollTrigger !== 'undefined') {
      window.ScrollTrigger.refresh();
    }
  });

})();
