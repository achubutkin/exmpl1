
// Export selectors engine
var $$ = Dom7;

var exmpl1App = new Framework7({
    animateNavBackIcon: true,
    onPageInit: function (app, page) {
        if (page.name === 'index') { 
            var categories = loadCategories();
            renderCategoriesList(categories, page);
        }
        else if (page.name === 'category') { 
            var category = getCategory(page.query.catId);
            var articles = loadArticlesByCategoryId(page.query.catId);
            renderArticlesList(category, articles, page);
        }
        else if (page.name === 'article') { 
            var article = loadArticle(page.query.aId);
            if (article) {
                renderArticle(article, page);
            }
        }
        $$('.home').on('click', function (e) {
            e.preventDefault();
            var swiper = ($$('.subnavbar').find('.swiper-3')[0]).swiper;
            if (swiper.activeIndex > 0) swiper.slideTo(0);
        });
    }
});

var mainView = exmpl1App.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    // Enable Dom Cache so we can use all inline pages
    domCache: true
});

// 3 Slides Per View, 10px Between
var subnavSwiper = exmpl1App.swiper('.swiper-3', {
    spaceBetween: 10,
    slidesPerView: 3
});

$$(document).on('ajaxStart', function (e) {
    showIndicator();
});
$$(document).on('ajaxComplete', function (e) {
    hideIndicator();
});

function showIndicator() {
    if ($$('.preloader-indicator-overlay').length > 0) return;
    exmpl1App.root.append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader">' + (exmpl1App.params.material ? exmpl1App.params.materialPreloaderHtml : '') + '</span></div>');
}

function hideIndicator() {
    $$('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
}

function loadCategories() {
    var exmlp1Categories = localStorage.getItem('exmlp1Categories');
    var categories = exmlp1Categories ? JSON.parse(exmlp1Categories) : tempInitializeStorageCategories();
    categories = categories.sort(categoriesSort); 
    return categories;
}

function getCategory(catId) {
    var categories = loadCategories();
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].code === catId) return categories[i];
    }
}

function tempInitializeStorageCategories() {
    var categories = [
			{ "code": "000000001", "name": "Category, 1" },
            { "code": "000000002", "name": "Category, 2" },
            { "code": "000000003", "name": "Category, 3" },
            { "code": "000000004", "name": "Category, 4" },
            { "code": "000000005", "name": "Category, 5" },
            { "code": "000000006", "name": "Category, 6" },
            { "code": "000000007", "name": "Category, 7" },
            { "code": "000000008", "name": "Category, 8" },
            { "code": "000000009", "name": "Category, 9" },
            { "code": "0000000010", "name": "Category, 10" },
            { "code": "0000000011", "name": "Category, 11" },
            { "code": "0000000012", "name": "Category, 12" },
            { "code": "0000000013", "name": "Category, 13" }
		];
    localStorage.setItem('exmlp1Categories', JSON.stringify(categories));
    return JSON.parse(localStorage.getItem('exmlp1Categories'));
}

function loadArticles() {
    var exmlp1Articles = localStorage.getItem('exmlp1Articles');
    var articles = exmlp1Articles ? JSON.parse(exmlp1Articles) : tempInitializeStorageArticles();
    articles = articles.sort(articlesSort);
    return articles;
}

function tempInitializeStorageArticles() {
    var articles = [
			{ "code": "000000001", "name": "Article, 1", "date": new Date(2016, 5, 24, 11, 33, 30, 0), "author": "Jay Z.", "category": { "code": "000000001", "name": "Category, 1" }, "content": getContent() },
            { "code": "000000002", "name": "Article, 2", "date": new Date(2015, 10, 10, 11, 33, 30, 0), "author": "B. Obama", "category": { "code": "000000001", "name": "Category, 1" }, "content": getContent() },
            { "code": "000000003", "name": "Article, 3", "date": new Date(2016, 12, 10, 11, 33, 30, 0), "author": "Klinton H.", "category": { "code": "000000003", "name": "Category, 3" }, "content": getContent() }
		];
    localStorage.setItem('exmlp1Articles', JSON.stringify(articles));
    return JSON.parse(localStorage.getItem('exmlp1Articles'));
}

