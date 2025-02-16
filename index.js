"use strict";
// 文字数制限
const ItemInput = document.getElementById("item-input");
ItemInput.addEventListener("input",function(){
    const inputLength = ItemInput.value.length;
    const count = document.getElementById("msgCount");
    count.textContent = inputLength;
    if (inputLength > 150){
        count.setAttribute("class","countFg");
    }else{
        count.removeAttribute("class");
    }
})

// 保存ボタンのクリックイベント
document.getElementById("savebutton").addEventListener("click", function () {
    const input = document.getElementById("item-input");
    const newItem = input.value.trim(); // 入力された値を取得
    const inputLength = ItemInput.value.length;
    const count = document.getElementById("msgCount");
    count.textContent = inputLength;
    if (inputLength > 150){
        window.alert('150文字以下で入力してください')
    }else{
        // テキストボックスに値が入力されていれば、保存処理を実行
        if (newItem) {
            // ローカルストレージに保存されているデータ（既存の配列orなければ空配列）を取得
            const items = JSON.parse(localStorage.getItem("items")) || []; 
            items.push(newItem); // 新しいアイテムを配列に追加
            localStorage.setItem("items", JSON.stringify(items)); // 更新された配列をローカルストレージに保存
            
            
            input.value = ""; // 入力フィールドをリセット
            const inputLength = ItemInput.value.length;
            const count = document.getElementById("msgCount");
            count.textContent = inputLength;
    
            displayItems(); // 保存されたアイテムを表示
    
        }else{
            window.alert("メモの内容を入力して下さい");
        }
    }
});

// 保存されたアイテムを画面に表示
function displayItems() {
    const items = JSON.parse(localStorage.getItem("items")) || []; // ローカルストレージからアイテムを取得
    const itemList = document.getElementById("itemList");
    itemList.replaceChildren(); // 一旦リストを空にする

    items.forEach(function(item){
        const tr = document.createElement("tr");
        const thid = document.createElement("th");
        const th = document.createElement("th");
        const td = document.createElement("td");
        const index = items.indexOf(item);
        th.textContent = item;
        th.className = 'th';
        thid.textContent = `メモID：${index + 1}`

        // ボタン要素を作成
        const button = document.createElement('button');
        // ボタンのテキストを設定
        button.innerText  ='削除';
        // ボタンのクリックイベントを設定
        button.onclick = function(){
            if (window.confirm(`メモID：${index + 1}を削除しますか？`)){
                // const index = items.indexOf(item);
                if (index > -1) {
                    items.splice(index, 1); // 配列からアイテムを削除
                    localStorage.setItem("items", JSON.stringify(items)); // 更新された配列をローカルストレージに保存
                    displayItems(); // 更新後のリストを再表示
                }
            }
        };
        
        td.appendChild(button)
        itemList.appendChild(tr); // 各アイテムをリストに追加
        tr.appendChild(thid); // 各アイテムをリストに追加
        tr.appendChild(th); // 各アイテムをリストに追加
        tr.appendChild(td); // 各アイテムをリストに追加

        const formattedText = item.replace(/\n/g, '<br>');
        th.innerHTML = formattedText;
    });
}


// 全て削除ボタンのクリックイベント
document.getElementById("removeBtn").addEventListener("click", function(){
    if (window.confirm('全て削除しますか？')){
        localStorage.clear();
        const itemList = document.getElementById("itemList");
        itemList.replaceChildren();
    }
});


// ページ読み込み時に保存されたアイテムを表示
displayItems();
