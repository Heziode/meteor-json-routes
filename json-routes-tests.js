const xml = `<article xmlns="http://docbook.org/ns/docbook">
    <title>Extensible Markup Language</title>
    <para>
        <acronym>XML</acronym> (Extensible Markup Language, « langage de
balisage extensible »)…
    </para>
</article>`;

// This package is also tested in the `simple:rest` package.
if (Meteor.isServer) {
  JsonRoutes.add('GET', 'case-insensitive-method-1', function (req, res) {
    JsonRoutes.sendResult(res, {data: true});
  });

  JsonRoutes.add('Get', 'case-insensitive-method-2', function (req, res) {
    JsonRoutes.sendResult(res, {data: true});
  });

  JsonRoutes.add('get', 'case-insensitive-method-3', function (req, res) {
    JsonRoutes.sendResult(res, {data: true});
  });
  JsonRoutes.add('get', 'text-data', function (req, res) {
    JsonRoutes.sendResult(res, {data: "foo bar or not boo bar", headers: { 'Content-Type': 'application/text' }});
  });
  JsonRoutes.add('get', 'text-xml', function (req, res) {
    JsonRoutes.sendResult(res, {data: xml, headers: { 'Content-Type': 'application/xml' }});
  });
} else {
  // Meteor.isClient
  testAsyncMulti('JSON Routes - support case-insensitive HTTP method types', [
    function (test, expect) {
      HTTP.get('/case-insensitive-method-1', expect(function (err, res) {
        test.equal(err, null);
        test.equal(res.data, true);
      }));
    },

    function (test, expect) {
      HTTP.get('/case-insensitive-method-2', expect(function (err, res) {
        test.equal(err, null);
        test.equal(res.data, true);
      }));
    },

    function (test, expect) {
      HTTP.get('/case-insensitive-method-3', expect(function (err, res) {
        test.equal(err, null);
        test.equal(res.data, true);
      }));
    },

    function (test, expect) {
      HTTP.get('/text-data', expect(function (err, res) {
        test.equal(err, null);
        test.equal(res.content, "foo bar or not boo bar");
      }));
    },
  ]);
    testAsyncMulti('JSON Routes - support non json content', [
    function (test, expect) {
      HTTP.get('/text-data', expect(function (err, res) {
        test.equal(err, null);
        test.equal(res.content, "foo bar or not boo bar");
      }));
    },

    function (test, expect) {
      HTTP.get('/text-xml', expect(function (err, res) {
        test.equal(err, null);
        test.equal(res.content, xml);
      }));
    },
  ]);
}
