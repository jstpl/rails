define(['jrails/spa/query', 'jrails/spa/controllerFactory'], function(spaQuery, controllerFactory) {

    var data = {

    };

    return {
        el: '#app-bskit-one',
        data: data,
        //templateFile: 'module/bskit/view/all.html',
        onReady: function () {
            var query = spaQuery.get();
            //console.log(query);
            this.templateFile = 'module/bskit/view/'+query.id+'.html';
            //controllerFactory.loadTemplate(this, this.templateFile);
        },
    };

});
