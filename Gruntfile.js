'use strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.csx', 'src/**/*.cs',
                    'Gruntfile.js'
                ],
                tasks: ['traceur:indexModule'],
                options: {
                    spawn: false,
                    interrupt: true,
                    debounceDelay: 250,
                }
            }
        },
        traceur: {
            options: {
                experimental: true,
                script: true,
                sourceMaps: 'file'
            },
            custom: {
                files: [{
                    //expand: true,
                    //cwd: 'src/es6',
                    src: ['src/**/*.es6.js'],
                    dest: 'out/compiled.js'
                }]
            },
            index: {
                files: [{
                    //expand: true,
                    //cwd: 'src/es6',
                    src: ['src/index.es6.js'],
                    dest: 'src/index.js'
                }]
            },
            indexModule: {
                options: {
                    experimental: true,                   
                    sourceMaps: 'file',
                    modules: 'commonjs'
                },
                files: [{
                    //expand: true,
                    //cwd: 'src/es6',
                    src: ['src/index.es6.js'],
                    dest: 'src/index.js'
                }]
            }
        },
        execute: {
            target: {
                options: {
                    // execute node with additional arguments
                    nodeargs: ['--debug']
                },
                // can also be used outside the options
                before: function(grunt, options) {
                    console.log('Before!');
                },
                src: ['out/compiled.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-traceur');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('run', ['execute:']);
    grunt.registerTask('build-run', ['traceur', 'execute:']);

};