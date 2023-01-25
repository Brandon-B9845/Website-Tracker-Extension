const tabBtn = document.querySelector("#tab-btn")
const deleteBtn = document.querySelector("#delete-btn")
const inputBtn = document.querySelector("#input-btn")
const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("leads"))
let myLeads = []


function checkLocalStorage() {
    if (leadsFromLocalStorage) {
        myLeads = leadsFromLocalStorage
        render(myLeads)
    }
}

function render(arr) {
    let listItems = ""
    for (let i = 0; i < arr.length; i++) {
        listItems += `
        <li>
        <a href='${arr[i]}' target='blank'>${arr[i]}</a>
        </li>`
    }

    ulEl.innerHTML = listItems

}


inputBtn.addEventListener("click", () => {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("leads", JSON.stringify(myLeads))
    render(myLeads)


})

deleteBtn.addEventListener("dblclick", () => {
    myLeads = []
    localStorage.clear()
    ulEl.innerHTML = ""

})

tabBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        myLeads.push(tabs[0].url)
        localStorage.setItem("leads", JSON.stringify(myLeads))
        render(myLeads)

    })


})


checkLocalStorage()



