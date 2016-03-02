/* required methods */

var gulp			= require('gulp');
var concat			= require('gulp-concat');
var rename			= require('gulp-rename');
var uglify			= require('gulp-uglify');
var runSequence		= require('run-sequence');
var watch			= require('gulp-watch');
var ngAnnotate 		= require('gulp-ng-annotate');

/* tasks */
gulp.task('depsjs', function(){
	return gulp.src([
		'bower_components/angular/angular.js',
		'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
		'bower_components/angular-ui-router/release/angular-ui-router.min.js',
		'bower_components/angular-route/angular-route.min.js',
		'bower_components/angular-aria/angular-aria.js',
		'bower_components/angular-animate/angular-animate.min.js',		
		'bower_components/angular-material/angular-material.js',		
		'node_modules/moment/moment.js',
		'node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
		'node_modules/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js',
		'bower_components/angular-ui-notification/dist/angular-ui-notification.min.js',	
		'bower_components/angularUtils-pagination/dirPagination.js',
		'bower_components/angular-ui-grid/ui-grid.min.js',			
		'bower_components/pdfmake/build/pdfmake.min.js',
		'bower_components/pdfmake/build/vfs_fonts.js'	,
		'bower_components/ng-file-upload/ng-file-upload-shim.min.js',
		'bower_components/ng-file-upload/ng-file-upload.min.js'
		])// eof gul src
	.pipe(concat('devdeps.js'))
	.pipe(gulp.dest('src/js'))
	
	//.pipe(uglify())
	//.pipe(gulp.dest('src/js'))

})// eof depsjs
gulp.task('appjs', function(){
	return gulp.src([		
		'js/*.js',
		'js/directives/*.js',
		'js/controllers/*.js',
		'js/services/*.js',
		'js/routes.js'
		])// eof gul src
	.pipe(concat('app.js'))
	.pipe(gulp.dest('src/js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('src/js'))

})// eof appjs

gulp.task('css', function(){
	return gulp.src([
		'css/default.css',
		'bower_components/bootstrap/dist/css/bootstrap.min.css',
		'css/angular-notify.css',		
		'bower_components/angular-ui-grid/ui-grid.min.css',
		'bower_components/angular-ui-notification/dist/angular-ui-notification.min.css'	,
		'bower_components/angular-material/angular-material.css'	
		])// eof gul src
	.pipe(concat('tankerapp.css'))
	.pipe(gulp.dest('src/css'))
//	.pipe(uglify())
//	.pipe(gulp.dest('src/js'))

})// eof appjsgulp.task('admindepsjs', function(){




gulp.task('watch', function(){
	gulp.watch(['css/*.css','js/*.js','js/controllers/*.js','js/directives/*.js','js/deps/*.js','js/services/*.js','gulpfile.js'], ['default']);	
})// eof appjs


gulp.task('default', function(callback){
	runSequence('css','appjs','depsjs',callback)
});// eof defaultgulp
