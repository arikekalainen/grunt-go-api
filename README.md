# grunt-go-api

> Go command api plugin for running go commands

## Ref
Plugin template was generated using guide from http://gruntjs.com/creating-plugins

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

Since this 'grunt go api' plugin lacks many of go commands currently, the plugin is not published to npm yet.
So, installing via git refence...
```shell
npm install git://github.com/arikekalainen/grunt-go-api --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-go-api');
```

## The "go_api" task

### Overview
In your project's Gruntfile, add a section named `go_api` to the data object passed into `grunt.initConfig()`.
Currenlty the 'go_api' -task supports only 'build' and 'run' commands.

```js
grunt.initConfig({
  go_api: {
    <go command>: {
      src: [
        // Source files, globs
      ],
      app: "target name, name of executable app",
      flags: "Go command flag(s)"
    }
  }
});
```


### Usage Examples

#### Build and run go app
In this example myapp application is build from hello.go and world.go source files

```js
grunt.initConfig({
  go_api: {
    build: {
      src: ["hello.go", "world.go"],
      app: "myapp"
    },
    run: {
      src: ["hello.go"]
    }
  }
});
```

