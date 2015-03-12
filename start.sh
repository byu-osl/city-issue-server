#!/bin/sh

if  ! type 'supervisor' > /dev/null; then
    echo "Node supervisor is not installed, running without."
    node server.js
else
    supervisor -n error server.js
fi