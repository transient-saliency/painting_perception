function allowDrop(event) {
    event.preventDefault();
    var dropZone = event.target.closest('.drop-zone');
    if (dropZone) {
        // 可以根据实际情况调整，例如基于子元素数量调整放置位置等
    }
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var dropZone = event.target.closest('.drop-zone');
    if (dropZone) {
        var data = event.dataTransfer.getData("text");
        var originalImg = document.getElementById(data);
        var clonedImg = originalImg.cloneNode(true);

        clonedImg.setAttribute('draggable', 'true');
        clonedImg.setAttribute('ondragstart', 'drag(event)');

        var xDrop = event.clientX - dropZone.getBoundingClientRect().left; // 获取鼠标在 drop-zone 内的 x 位置

        // 找到插入点
        let beforeElement = null;
        Array.from(dropZone.children).some((img, index) => {
            if (img.getBoundingClientRect().left > xDrop) {
                beforeElement = img;
                return true;
            }
            return false;
        });

        // 根据计算得到的位置插入新图片
        if (beforeElement) {
            dropZone.insertBefore(clonedImg, beforeElement);
        } else {
            dropZone.appendChild(clonedImg);
        }
    }
}





