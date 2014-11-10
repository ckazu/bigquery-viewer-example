client_id = ''
project_id = ''

$ ->
  $('#auth').on 'click', ->
    gapi.auth.authorize
      client_id: client_id,
      scope: 'https://www.googleapis.com/auth/bigquery.readonly',
      ->
        gapi.client.load('bigquery', 'v2')
