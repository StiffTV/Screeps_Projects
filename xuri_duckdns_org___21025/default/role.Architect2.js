/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.Architect');
 * mod.thing == 'a thing'; // true
 */
let Architect = {

    run: function (creep) {


        let sour = creep.room.find(FIND_SOURCES);
        for (const i in sour) {

            let goals = sour[i];


            let ret = PathFinder.search(
                creep.room.controller.pos, goals,
                {
                    // We need to set the defaults costs higher so that we
                    // can set the road cost lower in `roomCallback`
                    plainCost: 2,
                    swampCost: 10,

                    roomCallback: function (roomName) {

                        let room = Game.rooms[roomName];
                        // In this example `room` will always exist, but since
                        // PathFinder supports searches which span multiple rooms
                        // you should be careful!
                        if (!room) return;
                        let costs = new PathFinder.CostMatrix;

                        room.find(FIND_STRUCTURES).forEach(function (struct) {
                            if (struct.structureType === STRUCTURE_ROAD) {
                                // Favor roads over plain tiles
                                costs.set(struct.pos.x, struct.pos.y, 1);
                            } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                                (struct.structureType !== STRUCTURE_RAMPART ||
                                    !struct.my)) {
                                // Can't walk through non-walkable buildings
                                costs.set(struct.pos.x, struct.pos.y, 0xff);
                            }
                        });

                        // Avoid creeps in the room


                        return costs;
                    },
                }
            );
            console.log(ret.path);
            for (const number in ret.path) {
                creep.room.createConstructionSite(ret.path[number].x, ret.path[number].y, STRUCTURE_ROAD);
            }

        }

        Spos = creep.pos;
        Startx = Spos.x - 2;
        starty = Spos.y - 2;

        for (let x = Startx; x < (Startx + 5); x++) {
            for (let y = starty; y < (starty + 5); y++) {
                if (creep.room.getTerrain().get(x, y) !== 1) {
                    if ((x === (Spos.x - 2) && y === (Spos.y - 2)) || (x === (Spos.x + 2) && y === (Spos.y - 2))
                        || (x === (Spos.x - 2) && y === (Spos.y + 2)) || (x === (Spos.x + 2) && y === (Spos.y + 2))) {
                        creep.room.createConstructionSite(x, y, STRUCTURE_CONTAINER);
                    }
                    creep.room.createConstructionSite(x, y, STRUCTURE_ROAD);


                }
            }
        }
        // let x2 = creep.pos.x + 2;
        // creep.room.createConstructionSite(x2, creep.pos.y, STRUCTURE_RAMPART);
        // creep.room.createConstructionSite(x2, creep.pos.y, STRUCTURE_TOWER);

        let posAx = creep.pos.x;
        let posAy = creep.pos.y;

        let nx;
        let ny;

        //Oben
        //let counter = 0;
        // for(let Ay = posAy;Ay>0;Ay--){
        //
        //     for (let x = posAx-1; x <= posAx+1; x++) {
        //         for (let y = Ay-3; y <= Ay; y++) {
        //             // if (creep.room.lookForAt(LOOK_STRUCTURES,x,y) === undefined&&creep.room.lookForAt(LOOK_TERRAIN,x,y) !== 'plain') {
        //             //     creep.room.createConstructionSite(x, y, STRUCTURE_ROAD);
        //             // }
        //             counter++;
        //             creep.room.createConstructionSite(x, y, STRUCTURE_ROAD);
        //         }
        //     }
        //
        // }
        // console.log(counter);
        // let t = false;
        // let size = 10;
        //
        // for(let x = 0;x < 49;x++){
        //     for(let y = 0;y < 49;y++){
        //
        //         for(let xn = x;xn<x+10;xn++){
        //             for(let yn = y;yn<y+10;yn++){
        //                 if (creep.room.lookForAt(LOOK_STRUCTURES,x,y)&&creep.room.lookForAt(LOOK_TERRAIN,x,y) !== 'plain') {
        //
        //                 }
        //             }
        //         }
        //
        //     }
        // }

        let x = 25;
        let xcounter = 1;
        let y = 32;
        let ycounter = 1;
        let counter = 0;
        let switch1 = 1;
        let switch2 = 1;

        for (let c = 0; c < 24; c++) {//2401
            if (switch1 === 1) {
                //y
                if (switch2 === 1) {
                    //+
                    y++;
                    counter++;
                    creep.room.visual.text('y+',x,y);
                    if (counter === ycounter) {
                        ycounter++;
                        counter = 0;
                        switch1 = 2;
                    }
                } else {
                    y--;
                    counter++;
                    creep.room.visual.text('y-',x,y);
                    if (counter === ycounter) {
                        ycounter++;
                        counter = 0;
                        switch1 = 2;
                    }
                }

            } else {
                //x
                if (switch2 === 1) {
                    //+
                    x++;
                    counter++;
                    creep.room.visual.text('x+',x,y);
                    if (counter === xcounter) {
                        xcounter++;
                        counter = 0;
                        switch1 = 1;
                        switch2 = 2;
                    }
                } else {
                    x--;
                    counter++;
                    creep.room.visual.text('x-',x,y);
                    if (counter === xcounter) {
                        xcounter++;
                        counter = 0;
                        switch1 = 1;
                        switch2 = 1;
                    }
                }

            }
           // creep.room.visual.text(c,x,y);
        }

    }
};


module.exports = Architect;