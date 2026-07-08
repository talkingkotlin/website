#!/bin/sh
# Serves the site locally with site.url overridden to localhost (see _config_dev.yml),
# so asset URLs resolve to the local build instead of the production domain.
bundle exec jekyll serve --config _config.yml,_config_dev.yml "$@"
