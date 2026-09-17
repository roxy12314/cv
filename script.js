document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const triggerButtons = Array.from(document.querySelectorAll('[data-target]'));
  const modal = document.querySelector('.work-modal');
  const projects = {
    pilgrimage: ['SHORT FILM / 短片', 'Pilgrimage 朝圣', '8:52 · August 2025 · Director, Writer', '一对靠直播相识的情侣，为了流量前往川西进行一场“假徒步”。争执与意外让这场表演变成真实的跋涉，也让主人公在荒原上重新寻找自己。', 'https://youtu.be/RTl8vMJb4sA'],
    bamboo: ['AIGC MUSIC VIDEO / AIGC 音乐视频', 'Story of Bamboo 竹编情', '2:28 · October 2024 · Planner, Music maker', '以动画与音乐介绍传统竹编的历史演变，并展示竹文化如何进入当代日常生活。作品获全国大学生数字媒体科技作品及创意竞赛三等奖。'],
    resonance: ['DOCUMENTARY / 纪录片', 'Timeless Resonance 古韵新声', '9:33 · September 2023 · Planner, Director of photography', '跟随一位古琴传承人的日常，记录他的教学与演奏，尝试让古老乐器的声音和人的生活彼此照见。'],
    hunan: ['VARIETY SHOW / 综艺实践', '去湘当有味的地方2', '12 episodes · August 2024 · Planner, Executive director', '在湖南卫视导演组实习，参与节目策划与现场协作。节目走访洞庭湖、长株潭、雪峰山、大湘西与大湘南，探索地方美食与文化景观。'],
    smg: ['NEW MEDIA / 新媒体运营', 'SMG（Shanghai Media Group）融媒体中心运营', 'Shanghai Media Group · Operation Intern', '负责综艺宣传与新媒体内容制作，累计完成 30 余条宣传视频，其中 5 条以上播放量超过 100 万。']
  };

  const setActiveSlide = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    slides.forEach((slide) => slide.classList.toggle('active', slide.id === id));
    dots.forEach((dot) => dot.classList.toggle('active', dot.dataset.target === id));
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    slides.forEach((slide) => slide.classList.toggle('active', slide.id === visible.target.id));
    dots.forEach((dot) => dot.classList.toggle('active', dot.dataset.target === visible.target.id));
  }, { threshold: [0.35, 0.6, 0.85] });

  slides.forEach((slide) => observer.observe(slide));
  triggerButtons.forEach((button) => button.addEventListener('click', (event) => {
    if (button.dataset.target) {
      event.preventDefault();
      setActiveSlide(button.dataset.target);
    }
  }));

  document.querySelectorAll('.filter-btn').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.work-card').forEach((card) => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
  }));

  const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
  document.querySelectorAll('[data-open-work]').forEach((button) => button.addEventListener('click', () => {
    const project = projects[button.dataset.openWork];
    if (!project) return;
    document.querySelector('#modal-kicker').textContent = project[0];
    document.querySelector('#modal-title').textContent = project[1];
    document.querySelector('#modal-meta').textContent = project[2];
    document.querySelector('#modal-copy').textContent = project[3];
    const link = document.querySelector('#modal-link');
    link.hidden = !project[4];
    if (project[4]) link.href = project[4];
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
  }));
  document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

  document.querySelectorAll('.story-card, .resume-item, .timeline-item').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(18px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 180 + index * 90);
  });
});
