// script.js

document.addEventListener('DOMContentLoaded', () => {


    const reviewForm = document.getElementById('review-form');
    const searchForm = document.getElementById('search-form');

    const showError = (inputId, message) => {
        const input = document.getElementById(inputId);
        const errorElement = document.querySelector(`[data-error-for="${inputId}"]`);
        if (input && errorElement) {
            input.classList.add('border-2', 'border-red-500');
            errorElement.textContent = message;
            errorElement.classList.remove('hidden');
        }
    };

    const clearError = (inputId) => {
        const input = document.getElementById(inputId);
        const errorElement = document.querySelector(`[data-error-for="${inputId}"]`);
        if (input && errorElement) {
            input.classList.remove('border-2', 'border-red-500');
            errorElement.classList.add('hidden');
        }
    };

    if (reviewForm) {
        reviewForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let isValid = true;
            const emailInput = document.getElementById('review-email');
            const textInput = document.getElementById('review-text');

            clearError('review-email');
            clearError('review-text');


            if (!textInput.value.trim()) {
                showError('review-text', 'Prašome įvesti atsiliepimą.');
                isValid = false;
            }

            if (isValid) {
                const formData = {
                    email: emailInput.value,
                    review: textInput.value
                };
                alert(`Ačiū už atsiliepimą!\nEl. paštas: ${formData.email}\nAtsiliepimas: ${formData.review}`);
                reviewForm.reset();
            }
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const searchInput = document.getElementById('search-box');
            clearError('search-box');

            if (!searchInput.value.trim()) {
                showError('search-box', 'Prašome įvesti paieškos frazę.');
            } else {
                const searchQuery = searchInput.value;
                alert(`Ieškoma: ${searchQuery}`);
            }
        });
    }


    const settingsButton = document.getElementById('settings-button');
    const closeSettingsButton = document.getElementById('close-settings-button');
    const settingsPanel = document.getElementById('settings-panel');
    const settingsOverlay = document.getElementById('settings-overlay');
    const pageBody = document.getElementById('page-body');
    const lightModeBtn = document.getElementById('light-mode-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const headingColorInput = document.getElementById('heading-color-input');
    const headingSizeSelect = document.getElementById('heading-size-select');
    const headings = document.querySelectorAll('.page-heading');

    const applySettings = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            pageBody.classList.add('dark');
        } else {
            pageBody.classList.remove('dark');
        }

        const savedHeadingColor = localStorage.getItem('headingColor');
        if (savedHeadingColor) {
            headings.forEach(h => h.style.color = savedHeadingColor);
            headingColorInput.value = savedHeadingColor;
        }

        

        const savedHeadingSize = localStorage.getItem('headingSize') || 'text-2xl';
         const currentSizeClasses = ['text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'];
        headings.forEach(h => {
            h.classList.remove(...currentSizeClasses);
            const savedClasses = savedHeadingSize.split(' ');

            h.classList.add(...savedClasses); 
        });
        headingSizeSelect.value = savedHeadingSize;
    };


    const openSettings = () => {
        settingsPanel.classList.remove('translate-x-full');
        settingsOverlay.classList.remove('hidden');
    };

    

    const closeSettings = () => {
        settingsPanel.classList.add('translate-x-full');
        settingsOverlay.classList.add('hidden');
    };

    

    applySettings();

    const resetHeadingColorStyles = () => {
        headings.forEach(h => {
            h.style.color = ''; 
        });

        localStorage.removeItem('headingColor');
        
        if (headingColorInput) {
             headingColorInput.value = pageBody.classList.contains('dark') ? '#FFFFFF' : '#000000';
         }
     };

    if (settingsButton) {
        settingsButton.addEventListener('click', openSettings);
    }
    if (closeSettingsButton) {
        closeSettingsButton.addEventListener('click', closeSettings);
    }
     if (settingsOverlay) {
        settingsOverlay.addEventListener('click', closeSettings);
    }

    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => {
            pageBody.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            resetHeadingColorStyles();
        });
    }
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            pageBody.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            resetHeadingColorStyles();
        });
    }

    if (headingColorInput) {
        headingColorInput.addEventListener('input', (event) => {
            const newColor = event.target.value;
            headings.forEach(h => h.style.color = newColor);
            localStorage.setItem('headingColor', newColor);
        });
    }

     if (headingSizeSelect) {
        headingSizeSelect.addEventListener('change', (event) => {
            const newSizeClass = event.target.value;
            const currentSizeClasses = ['text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl']; 
            headings.forEach(h => {
                 h.classList.remove(...currentSizeClasses); 

                 const newClasses = newSizeClass.split(' ');
                 h.classList.add(...newClasses); 
            });
            localStorage.setItem('headingSize', newSizeClass);
        });
    }

}); 