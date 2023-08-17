import View from './View.js';
import previewView from './previewView.js';


class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerDeleteBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const deleteButton = e.target.closest('.preview__delete');
      if (!deleteButton) return;

      const bookmarkElement = deleteButton.closest('.preview');
      if (!bookmarkElement) return;

      const bookmarkId = bookmarkElement.dataset.id; // Add an ID to your bookmark data

      handler(bookmarkId);
    });
  }


  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
