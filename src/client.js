import request from 'superagent-bluebird-promise';
import chalk   from 'chalk';

/**
 * @param {Mozaik} mozaik
 */
const client = function (mozaik) {

    function buildApiRequest(url, headers) {
        let req     = request.get(url);

/*        headers.forEach(function(header){
            req.set(header.name, header.value);
        });*/
        mozaik.logger.info(chalk.yellow(`[multijson] calling ${ url }`));

        return req.promise();
    }

    return {
        data(params) {
            const {
                sources
            } = params;

            var arr = [];

            mozaik.logger.info(chalk.yellow(`[multijson] sources are ${ JSON.stringify(sources) }`));
            return buildApiRequest(sources[0].url)
                .then(res => JSON.parse(res.text));
        }
    };
};

export default client;
