module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dev: {
				files: {
					'dist/stylesheets/main.css': 'src/stylesheets/sass/main.sass'
				}
			}
		},
		copy: {
			html: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.html'],
					dest: 'dist/'
				}]
			},
			img: {
				files: [{
					expand: true,
					cwd: 'src/images/',
					src: ['**'],
					dest: 'dist/images/'
				}]
			},
			fa: {
				files: [{
					expand: true,
                    cwd: 'node_modules/font-awesome/fonts/',
                    src: ['**'],
                    dest: 'dist/fonts/'
				}]
			},
			fonts: {
				files: [{
					expand: true,
                    cwd: 'src/fonts/myriad-pro/fonts',
                    src: ['**'],
                    dest: 'dist/fonts/'
				}]
			}
		},
		// grunt-sass style: 'compressed' not working
		cssmin: {
			options: {
				sourceMap: true
			},
			target: {
				files: {
					'dist/stylesheets/main.min.css': 'dist/stylesheets/main.css'
				}
			}
		},
		watch: {
			images: {
				files: ['src/images/**/*'],
				tasks: ['newer:copy:img']
			},
			sass: {
				files: ['src/stylesheets/**/*'],
				tasks: ['sass:dev', 'newer:cssmin:target', 'newer:copy:fa']
			},
			html: {
				files: ['src/*.html'],
				tasks: ['newer:copy:html']
			},
			config: {
				files: ['Gruntfile.js'],
				tasks: ['dev']
			},
			fonts: {
				files: ['src/fonts/**/*'],
				tasks: ['newer:copy:fonts']
			}
		}
	});

	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['']);
	grunt.registerTask('dev', [
		'sass:dev',
		'newer:copy:html',
		'newer:copy:img',
		'newer:cssmin:target',
		'newer:copy:fa',
		'newer:copy:fonts'
	]);
};