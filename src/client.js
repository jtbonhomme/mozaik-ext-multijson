import request from 'superagent-bluebird-promise';
import chalk   from 'chalk';
import Promise from 'bluebird';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    function buildApiRequest(url, headers) {
        let req     = request.get(url);

/*        headers.forEach(function(header){
            req.set(header.name, header.value);
        });*/
        return req.promise();
    }

    return {
        data(params) {
            const {
                sources
            } = params;

            var arr = [];
            var builds = [];
            sources.forEach(source => {
              builds.push(buildApiRequest(source.url)
                      .then((res) => {arr.push(JSON.parse(res.text))}));
            });

            return Promise.all(builds)
            .then(function() {
              mozaik.logger.info(chalk.yellow(`[multijson] fetched data`));
              return arr;
            })

        }
    };
};

export default client;
