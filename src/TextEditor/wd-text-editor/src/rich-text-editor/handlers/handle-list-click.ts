const handleListClick = (event: React.MouseEvent<HTMLUListElement | HTMLOListElement>) => {

    if (event.target instanceof Element) {
        const target = event.target;
        let p, li;
        if (target.tagName === 'LI') {
            
            li = target;
            p = li.querySelector('p[contenteditable="true"]');
        } else if (target.tagName === 'UL' || target.tagName === 'OL') {
            
            let closestLi = null;
            let closestDistance = Infinity;
            const clickY = event.clientY;

            target.querySelectorAll('li').forEach(liElement => {
                const liRect = liElement.getBoundingClientRect();
                const distance = Math.abs(clickY - liRect.top - (liRect.height / 2)); 

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestLi = liElement;
                }
            });

            li = closestLi;
            p = li ? (li as Element).querySelector('p[contenteditable="true"]') : null;
        }

        if (p && p.firstChild) {
            
            const range = document.createRange();
            const sel = window.getSelection();

            range.setStart(p.firstChild, 0);
            range.collapse(true);

            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    }

}

export default handleListClick;