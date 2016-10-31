# Mozaïk multi-JSON widget

This widget display data from multiple JSON sources (up to three) in your [Mozaik](http://mozaik.rocks/) dashboard.
These JSON sources may be either static hosted files or JSON objects fetched from REST API's.

![json](https://raw.githubusercontent.com/jtbonhomme/mozaik-ext-multijson/master/preview/mozaik-ext-multijson.png)

## Installation

To install mozaik-ext-multijson from npm, run:

```bash
npm install --save mozaik-ext-multijson
```

## Configuration

### Static hosted file

Let's say you want to display two set of data from files you host on your Dropbox public directory.

#### JSON file

In your Mozaik dashboard's config.js file, add the following section:

```javascript
  {
      type:  'json.multidata',
      title: 'DEPLOYED APPLICATIONS',
      sources: [
        {
          url: 'https://dl.dropboxusercontent.com/u/11555789/f1.json',
          label: '${label}',
          data: '${data}',
          time:  '${time}'
        },
        {
          url: 'https://dl.dropboxusercontent.com/u/11555789/f2.json',
          label: '${label}',
          data: '${data}',
          time:  '${time}'
        },
        {
          url: 'https://dl.dropboxusercontent.com/u/11555789/f3.json',
          label: '${label}',
          data: '${data}',
          time:  '${time}'
        }
      ],
      columns: 1, rows: 1,
      x: 1, y: 1
  }
```

### JSON data fetched from REST API

In your Mozaik dashboard's config.js file, add the webservice url in the <code>api</code> section. The <code>url</code> key shall contains the full URL where your webservice is hosted. An optionnal headers key can be added (to add authentication information for example):

```javascript
  {
      type:  'json.multidata',
      title: 'DEPLOYED APPLICATIONS',
      sources: [
        {
          url: 'http://mywebservice/rest/api/2/resource/id1',
          headers: [{name: 'Authorization', value: 'Basic aKjs6LK8ijkSfT'}, {name: 'Content-type', value: 'application/json'}],
          label: '${label}',
          data: '${data}',
          time:  '${time}'
        },
        {
          url: 'http://mywebservice/rest/api/2/resource/id2',
          headers: [{name: 'Authorization', value: 'Basic aKjs6LK8ijkSfT'}, {name: 'Content-type', value: 'application/json'}],
          label: '${label}',
          data: '${data}',
          time:  '${time}'
        },
        {
          url: 'http://mywebservice/rest/api/2/resource/id3',
          headers: [{name: 'Authorization', value: 'Basic aKjs6LK8ijkSfT'}, {name: 'Content-type', value: 'application/json'}],
          label: '${label}',
          data: '${data}',
          time:  '${time}'
        }
      ],
      columns: 1, rows: 1,
      x: 1, y: 1
  }
```

### parameters

<code>title</code>, <code>value</code> and <code>unit</code> parameters can be either a String or a property path to be retrieve in the JSON data.

key               | required | description
------------------|----------|-------------------------------------------------------------------
`type`            | yes      | *Always equal to 'json.multidata' (String)*
`title`           | yes      | *The title to be displayed in the header (String)*
`sources`         | yes      | *The list of the sources to be displayed (Array)*
`sources.url`     | yes      | *The url of the x.th source (URL)*
`sources.headers` | no       | *Headers to be used to fetch the source (Array)*
`sources.label`   | yes      | *Label of the row (String)*
`sources.data`    | yes      | *Data to be displayed (String)*
`sources.time`    | no       | *Date information (String)*


