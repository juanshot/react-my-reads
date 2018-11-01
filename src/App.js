import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookCategories from './BookCategories'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookCategories books={this.state.books}></BookCategories>
        )}>
        </Route>
        <Route path="/search" render={() => (
          <SearchBook></SearchBook>
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
      console.log('libros', books)
    })
  }
}

export default BooksApp
