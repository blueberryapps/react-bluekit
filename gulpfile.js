const ava = require('gulp-ava')
const eslint = require('gulp-eslint');
const gulp = require('gulp')
const packageJson = require('./package.json')
const path = require('path')

const configureSvgIcon = require('react-svg-icon-generator').default;

configureSvgIcon({
  destination: path.join(__dirname, 'src', 'app', 'atoms', 'Icon.react.js'),
  radium: true,
  reactPureRender: true,
  svgDir: path.join(__dirname, 'src', 'icons')
});

gulp.task('eslint', () => {
  return gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('ava', () =>
  gulp
    .src(packageJson.ava.files)
    .pipe(ava())
);