function getContent() {
    return '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel commodo massa, eu adipiscing mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus ultricies dictum neque, non varius tortor fermentum at. Curabitur auctor cursus imperdiet. Nam molestie nisi nec est lacinia volutpat in a purus. Maecenas consectetur condimentum viverra. Donec ultricies nec sem vel condimentum. Phasellus eu tincidunt enim, sit amet convallis orci. Vestibulum quis fringilla dolor.    </p><p>Mauris commodo lacus at nisl lacinia, nec facilisis erat rhoncus. Sed eget pharetra nunc. Aenean vitae vehicula massa, sed sagittis ante. Quisque luctus nec velit dictum convallis. Nulla facilisi. Ut sed erat nisi. Donec non dolor massa. Mauris malesuada dolor velit, in suscipit leo consectetur vitae. Duis tempus ligula non eros pretium condimentum. Cras sed dolor odio.</p><p>Suspendisse commodo adipiscing urna, a aliquet sem egestas in. Sed tincidunt dui a magna facilisis bibendum. Nunc euismod consectetur lorem vitae molestie. Proin mattis tellus libero, non hendrerit neque eleifend ac. Pellentesque interdum velit at lacus consectetur scelerisque et id dui. Praesent non fringilla dui, a elementum purus. Proin vitae lacus libero. Nunc eget lectus non mi iaculis interdum vel a velit. Nullam tincidunt purus id lacus ornare, at elementum turpis euismod. Cras mauris enim, congue eu nisl sit amet, pulvinar semper erat. Suspendisse sed mauris diam.</p><p>Nam eu mauris leo. Pellentesque aliquam vehicula est, sed lobortis tellus malesuada facilisis. Fusce at hendrerit ligula. Donec eu nibh convallis, pulvinar enim quis, lacinia diam. Ut semper ac magna nec ornare. Integer placerat justo sed nunc suscipit facilisis. Vestibulum ac tincidunt augue. Duis eu aliquet mauris, vel luctus mauris. Nulla non augue nec diam pharetra posuere at in mauris.</p>';
}

function categoriesSort(a, b) {
    if (a.code > b.code) {
        return 1;
    }
    if (a.code === b.code && a.name >= b.name) {
        return 1;
    }
    return -1;
}

function articlesSort(a, b) {
    if (a.date > b.date) {
        return 1;
    }
    if (a.date === b.date && a.code >= b.code) {
        return 1;
    }
    return -1;
}

function renderCategoriesList(categories, page) {
    listCategories = $$('.panel-left').find('.list-categories');
    itemsHTML = '';
    for (var i = 0; i < categories.length; i++) {
        itemsHTML +=
            '<li>' +
            '   <a href="category.html?catId=' + categories[i].code + '&catName=' + categories[i].name + '" class="item-link close-panel">' +
            '       <div class="item-content">' +
            '           <div class="item-inner">' +
            '               <div class="item-title">' + categories[i].name + '</div>' +
            '           </div>' +
            '       </div>' +
            '   </a>' +
            '</li>';
    }
    listCategories.append(itemsHTML);
    swiperWrapper = $$('.subnavbar').find('.swiper-wrapper');
    itemsHTML = '';
    for (var i = 0; i < categories.length; i++) {
        itemsHTML +=
            '<div class="swiper-slide">' + 
            '   <span>' +
            '       <a href="category.html?catId=' + categories[i].code + '&catName=' + categories[i].name + '" class="item-link close-panel">' + categories[i].name + '</a>' + 
            '   </span>' + 
            '</div>';
    }
    swiperWrapper.append(itemsHTML);
}

function renderArticlesList(category, articles, page) {
    itemsHTML = '';
    for (var i = 0; i < articles.length; i++) {
        itemsHTML +=
            '<li>' +
			'	<div class="swipeout-content">' +
			'		<a href="article.html?aId=' + articles[i].code + '" class="item-content item-link">' +
			'			<div class="item-inner">' +
			'				<div class="item-title-row">' +
			'					<div class="item-title">' + articles[i].name + '</div>' +
            '            	</div>' +
			'				<div class="item-subtitle">' + articles[i].author + '</div>' +
			'	        	<div class="item-text">' + moment(articles[i].date).subtract(10, 'days').calendar() + '</div>' +
			'			</div>' +
			'		</a>' +
			'	</div>' +
			'</li>';
    }
    $$(page.container).find('.articles-list > ul').append(itemsHTML);
    $$('div.navbar-inner[data-page="category"] > div.title').text(category.name);
    /*
    $$('div.navbar-inner[data-page="category"] > div.title').text(category.name);
    $$(page.container).find('.content-block-title').text(category.name);
    itemsHTML = '';
    for (var i = 0; i < articles.length; i++) {
        itemsHTML +=
            '<li>' +
            '   <a href="article.html?aId=' + articles[i].code + '" class="item-link">' +
            '       <div class="item-content">' +
            '           <div class="item-inner">' +
            '               <div class="item-title">' + articles[i].name + '</div>' +
            '           </div>' +
            '       </div>' +
            '   </a>' +
            '</li>';
    }
    $$(page.container).find('.list-articles').append(itemsHTML);
    if (articles.length > 0) {
        $$(page.container).find('.list-articles').show();
    }
    */
}

function loadArticlesByCategoryId(catId) {
    var articles = loadArticles();
    var articlesByCategoryId = [];
    for (var i = 0; i < articles.length; i++) {
        if (articles[i].category.code === catId) {
            articlesByCategoryId.push(articles[i]);
        }
    }
    return articlesByCategoryId;
}

function loadArticle(aId) {
    var articles = loadArticles();
    for (var i = 0; i < articles.length; i++) {
        if (articles[i].code === aId) {
            return articles[i];
        }
    }
}

function renderArticle(article, page) {
    $$(page.container).find('.content-block-title').text(article.name);
    $$(page.container).find('.content-block').html(article.content);
    $$('.back > span').text(article.category.name);
}