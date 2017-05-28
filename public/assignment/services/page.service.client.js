(function() {
    angular
        .module('WAM')
        .factory('pageService', pageService);

    function pageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
            { "_id": "123", "name": "Post 4", "websiteId": "789", "description": "Lorem" },
            { "_id": "234", "name": "Post 5", "websiteId": "789", "description": "Lorem" }
        ];

        var api = {
            findAllPagesFromWebsite: findAllPagesFromWebsite,
            findPageByIdAndWebsite: findPageByIdAndWebsite,
            createPage: createPage,
            deletePage: deletePage,
            updatePage: updatePage
        };

        return api;

        function findAllPagesFromWebsite(websiteId) {
            return pages.filter(function(page) {
                return page["websiteId"] === websiteId;
            });
        }

        function findPageByIdAndWebsite(pageId, websiteId) {
            var page = pages.find(function(page) {
                return page["_id"] === pageId && page["websiteId"] === websiteId;
            });

            if (typeof page === "undefined") {
                return null;
            } else {
                return page;
            }
        }

        function createPage(page, websiteId) {
            console.log(pages);
            page._id = new Date().getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            console.log(pages);
        }

        function deletePage(pageId) {
            var page = pages.find(function(page) {
                return page['_id'] === pageId;
            });
            if (typeof page === "undefined") {
                // do nothing
            } else {
                var index = pages.indexOf(page);
                pages.splice(index,1);
            }
        }

        function updatePage(pageId, newPage) {
            var oldPage = pages.find(function(page) {
                return pageId === page['_id'];
            });

            if (typeof oldPage === "undefined") {
                // do nothing
            } else {
                var index = pages.indexOf(oldPage);
                pages.splice(index, 1, newPage);
            }
        }

    }
})();