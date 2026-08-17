const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.primary-nav');

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const stages = {
  engage: {
    number: 'STAGE 01',
    title: 'Make the first interaction easier to complete.',
    description: 'Give parents and staff a guided path from application through identity, participant and location information. Capture usable data early and preserve context for the work that follows.',
    list: ['Digital application and assisted intake', 'Identity, address and employment data', 'Participant communication preferences'],
    phoneLabel: 'APPLICATION', phoneTitle: 'Tell us about your family', progress: '38%',
    cards: [['Digital intake', 'Guided application'], ['Participant record', 'One connected view'], ['Locate services', 'Data match workflow']]
  },
  establish: {
    number: 'STAGE 02',
    title: 'Turn verified information into an actionable order.',
    description: 'Coordinate parentage, guidelines, evidence, notices and legal activity within a traceable case plan. Guided work helps staff see what is complete and what must happen next.',
    list: ['Parentage and genetic testing workflow', 'Guideline calculation and review', 'Hearing, document and order milestones'],
    phoneLabel: 'ORDER ESTABLISHMENT', phoneTitle: 'Review required information', progress: '62%',
    cards: [['Parentage', 'Milestone tracking'], ['Guidelines', 'Policy-based calculation'], ['Legal activity', 'Documents and hearings']]
  },
  enforce: {
    number: 'STAGE 03',
    title: 'Match the response to the case conditions.',
    description: 'Use payment history, employment data, policy criteria and participant circumstances to guide enforcement work. Staff retain the context and review needed for accountable decisions.',
    list: ['Configurable remedy criteria', 'Employer and financial data cues', 'Action, notice and outcome history'],
    phoneLabel: 'CASE STATUS', phoneTitle: 'Your next case action', progress: '74%',
    cards: [['Compliance', 'Case condition review'], ['Remedies', 'Rules and approvals'], ['Follow-through', 'Outcome tracking']]
  },
  pay: {
    number: 'STAGE 04',
    title: 'Make financial activity easier to follow and resolve.',
    description: 'Connect receipts, allocation, distribution and disbursement to the case. Exception workspaces surface missing information and preserve the reason for adjustments.',
    list: ['Collection and distribution history', 'Unidentified payment workflow', 'Adjustment and disbursement controls'],
    phoneLabel: 'PAYMENT ACTIVITY', phoneTitle: 'Latest support activity', progress: '84%',
    cards: [['Receipts', 'Source and status'], ['Distribution', 'Case-linked allocation'], ['Exceptions', 'Guided resolution']]
  },
  improve: {
    number: 'STAGE 05',
    title: 'Use operational evidence to improve the program.',
    description: 'Combine federal measures with cycle time, queue health, digital use and data-quality indicators. Drill from trends into the processes and case cohorts behind them.',
    list: ['Order and collection measures', 'Workload and exception aging', 'Process, service and data-quality trends'],
    phoneLabel: 'PROGRAM INSIGHT', phoneTitle: 'Measure and improve', progress: '91%',
    cards: [['Measures', 'Program performance'], ['Operations', 'Queues and cycle time'], ['Improvement', 'Cohorts and drivers']]
  }
};

document.querySelectorAll('.life-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.life-tab').forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const data = stages[tab.dataset.stage];
    if (!data) return;
    document.querySelector('#stage-number').textContent = data.number;
    document.querySelector('#stage-title').textContent = data.title;
    document.querySelector('#stage-description').textContent = data.description;
    document.querySelector('#stage-list').innerHTML = data.list.map((item) => `<li>${item}</li>`).join('');
    document.querySelector('#phone-label').textContent = data.phoneLabel;
    document.querySelector('#phone-title').textContent = data.phoneTitle;
    document.querySelector('#phone-progress').style.width = data.progress;
    document.querySelector('#capability-stack').innerHTML = data.cards.map((card, index) => `<div><i>${index + 1}</i><span><strong>${card[0]}</strong><small>${card[1]}</small></span></div>`).join('');
    const panel = document.querySelector('#stage-panel');
    panel.classList.remove('panel-refresh');
    void panel.offsetWidth;
    panel.classList.add('panel-refresh');
  });
});

document.querySelectorAll('.measure').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.measure').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    document.querySelector('#metric-value').textContent = button.dataset.value;
    document.querySelector('#metric-unit').textContent = button.dataset.unit;
    document.querySelector('#metric-label').textContent = button.dataset.label;
    document.querySelector('#metric-note').textContent = button.dataset.note.toUpperCase();
    document.querySelector('#metric-bar').style.width = `${Math.min(parseFloat(button.dataset.value), 100)}%`;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
