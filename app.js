const themeToggle = document.querySelector('.theme-toggle');
let savedTheme;

try {
    savedTheme = localStorage.getItem('salmon-eagle-theme');
} catch {
    // The theme can still be changed when browser storage is unavailable.
}

function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggle.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
}

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(['light', 'dark'].includes(savedTheme) ? savedTheme : (prefersDark ? 'dark' : 'light'));
themeToggle.hidden = false;

themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try {
        localStorage.setItem('salmon-eagle-theme', theme);
    } catch {
        // The selected theme remains active on this page.
    }
});
