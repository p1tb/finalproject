const results = document.getElementById('books')
const form = document.getElementById('form')
const input = document.getElementById('input')
const heading = document.getElementById('heading')

window.onload = function () {
    showBestsellers()
}

const showBestsellers = async () => {
    let url = `https://www.googleapis.com/books/v1/volumes?q=javascript&orderBy=relevance`

    results.innerHTML = '<div class="loading"></div>'

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let books = data.items
            if (books) {
                const body = books.map(({ volumeInfo }) => {
                    return volumeInfo
                })

                results.innerHTML = ''
                heading.innerHTML = `Бестселлеры по JavaScript (${books.length})`

                body.map(({ title, imageLinks, authors, publishedDate }) => {
                    const book = document.createElement('div')
                    book.classList.add('item')
                    book.innerHTML = `
                        <img class="thumbnail" src="${
                            imageLinks ? imageLinks.thumbnail : 'block.svg'
                        }" alt="title" />
                        <p class="title">
                            <span><b>Название:</b> ${
                                title ? title : 'Not recognized'
                            }</span> <br/>
                            <span><b>Авторы:</b> ${
                                authors ? authors.join(', ') : 'Not recognized'
                            }</span> <br/>
                            <span><b>Дата выпуска:</b> ${
                                publishedDate ? publishedDate : 'Not recognized'
                            }</span>
                        </p>
                    `
                    results.appendChild(book)
                })
            }
        })
        .catch((err) => console.log(err))
}

form.addEventListener('submit', function (e) {
    e.preventDefault()

    let bookName = input.value
    if (bookName != '' && bookName != ' ') {
        results.innerHTML = '<div class="loading"></div>'

        let url = `https://www.googleapis.com/books/v1/volumes?q=${bookName}`

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                let books = data.items
                if (books) {
                    const body = books.map(({ volumeInfo }) => {
                        return volumeInfo
                    })

                    results.innerHTML = ''
                    heading.innerHTML = `Бестселлеры по ${bookName} (${books.length})`

                    body.map(
                        ({ title, imageLinks, authors, publishedDate }) => {
                            const book = document.createElement('div')
                            book.classList.add('item')
                            book.innerHTML = `
                                <img class="thumbnail" src="${
                                    imageLinks ? imageLinks.thumbnail : 'block.svg'
                                }" alt="title" />
                                <p class="title">
                                    <span><b>Название:</b> ${
                                        title ? title : 'Not recognized'
                                    }</span> <br/>
                                    <span><b>Авторы:</b> ${
                                        authors ? authors.join(', ') : 'Not recognized'
                                    }</span> <br/>
                                    <span><b>Дата выпуска:</b> ${
                                        publishedDate ? publishedDate : 'Not recognized'
                                    }</span>
                                </p>
                            `
                            results.appendChild(book)
                        }
                    )
                }
            })
            .catch((err) => console.log(err))
    }
})
