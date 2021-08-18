const dragNdrop = (container, myTodoList, printTodoList) => {
  const items = container.querySelectorAll('li');
  let replaceItem = null;
  items.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      item.opacity = '0.4';
      replaceItem = item;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', item.innerHTML);
    });

    item.addEventListener('dragover', (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
      return false;
    });

    item.addEventListener('dragenter', () => {
      if (replaceItem !== item) {
        item.classList.remove('p-3');
        item.style.paddingTop = '80px';
        item.style.backgroundImage = 'linear-gradient(rgb(76, 89, 151), white, white)';
      }
    });

    item.addEventListener('dragleave', () => {
      item.classList.add('p-3');
      item.style.backgroundImage = 'linear-gradient(white, white)';
    });

    item.addEventListener('drop', (e) => {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (replaceItem !== item) {
        replaceItem.innerHTML = item.innerHTML;
        item.innerHTML = e.dataTransfer.getData('text/html');
        myTodoList.swap(item.querySelector('input').value,
          replaceItem.querySelector('input').value);
        printTodoList();
      }

      return false;
    });

    item.addEventListener('dragend', () => {
      item.style.opacity = '1';

      items.forEach((item) => {
        item.classList.add('p-3');
        item.style.backgroundImage = 'linear-gradient(white, white)';
      });
    });
  });
};

export default dragNdrop;