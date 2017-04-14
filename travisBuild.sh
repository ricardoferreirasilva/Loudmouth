#!/usr/bin/env bash

node --version
npm --version

cd electron/
npm install
npm run webpack-test-build
npm run test
npm run test-integration
