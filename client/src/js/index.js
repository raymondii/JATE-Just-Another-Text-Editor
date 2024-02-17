import { Workbox } from 'workbox-window';
import Editor from './editor';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

const initializeEditor = async () => {
  try {
    // Initialize the editor
    const editor = new Editor();
    if (!editor) {
      loadSpinner();
    }
  } catch (error) {
    console.error('Error initializing editor:', error);
    // Fallback to loading spinner if editor initialization fails
    loadSpinner();
  }
};

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    // Register workbox service worker
    try {
      const workboxSW = new Workbox('/src-sw.js');
      await workboxSW.register();
      console.log('Service worker registered successfully.');
    } catch (error) {
      console.error('Error registering service worker:', error);
    }

    // Initialize the editor after service worker registration
    initializeEditor();
  });
} else {
  console.error('Service workers are not supported in this browser.');
  // Initialize the editor without service worker support
  initializeEditor();
}
