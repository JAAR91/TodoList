const dragNdrop = (container, myTodoList) => {
    var dragedItem = null;
    const addAttributes = (item, size) => {
        

        item.addEventListener('dragstart', (e) => {
            item.opacity = '0.4';
            dragedItem = item;
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

        item.addEventListener('dragenter', (e) => {
            if (dragedItem !== item){
                item.classList.remove('p-3');
                item.style.paddingTop = '80px';
                item.style.backgroundImage = `linear-gradient(rgb(76, 89, 151), white, white)`;
            }
        });

        item.addEventListener('dragleave', (e) => {
            item.classList.add('p-3');
            item.style.backgroundImage = `linear-gradient(white, white)`;
        });

        item.addEventListener('drop', (e) => {
            if (e.stopPropagation) {
                e.stopPropagation(); 
            }
            if (dragedItem != item) {
                dragedItem.innerHTML = item.innerHTML;
                item.innerHTML = e.dataTransfer.getData('text/html');
                myTodoList.swap(item.querySelector('input').value - 1,
                dragedItem.querySelector('input').value - 1);
            }
                
            return false;
        });

        item.addEventListener('dragend', (e) => {
            item.style.opacity = '1';
    
            items.forEach(function (item) {
                item.classList.add('p-3');
                item.style.backgroundImage = `linear-gradient(white, white)`;
            });
        });
    };

    let items = container.querySelectorAll('li');
    let size = items.length;
    items.forEach((item, index) => {
        addAttributes(item, size, index);
    });
    
};

export default dragNdrop;