/*global Framework7, Dom7 */

(function (Framework7, $$) {
    'use strict';

    var urls = [
		/* 'http://localhost/sandbox_restapi/hs/' */
        'http://web.applecity.kz:3380/sandbox_restapi/hs/'
	], req, api;

    req = function (path, success, error, retry) {
        retry = retry || 0;
        return $$.ajax({
            url: urls[retry % urls.length] + path,
            success: success,
            error: function (xhr) {
                if (retry < urls.length - 1) {
                    req(path, success, error, retry += 1);
                } else {
                    error(xhr);
                }
            }
        });
    };

    api = {

        urls: urls,

        categories: function (success, error) {
            return req('api/categories', success, error);
        },

        lastarticles: function (success, error) {
            return req('api/lastarticles/', success, error);
        },

        articlesbycategory: function (catid, cursor, success, error) {
            if (!cursor || cursor === '') cursor = '0';
            return req('api/articles/' + catid + '/' + cursor, success, error);
        },

        article: function(id, success, error) {
            return req('api/articles/' + id, success, error);
        }
    };

    window.api = api;

} (Framework7, Dom7));