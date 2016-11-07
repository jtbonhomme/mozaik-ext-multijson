import React, { Component }  from 'react';
import reactMixin            from 'react-mixin';
import { ListenerMixin }     from 'reflux';
import Mozaik                from 'mozaik/browser';

class Data extends Component {

    constructor(props) {
        super(props);
        this.state = { builds: [] };
    }

    // Before the component is mounted, the mixin will search for this method on the component.
    // This method MUST return an object with an `id` property.
    // It tells Mozaïk that this component is interested in data coming from `sample` generated with `sampleMethod`
    // The `id` MUST be unique across all Mozaïk extensions.
    getApiRequest() {
        const {
            title,
            sources
        } = this.props;

        return {
          id: `multijson.data.${ title }.${ sources }`,
          params: {
            title: this.props.title,
            sources: this.props.sources
          }
        };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(builds) {
        this.setState({ builds });
    }

    render() {
        const { title } = this.props;
        const { builds } = this.state;

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">
                        {title}
                    </span>
                    <i className="fa fa-user-circle" />
                </div>
                <div className="widget__body">
                  {builds.map((item, index) =>
                    <div className="list__item multijson__item" key={index}>
                        <span className="multijson__data__label" >
                          {item.label}
                        </span>
                        <span className="multijson__data__value" >
                          {item.data} 
                        </span>
                        <span className="multijson__data__time" >
                           <i className="fa fa-clock-o" />&nbsp;
                           {item.time}
                        </span>
                    </div> 
                  )}
                </div>
            </div>
        );
    }
}

reactMixin(Data.prototype, ListenerMixin);
reactMixin(Data.prototype, Mozaik.Mixin.ApiConsumer);

export default Data;
