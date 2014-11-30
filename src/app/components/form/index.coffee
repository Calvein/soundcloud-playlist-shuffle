View = require('bamjs/view')
api = require('../../modules/api')

tmpl = require('./index.jade')


class Form extends View
    namespace: 'form'

    events:
        'submit': 'submit'

    initialize: ->
        # TODO get in localstorage
        url = 'https://soundcloud.com/calvein/'
        @$el.html(tmpl(
            url: url
        ))

        # Listeners #
        @listenTo(@root(), 'playlist:get', @submit)
        @submit()

    getPlaylist: (url) ->
        api.getPlaylist(url).done((playlist) =>
            @root().trigger('playlist:new', playlist)
        )

    getPlaylists: (url) ->
        api.getPlaylists(url).done((playlists) =>
            for playlist in playlists
                if confirm("Add playlist «#{playlist.title}» ?")
                    @root().trigger('playlist:new', playlist)
        )

    getData: (url) ->
        # Remove end slash
        url = url.replace(/\/$/, '')

        [user, set, playlist] = url
            .replace(/http(s*):\/\/soundcloud.com\//, '')
            .split('/')

        # Get the specified playlist
        if playlist
            return @getPlaylist(url)

        # If only the user is set, we fetch the playlists
        unless set
            url += '/sets'

        return @getPlaylists(url)


    # Events #
    submit: (e) ->
        e?.preventDefault()
        url = @$('input').val()
        @getData(url)


module.exports = Form