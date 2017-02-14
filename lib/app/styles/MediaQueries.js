"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var breakPoints = exports.breakPoints = {
  large: 1150,
  tablet: 768
};

var mediaQueries = exports.mediaQueries = {
  breakpointLarge: "@media screen and (max-width: " + breakPoints.large + "px)",
  breakpointTablet: "@media screen and (max-width: " + breakPoints.tablet + "px)"
};