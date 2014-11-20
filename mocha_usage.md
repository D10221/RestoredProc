**Usage: mocha [debug] [options] [files]**

Commands:

  init [path]
  initialize a client-side mocha setup at [path]

    Options:
    
      -h, --help                      output usage information
      -V, --version                   output the version number
      -r, --require [name]            require the given module
      -R, --reporter [name]           specify the reporter to use
      -u, --ui [name]                 specify user-interface (bdd|tdd|exports)
      -g, --grep [pattern]            only run tests matching [pattern]
      -i, --invert                    inverts --grep matches
      -t, --timeout [ms]              set test-case timeout in milliseconds [2000]
      -s, --slow [ms]                 "slow" test threshold in milliseconds [75]
      -w, --watch                     watch files for changes
      -c, --colors                    force enabling of colors
      -C, --no-colors                 force disabling of colors
      -G, --growl                     enable growl notification support
      -d, --debug                     enable node's debugger, synonym for node --debug
      -b, --bail                      bail after first test failure
      -A, --async-only                force all tests to take a callback (async)
      --recursive                     include sub directories
      --debug-brk                     enable node's debugger breaking on the first line
      --globals [names]               allow the given comma-delimited global [names]
      --check-leaks                   check for global variable leaks
      --interfaces                    display available interfaces
      --reporters                     display available reporters
      --compilers [ext]:[module],...  use the given module(s) to compile files