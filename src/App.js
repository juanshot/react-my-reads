import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCategories from './BookCategories'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchResults: []
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookCategories onActionSelected={(book, shelf) => {
            book.shelf = shelf
            this.setState(state => ({
              books: state.books.filter(bookState => bookState.id !== book.id).concat([book])
            }))
            BooksAPI.update(book, shelf).then((result) => {
              console.log('Shelf Changed', result)
            }).catch(err => console.log('There was an error', err))
           }} books={this.state.books}></BookCategories>
        )}>
        </Route>
        <Route path="/search" render={() => (
          <SearchBook
            stateBooks={this.state.books}
            searchResults={this.state.searchResults}
            onActionSelected={(book, shelf) => {
              book.shelf = shelf
              this.setState(state => ({
                books: state.books.filter(bookState => bookState.id !== book.id).concat([book])
              }))
              BooksAPI.update(book, shelf).then((result) => {
                console.log('Shelf Changed', result)
              }).catch(err => console.log('There was an error', err))
            }}
            onSearch={(query) => {
            if (query.length > 2) {
              BooksAPI.search(query.toLowerCase()).then(result => {
                if (!result.error) {
                  this.setState({
                    searchResults: result
                  })
                }
              })
            }
          }}>
          </SearchBook>
        )}>
        </Route>

      </div>
    )
  }
  componentDidMount () {
    BooksAPI.getAll().then(books => {
      this.setState({
        books
      })
    })
  }
}

export default BooksApp
