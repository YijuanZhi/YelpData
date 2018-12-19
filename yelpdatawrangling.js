class FluentRestaurants{

  constructor(jsonData){
    this.data = jsonData;
  }

  fromState(stateStr){
    let newData = this.data.filter(function(x){
      return lib220.getProperty(x,'state').value===stateStr;
    });
    let newObj = new FluentRestaurants(newData);
    return newObj;
  }

  ratingLeq(rating){
    let newData = this.data.filter(function(x){
      return lib220.getProperty(x,'stars').value <= rating;
    });
    let newObj = new FluentRestaurants(newData);
    return newObj;
  }

  ratingGeq(rating){
    let newData = this.data.filter(function(x){
      return lib220.getProperty(x, 'stars').value >= rating;
    });
    let newObj = new FluentRestaurants(newData);
    return newObj;
  }

  category(categoryStr){
    let newData = this.data.filter(function(x){
      let cat = lib220.getProperty(x, 'categories').value;
      for( let i = 0; i < cat.length; ++i){
        if(cat[i] === categoryStr){
          return true;
        }
      }
      return false;
    });
    let newObj = new FluentRestaurants(newData);
    return newObj;
  }

  hasAmbience(ambienceStr){
    let newData = this.data.filter(function(x){
      let att = lib220.getProperty(x, 'attributes').value;
      if(!lib220.getProperty(att, 'Ambience').found){
        return false;
      }
      let amb = lib220.getProperty(att, 'Ambience').value;
      if(!lib220.getProperty(amb, ambienceStr).found){
        return false;
      }
      return lib220.getProperty(amb, ambienceStr).value;
    });
    let newObj = new FluentRestaurants(newData);
    return newObj;
  }

  bestPlace(){
    let best =[];
    let bestRate = this.data[0].stars;  //best rating so far
    let bestRest = this.data[0];  //best restaurant so far
    best.push(bestRest); //best restaurants collection

    //loop through data and find the restaurant(collection)
    for(let i = 1; i < this.data.length; ++i){
      let curRest = this.data[i];
      let curRate = this.data[i].stars;

      //Found a new better restaurant
      if(curRate > bestRate){
        bestRate = curRate;
        bestRest = curRest;
        best = [];
        best.push(bestRest);
      }

      //Found an equally good restaurant
      else if(curRate === bestRate){
        best.push(curRest);
      }
      else{
        continue;
      }
    }

    //find the one with most reviews
    for(let i = 0; i < best.length; ++i){
      if(bestRest.review_count < best[i].review_count){
        bestRest = best[i];
      }
    }
    return bestRest;
  }
}


/*
let data = lib220.loadJSONFromURL('https://people.cs.umass.edu/~joydeepb/yelp.json');
let f = new FluentRestaurants(data);
let f1 = f.ratingLeq(5)
  .ratingGeq(3)
  .category('Restaurants')
  .fromState('AZ')
  .hasAmbience('upscale')
  .bestPlace();
console.log(f1);
*/





/*
const testData = [
 {
    name: "Applebee's",
    state: "NC",
    stars: 4,
    review_count: 6,
}, {
name: "China Garden",
    state: "NC",
    stars: 4,
    review_count: 10,
}, {
    name: "Beach Ventures Roofing",
    state: "AZ",
    stars: 3,
    review_count: 30,
}, {
    name: "Alpaul Automobile Wash",
    state: "NC",
    stars: 3,
    review_count: 30,
} ]
test('fromState filters correctly', function() {
    let tObj = new FluentRestaurants(testData);
    let list = tObj.fromState('NC').data;
    assert(list.length === 3);
    assert(list[0].name === "Applebee's");
    assert(list[1].name === "China Garden");
    assert(list[2].name === "Alpaul Automobile Wash");
});
test('bestPlace tie-breaking', function() {
    let tObj = new FluentRestaurants(testData);
    let place = tObj.fromState('NC').bestPlace();
    assert(place.name === 'China Garden');
});
*/