document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#mobile-nav');
  if (toggle && nav) {
    const close = () => { nav.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      nav.hidden = expanded;
      toggle.setAttribute('aria-expanded', String(!expanded));
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { close(); toggle.focus(); } });
    nav.addEventListener('click', e => { if (e.target.closest('a')) close(); });
  }
  document.querySelectorAll('[data-drink]').forEach(card => {
    card.querySelectorAll('.variant').forEach(button => {
      button.addEventListener('click', () => {
        card.querySelectorAll('.variant').forEach(other => { other.classList.remove('selected'); other.setAttribute('aria-pressed', 'false'); });
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
        card.querySelector('[data-price]').textContent = button.dataset.price;
      });
    });
  });
  const search = document.querySelector('#drink-search');
  if (!search) return;
  let category = 'all';
  const tabs = [...document.querySelectorAll('.category-tab')];
  const cards = [...document.querySelectorAll('[data-drink]')];
  const clear = document.querySelector('#clear-search');
  const normalize = text => text.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[’'`]/g, '');
  const filter = () => {
    const query = normalize(search.value.trim());
    let visible = 0;
    cards.forEach(card => {
      card.hidden = !(category === 'all' || card.dataset.category === category) || !normalize(card.dataset.search).includes(query);
      if (!card.hidden) visible++;
    });
    document.querySelectorAll('[data-section]').forEach(section => { section.hidden = ![...section.querySelectorAll('[data-drink]')].some(card => !card.hidden); });
    document.querySelector('#menu-empty').hidden = visible !== 0;
    clear.hidden = search.value.length === 0;
  };
  tabs.forEach(tab => tab.addEventListener('click', () => {
    category = tab.dataset.category;
    tabs.forEach(item => { item.classList.toggle('active', item === tab); item.setAttribute('aria-pressed', String(item === tab)); });
    filter();
  }));
  search.addEventListener('input', filter);
  clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
  document.querySelector('#reset-filters').addEventListener('click', () => { search.value = ''; tabs[0].click(); search.focus(); });
});
