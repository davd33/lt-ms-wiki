const wikiBot = new Bot({
  server: 'de.wikipedia.org',
  path: 'w',
  debug: false
})

module.exports = function (options) {
  
  this.add('role:wiki,cmd:getText', function (args, respond) {

    wikiBot.api.call({
        action: 'query',
        format: 'json',
        prop: 'revisions', // we'll get contents of last revision
        titles: title, // wiki page title
        utf8: 1, ascii: 1,
        rvprop: 'content', // get page contents
        rvsection: 0 // get first section of the page
      },
      (err, info, next, data) => {

        if (err || !data.query) {
          let errMessage = '';
          if (!data.query) errMessage = "Data query is null.";
          if (err) errMessage = err.name;
          return respond({error: `Wiki Access ERROR: ${errMessage}`});
        }

        let page = data.query.pages[Object.keys(data.query.pages)[0]];
        if (!page || !page.revisions)
          return respond({error: `Wiki Data Issue: 'No revisions available'`});

        return respond({body: page.revisions[0]['*']});
      });
  })
}