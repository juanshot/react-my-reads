import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    getCurrentShelf (id) {
        let resultBook = this.props.stateBooks.filter(stateBook => stateBook.id === id)[0]
        return resultBook ? resultBook.shelf : 'none'
    }
    render () {
        return (<div className="book">
        <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: this.props.book.imageLinks ? `url(${this.props.book.imageLinks.thumbnail})` : ``}}></div>
            <div className="book-shelf-changer">
                <select
                  value={this.props.book.shelf ? this.props.book.shelf : this.getCurrentShelf(this.props.book.id) }
                  onChange={(event) => {
                    this.props.onShelfChanged(this.props.book, event.target.value)
                  }}
                >
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors && this.props.book.authors.map(author => (
            <div key={author} className="book-authors">{author}</div>
        ))}
    </div>)
    }
}
Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChanged: PropTypes.func.isRequired
}

export default Book