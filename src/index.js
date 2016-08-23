'use strict';

/**
 * Builds mongoose conditions from context
 *
 */
function buildConditions(context) {
    let conditions = {};
    if(context.params) {
        conditions = context.params;
    }
    else if(context.request.query.conditions) {
        conditions = JSON.parse(context.request.query.conditions);
    }
    return conditions;
}

/**
 * Builds mongoose options
 *
 */
function buildOptions(parameters, object) {
    let filtered = Object.keys(object).filter((key) => parameters.indexOf(key) !== -1);
    let result = filtered.reduce((previous, current) => {
        try {
            previous[current] = JSON.parse(object[current]);
        }
        catch(e) {
            previous[current] = object[current];
        }
        return previous;
    }, {});
    return result;
}

/**
 * Builds api router
 *
 */
function routerApi(router, model, prefix, paramId) {

    // Url
    paramId = (!paramId) ? '_id' : paramId;
    let url = prefix + '/' + model.modelName;
    let urlParam = url + '/:' + paramId;

    // Get
    function* get() {
        let conditions = buildConditions(this);
        let options = buildOptions(['limit', 'skip', 'populate', 'sort'], this.request.query);
        this.body = yield model.find(conditions, '', options).exec();
    }
    router.get(urlParam, get);
    router.get(url, get);

    // Post
    function * post() {
        this.body = yield model.create(this.request.body);
    }
    router.post(url, post);

    // Put
    function * put() {
        let conditions = buildConditions(this);
        let options = buildOptions([
            'safe', 'upsert', 'multi', 'runValidators',
            'setDefaultsOnInsert', 'strict', 'overwrite'
        ], this.request.query);
        this.body = yield model.update(conditions, this.request.body, options);
    }
    router.post(urlParam, put);
    router.post(url, put);

    // Delete
    function * del() {
        let conditions = buildConditions(this);
        this.body = yield model.remove(conditions, this.request.body);
    }
    router.del(urlParam, del);
    router.del(url, del);

}

module.exports = routerApi;