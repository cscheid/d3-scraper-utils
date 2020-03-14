/*

  rather than type, eg

  d3.selectAll("td div.table td a")
    .filter(function() { return d3.select(this).select("font").text().match(/DB/); })

  I want to type

  d3.all("td div.table td a")
    .containing(n => n.select("font").text().match(/DB/));

 */

var script = document.createElement("script");
script.setAttribute("onload", function() {
    installScraperUtils();
});

script.setAttribute("src", "https://d3js.org/d3.v5.js");
document.body.appendChild(script);

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
        return this.nodes().map(n => d3.select(n).callReturn(fn));
    };

    // ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn
    [].__proto__.out = function()
    {
        console.log(JSON.stringify(this));
    };

}

