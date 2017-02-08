
var intraApi = {
    init: function () {
        this.getCategories(true);
    },
    getCategories: function (updateLocalStorage) {
        if (updateLocalStorage && updateLocalStorage === true) localStorage.removeItem('categories');
        var categories = localStorage.getItem('categories');
        categories = categories ? JSON.parse(categories) : loadCategories();
        categories = categories.sort(this.categoriesSort);
        return categories;
    },
    getArticles: function (category) {

    },
    getFullArticle: function (article) {
        
    },
    loadCategories: function () {
        var categories = [];
        localStorage.setItem('categories', JSON.stringify(categories));
        return JSON.parse(localStorage.getItem('categories'));
    },
    categoriesSort: function (a, b) {
        if (a.code > b.code) {
            return 1;
        }
        if (a.code === b.code && a.name >= b.name) {
            return 1;
        }
        return -1;
    }
}