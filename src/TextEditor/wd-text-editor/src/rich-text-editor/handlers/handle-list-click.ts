const handleListClick = (event: React.MouseEvent<HTMLUListElement | HTMLOListElement>) => {

    if (event.target instanceof Element) {
        let target = event.target;
        let p, li;
        if (target.tagName === 'LI') {
            // Click on LI
            li = target;
            p = li.querySelector('p[contenteditable="true"]');
        } else if (target.tagName === 'UL' || target.tagName === 'OL') {
            // Click on UL/OL
            let closestLi = null;
            let closestDistance = Infinity;
            let clickY = event.clientY;

            target.querySelectorAll('li').forEach(liElement => {
                let liRect = liElement.getBoundingClientRect();
                let distance = Math.abs(clickY - liRect.top - (liRect.height / 2)); // Distance from the vertical center of the li

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestLi = liElement;
                }
            });

            li = closestLi;
            p = li ? (li as Element).querySelector('p[contenteditable="true"]') : null;
        }

        if (p && p.firstChild) {
            // Set the cursor position
            let range = document.createRange();
            let sel = window.getSelection();

            range.setStart(p.firstChild, 0);
            range.collapse(true);

            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    }

}

export default handleListClick;