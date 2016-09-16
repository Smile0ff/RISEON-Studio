var gulp = require("gulp"),
    cfg = require("./riseon.config"),

    exec = require("child_process").exec,
    rds = require("fs").readdirSync,
    extname = require("path").extname,

    imagemin = require("gulp-imagemin"),
    pngquant = require("imagemin-pngquant");

gulp.task("js", () => {
    
    var fileList = rds(cfg.js),
        pathToFile = "",
        fileName = "";

    fileList.map((file) => {
        if(extname(file) !== ".js") return;

        pathToFile = cfg.js +"/"+ file;
        fileName = /\w+(?=\.js$)/gi.exec(file)[0];

        exec('jspm bundle-sfx '+ pathToFile +' '+ cfg.build + '/js/'+ fileName +'.bundle.min.js --minify --skip-source-maps');
    });

});

gulp.task("css", () => {
    
    var fileList = rds(cfg.css),
        pathToFile = "",
        fileName = "";

    fileList.map((file) => {
        if(extname(file) !== ".less") return;

        pathToFile = cfg.css +"/"+ file;
        fileName = /\w+(?=\.less$)/gi.exec(file)[0];

        exec('lessc --clean-css '+ pathToFile +' --autoprefix="last 2 versions" '+ cfg.build +'/css/'+ fileName +'.bundle.min.css');
    });

});

gulp.task("fonts", () => {
    gulp.src(cfg.fonts +"**/*.*")
        .pipe(gulp.dest(cfg.build +"/fonts/"));
});

gulp.task("images", function(){
    
    gulp.src(cfg.images +"/**/*.*")
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(cfg.build +"/images/"));
});

gulp.task("watcher", () => {
    //gulp.watch(cfg.js +"/**/*.js", ["js"]);
    gulp.watch(cfg.css +"/**/*.less", ["css"]);
    gulp.watch(cfg.fonts +"/**/*.*", ["fonts"]);
    gulp.watch(cfg.images +"/**/*.*", ["images"]);
});

gulp.task("default", ["css", "fonts", "images", "watcher"]);