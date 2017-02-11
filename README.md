[![Build Status](https://travis-ci.org/abought/trischwartz.svg?branch=develop)](https://travis-ci.org/abought/trischwartz)
[![Coverage Status](https://coveralls.io/repos/github/abought/trischwartz/badge.svg?branch=develop)](https://coveralls.io/github/abought/trischwartz?branch=develop)

# Trischwartz

A library for generating and rendering arbitrary triangles via SVG

## Installation
This module can be installed via NPM or Yarn:

`npm install trischwartz --save-dev`

`yarn add trischwartz --dev`

## Usage

This module does three things:

1. Generates three random angles that make up a triangle

2. Calculates the coordinates for a triangle within a unit square, given angles
  
3. Creates an SVG element to draw and display a triangle in a page

See the [webpack usage example](https://github.com/abought/trischwartz/blob/develop/demo/).

## Development commands
Run `yarn build:demo` to build the webpack asset bundle for the demo.

Run unit tests via `yarn test` or `yarn test:live`.