## The what now?

This is a simple advent calendar made from ruby, HTML and javscript. It lets
you arrange some photos on a page and only see one a day. Apparently this
is attractive to some people.

It includes a helpful Rakefile to size and scale photos appropriately, you
just need to gather 25 of your favourites, name them in the order you'd like
to see them, and pick one of them for the background.

## A dry run.

Try it out with the following easy steps:

1. Clone this (`git clone git://github.com/eddsteel/adcalendar.git`).
2. Download or find 25 nice photos. (I went to flickr.com and found some
splendid ones tagged 'hats')
3. Save them in the `photos` directory.
4. Run `rake` and see your computer get busy.
5. Deploy. You could run `rackup` or `shotgun`. Or get fancy and send it to
heroku.
6. Marvel at your handiwork: `http://localhost:9393`. If it's not December
yet, try `http://localhost:9393/?cheat`.

You can see the aforementioned splendid hats at `http://splendidhats.heroku.com`.

# TODOs etc
It would be nice if the recipient of your calendar wasn't able to guess the
photo names quite so easily, wouldn't it?

<!-- vi: set filetype=markdown : -->
