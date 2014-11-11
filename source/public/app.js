(function() {
  var client_id, project_id;

  client_id = '';

  project_id = '';

  $(function() {
    $('#container').hide();
    $('#auth button').on('click', function() {
      return gapi.auth.authorize({
        client_id: client_id,
        scope: 'https://www.googleapis.com/auth/bigquery.readonly'
      }, function() {
        gapi.client.load('bigquery', 'v2');
        $('#container').show();
        return $('#auth').hide();
      });
    });
    return $('#run').on('click', function() {
      var request;
      $('#information').text('loading...');
      if ($('#result tbody').size() > 0) {
        $('#result').dataTable().api().destroy();
        $('#result').empty();
      }
      request = gapi.client.bigquery.jobs.query({
        projectId: project_id,
        query: $('#query').val()
      });
      return request.execute(function(response) {
        var columns, data;
        if (response.error) {
          return $('#information').text(response.message);
        } else {
          $('#information').empty();
          columns = response.schema.fields.map(function(field) {
            return {
              title: field.name
            };
          });
          data = _.map(response.rows, function(row) {
            return _.map(row.f, function(values) {
              return values.v;
            });
          });
          return $('#result').dataTable({
            data: data,
            columns: columns
          });
        }
      });
    });
  });

}).call(this);
