import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class SearchBook extends Component {
    state = {
        query: ''
    }
    updateQuery = (event) => {
        this.setState({
            query: event.target.value
        })
        this.props.onSearch(event.target.value)
    }
    render () {
        return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input
                      type="text"
                      onChange={this.updateQuery}
                      placeholder="Search by title or author"
                     />

                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.query.length > 0 && this.props.searchResults.map(result => (<li key={result.id}>
                        <Book stateBooks={this.props.stateBooks} onShelfChanged={(bookSelected, shelf) => { this.props.onActionSelected(bookSelected, shelf) }} book={result}></Book>
                    </li>))}
                </ol>
            </div>
        </div>
      )
    }
}
SearchBook.propTypes = {
    onSearch: PropTypes.func.isRequired,
    searchResults: PropTypes.any.isRequired,
    stateBooks: PropTypes.array.isRequired,
    onActionSelected: PropTypes.func.isRequired
}
export default SearchBook