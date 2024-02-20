// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // When the editor is ready, set the value to whatever is stored in indexeddb.
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}

// // Import methods to save and get data from the indexedDB database in './database.js'
// import { getDb, putDb } from './database';
// import { header } from './header';

// export default class Editor {
//   constructor() {
//     // Check if CodeMirror is loaded
//     if (typeof CodeMirror === 'undefined') {
//       throw new Error('CodeMirror is not loaded');
//     }

//     this.editor = CodeMirror(document.querySelector('#main'), {
//       value: '',
//       mode: 'javascript',
//       theme: 'monokai',
//       lineNumbers: true,
//       lineWrapping: true,
//       autofocus: true,
//       indentUnit: 2,
//       tabSize: 2,
//     });

//     // When the editor is ready, set the value to whatever is stored in indexeddb.
//     // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
//     getDb().then((data) => {
//       console.info('Loaded data from IndexedDB, injecting into editor');
//       this.editor.setValue(data || header);
//     }).catch((error) => {
//       console.error('Error loading data from IndexedDB:', error);
//       // Fallback to localStorage if IndexedDB retrieval fails
//       const localData = localStorage.getItem('content');
//       this.editor.setValue(localData || header);
//     });

//     this.editor.on('change', () => {
//       // Save content to IndexedDB whenever there is a change
//       putDb(this.editor.getValue());
//     });

//     // Save the content of the editor when the editor itself loses focus
//     this.editor.on('blur', () => {
//       console.log('The editor has lost focus');
//       putDb(this.editor.getValue());
//     });
//   }
// }
