(function() {
    angular
        .module('WAM')
        .factory('websiteService', websiteService);

    function websiteService($location) {

        var websites = [
            { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
            { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
            { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
            { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
            { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
            { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
            { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
        ];

        var api = {
            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteByIdAndUser: findWebsiteByIdAndUser,
            deleteWebsite: deleteWebsite,
            updateWebsite: updateWebsite,
            createWebsite: createWebsite
        };

        return api;

        function findAllWebsitesForUser(userId) {
            return websites.filter(function (website) {
                return website['developerId'] === userId;
            });
        }

        function findWebsiteByIdAndUser(websiteId, userId) {
            var website = websites.find(function(website) {
                return website['developerId'] === userId && website['_id'] === websiteId;
            });

            if (typeof website === "undefined") {
                return null;
            } else {
                return website;
            }
        }

        function deleteWebsite(websiteId, userId) {
            var website = findWebsiteByIdAndUser(websiteId, userId);

            if (website !== null) {
                var index = websites.indexOf(website);
                websites.splice(index, 1);
                $location.url('/user/'+userId+'/website');
            }
        }

        function updateWebsite(websiteId, userId) {
            $location.url('/user/'+userId+'/website');
            // probably will need to do stuff later so here it is.
        }

        function createWebsite(website, userId) {
            website['_id'] = new Date().getTime();
            website['developerId'] = userId;
            websites.push(website);
        }


    }
})();