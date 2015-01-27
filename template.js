/*
 * grunt-init-gruntfile
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 *
 * Edits by @fabiantheblind
 */

'use strict';

// Basic template description.
exports.description = 'Create a basic p5js setup.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, but ' +
  'you will most likely need to edit the generated Gruntfile.js file before ' +
  'running grunt. _If you run grunt after generating the Gruntfile, and ' +
  'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';
exports.warnOn = 'package.json';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    // {
    //   name: 'dom',
    //   message: 'Is the DOM involved in ANY way?',
    //   default: 'Y/n',
    //   warning: 'Yes: QUnit unit tests + JSHint "browser" globals. No: Nodeunit unit tests.'
    //
    // },
    init.prompt('name'),
    init.prompt('title', 'my cool p5js sketch'),
    init.prompt('description', 'an p5js thing'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name')
  ], function(err, props) {
    props.dom = false; // /y/i.test(props.dom);
    props.min_concat = true; // /y/i.test(props.min_concat);
    props.package_json = true; ///y/i.test(props.package_json);
    props.test_task = props.dom ? 'qunit' : 'nodeunit';
    props.file_name = props.package_json ? '<%= pkg.name %>' : 'FILE_NAME';

    // Find the first `preferred` item existing in `arr`.

    function prefer(arr, preferred) {
      for (var i = 0; i < preferred.length; i++) {
        if (arr.indexOf(preferred[i]) !== -1) {
          return preferred[i];
        }
      }
      return preferred[0];
    }

    // Guess at some directories, if they exist.
    var dirs = grunt.file.expand({
      filter: 'isDirectory'
    }, '*')
      .map(function(d) {
        return d.slice(0, -1);
      });
    props.lib_dir = prefer(dirs, ['src']);

    // Files to copy (and process).
    var files = init.filesToCopy(props);
    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);


    // If is package_json true, generate package.json
    if (props.package_json) {

      init.writePackageJSON('package.json', {
        name: props.name,
        title: props.title,
        version: '0.1.0',
        keywords: ["p5js", "Processing.org"],
        // npm_test: 'grunt qunit',
        // TODO: pull from grunt's package.json
        node_version: '>= 0.10.0',
        "repository": {
          "type": "git",
          "url": "git@github.com:" + props.author_name + "/" + props.name + ".git"
        },
        devDependencies: {
          'grunt': '~0.4.2',
          "load-grunt-tasks": "~0.4.0",
          "grunt-markdown": "^0.6.1",
          "grunt-wiredep":"2.0.0"

        }
      });
    }
    // All done!
    done();
  });

};