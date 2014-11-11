client_id = ''
project_id = ''

$ ->
  $('#container').hide()

  $('#auth button').on 'click', ->
    gapi.auth.authorize
      client_id: client_id
      scope: 'https://www.googleapis.com/auth/bigquery.readonly'
      ->
        gapi.client.load('bigquery', 'v2')
        $('#container').show()
        $('#auth').hide()

  $('#run').on 'click', ->
    $('#information').text 'loading...'

    if $('#result tbody').size() > 0 # FIXME: replace condition
      $('#result').dataTable().api().destroy()
      $('#result').empty()

    request = gapi.client.bigquery.jobs.query
      projectId: project_id
      query: $('#query').val()

    request.execute (response) ->
      if response.error
        $('#information').text response.message
      else
        $('#information').empty()
        columns = response.schema.fields.map (field) ->
          { title: field.name }
        data = _.map response.rows, (row) ->
          _.map row.f, (values) ->
            values.v

        $('#result').dataTable
          data: data
          columns: columns
