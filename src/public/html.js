document.querySelector('.gethtmlbutton').addEventListener('click', async (e) => {
    e.preventDefault();

    let response = await axios('/title', {
        method: 'GET',
    })

    
})