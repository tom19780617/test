async function loadLeaderboard() {
    let list = document.getElementById('list');
    list.innerHTML = `下載中...`;
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
        let response = await fetch('https://test-tommot.vercel.app/leaderboard');
        let data = await response.json();
        data = data.sort((a, b) => b.score - a.score);
        list.innerHTML = ``;
        data.forEach(e => {
            let li = document.createElement('li');
            li.textContent = `${e.name}---${e.score}`;
            list.appendChild(li);
        })
    } catch (error) {
        list.innerHTML = `讀取失敗!`;
        console.error('錯誤', error);
    }
}

async function submitScore() {
    let name = document.getElementById('name').value;
    let score = parseInt(document.getElementById('score').value);
    if (!name || isNaN(score)) {
        alert('請輸入有效資料!');
        return;
    }

    try {
        let response = await fetch('https://test-tommot.vercel.app/saveResult', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, score })
        });
        let data = await response.json();
        alert(data.message);
        loadLeaderboard();
    } catch (error) {
        alert('上傳失敗!');
    }
}
