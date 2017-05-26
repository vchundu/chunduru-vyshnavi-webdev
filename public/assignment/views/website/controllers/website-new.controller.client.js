(function() {
    angular
        .module('WAM')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController(websiteService, $location) {
        // todo have an init method

        var model = this;
        // model.userId

        function createWebsite(website) {
            // also pass in userId into the service
            // also pass in userId into the service
            websiteService.createWebsite(website);
            $location.url('/user/'+model.userId+'/website/'+website._id);
        }
    }
})();

// todo: keep functions the same name in the template,controller, and service
// so it's easier to figure out the work flow