/*global Framework7, Dom7, Template7, moment, api */

(function (Framework7, $$, moment, api) {
    'use strict';

    var app, mainView, leftView, splitView;

    // Init App
    app = new Framework7({
        modalTitle: 'Title',
        animateNavBackIcon: true,
        externalLinks: 'a.external, .message a',
        router: true
    });

    // Add Right/Main View
    mainView = app.addView('.view-main', {
        dynamicNavbar: true,
        animatePages: false,
        swipeBackPage: false,
        reloadPages: true,
        preloadPreviousPage: false
    });

    $$(window).resize(function (e) {
        window.localStorage.removeItem('categories');
        getCategories();
    });

    // Update Categories
    function updateCategories(categories) {
        var list = $$('.panel-left').find('.list-categories');
        var itemsHTML = '';
        for (var i = 0; i < categories.length; i++) {
            itemsHTML +=
                '<li>' +
                '   <a href="category.html?catId=' + categories[i].code + '" class="item-link close-panel">' +
                '       <div class="item-content">' +
                '           <div class="item-inner">' +
                '               <div class="item-title">' + categories[i].name + '</div>' +
                '           </div>' +
                '       </div>' +
                '   </a>' +
                '</li>';
        }
        list.append(itemsHTML);
    }

    // Fetch Categories 
    function getCategories(refresh) {
        var results = refresh ? [] : JSON.parse(window.localStorage.getItem('categories')) || [];
        if (results.length === 0) {
            if (!refresh) {

            }
            api.categories(function (data) {
                results = JSON.parse(data);
                // Update local storage data
                window.localStorage.setItem('categories', JSON.stringify(results));
                updateCategories(results);
            });
        }
        else {
            updateCategories(results);
        }
        return results;
    };

    // Get and parse categories on app load
    getCategories();

    // Export app to global
    window.app = app;

} (Framework7, Dom7, moment, api));