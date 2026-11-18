const concepts = {
  name: "Pensamento Computacional",
  children: [
    { name: "Decomposição", children: [
      { name: "Dividir o problema", children: [ { name: "Etapas menores" }, { name: "Tarefas independentes" } ] },
      { name: "Organizar partes", children: [ { name: "Prioridades" }, { name: "Responsabilidades" } ] }
    ] },
    { name: "Reconhecimento de padrões", children: [
      { name: "Identificar semelhanças", children: [ { name: "Repetições" }, { name: "Comportamentos comuns" } ] },
      { name: "Usar experiências", children: [ { name: "Soluções anteriores" } ] }
    ] },
    { name: "Abstração", children: [
      { name: "Selecionar o essencial", children: [ { name: "Foco no problema" }, { name: "Ignorar detalhes irrelevantes" } ] },
      { name: "Criar representação", children: [ { name: "Modelo" }, { name: "Diagrama" } ] }
    ] },
    { name: "Algoritmos", children: [
      { name: "Sequência de passos", children: [ { name: "Instruções" }, { name: "Ordem lógica" } ] },
      { name: "Verificar resultado", children: [ { name: "Testar" }, { name: "Corrigir" } ] }
    ] }
  ]
};

const treeContainer = document.getElementById('tree');
function buildNode(item, isRoot = false) {
  const li = document.createElement('li');
  const wrap = document.createElement('div');
  wrap.className = 'node-wrap';
  const node = document.createElement('div');
  node.className = 'node' + (isRoot ? ' root' : (!item.children ? ' leaf' : ''));
  node.textContent = item.name;
  wrap.appendChild(node);

  if (item.children?.length) {
    const toggle = document.createElement('button');
    toggle.className = 'toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', `Expandir ou recolher ${item.name}`);
    toggle.textContent = '−';
    toggle.addEventListener('click', () => {
      li.classList.toggle('collapsed');
      toggle.textContent = li.classList.contains('collapsed') ? '+' : '−';
    });
    wrap.appendChild(toggle);
  }
  li.appendChild(wrap);
  if (item.children?.length) {
    const ul = document.createElement('ul');
    item.children.forEach(child => ul.appendChild(buildNode(child)));
    li.appendChild(ul);
  }
  return li;
}
function render() {
  treeContainer.innerHTML = '';
  const ul = document.createElement('ul');
  ul.appendChild(buildNode(concepts, true));
  treeContainer.appendChild(ul);
}
function setCollapsed(allCollapsed) {
  document.querySelectorAll('.tree li').forEach(li => {
    if (li.querySelector(':scope > ul')) {
      li.classList.toggle('collapsed', allCollapsed);
      const button = li.querySelector(':scope > .node-wrap .toggle');
      if (button) button.textContent = allCollapsed ? '+' : '−';
    }
  });
}
document.getElementById('expandAll').addEventListener('click', () => setCollapsed(false));
document.getElementById('collapseAll').addEventListener('click', () => setCollapsed(true));
document.getElementById('reset').addEventListener('click', render);
render();
