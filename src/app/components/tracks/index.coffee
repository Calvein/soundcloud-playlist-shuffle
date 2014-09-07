View = require('bamjs/view')
{ shuffle } = require('bamjs/underscore')

tmpl = require('./index.jade')


class Tracks extends View
    namespace: 'tracks'

    events:
        'click .track': 'clickTrack'

    initialize: ->
        # Listeners #
        @root().on('playlist:new', @showTracks.bind(@))
        @root().on('current:set', @setCurrent.bind(@))


    # Listeners #
    setCurrent: (track) ->
        track.$el.addClass('active')
            .siblings('.active').removeClass('active')

    showTracks: (playlist) ->
        tracks = shuffle(playlist.tracks)
        @$el.html(tmpl(
            tracks: tracks
        ))

        # Add the element to the track and vice-versa
        $tracks = @$('li')
        tracks = tracks.map((track, i) ->
            $track = $($tracks.get(i))

            track.$el = $track
            $track.data('track', track)

            return track
        )

        @root().trigger('current:set', tracks[0])


    # Events #
    clickTrack: (e) ->
        track = $(e.currentTarget).data('track')
        @root().trigger('current:set', track)


module.exports = Tracks