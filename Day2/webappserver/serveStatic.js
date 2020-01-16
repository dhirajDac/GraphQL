const staticResExtns = [ '.html', '.css', '.js', '.jpg', '.png', '.ico', '.txt', '.json', '.xml'];
var serveStatic={

 isStatic(resourceName){
    const resExtn = path.extname(resourceName);
    return staticResExtns.indexOf(resExtn) >= 0;
}
}