import React, { Component }  from 'react';
import reactMixin            from 'react-mixin';
import { ListenerMixin }     from 'reflux';
import Mozaik                from 'mozaik/browser';

class Data extends Component {

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
          id: 'multijson.data.${title}.${sources}',
          params: {
            title: this.props.title,
            sources: this.props.sources
          }
        };
    }

    // This method is automatically invoked each time the `sample.sampleMethod` has fetched some data. 
    // This assumes your method will return an object containing a `count` property.
    onApiData(value) {
        this.setState(value);
    }

    render() {
        const state = this.state || {};

        const {
            title
        } = this.props;

        // const { items = [] } = state;
        const {
            label,
            data,
            time
        } = state;

        return (
            <div>
                <div className="widget__header">
                    <span className="widget__header__subject">
                        {title}
                    </span>
                    <i className="fa fa-table" />
                </div>
                <div className="json__value">
                    {label}: {data} - {time}
                </div>
            </div>
        );
    }
}

reactMixin(Data.prototype, ListenerMixin);
reactMixin(Data.prototype, Mozaik.Mixin.ApiConsumer);

export default Data;
