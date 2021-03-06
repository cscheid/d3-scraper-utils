/*

  rather than type, eg

  d3.selectAll("td div.table td a")
    .filter(function() { return d3.select(this).select("font").text().match(/DB/); })

  I want to type

  d3.all("td div.table td a")
    .containing(n => n.select("font").text().match(/DB/));

 */

function installScraperUtils()
{
    d3.all = arg => d3.selectAll(arg);

    d3.selection.prototype.all = d3.selection.prototype.selectAll;

    d3.selection.prototype.getAttr = function(key)
    {
        if (this.empty()) {
            return null;
        }
        return this.attr(key);
    };

    d3.selection.prototype.getText = function()
    {
        if (this.empty()) {
            return "";
        }
        return this.text();
    };

    d3.selection.prototype.callReturn = function(fn)
    {
        return fn(this);
    };

    d3.selection.prototype.containing = function(fn)
    {
        return this.filter(function() {
            return d3.select(this).callReturn(fn);
        });
    };

    d3.selection.prototype.map = function(fn)
    {
        return this.nodes().map(n => n && d3.select(n).callReturn(fn));
    };
    // i don't think this should really ever be necessary but it's
    // symmetric with map and mapS on the array prototype.
    d3.selection.prototype.mapS = function(fn)
    {
        return d3.selectAll(this.nodes().map(n => n && d3.select(n).callReturn(fn)));
    };

    // ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn
    [].__proto__.out = function()
    {
        console.log(JSON.stringify(this));
    };

    [].__proto__.mapS = function(fn) {
        return d3.select(this.map(v => d3.select(v).callReturn(fn)));
    };
}

var script = document.createElement("script");
script.onload = installScraperUtils;
script.setAttribute("src", "https://d3js.org/d3.v5.js");
document.body.appendChild(script);
