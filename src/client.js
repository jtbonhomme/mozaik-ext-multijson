import request from 'superagent-bluebird-promise';
import chalk   from 'chalk';
import Promise from 'bluebird';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    function buildApiRequest(url, headers) {
        let req      = request.get(url);
        let _headers = headers || [];
/*        _headers.forEach(function(header){
            req.set(header.name, header.value);
        });*/
        return req.promise();
    }

    return {
        data(params) {

            var arr = [];
            var builds = [];
            params.sources.forEach(source => {
              mozaik.logger.info(chalk.yellow(`[multijson] create promise source ${ source.url}`));
              builds.push(buildApiRequest(source.url)
                      .then((res) => {
                        arr.push(JSON.parse(res.text))
                      }));
            });

            return Promise.all(builds)
            .then(function() {
              mozaik.logger.info(chalk.yellow(`[multijson] fetched data`));
              return arr;
            });
        }
    };
};

export default client;
