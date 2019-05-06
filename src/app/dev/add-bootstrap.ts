
export const addBootstrapCSS = () => {
    
    const head = document.querySelector('head');
    const angularStyles = head.querySelector('style');
    
    const css = document.createElement('style');
    css.innerHTML = require('node_modules/bootstrap/dist/css/bootstrap.min.css');

    head.insertBefore(css, angularStyles);
}