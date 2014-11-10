(function() {
  var client_id, project_id;

  client_id = '';

  project_id = '';

  $(function() {
    return $('#auth').on('click', function() {
      return gapi.auth.authorize({
        client_id: client_id,
        scope: 'https://www.googleapis.com/auth/bigquery.readonly'
      }, function() {
        return gapi.client.load('bigquery', 'v2');
      });
    });
  });

}).call(this);
