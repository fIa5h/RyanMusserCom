;(function(w, d3, undefined){
    "use strict";

    var width, height;
    function getSize(){
        width = w.innerWidth,
        height = w.innerHeight;

        if(width === 0 || height === 0){
            setTimeout(function(){
                getSize();
            }, 100);
        }
        else {
            init();
        }
    }

    function init(){

        //Setup path for outerspace
        var space = d3.geo.azimuthal()
            .mode("equidistant")
            .translate([width / 2, height / 2]);

        space.scale(space.scale() * 3);

        var spacePath = d3.geo.path()
            .projection(space)
            .pointRadius(1);

        //Setup path for globe
        var projection = d3.geo.azimuthal()
            .mode("orthographic")
            .translate([width / 2, height / 2]);

        var scale0 = projection.scale();

        var path = d3.geo.path()
            .projection(projection)
            .pointRadius(2);

        //Setup zoom behavior
        var zoom = d3.behavior.zoom(true)
            .translate(projection.origin())
            .scale(projection.scale())
            .scaleExtent([200, 1800])
            .on("zoom", move);

        var circle = d3.geo.greatCircle();

        var svg = d3.select("body")
            .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                    .call(zoom)
                    .on("dblclick.zoom", null);

        //Create a list of random stars and add them to outerspace
        var starList = createStars(200);

        var stars = svg.append("g")
            .selectAll("g")
            .data(starList)
            .enter()
            .append("path")
                .attr("class", "star")
                .attr("d", function(d){
                    spacePath.pointRadius(d.properties.radius);
                    return spacePath(d);
                });


        svg.append("rect")
            .attr("class", "frame")
            .attr("width", width)
            .attr("height", height);

        //Create the base globe
        var backgroundCircle = svg.append("circle")
            .attr('cx', width / 2)
            .attr('cy', height / 2)
            .attr('r', projection.scale())
            .attr('class', 'globe')
            .attr("filter", "url(#glow)")
            .attr("fill", "url(#gradBlue)")
            .on("click", function(d){
              //remove active classes from previous countries
              var activeCountries = document.getElementsByClassName("feature-active");

              for(var i = (activeCountries.length - 1); i >= 0; i--)
              {
                let activeItem = d3.select(activeCountries[i])
                activeItem.attr("class", "feature");
              }
              //
               var tooltipDiv = document.getElementById('tooltip');
               let elem = d3.select(this);
               tooltipDiv.innerHTML = '';
               tooltipDiv.style.display = "none";
           })
           .on("mouseover", function(d){
             //remove active classes from previous countries
             var activeCountries = document.getElementsByClassName("feature-active");

             for(var i = (activeCountries.length - 1); i >= 0; i--)
             {
               let activeItem = d3.select(activeCountries[i])
               activeItem.attr("class", "feature");
             }
             //
              var tooltipDiv = document.getElementById('tooltip');
              let elem = d3.select(this);
              tooltipDiv.innerHTML = '';
              tooltipDiv.style.display = "none";
          });

        var g = svg.append("g"),
            features;

        var colorScale = [
          '#F51A00',
          '#ED5000',
          '#E58300',
          '#DDB300',
          '#CBD500',
          '#93CD00',
          '#5FC500',
          '#2FBD00',
          '#02B500',
          '#00AD26'
        ];

        //Add all of the countries to the globe
        d3.json("world-countries.json", function(collection) {
            features = g.selectAll(".feature").data(collection.features);
            features.enter().append("path")
                .attr("class", "feature")
                .style("fill",function(d,i){
                  return typeof(d.properties.percentage) == 'undefined' ? colorScale[0] : colorScale[parseInt(d.properties.percentage/10)];
                })
                .attr("d", function(d){ return path(circle.clip(d)); })
                .on("mouseover", function(d){

                  //remove active classes from previous countries
                  var activeCountries = document.getElementsByClassName("feature-active");

                  for(var i = (activeCountries.length - 1); i >= 0; i--)
                  {
                    let activeItem = d3.select(activeCountries[i])
                    activeItem.attr("class", "feature");
                  }
                  //

                   var current_position = d3.mouse(this);
                   var tooltipDiv = document.getElementById('tooltip');
                   var percentageText = typeof(d.properties.percentage) == 'undefined' ? '<10%' : d.properties.percentage+'%';
                   let elem = d3.select(this);
                   tooltipDiv.innerHTML = d.properties.name+' '+percentageText;
                   tooltipDiv.style.top = (parseInt(current_position[1]) + 10)+'px';
                   tooltipDiv.style.left = (parseInt(current_position[0]) + 10)+'px';
                   tooltipDiv.style.display = "block";
                   elem.attr("class", "feature-active");
               })
               .on("click", function(d){
                 //remove active classes from previous countries
                 var activeCountries = document.getElementsByClassName("feature-active");

                 for(var i = (activeCountries.length - 1); i >= 0; i--)
                 {
                   let activeItem = d3.select(activeCountries[i])
                   activeItem.attr("class", "feature");
                 }
                 //
                  var current_position = d3.mouse(this);
                  var tooltipDiv = document.getElementById('tooltip');
                  var percentageText = typeof(d.properties.percentage) == 'undefined' ? '<10%' : d.properties.percentage+'%';
                  let elem = d3.select(this);
                  tooltipDiv.innerHTML = d.properties.name+' '+percentageText;
                  tooltipDiv.style.top = (parseInt(current_position[1]) + 10)+'px';
                  tooltipDiv.style.left = (parseInt(current_position[0]) - tooltipDiv.offsetWidth - 10)+'px';
                  tooltipDiv.style.display = "block";
                  elem.attr("class", "feature-active");
              });
        });

        //Redraw all items with new projections
        function redraw(){
            features.attr("d", function(d){
                return path(circle.clip(d));
            });

            stars.attr("d", function(d){
                spacePath.pointRadius(d.properties.radius);
                return spacePath(d);
            });
        }


        function move() {
            if(d3.event){
                var scale = d3.event.scale;
                var origin = [d3.event.translate[0] * -1, d3.event.translate[1]];

                projection.scale(scale);
                space.scale(scale * 1.2);
                backgroundCircle.attr('r', scale);
                path.pointRadius(.8 * scale / scale0);

                projection.origin(origin);
                circle.origin(origin);

                //globe and stars spin in the opposite direction because of the projection mode
                var spaceOrigin = [origin[0] * -1, origin[1] * -1];
                space.origin(spaceOrigin);
                redraw();
            }
        }


        function createStars(number){
            var data = [];
            for(var i = 0; i < number; i++){
                data.push({
                    geometry: {
                        type: 'Point',
                        coordinates: randomLonLat()
                    },
                    type: 'Feature',
                    properties: {
                        radius: Math.random() * 1.5
                    }
                });
            }
            return data;
        }

        function randomLonLat(){
            return [Math.random() * 360 - 180, Math.random() * 180 - 90];
        }
    }

    getSize();

}(window, d3));
