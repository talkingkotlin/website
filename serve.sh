#!/bin/sh
docker run -v /Users/hadihariri/dropbox/talking-kotlin/website/:/tmp -p 4000:4000 hhariri/jekyll jekyll serve -s /tmp --host 0.0.0.0 --incremental
