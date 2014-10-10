Flask Skeleton
===========

[![Build Status](https://travis-ci.org/aaronbassett/Flask-skeleton.svg)](https://travis-ci.org/aaronbassett/Flask-skeleton)

A __really__ basic Flask app skeleton ready for deployment to Heroku.

Usage
----

    git clone git@github.com:aaronbassett/Flask-skeleton.git
    cd Flask-skeleton
    virtualenv env
    source env/bin/activate
    pip install -r requirements.txt
    bower install
    npm install
    gulp
    # Write your super awesome amazing app!
    heroku login
    heroku create
    git push heroku master
    heroku config:set S3_KEY="t8yamo017rg6*ukr+k@&l+&$3mx%4^c&^16l_i"
    # Don't use that key though you silly-billy!
    heroku ps:scale web=1
    heroku open

Or you can simply fork this repo and click below. Neato!

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

_I still reccomend you change your `SECRET_KEY` though._

WTH, it looks weird on Heroku!?
------------------------

Sorry, as far as I know there is no way to run the gulp and bower tasks on Heroku so you will need to run them locally. Remember to delete `static/[components | css | js]/.gitignore` so you can commit the files.

License
-------

http://aaron.mit-license.org/