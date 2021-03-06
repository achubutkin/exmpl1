/*global Framework7, Dom7, Template7, moment, api */

(function (Framework7, $$, moment, api) {
    'use strict';

    var app, mainView, leftView, splitView;

    // Init App
    app = new Framework7({
        modalTitle: 'App',
        animateNavBackIcon: true,
        router: true
    });

    // Add Right/Main View
    mainView = app.addView('.view-main', {
        dynamicNavbar: true,
        animatePages: true,
        swipeBackPage: false,
        preloadPreviousPage: true,
        // Enable Dom Cache so we can use all inline pages
        domCache: true
    });

    $$(window).resize(function (e) {
        app.showPreloader('Update.');
        window.localStorage.removeItem('categories');
        getCategories();
        app.hidePreloader();
    });

    app.onPageInit('category', function (page) {

    });

    app.onPageAfterAnimation('category', function (page) {
        if (page.view === mainView) {
            var catId = page.query.catId;
            var storagekey = 'articles[' + catId + ']';
            var results = JSON.parse(window.localStorage.getItem(storagekey)) || [];
            if (results.length === 0) {
                api.articlesbycategory(catId, '', function (data) {
                    results = JSON.parse(data);
                    // Update local storage data
                    window.localStorage.setItem(storagekey, JSON.stringify(results));
                    $$('.preloader-block').addClass('fadeOut');
                    updateArticles(results);
                });
            }
            else {
                updateArticles(results);
            }
        }
    });

    app.onPageBeforeAnimation('article', function (page) {
        if (page.view === mainView) {
            // insert pre-init category title!
        }
    });

    app.onPageAfterAnimation('article', function (page) {
        if (page.view === mainView) {
            var id = page.query.id;
            var result = JSON.parse(window.localStorage.getItem('article[' + id + ']'));
            if (!result || result === undefined || result === null) {
                api.article(id, function (data) {
                    result = JSON.parse(data);
                    // Update local storage data
                    window.localStorage.setItem('article[' + id + ']', JSON.stringify(result));
                    updateArticle(result);
                });
            }
            else {
                updateArticle(result);
            }
        }
    });

    function updateArticle(article) {
        $$('div[data-page="article"] .navbar-inner .center').html(article.category.name);
        console.log(article);
    }

    app.onPageAfterAnimation('index', function (page) {
        resetPages();
    });

    function resetPages() {
        $$('div[data-page="category"] ul[data-widget="articles"]').html('');
        $$('.preloader-block').removeClass('fadeOut');
    }

    // Update Categories
    function updateCategories(categories) {
        var container = $$('.panel-left ul[data-widget="categories"]');
        var itemsHTML = '';
        for (var i = 0; i < categories.length; i++) {
            itemsHTML +=
                '<li>' +
                '   <a href="#category?catId=' + categories[i].code + '" class="item-link close-panel">' +
                '       <div class="item-content">' +
                '           <div class="item-inner">' +
                '               <div class="item-title">' + categories[i].name + '</div>' +
                '           </div>' +
                '       </div>' +
                '   </a>' +
                '</li>';
        }
        container.html('');
        container.append(itemsHTML);
    }

    // Update Articles 
    function updateArticles(articles, append) {
        var container = $$('div[data-page="category"] ul[data-widget="articles"]');
        var itemsHTML = '';
        for (var i = 0; i < articles.length; i++) {
            itemsHTML +=
                '<li>' +
                '   <a href="#article?id=' + articles[i].code + '" class="item-link close-panel">' +
                '       <div class="item-content">' +
                '           <div class="item-inner">' +
                '               <div class="item-title">' + articles[i].title + '</div>' +
                '           </div>' +
                '       </div>' +
                '   </a>' +
                '</li>';
        }
        if (!append || append === false) container.html('');
        container.append(itemsHTML);
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

    function getArticles(page) {
        var catId = page.query.catId;
        var storagekey = 'articles[' + catId + ']';
        var results = JSON.parse(window.localStorage.getItem(storagekey)) || [];
        if (results.length === 0) {
            api.articlesbycategory(catId, '', function (data) {
                results = JSON.parse(data);
                // Update local storage data
                window.localStorage.setItem(storagekey, JSON.stringify(results));
                updateArticles(results);
            });
        }
        else {
            updateArticles(results);
        }
        return results;
    }

    // Clear all data on app start (!)
    window.localStorage.clear();
    // Get and parse categories on app load
    getCategories();

    // Export app to global
    window.app = app;

} (Framework7, Dom7, moment, api));