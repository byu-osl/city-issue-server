#!/bin/sh

if  ! type 'supervisor' > /dev/null; then
    echo "Node supervisor is not installed, running without."
    if ! type 'node' > /dev/null; then
    	nodejs server.js
    else
    	node server.js
    fi
else
    supervisor -n error server.js
fi